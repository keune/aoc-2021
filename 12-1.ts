import {readFileSync} from 'fs';

const hasDups = (arr: string[]): boolean => {
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    if (arr.lastIndexOf(el) != i) {
      return true;
    }
  }
  return false;
};

const isBig = (s: string): boolean => {
  return s.toUpperCase() === s;
};

const adjacencyList = new Map();

const addToAdjacents = (from: string, to: string) => {
  let adjacents = [];
  if (adjacencyList.has(from)) {
    adjacents = adjacencyList.get(from);
  }
  if (!adjacents.includes(to)) {
    adjacents.push(to);
  }
  adjacencyList.set(from, adjacents);
};

const getAnswer = () => {
  let data = readFileSync('./inputs/12.txt', 'utf8').split("\n").map(line => line.split('-'));
  let res = 0;
  
  // build up adjacency list
  for (let i = 0; i < data.length; i++) {
    let from = data[i][0];
    let to = data[i][1];
    addToAdjacents(from, to);
    addToAdjacents(to, from);
  }

  let paths: string[][] = [];

  const walk = (path: string[], cave: string) => {
    if (isBig(cave) || !path.includes(cave)) {
      path.push(cave);
    } else {
      return;
    }
    if (cave == 'end') {
      paths.push(path);
      return;
    }
    for (let adj of adjacencyList.get(cave)) {
      let newPath = path.slice();
      walk(newPath, adj);
    }
  };

  walk([], 'start');
  for (let path of paths) {
    path = path.filter((el) => !isBig(el));
    if (!hasDups(path)) {
      res++;
    }
  }
  return res;
};

let answer = getAnswer();
console.log(answer);