import {readFileSync} from 'fs';

const getAnswer = () => {
  let data = readFileSync('./inputs/01.txt', 'utf8').split("\n").map(n => +n);
  let res = 0, step = 3;
  for (let i = 0, k = 1; k <= data.length - step; i++, k++) {
    let m1 = data.slice(i, i + step).reduce((a, b) => a + b);
    let m2 = data.slice(k, k + step).reduce((a, b) => a + b);
    if (m2 > m1) res++;
  }
  return res;
};

let answer = getAnswer();
console.log(answer);