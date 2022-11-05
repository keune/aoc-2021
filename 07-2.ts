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

  let total = data.reduce((a, b) => a + b, 0);
  let target = Math.round(total / data.length);

  d(target, total, data.length)

  const getRes = (t: number) => {
    let res :number = 0;
    data.forEach((n) => {
      let x = Math.abs(t - n);
      let y = x * (x + 1) / 2;
      res += y;
    });
    
    return res;    
  };

  let min = Number.MAX_SAFE_INTEGER;
  let minIndex :number = 0;
  for (let i = 450; i <= 550; i++) {
    let x = getRes(i);
    d(i, x)
    if (x < min) {
      minIndex = i;
      min = x;
    }
  }
  d(minIndex, min)
  return 0;
};

let answer = getAnswer();
console.log(answer);