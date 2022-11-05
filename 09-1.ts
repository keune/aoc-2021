import {readFileSync} from 'fs';

const data = readFileSync('./inputs/09.txt', 'utf8').split("\n").map(line => line.split('')).map(line => line.map(n => +n));

const isLow = (i: number, j: number) :boolean => {
  let ways = [
    [-1, 0], // up
    [0, -1], // left
    [0, 1], // right
    [1, 0] // down
  ];
  for (let x = 0; x < ways.length; x++) {
    let way = ways[x];
    let newI = i + way[0];
    let newJ = j + way[1];
    if (typeof data[newI] !== 'undefined' && typeof data[newI][newJ] !== 'undefined') {
      if (data[newI][newJ] <= data[i][j]) {
        return false;
      }
    }
  }
  return true;
}

const getAnswer = () => {
  
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (isLow(i, j)) {
        res += 1 + data[i][j];
      }
    }
  }
  return res;
};

let answer = getAnswer();
console.log(answer);