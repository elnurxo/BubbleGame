let startGameBtn = document.querySelector(".start-game");
let endGameBtn = document.querySelector(".end-game");
let fullNameInput = document.querySelector(".full-name");
let scoreBoardTable = document.querySelector("tbody");
let box = document.querySelector('.box');
let currentPlayerScore = document.querySelector(".playerCurrentScore");
let PlayerScore = 0;
let gameModes = document.querySelectorAll('input[name="gameLevel"]');
let easyMode = document.querySelector("#easyLevel");

//Writing Score Board Every Time When Page Loads
ScoreBoardView();

//Input Keyup Event
fullNameInput.addEventListener("keyup",function(){
    if (this.value=="") {
        startGameBtn.setAttribute('disabled','');
    }
    else{
        startGameBtn.removeAttribute('disabled','');
    }
});

//Level Change Event
gameModes.forEach((mode)=>{
    mode.addEventListener("change",function(){
        if (mode.id == "easyLevel") {
            document.body.style.background = "rgba(255, 105, 180, 0.171)";;
        }
        else if (mode.id == "medLevel") {
            document.body.style.background = "rgba(230, 71, 150, 0.245)";
        }
        else if (mode.id == "godLevel") {
            document.body.style.background = " rgba(249, 34, 141, 0.338)";
        }     
    });
})

//Start Button Click Event
startGameBtn.addEventListener("click",function(){
    let selectedMode;
    for (const mode of gameModes) {
        if (mode.checked) {
            selectedMode = mode.id;
            break;
        }
    }
    if (selectedMode==undefined) {
        selectedMode = easyMode.id;
        easyMode.checked = true;
    }

    this.setAttribute('disabled','disabled');
    fullNameInput.setAttribute('disabled','');
    endGameBtn.removeAttribute('disabled','');
    gameModes.forEach((mode)=>{
        mode.setAttribute('disabled','disabled');
    })

    var gameStartSound = new Audio("./assets/gameBGM.mp3");
    gameStartSound.play();
    gameStartSound.loop = true;
    PlayerScore = 0;
    currentPlayerScore.textContent = "";
    let StartGame =  setInterval(() => {
        if (selectedMode=="easyLevel") {
            CreateBubble(55,55,3500,10);
        }
        else if(selectedMode=="medLevel"){
            CreateBubble(35,35,2000,20);
        }
        else if(selectedMode=="godLevel"){
            CreateBubble(20,20,1000,30);
        }
      }, 1000);
    
    //End Game Button Click Event
    endGameBtn.addEventListener("click",function(){
        endGameBtn.setAttribute('disabled','disabled');
        clearInterval(StartGame);
        gameStartSound.pause();
        var audio = new Audio("./assets/gameOver.mp3");
        audio.play();
        gameModes.forEach((mode)=>{
            mode.removeAttribute('disabled','disabled');
        })
    


        if (fullNameInput.value!="") {
            AddPlayer(fullNameInput.value,currentPlayerScore.textContent);
        }

        ScoreBoardView();
        
        fullNameInput.removeAttribute('disabled');
        fullNameInput.value = "";
        currentPlayerScore.textContent = "";
        fullNameInput.value = "";   
        box.innerHTML = "";
    });

});

function CreateScoreBoard(id,name,score){
    let playerNo = document.createElement('td');
    playerNo.setAttribute('scope','row');
    playerNo.textContent = scoreBoardTable.children.length+1;

    let playerName = document.createElement('td');
    playerName.textContent = name;

    let playerScore = document.createElement('td');
    playerScore.textContent = score;

    let playerRow = document.createElement('tr');
    playerRow.id = id;
    playerRow.append(playerNo,playerName,playerScore);
    scoreBoardTable.append(playerRow);

    return playerScore;
}

function CreateBubble(bubbleHeight,bubbleWidth,bubbleShowTime,ScoreIncrease){
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    box.append(bubble);
    bubble.style.left = `${Math.floor(Math.random() * 94)}%`;
    bubble.style.top = `${Math.floor(Math.random() * 94)}%`;
    bubble.style.width = `${bubbleHeight}px`;
    bubble.style.height = `${bubbleWidth}px`;
    bubble.style.background = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setInterval(() => {
        bubble.remove();   
    }, bubbleShowTime);
    
    bubble.addEventListener("click",function(){
        var audio = new Audio("./assets/bubblePop.mp3");
        audio.play();

        bubble.remove();
        PlayerScore += ScoreIncrease;
        currentPlayerScore.textContent = PlayerScore;
    })
}

function AddPlayer(name,score)
{
    let players = JSON.parse(localStorage.getItem("players"));
    if (players==null) { players = []; }

    if (score=="") {
        score = 0;
    }
        players.push({
            id:players.length+1, 
            name:name, 
            score:Number(score), 
        })

    localStorage.setItem("players",JSON.stringify(players));
}

function ScoreBoardView(){
    let players = JSON.parse(localStorage.getItem('players'));
    scoreBoardTable.innerHTML = "";
    if (players!=null) {
        players.sort((a, b) => {
            return b.score - a.score;
        });
        for (let i = 0; i < players.length; i++) 
        {
            CreateScoreBoard(players[i].id,players[i].name,players[i].score);
        }
    }
}
