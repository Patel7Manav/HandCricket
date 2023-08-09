let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let state; //0 for player bowl and 1 for bat
let innings=1;
let foursixcounter=0;
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

let headline="";
let selectedButton = null;

function selectButton(buttonIndex) {
  // Deselect the previously selected button, if any
  if (selectedButton != null) {
    selectedButton.classList.remove('selected');
  }
  if(buttonIndex==1)
  {state=1;
  document.querySelector("#combat").style.display='none';
  }
  else 
  {state=0;
    document.querySelector("#playerbat").style.display='none';
  }
  const button = document.querySelector('.tossres:nth-child(' + buttonIndex + ')');
  button.classList.add('selected');
  selectedButton = button;
  document.querySelector("#matchbutton").disabled=false;
}

function loadToss(tossval){
  let cval=Math.floor(Math.random() * 2);
  document.querySelector("#TossResult").style.visibility="visible";
  if(tossval == cval)
  {
    let cchoice= Math.floor(Math.random() * 2);
    if(cchoice==1)
    {
      document.querySelector("#playerbat").style.display='none';
      document.querySelector("#TossResult").innerText=`Computer has won the toss and decided to bat first`;
      headline="Computer has won the toss and decided to bat first";
      state=0;
    }
    else
    {
      document.querySelector("#combat").style.display='none';
      document.querySelector("#TossResult").innerText=`Computer has won the toss and decided to bowl first`;
      headline="Computer has won the toss and decided to bowl first";
      state=1;
    }
  }
  else
  {
    document.querySelector("#Tosswin").style.display="block";
  }
  document.querySelector("#startMatch").style.visibility="visible";
  document.querySelector("#matchbutton").disabled=false;
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
  document.querySelector("#Tosswin").style.display="block";
  document.querySelector("#TossResult").style.visibility="hidden";
  document.querySelector("#startMatch").style.visibility="hidden";
  if(headline=="")
  {
    if(state==0)
    {
      headline="Player has won the toss and chose to bowl";
    }
    else
    {
      headline="Player has won the toss and chose to bat";
    }
  }
  document.querySelector("#Condition").innerText=headline;
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
    if(computerShot!=6 && computerShot!=4 && foursixcounter==3)
    {
      let randomno=Math.floor(Math.random()*2);
      if(randomno==0)
      computerShot=4;
      else
      computerShot=6;    
      foursixcounter=0;
    }
    else if(computerShot==4 || computerShot==6)
    foursixcounter=0;
    else
    foursixcounter++;
    if(playerShot == computerShot)
    {
        document.querySelector("#CurrentScore").innerHTML="OUT!";
        playlivefootage("out");
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
        playlivefootage(playerShot);
        }
        else
        {
        cruns+=computerShot; 
        document.querySelector("#CurrentScore").innerHTML=computerShot;
        document.querySelector("#ComRun").innerHTML=cruns;
        playlivefootage(computerShot);
        }

    }
    if(state==1)
    document.querySelector("#BatBalls").innerHTML=balls;
    else
    document.querySelector("#ComBalls").innerHTML=cballs;
    BackColor(playerShot);
    BackColorComp(computerShot);
    disablebuttons(7000);
    setTimeout(RemoveColor,7000,playerShot);   
    setTimeout(RemoveColorComp,7000,computerShot);
    if(innings==2)
    {
      if(state==0)
      {
        document.querySelector("#Condition").innerText=`Computer needs ${Math.max(runs-cruns+1,0)} runs in ${30-cballs} balls with ${3-cwickets} wickets remaining`;
      }
      else 
      {
        document.querySelector("#Condition").innerText=`Player needs ${Math.max(cruns-runs+1,0)} runs in ${30-balls} balls with ${3-wickets} wickets remaining`;
      }
      
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
      if(cballs==30 || cwickets==3)
      { state=1;
        inningsbreak();
        document.querySelector("#combat").style.display='none';
        document.querySelector("#playerbat").style.display='inline';
      }
    }
    else
    { 
      if(balls==30 || wickets==3)
      { state=0;
        inningsbreak();
        document.querySelector("#combat").style.display='inline';
        document.querySelector("#playerbat").style.display='none';
      }
    }
}

function inningsbreak(){
if(innings==1)
{
  innings=2;
  disablebuttons(25000);
  setTimeout(playlivefootage,7000,"break");
}
else{
  setTimeout(playlivefootage,7000,"end");
  document.addEventListener("click", handler, true);  
function handler(e) {
  e.stopPropagation();
  e.preventDefault();
}
}
}

function BackColor(x){
   let shot=numtostr(x);
   let obj= document.getElementById(shot);
   obj.classList.add('active');
}

function BackColorComp(x){
    let shot= numtostr(x);
    let obj= document.getElementById(shot+"C");
    obj.classList.add('active');
}

function RemoveColor(x)
{
    let shot=numtostr(x);
   let obj= document.getElementById(shot);
   obj.classList.remove('active');
}

function RemoveColorComp(x)
{
    let shot=numtostr(x);
   let obj= document.getElementById(shot+"C");
   obj.classList.remove('active');
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

function playlivefootage(x)
{
  let idd=document.getElementById("LiveFootage");
  if(x=="out")
  {
   idd.innerHTML=`
  <video class="livevideo" autoplay>
  <source src="videos/out.mp4">
</video>
`
  }
  else if(x=="break")
  {
    document.querySelector("#Condition").innerText="Innings Break!!";
    idd.innerHTML=`
  <video class="livevideo" autoplay loop>
  <source src="videos/cheerleaderdance.mp4">
</video>
`
  }
  else if(x=="end")
  {
    if(cruns>runs)
  document.querySelector("#Condition").innerText=`Computer Wins!!`;
  else if(runs>cruns)
  document.querySelector("#Condition").innerText="Player Wins!!";
  else 
  document.querySelector("#Condition").innerText="Match Tied!!";
    idd.innerHTML=`
  <video class="livevideo" autoplay loop>
  <source src="videos/matchend.mp4">
</video>
`
 
  }
  else
  {
    let shot=numtostr(x);
    idd.innerHTML=`
    <video class="livevideo" autoplay>
    <source src="videos/${shot}.mp4">
  </video>
    `
  }
}
