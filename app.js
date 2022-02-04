// Set initial variables //
const topContainer = document.querySelector('.top-container');
const btnContainer = document.querySelector('.buttons-container');
btnContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flex-wrap');
const audioPing = document.querySelector('.audio-ping');
const audioPong = document.querySelector('.audio-pong');
const scoreDisplay = document.querySelector('.score-display');
const playSound = document.querySelector('.play-sound');
const teacher = document.querySelector('.nadav-avatar');
const instructions = document.querySelector('.instructions');
const gotItBtn = document.querySelector('.got-it-btn');
const chooseSoundsLangContainer = document.querySelector('.choose-sounds-language-container');
const chooseSoundsLang = document.querySelector('.choose-sounds-language');
const chooseABC = document.querySelector('.abc');
const chooseDoReMi = document.querySelector('.do-re-mi');
const doOrC = document.querySelectorAll('.do-or-c');
const playC = document.querySelector('.c-reference');
const closeInstructions = document.querySelector('.close-instructions');
const instructionContainer = document.querySelector('.instructions-container');
const pointingFinger = document.querySelector('.finger');
const changeToDutch = document.querySelector('.dutch');
const changeToEnglish = document.querySelector('.english');
const changeToHebrew = document.querySelector('.hebrew');
const amountOfSoundsBtnContainer = document.querySelector('.sound-buttons-container');
const amountOfSoundsFromUser = document.querySelector('.amount-of-sounds');
const gameOverContainer = document.querySelector('.game-over-container');
const result = document.querySelector('.result');
const restartBtn = document.querySelector('.restart-btn');
const highestScoreElement = document.querySelector('.highest-score');
const highestScoreDisplay = document.querySelector('.highest-score-display');
const changeNrOfNotesBtn = document.querySelector('.change-note-nr');
const fullScreenBtn = document.querySelector('.full-screen');
let amountOfSounds = 3;
let amountOfChromaticSounds = 1;
let amountOfSoundsButtonElements = [];
let sounds = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
let soundsIt = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
let chromaticABC = ['a', 'a+', 'b', 'c', 'c+', 'd', 'd+', 'e', 'f', 'f+', 'g', 'g+'];
let chromaticABCText = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
let chromaticDoReMi = ['do', 'do+', 're', 're+', 'mi', 'fa', 'fa+', 'sol', 'sol+', 'la', 'la+', 'si'];
let chromaticDoReMiText = ['do', 'do#', 're', 're#', 'mi', 'fa', 'fa#', 'sol', 'sol#', 'la', 'la#', 'si'];
let selectedSoundLang = [];
let soundButtons = [];
let chromaticSelected = false;
let randomSounds;
let randomChromaticSounds;
let randomSound;
let prevRandomSound;
let cOrDo = 'C';
let answer;
let score = 0;
let mistakes = 0;
let isGameOver = false;
let currentLanguage = 'english';
questionsCounter = 0;
scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;

//initialize localstore for hieghest score for the first game
(function () {
    if (window.localStorage.getItem("highest-score") === null) {
        window.localStorage.setItem("highest-score", '0');
    }
})();
let currentHighestScore = window.localStorage.getItem("highest-score");
console.log(currentHighestScore);
highestScoreElement.textContent = currentHighestScore;

//Utility function to replace classes. It gets three arrays for argumnets: elements to which classes need to be changed, all the classes to be removed,
// and all the classes to be added.
function replaceClasses(element, remove, add) {
    for (let i = 0; i < remove.length; i++) {
        element.classList.remove(remove[i]);
    }
    for (let j = 0; j < add.length; j++) {
        element.classList.add(add[j]);
    }
}

//Declaring a function to create the buttons. To be called later
function createSoundButtons(selectedSounds, btnText) {
    for (let i = 0; i < selectedSounds.length; i++) {
        let soundBtn = document.createElement('button');
        soundBtn.textContent = btnText[i];
        soundBtn.setAttribute('id', selectedSounds[i]);
        soundBtn.classList.add('btn', 'btn-blue', 'mx-3', 'mt-3', 'sound-button');
        soundButtons.push(soundBtn);
        btnContainer.appendChild(soundBtn);
    }
}

//Proceed from initial instructions to sound language choice
gotItBtn.addEventListener('click', () => {
    instructions.classList.add('d-none');
    gotItBtn.classList.add('d-none');
    replaceClasses(chooseSoundsLang, ['d-none'], ['d-block']);
    replaceClasses(chooseSoundsLangContainer, ['d-none'], ['d-block']);
});


