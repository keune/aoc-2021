import {readFileSync} from 'fs';

const getAnswer = (days: number) => {
  let fish = readFileSync('./inputs/06.txt', 'utf8').split(",").map(n => +n);
  
  let cycle = new Array(9).fill(0);
  for (let i = 0; i < fish.length; i++) {
    let index = 8 - fish[i];
    cycle[index]++;
  }
  
  for (let i = 0; i < days; i++) {
    let add = cycle.pop();
    cycle.unshift(add);
    cycle[2] += add;
  }
  
  return cycle.reduce((a, b) => a + b, 0);
};

let answer1 = getAnswer(80);
let answer2 = getAnswer(256);
console.log('Answer 1: ' + answer1);
console.log('Answer 2: ' + answer2);