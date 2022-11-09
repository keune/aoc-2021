import {readFileSync} from 'fs';

const rules: Map<string, string> = new Map<string, string>();

const polymerize = (template :string) => {
  let res = '';
  for (let i = 0; i < template.length - 1; i++) {
    let key = template[i] + template[i+1];
    if (rules.has(key)) {
      let char = rules.get(key);
      res += template[i] + char;
    } else {
      res += template[i];
    }
  }
  res += template[template.length - 1];
  return res;
};

const getAnswer = () => {
  let data = readFileSync('./inputs/14.txt', 'utf8').split("\n");
  let template = data.shift()!;
  data.slice(1).forEach(str => {
    let splitted = str.split(' -> ');
    rules.set(splitted[0], splitted[1]);
  });
  
  let tmp = template;
  for (let i = 0; i < 10; i++) {
    tmp = polymerize(tmp);
  }
  let freqMap: Map<string, number> = new Map<string, number>();
  tmp.split('').forEach(char => {
    if (freqMap.has(char)) {
      freqMap.set(char, freqMap.get(char)! + 1);
    } else {
      freqMap.set(char, 0);
    }
  });
  let least = Number.MAX_SAFE_INTEGER, most = 0;
  freqMap.forEach((count) => {
    if (count <= least) {
      least = count;
    }
    if (count >= most) {
      most = count;
    }
  });
  return most - least;
};

let answer = getAnswer();
console.log(answer);