import {readFileSync} from 'fs';

const d = (...args: any) => {
  console.log(...args);
};

const rules: Map<string, string> = new Map<string, string>();

const polymerize = (template :Map<string, number>) => {
  let pairs = [...template.keys()];
  let newTemplate = new Map<string, number>();
  pairs.forEach((pair) => {
    if (!rules.has(pair)) {
      newTemplate.set(pair, template.get(pair)!);
    }
  });
  pairs.forEach((pair) => {
    if (rules.has(pair)) {
      let count = template.get(pair)!;
      let insertChar = rules.get(pair);
      let chars = pair.split('');
      let newPairs = [chars[0] + insertChar, insertChar + chars[1]];
      newPairs.forEach(newPair => {
        if (newTemplate.has(newPair)) {
          let x = newTemplate.get(newPair)!;
          newTemplate.set(newPair, x + count);
        } else {
          newTemplate.set(newPair, count);
        }
      });  
    }
  });

  return newTemplate;
};

const getAnswer = () => {
  let data = readFileSync('./inputs/14.txt', 'utf8').split("\n");
  let template = data.shift()!;
  data.slice(1).forEach(str => {
    let splitted = str.split(' -> ');
    rules.set(splitted[0], splitted[1]);
  });
  
  let tmp = new Map();
  for (let i = 0; i < template.length - 1; i++) {
    let pair = template[i] + template[i + 1];
    if (tmp.has(pair)) {
      tmp.set(pair, tmp.get(pair) + 1);
    } else {
      tmp.set(pair, 1);
    }
  }

  for (let i = 0; i < 40; i++) {
    d('Step ' + (i+1));
    tmp = polymerize(tmp);
    d(tmp)
  }
  let freqMap: Map<string, number> = new Map<string, number>();
  tmp.forEach((count, pair) => {
    let chars = pair.split('');
    chars.forEach((char :string) => {
      if (freqMap.has(char)) {
        freqMap.set(char, freqMap.get(char)! + count);
      } else {
        freqMap.set(char, count);
      }
    });
  });
  d(tmp, freqMap)
  let least = Number.MAX_SAFE_INTEGER, most = 0;
  freqMap.forEach((count) => {
    count = Math.floor(count/2);
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