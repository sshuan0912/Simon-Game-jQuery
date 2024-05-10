
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keypress(function() {

    if(!started){

        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
    

});


function nextSequence(){

    userClickedPattern.length = 0;
    clickTimes = 0;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    level++;
    $("h1").text("Level " + level);

    console.log(gamePattern);

    //console.log(randomChosenColor);
}

var clickTimes = 0;

$(".btn").on("click", function(event){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    clickTimes++;
    console.log(userClickedPattern);
    //check if this click has the same color with pattern;
    if(checkAnswer(level)){

        //if clickTimes == game pattern length, stop this level, move to nextLevel
        if(clickTimes === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }

    //console.log(userClickedPattern);
});

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
}

function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function checkAnswer(currentLevel){
    if(gamePattern[clickTimes-1] === userClickedPattern[clickTimes-1]){
        console.log("success");
        return true;
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        //stop games
        return false;
    }

}

function startOver(){
    started = false;
    level = 0;
    gamePattern.length = 0;

}


// setTimeout(function(){
//     currentButton.classList.remove("pressed");
// },200);