const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define class
class Field {
  constructor(hatAndHoles, field) {
    this._field  = field;
    this._hatAndHoles = hatAndHoles;
  }
  //play game method
  playGame() {
    let y = 0; 
    let x = 0;
    this.print(this._field);
   
    while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
      const direction = prompt('Which direction would you like to move? Please enter N for North, S for  South, E for East, or W for West. \n');
    
    if (direction.toUpperCase() === 'N') {
      if (y === 0) {
        console.log('You cannot move any further North. Please choose another direction')
      } else {
        y -=1
      }
    } else if (direction.toUpperCase() === 'S') {
        if (y >= this._field.length) {
          console.log('You cannot move any further South. Please choose another direction')
        } else {
          y +=1
        }
      } else if (direction.toUpperCase() === 'W') {
        if (x === 0) {
          console.log('You cannot move any further West. Please choose another direction')
        } else {
          x -= 1
        }
      } else if (direction.toUpperCase() === 'E') {
        if (x >= this._field[y].length) {
          console.log('You cannot move any further East. Please choose another direction')
        } else {
          x += 1
        }
      } else {
        console.log('Invalid entry. Please enter N, S, E, or W')
      } 
      if (this._hatAndHoles[y][x] === hat) {
        console.log('You found the hat! You win!')
      } else if (this._hatAndHoles[y][x] === hole) {
        console.log('You fell in a hole. Game Over')
      } else {
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    } 
  }
  //print field method
  print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  }
  
  static generateField(height, width, holes) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;
    
    for (let k = holes; k > 0; k--) {
      let holeX = hatX;
      let holeY = hatY;
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * width)
      };
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * height)
      };
     newField[holeY][holeX] = hole; 
    }
    return newField;
  } 
  
  static generateBlankField(height, width){
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    return newField;
  }
}


let myField 

const blankField = Field.generateBlankField(5, 5)


const newField = Field.generateField(5, 5, 1);
console.log(blankField);


myField = new Field (newField, blankField);

myField.playGame();