const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const CELL_WIDTH = 5;

const ELEMENTS = {
  hat: "^",
  hole: "XX",
  field: "⬜",
  player: "@@",
  title: "FIND YOUR Hat!",
};

const MESSAGES = {
  win: "You found the target! You win!",
  loseHole: "You fell into a hole! Game over.",
  loseOutOfBounds: "You went out of bounds! Game over.",
  controls: "Control: W=Up, S=Down, A=Left, D=Right",
  invalid: "Invalid input. Please type w, a, s, or d.",
};

class Field {
  #field;
  #y;
  #x;
  #isPlaying;
  #rl;

  constructor(field = [[]], startY = 0, startX = 0) {
    this.#field = field;
    this.#y = startY;
    this.#x = startX;
    this.#isPlaying = true;
    this.#rl = readline.createInterface({ input, output });

    this.#field[this.#y][this.#x] = ELEMENTS.player;
  }

  static generateField(height, width, holePercentage = 0.2) {
    const field = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ELEMENTS.field),
    );

    const getEmptyPosition = () => {
      let y;
      let x;

      do {
        y = Math.floor(Math.random() * height);
        x = Math.floor(Math.random() * width);
      } while (field[y][x] !== ELEMENTS.field);

      return { y, x };
    };

    const hatPos = getEmptyPosition();
    field[hatPos.y][hatPos.x] = ELEMENTS.hat;

    const playerPos = getEmptyPosition();

    const totalHoles = Math.floor(height * width * holePercentage);
    for (let i = 0; i < totalHoles; i += 1) {
      const holePos = getEmptyPosition();
      field[holePos.y][holePos.x] = ELEMENTS.hole;
    }

    return new Field(field, playerPos.y, playerPos.x);
  }

  print() {
    console.clear();
    console.log(`\n--- ${ELEMENTS.title} ---`);
    console.log(`${MESSAGES.controls}\n`);

    this.#field.forEach((row) => {
      console.log(row.join(" "));
    });

    console.log("");
  }

  moveUp() {
    this.#updatePosition(this.#y - 1, this.#x);
  }

  moveDown() {
    this.#updatePosition(this.#y + 1, this.#x);
  }

  moveLeft() {
    this.#updatePosition(this.#y, this.#x - 1);
  }

  moveRight() {
    this.#updatePosition(this.#y, this.#x + 1);
  }

  #updatePosition(newY, newX) {
    if (
      newY < 0 ||
      newY >= this.#field.length ||
      newX < 0 ||
      newX >= this.#field[0].length
    ) {
      console.log(MESSAGES.loseOutOfBounds);
      this.#isPlaying = false;
      return;
    }

    const targetElement = this.#field[newY][newX];

    if (targetElement === ELEMENTS.hole) {
      console.log(MESSAGES.loseHole);
      this.#isPlaying = false;
      return;
    }

    this.#y = newY;
    this.#x = newX;
    this.#field[this.#y][this.#x] = ELEMENTS.player;

    if (targetElement === ELEMENTS.hat) {
      this.print();
      console.log(MESSAGES.win);
      this.#isPlaying = false;
    }
  }

  async runGame() {
    try {
      while (this.#isPlaying) {
        this.print();
        const answer = await this.#rl.question("Go where? (w/a/s/d): ");
        const inputValue = answer.trim().toLowerCase();

        if (inputValue === "") {
          continue;
        }

        switch (inputValue) {
          case "w":
            this.moveUp();
            break;
          case "s":
            this.moveDown();
            break;
          case "a":
            this.moveLeft();
            break;
          case "d":
            this.moveRight();
            break;
          default:
            console.log(MESSAGES.invalid);
            await this.#rl.question("Press Enter to continue...");
            break;
        }
      }
    } finally {
      this.#rl.close();
    }
  }
}

async function main() {
  const myGame = Field.generateField(10, 10, 0.25);
  await myGame.runGame();
}

main();