// declaring a utility function for proceeding from sound language choice to number of sounds choice
function nextInstruction() {
    replaceClasses(chooseSoundsLang, ['d-block'], ['d-none']);
    replaceClasses(chooseSoundsLangContainer, ['d-block'], ['d-none']);
    replaceClasses(amountOfSoundsBtnContainer, ['d-none'], ['d-flex', 'flex-wrap', 'justify-content-center']);
    replaceClasses(amountOfSoundsFromUser, ['d-none'], ['d-block']);
    createSoundChoiceButtons();
}

// If user chooses 'ABC' - create ABC buttons and change dynamic text in play C section
chooseABC.addEventListener('click', () => {
    nextInstruction();
    selectedSoundLang = [...sounds];
    doOrC[0].textContent = "'C'";
    doOrC[1].textContent = "'C'";
});

// If user chooses 'DoReMi' - create DoReMi buttons and change dynamic text in play C section
chooseDoReMi.addEventListener('click', () => {
    nextInstruction();
    selectedSoundLang = [...soundsIt];
    doOrC[0].textContent = "'Do'";
    doOrC[1].textContent = "'Do'";
});

// Create buttons with numbers for the user to choose how many sounds should the training consist
function createSoundChoiceButtons() {

    //Create the buttons
    for (let i = 0; i < 5; i++) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-warning', 'mx-2', 'my-2');
        btn.setAttribute('id', `amount-of-sounds-btn-${amountOfSounds}`);
        btn.textContent = amountOfSounds;
        amountOfSoundsButtonElements.push(btn);
        amountOfSoundsBtnContainer.appendChild(btn);

        //Add event listeners to the buttons and modifying the sounds array according to the selected button
        amountOfSoundsButtonElements[i].addEventListener('click', () => {
            for (let j = 0; j < 7 - Number(btn.textContent); j++) {
                selectedSoundLang.pop();
            }
            //Clone selectedSoundLang to prevent repating random sound
            randomSounds = [...selectedSoundLang];

            //Proceeding to the next slide of the instructions - play C/Do
            replaceClasses(amountOfSoundsBtnContainer, ['d-flex'], ['d-none']);
            createSoundButtons(selectedSoundLang,selectedSoundLang);
            replaceClasses(amountOfSoundsFromUser, ['d-block'], ['d-none']);
            replaceClasses(playC, ['d-none'], ['d-block']);
            replaceClasses(closeInstructions, ['d-none'], ['d-block']);
        });

        //Counter for the button id and text content
        amountOfSounds++;
    }

    let chromaticOptionBtn = document.createElement('button');
    chromaticOptionBtn.classList.add('btn', 'btn-warning', 'mx-2');
    chromaticOptionBtn.textContent = 'Chromatic';
    amountOfSoundsBtnContainer.appendChild(chromaticOptionBtn);

    chromaticOptionBtn.addEventListener('click', () => {
        replaceClasses(amountOfSoundsBtnContainer, ['d-flex'], ['d-none']);
        replaceClasses(amountOfSoundsFromUser, ['d-block'], ['d-none']);
        replaceClasses(playC, ['d-none'], ['d-block']);
        replaceClasses(closeInstructions, ['d-none'], ['d-bloTk']);

        if (selectedSoundLang.includes('do')) {
            createSoundButtons(chromaticDoReMi, chromaticDoReMiText);
            randomChromaticSounds = [...chromaticDoReMi];
        } else {
            createSoundButtons(chromaticABC,chromaticABCText);
            randomChromaticSounds = [...chromaticABC];
        }
        chromaticSelected = true;
    });
}

function createChromaticButtons(selectedChromaticButtons) {
    for (let i = 0; i < selectedChromaticButtons.length; i++) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-warning', 'mx-2');
        btn.setAttribute('id', `amount-of-sounds-btn-${amountOfChromaticSounds}`);
        btn.textContent = amountOfSounds;
        amountOfSoundsButtonElements.push(btn);
        amountOfSoundsBtnContainer.appendChild(btn);
    }
}

// Play C/Do and initialize training
closeInstructions.addEventListener('click', playCAndInitialize);

function playCAndInitialize() {
    audioPing.src = 'music/c.mp3';
    audioPing.play();
    replaceClasses(playSound, ['d-none'], ['d-block']);
    setTimeout(initializeTraining, 2000);
};


//Close instructions container and point to strat training btn
function initializeTraining() {
    replaceClasses(instructionContainer, ['d-flex'], ['d-none']);
    replaceClasses(pointingFinger, ['d-none'], ['d-block']);

    //Start the training
    playSound.addEventListener('click', playRandomSound);
    playSound.classList.add('scale-btn');
};


