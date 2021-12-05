import {readFileSync} from 'fs';

const getKey = (x: number, y: number) :string => x + '_' + y;

const map: Map<string, number> = new Map<string, number>();

const addToMap = (x: number, y: number) => {
  let val = 0, key = getKey(x, y);
  if (map.has(key)) {
    val = map.get(key)!;
  }
  val++;
  map.set(key, val);
};

const getDiagonalCoords = (coord1: number[], coord2: number[]) :any[] => {
  const ways = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
    xStart = coord1[0],
    yStart = coord1[1],
    xEnd = coord2[0],
    yEnd = coord2[1];
  for (let i = 0; i < ways.length; i++) {
    let way = ways[i];
    let x = xStart;
    let y = yStart;

    let coords = [coord1];
    while (true) {
       x += way[0];
       y += way[1];
       coords.push([x, y]);
       if (x < 0 || y < 0) break;
       if (way[0] == -1 && x < xEnd) {
         break;
       }
       if (way[0] == 1 && x > xEnd) {
         break;
       }
       if (way[1] == -1 && y < yEnd) {
         break;
       }
       if (way[1] == 1 && y > yEnd) {
         break;
       }
       if (x == xEnd && y == yEnd) {
         return coords;
       }
    }
  }
  return [];
};

const getAnswer = () => {
  let data = readFileSync('./inputs/05.txt', 'utf8').split("\n").map(line => {
    return line.split(' -> ').map(coordStrings => coordStrings.split(',').map(str => +str));
  });
  for (let i = 0; i < data.length; i++) {
    let twoCoords = data[i];
    if (twoCoords[0][0] == twoCoords[1][0]) {
      let x = twoCoords[0][0];
      let yStart = twoCoords[0][1];
      let yEnd = twoCoords[1][1];
      if (yStart > yEnd) {
        let swap = yStart;
        yStart = yEnd;
        yEnd = swap;
      }
      for (let j = yStart; j <= yEnd; j++) {
        addToMap(x, j);
      }
    } else if (twoCoords[0][1] == twoCoords[1][1]) {
      let y = twoCoords[0][1];
      let xStart = twoCoords[0][0];
      let xEnd = twoCoords[1][0];
      if (xStart > xEnd) {
        let swap = xStart;
        xStart = xEnd;
        xEnd = swap;
      }
      for (let j = xStart; j <= xEnd; j++) {
        addToMap(j, y);
      }
    } else {
      let validDiagonalCoords = getDiagonalCoords(twoCoords[0], twoCoords[1]);
      validDiagonalCoords.forEach((coord) => {
        addToMap(coord[0], coord[1]);
      });
    }
  }
  let res = 0;
  map.forEach((val, key) => {
    if (val > 1) res++;
  });
  return res;
};

let answer = getAnswer();
console.log(answer);