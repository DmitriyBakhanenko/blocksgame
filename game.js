const userClickedPattern = [];
const gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

let gameStarted = false;
let clickcount = 0;
let level = 1;

$(document).keypress(function(e) {
  if (e.key) {
    if (gameStarted === false) {
      $("p").addClass("hidden");
      for (i = 0; i < 4; i++) {
        $(".btn").removeClass("hidden");
      }
      $("h1").text(`Уровень ${level}`);
      gameStarted = true;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
});

$(".btn")
  .on("click", handler)
  .mousedown(function(e) {
    e.preventDefault();
  });

function handler() {
  clickcount++;
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  inputCheck();
  if (
    gamePattern.length === userClickedPattern.length &&
    gamePattern[clickcount - 1] === userClickedPattern[clickcount - 1]
  ) {
    $(".btn").off("click");
    setTimeout(function() {
      $("h1").text("Уровень пройден!");
    }, 500);
    setTimeout(function() {
      $("h1").text("Приготовьтесь!");
    }, 2000);
    setTimeout(function() {
      $("h1").text(`Уровень ${++level}`);
    }, 3500);
    setTimeout(function() {
      startNextRound();
    }, 4000);
  }
}

function startNextRound() {
  clickcount = gamePattern.length;
  for (let i = 0; i < level; i++) {
    setTimeout(() => {
      nextSequence();
    }, i * 1000);
  }
  setTimeout(() => {
    $(".btn").on("click", handler);
  }, level * 1000);
}

function inputCheck() {
  if (gamePattern[clickcount - 1] != userClickedPattern[clickcount - 1]) {
    $("h1").text("Поражение!");
    $(".btn").off("click");
    setTimeout(function() {
      location.reload();
    }, 1500);
  }
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`)
    .fadeOut(100)
    .fadeIn(100)
    .on("fadeOut", playAudio(randomChosenColor));
}

function playAudio(par) {
  const audio = new Audio();
  audio.src = `sounds/${par}.mp3`;
  audio.play();
}
function animatePress(p) {
  $(`#${p}`).addClass("pressed");
  setTimeout(function() {
    $(`#${p}`).removeClass("pressed");
  }, 100);
}
