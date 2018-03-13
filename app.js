var start = document.querySelector('.start');
var screen = document.querySelectorAll('.screen');
var flagEl = document.querySelectorAll('.flag');
var livesEl = document.querySelectorAll('.lives img');
var time = document.querySelector('.time span');
var gameOver = document.querySelector('#game-over');
var restart = document.querySelector('#game-over button');
var country = document.querySelector('h2');
var flagImgs = document.querySelectorAll('.flag img');

var setIntervalId = null;
var counter;
var countryRandom;
var livesCounter;



//FUNCTION GAME OVER

function gameOverFunc() {
    gameOver.classList.add('is-open');
    clearInterval(setIntervalId);
}


// FUNCTIONS FLAGS

function generateFlags(){
    for (var i = 0; i < flagImgs.length; i++) {
        var num = Math.floor(Math.random() * flags.length);
        var flagCode = flags[num].code.toLowerCase();
        flagImgs[i].src = 'flags' + '/' + flagCode + '.svg';
        flagImgs[i].dataset.name = flags[num].name;
        flagImgs[i].parentNode.classList.remove('is-active');

    }
    countryRandom = Math.floor(Math.random() * flagImgs.length);
    country.innerText = flagImgs[countryRandom].dataset.name;

}

function isFlagCorrect() {
    if(this.parentNode.classList.contains('is-active')){
        return;
    }

    this.parentNode.classList.add('is-active');


    if(this === flagImgs[countryRandom]){
        setCounter(counter + 3);
        generateFlags();
    }

    else{
        setLives(livesCounter-1);
    }

}

// FUNCTIONS LIVES

function setLives(value){
    livesCounter = value;
    refreshLivesCounter();
    if(livesCounter === 0){
        gameOverFunc();
    }
}

function refreshLivesCounter() {
    for (var i = 0; i < livesEl.length; i++) {

       if(i < livesCounter){
           livesEl[i].classList.remove('is-active');
       }

       else{
           livesEl[i].classList.add('is-active');
       }
    }
}



// FUNCTIONS TIMER

function setCounter(value) {
   counter = value > 30 ? 30 : value;
   refreshCounter();
}

function refreshCounter() {
    if(counter > 0){
        time.innerHTML = counter;
    }

    else {

        gameOverFunc();
    }
}

function resetTimer() {

    setCounter(20);

    function timer(){

        setCounter(counter-1);


    }
    setIntervalId = setInterval(timer, 1000);

}


// FUNCTIONS START

function startGame() {
    screen[0].classList.remove('is-open');
    setLives(3);
    generateFlags();
    resetTimer();
}
start.addEventListener('click', startGame);

for (var i = 0; i < flagImgs.length; i++) {
    flagImgs[i].addEventListener('click', isFlagCorrect);

}

restart.addEventListener('click', function () {
    startGame();
    screen[1].classList.remove('is-open');

});

