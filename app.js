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
let amountOfSounds = 3;
let amountOfChromaticSounds = 1;
let chromaticSelected = false;
let amountOfSoundsButtonElements = [];
let sounds = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
let soundsIt = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
let soundsHeb = ['סי', 'לה', 'סול', 'פה', 'מי', 'רה', 'דו'];
let chromaticABC = ['a', 'a+', 'b', 'c', 'c+', 'd', 'd+', 'e', 'f', 'f+', 'g', 'g+'];
let chromaticDoReMo = ['do', 'do+', 're', 're+', 'mi', 'fa', 'fa+', 'sol', 'sol+', 'la', 'la+', 'si'];
let selectedSoundLang = [];
let soundButtons = [];
let randomSound = sounds[Math.floor(Math.random() * 7)];
let cOrDo = 'C';
let answer;
score = 0;
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

//Display the current highest score
  let currentHighestScore = window.localStorage.getItem("highest-score");
  console.log(currentHighestScore);
  highestScoreElement.textContent = currentHighestScore;

//Declaring a function to create the buttons. To be called later
function createSoundButtons(selectedSounds) {
    for (let i = 0; i < selectedSounds.length; i++) {
        let soundBtn = document.createElement('button');
        soundBtn.textContent = selectedSounds[i];
        soundBtn.setAttribute('id', selectedSounds[i]);
        soundBtn.classList.add('btn', 'btn-blue', 'mx-3', 'mt-3');
        soundButtons.push(soundBtn);
        btnContainer.appendChild(soundBtn);
    }
}

//Proceed from initial instructions to language choice
gotItBtn.addEventListener('click', () => {
    instructions.classList.add('d-none');
    gotItBtn.classList.add('d-none');
    chooseSoundsLang.classList.remove('d-none');
    chooseSoundsLang.classList.add('d-block');
    chooseSoundsLangContainer.classList.remove('d-none');
    chooseSoundsLangContainer.classList.add('d-block');
});


// declaring a slide transition to prevet code repeats. Proceeding from sound language choice to number of sounds choice
function nextInstruction() {
    chooseSoundsLang.classList.remove('d-block');
    chooseSoundsLang.classList.add('d-none');
    chooseSoundsLangContainer.classList.remove('d-block');
    chooseSoundsLangContainer.classList.add('d-none');
    amountOfSoundsBtnContainer.classList.remove('d-none');
    amountOfSoundsBtnContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center');
    amountOfSoundsFromUser.classList.remove('d-none');
    amountOfSoundsFromUser.classList.add('d-block');
    createSoundChoiceButtons();
}


// If user chooses 'ABC' - create ABC buttons and change dynamic text in play C section
chooseABC.addEventListener('click', () => {
    nextInstruction();
    selectedSoundLang = sounds;
    doOrC[0].textContent = "'C'";
    doOrC[1].textContent = "'C'";
});

// If user chooses 'DoReMi' - create DoReMi buttons and change dynamic text in play C section
chooseDoReMi.addEventListener('click', () => {
    nextInstruction();
    selectedSoundLang = soundsIt;
    doOrC[0].textContent = "'Do'";
    doOrC[1].textContent = "'Do'";
});

