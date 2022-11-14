import {readFileSync} from 'fs';

const d = (...args: any) => {
  console.log(...args);
};

type Cell = {
  val: number;
  neighbors: string[];
};

const getKey = (i :number, j: number): string => {
  return i + '_' + j;
};

const getNext = (n :number, add :number) :number => {
  n += add;
  if (n > 9) n = n % 9;
  return n;
};

const getAnswer = () => {
  let data = readFileSync('./inputs/15.txt', 'utf8').split("\n").map(str => str.split('').map(s => +s));
  let size = data[0].length;
  for (let x = 0; x <= 4; x++) {
    for (let i = 0; i <= 4; i++) {
      let col = (i * size);
      let row = (x * size);
      for (let j = 0; j < size; j++) {
        let currentRow = row + j;
        if (typeof data[currentRow] === 'undefined') {
          data[currentRow] = [];
        }
        for (let k = 0; k < size; k++) {
          let currentCol = col + k;
          data[currentRow][currentCol] = getNext(data[j][k], i + x);
        }
      }
    }
  }
  
  let map = new Map<string, Cell>();
  size = data[0].length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let key = getKey(i, j);
      let neighbors :string[] = [];
      [
        [-1 , 0], // up
        [0 , -1], // left
        [0 , 1],
        [1 , 0],
      ].forEach(add => {
        let newI = i + add[0];
        let newJ = j + add[1];
        if (newI >= 0 && newJ >= 0 && newI < size && newJ < size) {
          neighbors.push(getKey(newI, newJ));
        }
      });
      map.set(key, {val: data[i][j], neighbors: neighbors});
    }
  }

  let finalCellKey = getKey(size-1, size-1);
  let firstCellKey = getKey(0, 0);

  const getDistances = (s: string) => {
    let distances = new Map();
    distances.set(s, 0);
    let frontier = [s];
    while (frontier.length) {
      let next = [];
      for (let u of frontier) {
        let adjKeys = map.get(u)!.neighbors;
        for (let adjKey of adjKeys) {
          let adjCell = map.get(adjKey)!;
          let alt = distances.get(u) + adjCell.val;
          if (!distances.has(adjKey) || alt < distances.get(adjKey)) {
            distances.set(adjKey, alt);
            next.push(adjKey);
          }
        }
      }
      frontier = next;
    }
    return distances;
  };

  let distances = getDistances(firstCellKey);
  return distances.get(finalCellKey) || null;
};

let answer = getAnswer();
console.log(answer);