function playRandomSound() {
    //remove pointing finger
    replaceClasses(pointingFinger, ['d-block'], ['d-none']);
    replaceClasses(playSound, ['d-block'], ['d-none']);

    //Event listeners for buttons and keys are initialized only after 'start training' btn was pressed
    createEventListeners();

    // Check if the chromatic option was selected
    if (chromaticSelected) {
        //remove the previous random note to prevent repetition
        randomChromaticSounds.splice(randomChromaticSounds.indexOf(prevRandomSound), 1);
        //generate a random note
        randomSound = randomChromaticSounds[Math.floor(Math.random() * randomChromaticSounds.length)];
        //Assign the previous note with the newly generated random note so it will not be generated in the next round
        prevRandomSound = randomSound;
        //Check if the DoReMi chromatic option was selected and restore the original clone
        if (selectedSoundLang.includes('do')) randomChromaticSounds = [...chromaticDoReMi];

        //If DoReMi chromatic option was not selected, it must be the ABC Chromatic option that was selected
        else randomChromaticSounds = [...chromaticABC];

        //If a chromatic option was not selected, create diatonic sounds
    } else {
        //remove the previous random note to prevent repetition
        randomSounds.splice(randomSounds.indexOf(prevRandomSound), 1);
        //generate a random note
        randomSound = randomSounds[Math.floor(Math.random() * randomSounds.length)];
        //Assign the previous note with the newly generated random note so it will not be generated in the next round
        prevRandomSound = randomSound;
        //Restore the original clone
        randomSounds = [...selectedSoundLang];
    }

    // set default avatar
    teacher.src = 'images/neutral.png';

    // play random sound
    audioPing.src = `music/${randomSound}.mp3`;
    audioPing.play();

    // Set default btn color
    for (let i = 0; i < soundButtons.length; i++) {
        soundButtons[i].classList.remove('btn-success', 'btn-danger');
        soundButtons[i].classList.add('btn-blue');
    }

    //set dynamic score display
    questionsCounter++
    scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
}

// declare the event listeners for btns
function createEventListeners() {
    for (let i = 0; i < soundButtons.length; i++) {
        soundButtons[i].addEventListener('click', checkBtnAnswer);
    }
}

// Check user's answer submitted from buttons
function checkBtnAnswer(e) {
    answer = e.target.id;
    let correspondingBtn = document.getElementById(answer);
    if (answer == randomSound) {
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        replaceClasses(correspondingBtn, ['btn-blue'], ['btn-success']);
        // audioPong.src = "music/success.mp3";
        audioPong.src = `music/${answer}.mp3`;
        audioPong.play();

    } else {
        console.log('Wrong answer');
        replaceClasses(correspondingBtn, ['btn-blue'], ['btn-danger']);
        let correctBtn = document.getElementById(randomSound);
        replaceClasses(correctBtn, ['btn-blue'], ['btn-success']);
        teacher.src = 'images/angry.png';
        // audioPong.src = "music/fail.mp3";
        audioPong.src = `music/${answer}.mp3`;
        audioPong.play();
        mistakes++
        checkGameOver();
    }
    console.log(answer);

    //After 1 second play another random sound
    if (!isGameOver) {
        setTimeout(playRandomSound, 1500);
    }
}


//Translate to Dutch
changeToDutch.addEventListener('click', function () {
    currentLanguage = 'dutch';
    playSound.textContent = "Begin oefening";
    instructions.innerHTML = `Welkom bij EARPONG! <br>
    Ik ben Nadav, jouw virtuele ear-training meester 🤓 <br>
    In deze oefening, ga ik een noot voor je spelen, en jij moet heel goed luisteren en de noot proberen te herkenen. <br>
    Als jij weet welke noot ik heb gespeeld, druk dan het knopje met de juiste naam op. <br>
    Ben je er klaar voor?!`;
    gotItBtn.textContent = "Snap ik!";
    chooseSoundsLang.textContent = "Zullen we 'ABC' of 'Do-Re-Mi gebruiken?";
    playC.innerHTML = `Nu, luister maar heel goed, de eerste noot die ik ga spelen is: `;
    amountOfSoundsFromUser.textContent = "Hoveel noten will je oefenen?";
    highestScoreDisplay.innerHTML = `Je beste score is: <span class="highest-score">${currentHighestScore}</span>`;
});

