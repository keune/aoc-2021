import {readFileSync} from 'fs';

const getAnswer = () => {
  let lines = readFileSync('./inputs/03.txt', 'utf8').split("\n");
  let cols = lines[0].length, 
    rows = lines.length,
    gamma = '', 
    epsilon = '';
  for (let i = 0; i < cols; i++) {
    let oneCount = 0;
    for (let j = 0; j < rows; j++) {
      if (lines[j][i] === '1') {
        oneCount++;
      }
    }
    if (oneCount >= rows / 2) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }
  let gammaDecimal = parseInt(gamma, 2);
  let epsilonDecimal = parseInt(epsilon, 2);
  return gammaDecimal * epsilonDecimal;
};

let answer = getAnswer();
console.log(answer);