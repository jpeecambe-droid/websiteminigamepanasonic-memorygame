const card = document.querySelectorAll('.memorycard');
card.forEach(card =>{
        let randnum = Math.floor(Math.random()*20);
        card.style.order = randnum;
    });

let timelimit = parseInt(localStorage.getItem('timemaxlimit')) || 30;

let hasflipped = false;


let firstcard,secondcard;
let lockboard = false;
let seconds = timelimit - 1;
let timerInterval;
let checkwinnumber = 10;

const restartbutton = document.querySelector('.restartbutton');
restartbutton.addEventListener('click', mainmenu);

function mainmenu(){  
window.location.href = `./index.html`; 
}

if (timelimit === 30){
    checkwinnumber = 5;
    document.querySelectorAll('.memorycard').forEach(c => c.style.height = '32%');
}else if (timelimit === 40){
    checkwinnumber = 10;
    document.querySelectorAll('.memorycard').forEach(c => c.style.height = '24%');
}else if (timelimit === 50){
    checkwinnumber = 15;
    document.querySelectorAll('.memorycard').forEach(c => c.style.height = '19%');
}


function flipCard(){
    if (lockboard) return;
    this.classList.toggle('flip');
    if(!hasflipped){
        console.log("flipped")
        hasflipped = true;
        firstcard = this;
        firstcard.removeEventListener('click',flipCard);
    }else{
        firstcard.addEventListener('click',flipCard);
        hasflipped = false;
        secondcard = this;
    if (firstcard.dataset.framework === secondcard.dataset.framework){
        firstcard.removeEventListener('click',flipCard);
        secondcard.removeEventListener('click',flipCard);
        firstcard.classList.add('matched');
        secondcard.classList.add('matched');
        checkWin();
    }else{
        lockboard = true;
        setTimeout(()=>{
        firstcard.classList.remove('flip')
        secondcard.classList.remove('flip')
        lockboard= false;
        },500)
        }
    }
}

function checkWin() {
    const allCards = document.querySelectorAll('.memorycard');
    const matchedCards = document.querySelectorAll('.memorycard.matched');

    if (allCards.length === matchedCards.length) {
        if(seconds >= 10){
    document.querySelector('.grandvictory').style.display = 'flex';
    lockboard = true;
    clearInterval(timerInterval);
    }else{
    document.querySelector('.victoryscreen').style.display = 'flex';
    lockboard = true;
    clearInterval(timerInterval);        
}
    }        

}

function updatetimer(){
    const timer = document.getElementById('timelimit')
    timer.textContent=seconds;
    if(seconds > 0){
        seconds --;
    }else{
        document.querySelector('.gameoverscreen').style.display = 'flex';
        lockboard = true;

    }

}

timerInterval = setInterval(updatetimer,1000);
card.forEach(card => card.addEventListener('click',flipCard));              