//Translate back to English from Dutch
changeToEnglish.addEventListener('click', function () {
    currentLanguage = 'english';
    playSound.textContent = "Start training";
    instructions.innerHTML = `Welcome to EARPONG! <br>
    I'm Nadav! your virtual ear-training teacher 🤓 <br>
    Our training will work like this: <br>
    I will play a sound, and you have to recognize which sound I have played. <br>
    When you think you know which sound I played, either simply press the button <br>
    with the name of sound on it, or use the keyboard keys! <br>
    Are you ready?!`;
    gotItBtn.textContent = "Got it!";
    chooseSoundsLang.textContent = "Are you an 'A B C' or 'Do Re Mi' kind of musician?";
    playC.innerHTML = `I will now play the note ${cOrDo} for you to have a reference `;
    amountOfSoundsFromUser.textContent = "How many sounds would you like your practice to consist?";
    highestScoreDisplay.innerHTML = `your highest score is: <span class="highest-score">${currentHighestScore}</span>`;
});

//If the user made 5 mistakes, the game is over
function checkGameOver() {
    if (mistakes === 5) {
        isGameOver = true;
        console.log(currentLanguage);
        replaceClasses(gameOverContainer, ['d-none'], ['d-flex']);

        //removing eventListeners from the exercised sound buttons
        let existingSoundBtns = document.querySelectorAll('.sound-button');
        existingSoundBtns.forEach(soundBtn => {
            soundBtn.removeEventListener('click', checkBtnAnswer);
        });

        //Feedback according to score, modifyable between English and Dutch
        if (score < 5) {
            if (currentLanguage == 'english') {
                result.innerHTML = `Game over<br>Your score is ${score}. Keep practicing!`;
            } else if (currentLanguage == 'dutch') {
                result.innerHTML = `Game over<br>Jouw score is ${score}. Nog meer oefenen!`;
            }
        } else if (score < 10) {
            if (currentLanguage == 'english') {
                result.innerHTML = `Game over<br>Not bad! Your score is ${score}. Keep practicing!`;
            } else if (currentLanguage == 'dutch') {
                result.innerHTML = `Game over<br>Best goed! Jouw score is ${score}. Nog meer oefenen!`;
            }
        } else {
            if (currentLanguage == 'english') {
                result.innerHTML = `Game over<br>Well done! Your score is ${score}! You're a pro!`;
            } else if (currentLanguage == 'dutch') {
                result.innerHTML = `Game over<br>Goed gedaan! Jouw score is ${score}! Je bent een echte pro!`;
            }

        }
        storeHighestScore();
    }
}

//restarting functionality after game over
restartBtn.addEventListener('click', () => {
    restart();
    replaceClasses(instructionContainer, ['d-none'], ['d-flex']);
    replaceClasses(playC, ['d-none'], ['d-block']);
    replaceClasses(closeInstructions, ['d-none'], ['d-block']);
    highestScoreDisplay.classList.remove('new-high-score');
    isGameOver = false;
});

//Allow the user to change the number of exercised sounds after game over
changeNrOfNotesBtn.addEventListener('click', () => {
    restart();
    selectedSoundLang.includes("do") ? selectedSoundLang = [...soundsIt] : selectedSoundLang = [...sounds];
    replaceClasses(instructionContainer, ['d-none'], ['d-flex']);
    replaceClasses(playC, ['d-block'], ['d-none']);
    replaceClasses(amountOfSoundsBtnContainer, ['d-none'], ['d-flex', 'flex-wrap', 'justify-content-center']);
    replaceClasses(amountOfSoundsFromUser, ['d-none'], ['d-block']);
    replaceClasses(closeInstructions, ['d-block'], ['d-none']);
    removeExistingSoundBtns();
});

//Resetting initial values for restarting game
function restart() {
    score = 0;
    mistakes = 0;
    questionsCounter = 0;
    replaceClasses(gameOverContainer, ['d-flex'], ['d-none']);
    isGameOver = false;
}

//If the player reached a score higher than the one stored in localStorage, store the new high score
function storeHighestScore() {
    if (score > currentHighestScore) {
        window.localStorage.setItem("highest-score", score);
        highestScoreElement.textContent = score;
        highestScoreDisplay.classList.add('new-high-score');
    }
}

//Remove existing sound button for the user to modify the number of of sound buttons after game over
function removeExistingSoundBtns() {
    let existingSoundBtns = document.querySelectorAll('.sound-button');
    existingSoundBtns.forEach(soundBtn => {
        soundBtn.remove();
    });
};

// fullScreenBtn.addEventListener("click", function () {
//     toggleFullScreen();

// }, false);

// function toggleFullScreen() {
//     if (!document.fullscreenElement) {
//         document.documentElement.requestFullscreen();
//         fullScreenBtn.textContent = "Exit Full Screen";
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//             fullScreenBtn.textContent = "Full Screen";
//         }
//     }
// }