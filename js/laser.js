class Laser {
  constructor(root, x, y) {
    this.root = root;
    this.y = y - PLAYER_HEIGHT;
    this.x = x + PLAYER_WIDTH * 0.5;

    this.destroyed = false;

    this.domElement = document.createElement("img");

    this.domElement.src = "./images/laser.jpg";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
    this.speed = 0.5;
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    console.log(this.y);
    this.domElement.style.top = `${this.y}px`;

    if (this.y === 0) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }
}
