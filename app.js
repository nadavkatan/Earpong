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
let amountOfSounds = 3;
let amountOfSoundsButtonElements = [];
let sounds = ['c','d','e','f','g','a', 'b'];
let soundsIt = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
let soundsHeb = ['סי', 'לה', 'סול', 'פה' , 'מי' , 'רה' , 'דו'];
let selectedSoundLang=[];
let soundButtons = [];
let randomSound = sounds[Math.floor(Math.random()*7)];
let cOrDo = 'C';
score = 0;
questionsCounter = 0;
scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;


//Declaring a function to create the buttons. To be called later
function createSoundButtons(selectedSounds){
    for(let i=0; i<selectedSounds.length; i++){
        let soundBtn = document.createElement('button');
        soundBtn.textContent = selectedSounds[i];
        soundBtn.setAttribute('id', selectedSounds[i]);
        soundBtn.classList.add('btn', 'btn-blue', 'mx-3', 'mt-3');
        soundButtons.push(soundBtn);
        btnContainer.appendChild(soundBtn);
    }
}

//Proceed from initial instructions to language choice
gotItBtn.addEventListener('click', ()=>{
    instructions.classList.add('d-none');
    gotItBtn.classList.add('d-none');
    chooseSoundsLang.classList.remove('d-none');
    chooseSoundsLang.classList.add('d-block');
    chooseSoundsLangContainer.classList.remove('d-none');
    chooseSoundsLangContainer.classList.add('d-block');
});


 // declaring a slide transition to prevet code repeats. Proceeding from sound language choice to number of sounds choice
 function nextInstruction(){
     chooseSoundsLang.classList.remove('d-block');
     chooseSoundsLang.classList.add('d-none');
     chooseSoundsLangContainer.classList.remove('d-block');
     chooseSoundsLangContainer.classList.add('d-none');
     amountOfSoundsBtnContainer.classList.remove('d-none');
     amountOfSoundsBtnContainer.classList.add('d-block');
     amountOfSoundsFromUser.classList.remove('d-none');
     amountOfSoundsFromUser.classList.add('d-block');
     createSoundChoiceButtons();
 }


// If user chooses 'ABC' - create ABC buttons and change dynamic text in play C section
chooseABC.addEventListener('click', ()=>{
    nextInstruction();
    selectedSoundLang = sounds;
    doOrC[0].textContent="'C'";
    doOrC[1].textContent="'C'";
});

// If user chooses 'DoReMi' - create DoReMi buttons and change dynamic text in play C section
chooseDoReMi.addEventListener('click', ()=>{
    nextInstruction();
    selectedSoundLang = soundsIt;
    doOrC[0].textContent="'Do'";
    doOrC[1].textContent="'Do'";
});

