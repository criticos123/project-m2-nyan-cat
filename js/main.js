// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));
const startButton = document.getElementsByClassName("start")[0];
const music = document.querySelector(".music");
// startButton.addEventListener("click", gameStart);
// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game
//gameEngine.gameStart();

// async function gameStart() {
//   console.log("Game has Started!");

//   gameEngine.gameLoop();
//   let playPromise = await music.play();
// }

let myFirstPromise = new Promise((resolve, reject) => {
  startButton.addEventListener(
    "click",
    function (e) {
      console.log("starting...");
      resolve("gamestart");
    },
    { once: true }
  );
});

//  new Promise((resolve, reject) => {
//   // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
//   // In this example, we use setTimeout(...) to simulate async code.
//   // In reality, you will probably be using something like XHR or an HTML5 API
//   alert("Get the fruit avoid the stampede! \nPlay!");

//   resolve("Success!"); // Yay! Everything went well!
// });

myFirstPromise.then((successMessage) => {
  gameEngine.gameLoop();
  music.play();
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});
