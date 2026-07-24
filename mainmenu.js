const buttons = document.querySelector('.startbutton');
const easy = document.querySelector('.easy')
const medium = document.querySelector('.medium')
const hard = document.querySelector('.hard')
const trashcan = document.querySelector('.trashcan')

let seconds = 2;

buttons.addEventListener('click',start);
easy.addEventListener('click',difficultyfunction);
hard.addEventListener('click',difficultyfunction);
medium.addEventListener('click',difficultyfunction);
trashcan.addEventListener('click',trashcanfunc);

function trashcanfunc(){
    localStorage.clear();
    document.querySelector(".trashcantext").style.display = "flex";
    setTimeout(() => {
    document.querySelector(".trashcantext").style.display = "none";
    }, 2000);
}

function countdown(){
    const timer = document.getElementById('countdowntimer');
    const secs = String(seconds %60).padStart(2,'0');
    timer.textContent=` ${secs}`;
        if(seconds > 0){
        seconds --;
    }
}

let difficulty = parseInt(localStorage.getItem('setdifficulty')) || 1;
let timelimit = parseInt(localStorage.getItem('timemaxlimit')) || 30;
let gamemode = (localStorage.getItem('setgamemode')) || `./easygame.html`;

function difficultyfunction(){
    if (difficulty === 1){
        difficulty = 2;
        timelimit = 30;
        gamemode = `./easygame.html`;
    }else if(difficulty === 2){
        timelimit = 40;
        gamemode = `./mediumgame.html`;
        difficulty = 3;
    }else if (difficulty === 3){
        timelimit = 50;
        difficulty = 1;
        gamemode = `./hardgame.html`;
    }
    localStorage.setItem('timemaxlimit', timelimit);
    localStorage.setItem('setdifficulty', difficulty);
    localStorage.setItem('setgamemode', gamemode);
    timelimit = parseInt(localStorage.getItem('timemaxlimit'));
    console.log('difficulty = ', difficulty);
    console.log('timelimit = ', timelimit);
    console.log('Gamemode = ',gamemode);
    displayDifficulty();
}

function start(){  
    document.querySelector(".startbutton").style.display = "none";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".easy").style.display = "none";
    document.querySelector(".medium").style.display = "none";
    document.querySelector(".hard").style.display = "none";
    document.querySelector(".trashcan").style.display = "none";
    document.querySelector(".easytxt").style.display = "none";
    document.querySelector(".mediumtxt").style.display = "none";
    document.querySelector(".hardtxt").style.display = "none";
    document.querySelector(".countdown").style.display = "flex";
     
    setTimeout(() => {
    window.location.href = gamemode;
    }, 3000);

    setInterval(countdown,1000);

}

function displayDifficulty(){
    if (timelimit === 30){
        document.querySelector(".easy").style.display = "flex";
        document.querySelector(".medium").style.display = "none";
        document.querySelector(".hard").style.display = "none";
        document.querySelector(".easytxt").style.display = "flex";
        document.querySelector(".mediumtxt").style.display = "none";
        document.querySelector(".hardtxt").style.display = "none";
    }else if(timelimit === 40){
        document.querySelector(".easy").style.display = "none";
        document.querySelector(".medium").style.display = "flex";
        document.querySelector(".hard").style.display = "none";
        document.querySelector(".easytxt").style.display = "none";
        document.querySelector(".mediumtxt").style.display = "flex";
        document.querySelector(".hardtxt").style.display = "none";
    }else if (timelimit === 50){
        document.querySelector(".easy").style.display = "none";
        document.querySelector(".medium").style.display = "none";
        document.querySelector(".hard").style.display = "flex";
        document.querySelector(".easytxt").style.display = "none";
        document.querySelector(".mediumtxt").style.display = "none";
        document.querySelector(".hardtxt").style.display = "flex";
    }
}
        console.log('difficulty = ', difficulty);
        console.log('timelimit = ', timelimit);
        console.log('Gamemode = ',gamemode);

displayDifficulty();