// Create buttons with numbers for the user to choose how many sounds should the training contain
function createSoundChoiceButtons(){
    
    //Create the buttons
    for(let i=0; i < 5; i++){
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-warning', 'mx-2');
        btn.setAttribute('id', `amount-of-sounds-btn-${amountOfSounds}`);
        btn.textContent = amountOfSounds;
        amountOfSoundsButtonElements.push(btn);
        amountOfSoundsBtnContainer.appendChild(btn);
        
        //Add event listeners to the buttons and modifying the sounds array according to the selected button
        amountOfSoundsButtonElements[i].addEventListener('click', ()=>{
            for(let j=0; j< 7- Number(btn.textContent); j++){
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

}

// Play C/Do and initialize training
closeInstructions.addEventListener('click', ()=>{
    audioPing.src= 'music/c.mp3';
    audioPing.play();
    setTimeout(initializeTraining, 2000);
});
// });


//Close instructions container and point to strat training btn
function initializeTraining(){
    instructionContainer.classList.remove('d-flex');
    instructionContainer.classList.add('d-none');
    pointingFinger.classList.remove('d-none');
    pointingFinger.classList.add('d-block');

        //Start training
        playSound.addEventListener('click', playRandomSound);
        playSound.classList.add('scale-btn');
};


function playRandomSound(){

    //remove pointing finger
    pointingFinger.classList.remove('d-block');
    pointingFinger.classList.add('d-none');

    //Event listeners for buttons and keys are initialized only after 'start training' btn was pressed
    createEventListeners();
    document.addEventListener('keydown', control);

    //Generate random sound
    let randomSound = selectedSoundLang[Math.floor(Math.random()*selectedSoundLang.length)];
    console.log(randomSound);

    // set default avatar
    teacher.src = 'images/neutral.png';

    // play random sound
    audioPing.src = `music/${randomSound}.mp3`;
    audioPing.play();

    // Set default btn color
    for(let i=0; i<soundButtons.length; i++){
        soundButtons[i].classList.remove('btn-success', 'btn-danger');
        soundButtons[i].classList.add('btn-blue');
    }
    
    //set dynamic display of user score
    questionsCounter++
    scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
}

// declare the event listeners for btns
function createEventListeners(){
    for(let i=0; i< soundButtons.length; i++){
        soundButtons[i].addEventListener('click', checkBtnAnswer);
    }

}

// Check user's answer submitted from buttons
function checkBtnAnswer(e){
    let audioPingSplit = audioPing.src.split("");
    
    // clone audioPingSplit to splice it for 'sol' without modifying original
    let audioPingSplitClone = [...audioPingSplit];

    //Splicing for sol
    let sol = audioPingSplitClone.splice(audioPingSplitClone.length -7, 3).join("");

    //Check whether user selected 'ABC'
    if(selectedSoundLang == sounds){

    //Get and parse the source of the played sound
    var playedSound = audioPingSplit.splice(audioPingSplit.length -5, 1).join("");
    }
    
    //Check if user selected 'DoReMi'
    else if( selectedSoundLang == soundsIt){
        let audioPingSplit = audioPing.src.split("");

        //Check if sol was played (sol is treated differently due to different char count (3 vs 2))
        if(sol == 'sol'){
            var playedSound = 'sol';
        }else{

            //If any other sounds was played
            var playedSound = audioPingSplit.splice(audioPingSplit.length -6, 2).join("");
        }
    }

    //Get the user's answer
    let answer = e.target.innerText;
    let correspondingBtn = document.getElementById(answer);

    //Check if the sound played and user's answer match and react accordingly
    if(answer == playedSound){
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
        audioPong.src = "music/success.mp3";
        audioPong.play();

    }else{
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src = 'images/angry.png';
        audioPong.src = "music/fail.mp3";
        audioPong.play();
    }
    
    //After 1 second play another random sound
    setTimeout(playRandomSound, 1000);

}

//setting keycodes for the user to submit answer with the keybaord
function control(e){
    if(e.keyCode === 65){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 66){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 66){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 67){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 68){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 69){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 70){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
    else if(e.keyCode === 71){
        let answer = e.key;
        checkKeyAnswer(answer);
       console.log(e.key);
    }
}

//Check the user's answer submitted through the keyboard. Works the same as checkBtnAnswer()
function checkKeyAnswer(answer){
    let audioPingSplit = audioPing.src.split("");
    let playedSound = audioPingSplit.splice(audioPingSplit.length -5, 1).join("");
    let correspondingBtn = document.getElementById(answer);
    if(answer == playedSound){
        score++;
        scoreDisplay.textContent = `You recognized ${score} sounds out of ${questionsCounter}`;
        console.log('correct!');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-success');
        audioPong.src = "music/success.mp3";
        audioPong.play();
    }else{
        console.log('Wrong answer');
        correspondingBtn.classList.remove('btn-blue');
        correspondingBtn.classList.add('btn-danger');
        teacher.src="images/angry.png";
        audioPong.src = "music/fail.mp3";
        audioPong.play();
    }
    setTimeout(playRandomSound, 1000);
}

  //Translate to Dutch
  changeToDutch.addEventListener('click', function(){
    playSound.textContent = "Begin oefening";
    instructions.innerHTML = `Welkom bij EARPONG! <br>
    Ik ben Nadav, jouw virtuele ear-training meester 🤓 <br>
    In deze oefening, ga ik een noot voor je spelen, en jij moet heel goed luisteren en de noot proberen te herkenen. <br>
    Als jij weet welke noot ik heb gespeeld, druk dan het knopje met de juiste naam op. <br>
    Ben je er klaar voor?!`;
    gotItBtn.textContent = "Snap ik!";
    chooseSoundsLang.textContent = "Zullen we 'ABC' of 'Do-Re-Mi gebruiken?";
    playC.innerHTML = `Nu, luister maar heel goed, de eerste noot die ik ga spelen is: `;
    });

//Translate back to English from Dutch
changeToEnglish.addEventListener('click', function(){
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
