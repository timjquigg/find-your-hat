const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(playingField) {
    this.field = playingField[0];
    this.playerY = playingField[1];
    this.playerX = playingField[2];
  }

  /* This method builds a new playing field. It required arguments for height and width of the field as well as the percent of grid areas that will be made up of holes. */
  static generateField(height, width, percentHoles) {
    const newField = [];
    // This section builds out the field with field characters and holes
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const square = Math.floor(Math.random() * 100);
        if (square <= percentHoles) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      newField.push(row);
    }

    // This section generates the location of the hat
    let hatY = Math.floor(Math.random() * height);
    let hatX = Math.floor(Math.random() * width);
    newField[hatY][hatX] = hat;
    
    // This section generates the starting location of the player
    let playerStartX = 0;
    let playerStartY = 0;
    do {
      playerStartY = Math.floor(Math.random() * height);
      playerStartX = Math.floor(Math.random() * width);
    } while (playerStartY == hatY && playerStartX == hatX);
    newField[playerStartY][playerStartX] = pathCharacter;
    
    // returns an array with the field data and the player starting location
    return [newField, playerStartY, playerStartX];
  }

  // This method prints the current field status to the screen
  print() {
    console.clear();
    console.log('\* is player');
    console.log('\^ is hat\n');
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(" "));
    }
    console.log('\n');
  }

  // Checks location status to see if the player has landed on the hat
  checkWin() {
    return this.field[this.playerY][this.playerX] === hat;
  }

  // Checks location status to see if the player has landed in a hole or out of bounds
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

  // This method gets the user input and updates the position of the player
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

  // This method has the general game functionality
  play() {
    this.print();
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


let newPlayField = Field.generateField(5, 4, 20);
let myField = new Field(newPlayField);

while (true) {
  myField.play();
  let playAgain = prompt("Would you like to play again? (y/n)");
  if (playAgain === "y") {
    newPlayField = Field.generateField(5, 4, 20);
    myField = new Field(newPlayField);
  } else {
    return false;
  }
}