// Create buttons with numbers for the user to choose how many sounds should the training contain
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

            //Proceeding to the next slide of the instructions - play C/Do
            amountOfSoundsBtnContainer.remove();
            createSoundButtons(selectedSoundLang);
            amountOfSoundsFromUser.classList.remove('d-block');
            amountOfSoundsFromUser.classList.add('d-none');
            playC.classList.remove('d-none');
            playC.classList.add('d-block');
            closeInstructions.classList.remove('d-none');
            closeInstructions.classList.add('d-block');
        });

        //Counter for the button id and text content
        amountOfSounds++;
    }

    let chromaticOptionBtn = document.createElement('button');
    chromaticOptionBtn.classList.add('btn', 'btn-warning', 'mx-2');
    chromaticOptionBtn.textContent = 'Chromatic';
    amountOfSoundsBtnContainer.appendChild(chromaticOptionBtn);

    chromaticOptionBtn.addEventListener('click', () => {
        amountOfSoundsBtnContainer.remove();
        amountOfSoundsFromUser.classList.remove('d-block');
        amountOfSoundsFromUser.classList.add('d-none');
        playC.classList.remove('d-none');
        playC.classList.add('d-block');
        closeInstructions.classList.remove('d-none');
        closeInstructions.classList.add('d-block');

        if (selectedSoundLang.includes('do')) {
            createSoundButtons(chromaticDoReMo);
        } else {
            createSoundButtons(chromaticABC);
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
    playSound.classList.remove('d-none');
    playSound.classList.add('d-block');
    setTimeout(initializeTraining, 2000);
};



//Close instructions container and point to strat training btn
function initializeTraining() {
    instructionContainer.classList.remove('d-flex');
    instructionContainer.classList.add('d-none');
    pointingFinger.classList.remove('d-none');
    pointingFinger.classList.add('d-block');

    //Start training
    playSound.addEventListener('click', playRandomSound);
    playSound.classList.add('scale-btn');
};


function playRandomSound() {

    //remove pointing finger
    pointingFinger.classList.remove('d-block');
    pointingFinger.classList.add('d-none');
    playSound.classList.remove('d-block');
    playSound.classList.add('d-none');

    //Event listeners for buttons and keys are initialized only after 'start training' btn was pressed
    createEventListeners();
    document.addEventListener('keydown', control);

    //Generate random sound
    let randomSound;

    // Check if the chromatic option was selected
    if (chromaticSelected) {
        //Check if the DoReMi chromatic option was selected
        if (selectedSoundLang.includes('do')) {
            randomSound = chromaticDoReMo[Math.floor(Math.random() * chromaticDoReMo.length)];
            console.log(randomSound);
            //If not, it must be the ABC Chromatic option that was selected
        } else {
            randomSound = chromaticABC[Math.floor(Math.random() * chromaticABC.length)];
            console.log(randomSound);
        }

        //If a chromatic option was not selected, create diatonic sounds
    } else {
        randomSound = selectedSoundLang[Math.floor(Math.random() * selectedSoundLang.length)];
        console.log(randomSound);
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

    //set dynamic display of user score
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
    answer = e.target.innerText;

    if (chromaticSelected) {
        getPlayedSoundChromatic();
    } else {
        getPlayedSoundDiatonic();
    }
    //After 1 second play another random sound
    if (!isGameOver) {
        setTimeout(playRandomSound, 1000);
    }
}


//Get played sound if chromaticSelected = true //
function getPlayedSoundChromatic() {
    let audioPingSplit = audioPing.src.split("");
    console.log(audioPingSplit);
    // clone audioPingSplit to splice it for 'sol' without modifying original
    let audioPingSplitClone = [...audioPingSplit];
    let audioPingSplitClone2 = [...audioPingSplit];
    //Splicing for sol
    let sol = audioPingSplitClone.splice(audioPingSplitClone.length - 7, 3).join("");

    if (selectedSoundLang.includes('do')) {
        // let audioPingSplit = audioPing.src.split("");
        let solSharp = audioPingSplitClone2.splice(audioPingSplitClone2.length - 8, 4).join("");
        //Check if diatonic sol
        if (sol == 'sol') {
            var playedSound = 'sol';
            //Check if chromatic sol
        } else if (solSharp == 'sol+') {
            var playedSound = 'sol+';
            //Check if chromatic but not sol
        } else if (audioPingSplit.includes('+')) {
            var playedSound = audioPingSplit.splice(audioPingSplit.length - 7, 3).join("");
            //check if diatonic but not sol
        } else {
            var playedSound = audioPingSplit.splice(audioPingSplit.length - 6, 2).join("");
        }
        //If selected language is not DoReMi, it's ABC. Get played sound.
    } else {
        if (audioPingSplit.includes('+')) {
            var playedSound = audioPingSplit.splice(audioPingSplit.length - 6, 2).join("");
        } else {
            var playedSound = audioPingSplit.splice(audioPingSplit.length - 5, 1).join("");
        }
    }
    //Check if the played sound matches with the user's answer
    matchAnswerToPlayedSound(playedSound);
};

//Get played sound if chromaticSelected = false //
function getPlayedSoundDiatonic() {
    let audioPingSplit = audioPing.src.split("");
    console.log(audioPingSplit);
    // clone audioPingSplit to splice it for 'sol' without modifying original
    let audioPingSplitClone = [...audioPingSplit];
    //Splicing for sol
    let sol = audioPingSplitClone.splice(audioPingSplitClone.length - 7, 3).join("");
    //Check whether user selected 'ABC'
    if (selectedSoundLang == sounds) {
        //Get and parse the source of the played sound
        var playedSound = audioPingSplit.splice(audioPingSplit.length - 5, 1).join("");
    }
    //Check if user selected 'DoReMi'
    else if (selectedSoundLang == soundsIt) {
        let audioPingSplit = audioPing.src.split("");
        //Check if sol was played (sol is treated differently due to different char count (3 vs 2))
        if (sol == 'sol') {
            var playedSound = 'sol';
        } else {
            //If any other sounds was played
            var playedSound = audioPingSplit.splice(audioPingSplit.length - 6, 2).join("");
        }
    }
    //Check if the played sound matches with the user's answer
    matchAnswerToPlayedSound(playedSound);
};

//Function that checks whether the played sound matches with the user's answer
function matchAnswerToPlayedSound(playedSound) {
    let correspondingBtn = document.getElementById(answer);
    if (answer == playedSound) {
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
//         audioPong.src = "music/success.mp3";
        audioPong.src = `music/${answer}.mp3`;
        audioPong.play();

    } else {
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src = 'images/angry.png';
//         audioPong.src = "music/fail.mp3";
        audioPong.src = `music/${answer}.mp3`;
        audioPong.play();
        mistakes++
        checkGameOver();
    }
}


//setting keycodes for the user to submit answer with the keybaord
function control(e) {
    if (e.keyCode === 65) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 66) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 66) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 67) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 68) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 69) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 70) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    } else if (e.keyCode === 71) {
        let answer = e.key;
        checkKeyAnswer(answer);
        console.log(e.key);
    }
}

