let gameSeq = [];
let userSeq = [];

let started = false;
let gamePlay = false;
let level = 0;
let idx;
let btns = ["pink", "blue", "yellow", "purple"];

let h2 = document.querySelector("h2");
let feedback = document.querySelector("#feedback");

document.addEventListener("keypress", startGame);

function gameBegin() {
    started = false;
    document.addEventListener("keypress", startGame);
    gameSeq = [];
    userSeq = [];
}

function startGame() {
    if (started == false){
        // console.log("game is started");
        feedback.innerText = "Play";
        started = true;

        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3) + 1;
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);


    gameFlash(randBtn);
    // play = true;

}

function checkSeq(idx) {
    // console.log("curr level :", level);
    // idx = level - 1;

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 750);
        }
    } 
    else{
        h2.innerHTML = `Game Over! <b>Your score is ${level -1}.<b> <br> Press any key to start.`;
        if(level - 1 >= 3){
            feedback.innerText = "Congrats! You make good score. ";
        }
        else{
            feedback.innerText = "ohh shit! well tried. keep it up. ";
        }
        level = 0;
        gameBegin();
    }
}

function btnPress () {
    let btn = this;
    // console.log(this);
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);
    checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}