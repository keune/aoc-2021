import {readFileSync} from 'fs';

const ways = [
  [-1, 0], // up
  [0, -1], // left
  [0, 1], // right
  [1, 0] // down
];

const data = readFileSync('./inputs/09.txt', 'utf8').split("\n").map(line => line.split('')).map(line => line.map(n => +n));

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const getAdjacents = (p: Point): Point[] => {
  let res = [];
  for (let x = 0; x < ways.length; x++) {
    let way = ways[x];
    let newI = p.x + way[0];
    let newJ = p.y + way[1];
    if (typeof data[newI] !== 'undefined' && typeof data[newI][newJ] !== 'undefined') {
      res.push(new Point(newI, newJ));
    }
  }
  return res;
};

const isLow = (p: Point) :boolean => {
  let adjacents = getAdjacents(p);
  for (let x = 0; x < adjacents.length; x++) {
    let adjP = adjacents[x];
    let adjVal = data[adjP.x][adjP.y];
    let val = data[p.x][p.y];
    if (adjVal <= val) {
      return false;
    }
  }
  return true;
}

const getLowPoints = () => {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      let p = new Point(i, j);
      if (isLow(p)) {
        res.push(p);
      }
    }
  }
  return res;
};

const getSize = (matrix: number[][], p: Point) => {
  let size = 0;
  let val = matrix[p.x][p.y];
  if (val == -1 || val == 9) return size;
  matrix[p.x][p.y] = -1;
  size++;
  let adjacents = getAdjacents(p);
  adjacents.forEach(adjP => {
    size += getSize(matrix, adjP);
  });
  return size;
};

const getAnswer = () => {
  let sizes: number[] = [];
  let lowPoints = getLowPoints();
  lowPoints.forEach(p => {
    let matrix = data.map(subArr => subArr.slice());
    sizes.push(getSize(matrix, p));
  });
  let big3Sizes = sizes.sort((a, b) => b - a).slice(0, 3);
  return big3Sizes.reduce((a, b) => a * b, 1);
};

let answer = getAnswer();
console.log(answer);