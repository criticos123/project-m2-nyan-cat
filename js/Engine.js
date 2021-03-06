// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    this.counter = 0;
    this.score = new Text(this.root, "500px", "50px");
    this.gamefinished = false;

    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];

    // We add the background image to the game
    addBackground(this.root);
  }
  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    this.score.update("EWOKS HUNTED: " + this.counter);

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      if (this.gamefinished === false) {
        enemy.update(timeDiff);
      }
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.player.lasers.forEach((laser) => {
      laser.update(timeDiff);
    });
    this.player.lasers.filter((laser) => {
      return !laser.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.gamefinished = true;
      let gameover = document.createElement("h2");
      gameover.style.color = "Red";
      gameover.style.fontSize = "50px";
      gameover.style.position = "absolute";
      gameover.style.top = "180px";
      gameover.innerText = "GAME OVER";
      document.body.appendChild(gameover);
      let cheer = document.querySelector(".cheer");
      cheer.play();
      document.removeEventListener("keydown", keydownHandler);
    }
    let counter = 0;
    if (this.isEnemyDead()) {
      let sound = document.querySelector(".sound");
      sound.play();
    }
    //after ten seconds more ewoks will show up
    setInterval(function () {
      MAX_ENEMIES = 3;
    }, 10000);
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    if (this.gamefinished === false) {
      setTimeout(this.gameLoop, 20);
    } else {
      return;
    }
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let isDead = false;
    this.enemies.forEach((enemy, index) => {
      if (
        this.player.y < enemy.y + ENEMY_HEIGHT &&
        this.player.y + PLAYER_HEIGHT > enemy.y &&
        this.player.x < enemy.x + ENEMY_WIDTH &&
        this.player.x + PLAYER_WIDTH > enemy.x
      ) {
        isDead = true;
      }
    });
    return isDead;
  };
  isEnemyDead = () => {
    let enemydead = false;

    this.player.lasers.forEach((event, index) => {
      this.enemies.forEach((enemy1, index) => {
        if (
          event.x < enemy1.x + ENEMY_WIDTH - 8 &&
          event.x + LASER_WIDTH - 8 > enemy1.x &&
          event.y < enemy1.y + ENEMY_HEIGHT - 8 &&
          event.y + LASER_HEIGHT - 8 > enemy1.y
        ) {
          enemydead = true;
          enemy1.destroy();
          this.counter++;
          return this.counter;
        }
      });
    });
    console.log(this.counter);
    return enemydead;
  };
}
