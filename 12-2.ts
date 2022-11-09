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

const hasVisitedSomeSmallCaveAtLeastTwice = (path: string[]): boolean => {
  path = path.filter((el) => !isBig(el));
  return hasDups(path);
};

const isBig = (s: string): boolean => {
  return s.toUpperCase() === s;
};

const canVisit = (cave: string, path: string[]): boolean => {
  if (cave == 'end' || isBig(cave)) return true;
  if (cave == 'start') {
    return path.length == 0;
  }
  if (!path.includes(cave)) return true;
  return !hasVisitedSomeSmallCaveAtLeastTwice(path);
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
  
  // build up adjacency list
  for (let i = 0; i < data.length; i++) {
    let from = data[i][0];
    let to = data[i][1];
    addToAdjacents(from, to);
    addToAdjacents(to, from);
  }

  let paths: string[][] = [];

  const walk = (path: string[], cave: string) => {
    if (canVisit(cave, path)) {
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
  return paths.length;
};

let answer = getAnswer();
console.log(answer);