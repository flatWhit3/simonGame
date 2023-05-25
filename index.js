let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false; //keep track if the game has started or not to call nextSequence() on the first keypress


//detect enter button to start the game
$(document).on("keypress", function(key) {
    if (key.which === 13 && !started) { 
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// function to play sound, animate and check answer when the button clicked

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    // added the last clicked key to the user patter
    checkAnswer(userClickedPattern.length - 1); 
});

// to check the answer if true to start the next sequence, if false to stop and play wrong.mp3

const checkAnswer = (currentLevel) => {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } 
    else {
        playSound("wrong");
        $("h1").text("Game Over! Press Enter to Restart");
        $("body").addClass("game-over");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        startOver();
    }
}

// start the next sequence if previous was right

const nextSequence = () => {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
}

// function for playing sound

const playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// press animation + delay

const animatePress = (currentColor) => {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


//restart, calling if sequence is wrong

const startOver = () => {
   level = 0;
   gamePattern = [];
   started = !true;
 }