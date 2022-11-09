import {readFileSync} from 'fs';

const getEmptyPaper = (rows: number, cols: number): string[][] => {
  let paper: string[][] = [];
  for (let i = 0; i < rows; i++) {
    paper.push(Array.from('.'.repeat(cols)));
  }
  return paper;
};

const getTotalDots = (paper: string[][]): number => {
  let res = 0;
  for (let row of paper) {
    res += row.filter(el => el == '#').length;
  }
  return res;
};

const foldUp = (paper: string[][], y: number): string[][] => {
  let rows = paper.length, cols = paper[0].length;
  let firstPart = y;
  let secondPart = (rows - 1 - y);
  let newRows = Math.max(firstPart, secondPart);
  let newPaper = getEmptyPaper(newRows, cols);
  
  // the moving part
  let startRow = Math.max(0, firstPart - secondPart);
  for (let i = rows-1, j = startRow; i > y; i--, j++) {
    for (let k = 0; k < cols; k++) {
      if (paper[i][k] == '#') {
        newPaper[j][k] = '#';
      }
    }
  }

  // the stable part
  startRow = Math.max(0, secondPart - firstPart);
  for (let i = 0, j = startRow; i < y; i++, j++) {
    for (let k = 0; k < cols; k++) {
      if (paper[i][k] == '#') {
        newPaper[j][k] = '#';
      }
    }
  }

  return newPaper;
};

const foldLeft = (paper: string[][], x: number): string[][] => {
  let rows = paper.length, cols = paper[0].length;
  let firstPart = x;
  let secondPart = (cols - 1 - x);
  let newCols = Math.max(firstPart, secondPart);
  let newPaper = getEmptyPaper(rows, newCols);
  
  // the moving part
  let startCol = Math.max(0, firstPart - secondPart);
  for (let i = 0; i < rows; i++) {
    for (let j = cols - 1, k = startCol; j > x; j--, k++) {
      if (paper[i][j] == '#') {
        newPaper[i][k] = '#';
      }
    }
  }

  // the stable part
  startCol = Math.max(0, (secondPart - firstPart));
  for (let i = 0; i < rows; i++) {
    for (let j = 0, k = startCol; j < x; j++, k++) {
      if (paper[i][j] == '#') {
        newPaper[i][k] = '#';
      }
    }
  }

  return newPaper;
};

const getAnswer = () => {
  let data = readFileSync('./inputs/13.txt', 'utf8').split("\n\n");
  let dots = data[0].split("\n").map(line => line.split(',').map(n => +n));

  let rows = 0, cols = 0;
  dots.forEach(dot => {
    rows = Math.max(rows, dot[1]);
    cols = Math.max(cols, dot[0]);
  });
  rows++;
  cols++;
  let instructions = data[1].split("\n").map(str => {
    let strArr = str.replace('fold along ', '').split('=');
    return [strArr[0], +(strArr[1])];
  });
  
  let paper = getEmptyPaper(rows, cols);
  for (let [x, y] of dots) {
    paper[y][x] = '#';
  }

  for (let i = 0; i < instructions.length; i++) {
    let fold = instructions[i][0];
    let point = instructions[i][1];
    if (fold == 'y') {
      paper = foldUp(paper, point as number);
    } else {
      paper = foldLeft(paper, point as number);
    }
    if (i == 0) {
      console.log('Total dots after first fold: ' + getTotalDots(paper));
    }
  }
  
  console.log(paper.map(line => line.join('').replace(/\./g, ' ')).join("\n"));
};

getAnswer();