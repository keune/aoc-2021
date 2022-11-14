import {readFileSync} from 'fs';

type Cell = {
  val: number;
  neighbors: string[];
  cost: number;
};

const getKey = (i :number, j: number): string => {
  return i + '_' + j;
};

const getAnswer = () => {
  let data = readFileSync('./inputs/15.txt', 'utf8').split("\n").map(str => str.split('').map(s => +s));
  let map = new Map<string, Cell>();
  let size = data[0].length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let key = getKey(i, j);
      let neighbors :string[] = [];
      [
        [-1 , 0],
        [0 , -1],
        [0 , 1],
        [1 , 0],
      ].forEach(add => {
        let newI = i + add[0];
        let newJ = j + add[1];
        if (newI >= 0 && newJ >= 0 && newI < size && newJ < size) {
          neighbors.push(getKey(newI, newJ));
        }
      });
      let cost = (i == 0 && j == 0) ? 0 : Infinity;
      map.set(key, {val: data[i][j], neighbors: neighbors, cost: cost});
    }
  }

  let finalCellKey = getKey(size-1, size-1);

  let currentKey = getKey(0, 0), unvisited :string[] = [...map.keys()];
  unvisited.splice(unvisited.indexOf(getKey(0, 0)), 1);
  while (unvisited.length > 0) {
    let cell = map.get(currentKey)!;
    cell.neighbors.forEach(neighborKey => {
      if (unvisited.includes(neighborKey)) {
        let neighborCell = map.get(neighborKey)!;
        let newCost = cell.cost + neighborCell.val;
        if (newCost < neighborCell.cost) {
          neighborCell.cost = newCost;
        }
      }
    });
    currentKey = unvisited.shift()!;
  }

  return map.get(finalCellKey)!.cost;
};

let answer = getAnswer();
console.log(answer);