const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(playingField) {
    this.field = playingField;
    this.playerX = 0;
    this.playerY = 0;
  }

  print() {
    console.clear();
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  checkWin() {
    return this.field[this.playerY][this.playerX] === hat;
  }

  checkLoss() {
    if (
      this.playerY >= this.field.length ||
      this.playerX >= this.field[0].length ||
      this.playerY < 0 ||
      this.playerX < 0
    ) {
      return true;
    } else if (this.field[this.playerY][this.playerX] === hole) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    let direction = prompt("Which way would you like to move?");
    switch (direction) {
      case "u":
        this.playerY -= 1;
        break;
      case "r":
        this.playerX += 1;
        break;
      case "d":
        this.playerY += 1;
        break;
      case "l":
        this.playerX -= 1;
        break;
    }
  }

  play() {
    myField.print();
    while (true) {
      this.move();
      if (this.checkLoss()) {
        console.log("You lose!");
        break;
      }
      if (this.checkWin()) {
        console.log("You win!");
        break;
      }
      this.field[this.playerY][this.playerX] = "*";
      this.print();
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.play();
