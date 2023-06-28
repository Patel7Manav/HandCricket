let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let state; //0 for player bowl and 1 for bat
let innings=1;

flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  if(i){
      setTimeout(function(){
          coin.style.animation = "spin-heads 3s forwards";
      }, 100);
  }
  else{
      setTimeout(function(){
          coin.style.animation = "spin-tails 3s forwards";
      }, 100);
  }
  disableButton();
   setTimeout(loadToss,3000,i);
});

let selectedButton = null;

function selectButton(buttonIndex) {
  // Deselect the previously selected button, if any
  if (selectedButton !== null) {
    selectedButton.classList.remove('selected');
  }
  if(buttonIndex==1)
  state=1;
  else 
  state=0;
  const button = document.querySelector('.tossres:nth-child(' + buttonIndex + ')');
  button.classList.add('selected');
  selectedButton = button;
}

function loadToss(tossval){
  let cval=Math.floor(Math.random() * 2);
  document.querySelector("#TossResult").style.visibility="visible";
  if(tossval == cval)
  {
    let cchoice= Math.floor(Math.random() * 2);
    if(cchoice==1)
    {
      document.querySelector("#TossResult").innerText=`Computer has won the toss and decided to bat first`;
      state=0;
    }
    else
    {
      document.querySelector("#TossResult").innerText=`Computer has won the toss and decided to bowl first`;
      state=1;
    }
  }
  else
  {
    document.querySelector("#Tosswin").style.visibility="visible";
  }
  document.querySelector("#startMatch").style.visibility="visible";
}

function closetut(){
  document.querySelector("#Tutorial").style.visibility="hidden";
}

function disableButton(){
  flipBtn.disabled = true;
}

function opentut(){
  document.querySelector("#Tutorial").style.visibility="visible";
}

function tosstime(){
  document.querySelector(".homepage").style.visibility= "hidden";
}

const buttons = document.getElementsByClassName('gestures');
// Function to disable all buttons
function disableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

// Function to enable all buttons
function enableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

function loadmatchscreen(){
  document.querySelector(".container").style.visibility="hidden";
  document.querySelector(".header").style.visibility="visible";
  document.querySelector(".main").style.visibility="visible";
  document.querySelector("#Condition").style.visibility="visible";
  document.querySelector("#Tosswin").style.visibility="hidden";
  document.querySelector("#TossResult").style.visibility="hidden";
  document.querySelector("#startMatch").style.visibility="hidden";
}

let runs=0;
let balls=0;
let wickets=0;
let cruns=0, cballs=0, cwickets=0;

function numtostr(x)
{
    if(x==1)
    return "one";
    else if(x==2)
    return "two";
    else if(x==3)
    return "three";
    else if(x==4)
    return "four";
    else
    return "six";
}

function Runs(playerShot){
    if(state==0)
    cballs++;
    else
    balls++;
    let computerShot=5;
    while(computerShot==5){
        computerShot=Math.floor(Math.random()*6)+1;
    }
    if(playerShot == computerShot)
    {
        document.querySelector("#CurrentScore").innerHTML="OUT!";
        if(state==0)
        { cwickets++;
          document.querySelector("#ComWkt").innerHTML=cwickets;
        }
        else
        { wickets++;
        document.querySelector("#BatWkt").innerHTML=wickets;
        }
    }
    else{
        if(state==1)
        {runs+=playerShot; 
        document.querySelector("#CurrentScore").innerHTML=playerShot;
        document.querySelector("#BatRun").innerHTML=runs;
        }
        else
        {
        cruns+=computerShot; 
        document.querySelector("#CurrentScore").innerHTML=computerShot;
        document.querySelector("#ComRun").innerHTML=cruns;
        }

    }
    if(state==1)
    document.querySelector("#BatBalls").innerHTML=balls;
    else
    document.querySelector("#ComBalls").innerHTML=cballs;
    BackColor(playerShot);
    BackColorComp(computerShot);
    disablebuttons(2000);
    setTimeout(RemoveColor,2000,playerShot);   
    setTimeout(RemoveColorComp,2000,computerShot);
    if(innings==2)
    {
      if(state==1)
      {
        if(runs>cruns)
        inningsbreak();
      }
      else
      {
        if(cruns>runs)
        inningsbreak();
      }
    }
    if(state==0)
    {
      if(cballs==30 || cwickets==1)
      { state=1;
        inningsbreak();
      }
    }
    else
    { 
      if(balls==30 || wickets==1)
      { state=0;
        inningsbreak();
      }
    }
}

function inningsbreak(){
if(innings==1)
{
  innings=2;
  disablebuttons(5000);
  document.querySelector("#Condition").innerText="Innings Break!!";
}
else{
  document.addEventListener("click", handler, true);  
function handler(e) {
  e.stopPropagation();
  e.preventDefault();
}
  if(cruns>runs)
  document.querySelector("#Condition").innerText="Computer Wins!!";
  else if(runs>cruns)
  document.querySelector("#Condition").innerText="Player Wins!!";
  else 
  document.querySelector("#Condition").innerText="Match Tied!!";
}
}

function BackColor(x){
   let shot=numtostr(x);
   let obj= document.getElementById(shot);
   obj.style.backgroundColor = "white";
}

function BackColorComp(x){
    let shot= numtostr(x);
    let obj= document.getElementById(shot+"C");
    obj.style.backgroundColor = "white";
}

function RemoveColor(x)
{
    let shot=numtostr(x);
   let obj= document.getElementById(shot);
   obj.style.backgroundColor = "black";
}

function RemoveColorComp(x)
{
    let shot=numtostr(x);
   let obj= document.getElementById(shot+"C");
   obj.style.backgroundColor = "black";
}

function disablebuttons(tim)
{   
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    const button = this;
    
    // Disable the button
    disableButtons();
    
    setTimeout(function() {
      enableButtons();
    }, tim); 
  });
}
}