//Check the user's answer submitted through the keyboard. Works the same as checkBtnAnswer()
function checkKeyAnswer(answer) {
    let audioPingSplit = audioPing.src.split("");
    let playedSound = audioPingSplit.splice(audioPingSplit.length - 5, 1).join("");
    let correspondingBtn = document.getElementById(answer);
    if (answer == playedSound) {
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
        audioPong.src = "music/success.mp3";
        audioPong.play();
    } else {
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src = "images/angry.png";
        audioPong.src = "music/fail.mp3";
        audioPong.play();
    }
    setTimeout(playRandomSound, 1000);
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


// changeToHebrew.addEventListener('click', function(){
//     playSound.textContent = "!בוא נתחיל";
//     instructions.innerHTML = `Earpong ברוך הבא ל <br>
//     <br> 🤓 אני נדב, המורה הוירטואלי שלך לפיתוח שמיעה
//     <br> האימון שלנו הולך לעבוד כך: אני אנגן צליל, ועליך יהיה לזהות את הצליל

//     `;

//     gotItBtn.textContent = "Snap ik!";
//     chooseSoundsLang.remove();
//     playC.innerHTML = `Nu, luister maar heel goed, de eerste noot dat ik ga spelen is: `;
//     createSoundButtons(soundsHeb);
//     });

function checkGameOver() {
    if (mistakes === 5) {
        isGameOver = true;
        console.log(currentLanguage);
        gameOverContainer.classList.remove('d-none');
        gameOverContainer.classList.add('d-flex');
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

restartBtn.addEventListener('click', () => {
    score = 0;
    mistakes = 0;
    questionsCounter = 0;
    gameOverContainer.classList.remove('d-flex');
    gameOverContainer.classList.add('d-none');

    instructionContainer.classList.remove('d-none');
    instructionContainer.classList.add('d-flex');
    playC.classList.remove('d-none');
    playC.classList.add('d-block');
    closeInstructions.classList.remove('d-none');
    closeInstructions.classList.add('d-block');
    highestScoreDisplay.classList.remove('new-high-score');
    isGameOver = false;
});

//if user achieved highest score, store it in local storage and display it
function storeHighestScore(){
    // let currentHighestScore = window.localStorage.score;
    if(score > currentHighestScore){
        window.localStorage.setItem("highest-score", score);
        highestScoreElement.textContent = score;
        highestScoreDisplay.classList.add('new-high-score');
    }
}

