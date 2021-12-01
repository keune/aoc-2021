import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/01.txt', 'utf8').split("\n").map(n => +n);
  let res = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) res++;
  }
  return res;
};

let answer = getAnswer();
console.log(answer);