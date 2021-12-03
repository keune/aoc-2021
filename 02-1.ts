import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/02.txt', 'utf8').split("\n");
  let horizontal = 0, depth = 0;
  for (let i = 0; i < data.length; i++) {
    let line = data[i].split(' ');
    if (line[0] === 'forward') {
      horizontal += +line[1];
    } else if (line[0] === 'down') {
      depth += +line[1];
    } else if (line[0] === 'up') {
      depth -= +line[1];
    }
  }
  return horizontal * depth;
};

let answer = getAnswer();
console.log(answer);