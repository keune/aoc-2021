import {readFileSync} from 'fs';

const getAnswer = () => {
  let lines :string[] = readFileSync('./inputs/10.txt', 'utf8').split("\n");
  let points: Map<string, number> = new Map<string, number>(
    [
      [')', 1],
      [']', 2],
      ['}', 3],
      ['>', 4]
    ]
  );
  let lineScores = [];
  for (let i = 0; i < lines.length; i++) {
    let stack = [], 
      line = lines[i],
      isBroken = false;
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
          isBroken = true;
          break;
        }
      }
    }
    if (isBroken) continue;
    let completion = stack.reverse().map(char => {
      if (char == '(') return ')';
      if (char == '[') return ']';
      if (char == '{') return '}';
      if (char == '<') return '>';
      return char;
    });
    let lineScore = 0;
    completion.forEach((char, n) => {
      lineScore *= 5;
      lineScore += points.get(char)!;
    });
    lineScores.push(lineScore);
    lineScores.sort((a, b) => a - b);
  }
  return lineScores[Math.floor(lineScores.length / 2)];
};

let answer = getAnswer();
console.log(answer);