import {readFileSync} from 'fs';

const d = (...args: any) => {
  console.log(...args);
};

const dd = (...args: any) => {
  console.log(...args);
  process.exit();
};

const getAnswer = () => {
  let data = readFileSync('./inputs/07.txt', 'utf8').split(",").map(n => +n).sort((a, b) => a - b);

  let target: number;
  if (data.length % 2) {
    target = data[Math.ceil(data.length / 2)];
  } else {
    target = (data[data.length / 2 - 1] + data[data.length / 2]) / 2;
  }

  let res :number = 0;
  data.forEach((n) => {
    res += Math.abs(target - n);
  });
  
  return res;
};

let answer = getAnswer();
console.log(answer);