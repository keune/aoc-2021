import {readFileSync} from 'fs';

const getAnswer = () => {
  let lines = readFileSync('./inputs/08.txt', 'utf8').split("\n");
  let res = 0;
  for (let i = 0; i < lines.length; i++) {
    let uspAndOutput = lines[i].split(' | ');
    let output :string[]  = uspAndOutput[1].split(' ');
    res += output.filter(str => [2, 4, 3, 7].includes(str.length)).length;
  }
  return res;
};

let answer = getAnswer();
console.log(answer);