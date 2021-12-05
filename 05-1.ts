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