let startGameBtn = document.querySelector(".start-game");
let endGameBtn = document.querySelector(".end-game");
let fullNameInput = document.querySelector(".full-name");
let scoreBoardTable = document.querySelector("tbody");
let box = document.querySelector('.box');


fullNameInput.addEventListener("keyup",function(){
    if (this.value=="") {
        startGameBtn.setAttribute('disabled','');
        endGameBtn.setAttribute('disabled','');
    }
    else{
        startGameBtn.removeAttribute('disabled','');
        endGameBtn.removeAttribute('disabled','');
    }
});

startGameBtn.addEventListener("click",function(){
    this.setAttribute('disabled','disabled');

    CreatePlayer();

    setInterval(() => {
        CreateBubble();
      }, 1500);

});

function CreatePlayer(){
    let playerNo = document.createElement('td');
    playerNo.setAttribute('scope','row');
    playerNo.textContent = scoreBoardTable.children.length+1;

    let playerName = document.createElement('td');
    playerName.textContent = fullNameInput.value;

    let playerScore = document.createElement('td');
    playerScore.textContent = 0;

    let playerRow = document.createElement('tr');
    playerRow.append(playerNo,playerName,playerScore);
    scoreBoardTable.append(playerRow);
}

function CreateBubble(){

    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    box.append(bubble);
    bubble.style.left = `${Math.floor(Math.random() * 94)}%`;
    bubble.style.top = `${Math.floor(Math.random() * 94)}%`;
    bubble.style.width = '40px';
    bubble.style.height = '40px';
    bubble.style.background = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setInterval(() => {
        bubble.remove();    
      }, 5000);

    bubble.addEventListener("click",function(){
        bubble.remove();
        playerScore.textContent += 50;
    })
}