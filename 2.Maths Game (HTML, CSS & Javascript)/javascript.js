var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;
//if we click on the start/reset
document.getElementById("startreset").onclick = function() {
    //if we are playing
    if(playing == true) {
        
        location.reload(); //reload page
    } else { //if we are not playing
        
        //change mode to playing
        playing = true;
        //set score to 0
        score = 0;
        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        //hide game over box
        hide("gameover");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startCountdown();
        
        //generate a new Q&A
        generateQA();
        
    }
}
    
//clicking on an answer box       
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick = 
    function() {
    //check if we are playing
        if(playing == true) {//yes
            if (this.innerHTML == correctAnswer) {
            //correct answer
            score++;
            //increase score by 1 
            document.getElementById("scorevalue").innerHTML = score;
            
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function() {
            hide("correct");
            }, 1000)
            
            //Generate new Q&A
            generateQA();
            
            } else {
            //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function() {
                hide("wrong");
                }, 1000)
              }
        }
    }
}
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1 sec
                //generate new Q&A
            //no
                //show try again box for 1 sec
//functions

//start counter
function startCountdown() {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        if(timeRemaining == 0) {//game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over</p><p>Your score is " + score + ". </p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers
function generateQA() {
    var x = 1 + Math.round(Math.random() * 9);
    var y = 1 + Math.round(Math.random() * 9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with correct answer
    
    //fill box with wrong answer
    
    var answers = [correctAnswer];
        
    for(i=1; i<5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = 1 + Math.round(Math.random() * 9) * 1 + Math.round(Math.random() * 9); //wrong answer
            }while(answers.indexOf(wrongAnswer) > -1)
           
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}