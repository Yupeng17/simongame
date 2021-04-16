userClickedPattern = [];

gamePattern = [];

buttonColors = ["red", "yellow", "green", "blue"];

var started = false;

var level = 0;

$(document).on("keydown", function() {

  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut("50").fadeIn("50");
  makeSound(randomChosenColour);
};

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

function makeSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel1) {
  if (userClickedPattern[currentLevel1] === gamePattern[currentLevel1]) {
   if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else {
  makeSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
