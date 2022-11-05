import {readFileSync} from 'fs';

const data = readFileSync('./inputs/11.txt', 'utf8').split("\n").map(line => line.split('').map(n => +n));

class Position {
  i: number;
  j: number;
  key: string;
 
  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.key = i + '_' + j;
  }
}

const getPositionByKey = (key :string) :Position => {
  let [i, j] = key.split('_').map(n => +n);
  return new Position(i, j);
};

const diff = (arrA: Position[], arrB: Position[]) => {
  let keysA = arrA.map(p => p.key);
  let keysB = arrB.map(p => p.key);
  let diff = keysA.filter(x => !keysB.includes(x));
  return diff.map(key => getPositionByKey(key));
};

const getAdjacents = (p: Position): Position[] => {
  let adjacents = [];
  let ways = [
    [-1, -1], // upleft
    [-1, 0], // up
    [-1, 1], // upright
    [0, -1], // left
    [0, 1], // right
    [1, -1], // downleft
    [1, 0], // down
    [1, 1] // downright
  ];
  let i = p.i, j = p.j;
  for (let x = 0; x < ways.length; x++) {
    let way = ways[x];
    let newI = i + way[0];
    let newJ = j + way[1];
    if (typeof data[newI] !== 'undefined' && typeof data[newI][newJ] !== 'undefined') {
      adjacents.push(new Position(newI, newJ));
    }
  }

  return adjacents;
};

const increaseAll = () => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      data[i][j] += 1;
    }
  }
};

const increaseSome = (positions: Position[]) => {
  for (let x = 0; x < positions.length; x++) {
    let position = positions[x];
    data[position.i][position.j] += 1;
  }
};

const getFlashers = (): Position[] => {
  let flashers = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] > 9) {
        flashers.push(new Position(i, j));
      }
    }
  }
  return flashers;
};

const resetFlashers = () => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] > 9) {
        data[i][j] = 0;
      }
    }
  }
};

const getAnswer = () => {
  let res = 0, steps = 100;
  for (let i = 0; i < steps; i++) {
    increaseAll();
    let flashers: Position[] = [];
    let newFlashers: Position[] = [];

    while (true) {
      newFlashers.forEach(flasherPosition => {
        let adjacents: Position[] = getAdjacents(flasherPosition);
        increaseSome(adjacents);
        flashers.push(flasherPosition);
      });
      
      newFlashers = getFlashers();
      let theDiff = diff(newFlashers, flashers);
      if (theDiff.length) {
        newFlashers = theDiff;
      } else {
        break;
      }
    }
    res += flashers.length;
    resetFlashers();
  }
  return res;
};

let answer = getAnswer();
console.log(answer);