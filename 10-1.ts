import {readFileSync} from 'fs';

const getAnswer = () => {
  let lines :string[] = readFileSync('./inputs/10.txt', 'utf8').split("\n");
  let res = 0;
  let points: Map<string, number> = new Map<string, number>(
    [
      [')', 3],
      [']', 57],
      ['}', 1197],
      ['>', 25137]
    ]
  );
  for (let i = 0; i < lines.length; i++) {
    let stack = [], line = lines[i];
    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      if (['(', '[', '{', '<'].includes(char)) {
        stack.push(char);
      } else if ([')', ']', '}', '>'].includes(char)) {
        let dequeed = stack.pop();
        if (
          (dequeed == '(' && char != ')') || 
          (dequeed == '[' && char != ']') || 
          (dequeed == '{' && char != '}') || 
          (dequeed == '<' && char != '>')
        ) {
          res += points.get(char)!;
          break;
        }
      }
    }
  }
  return res;
};

let answer = getAnswer();
console.log(answer);