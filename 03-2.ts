import {readFileSync} from 'fs';

const filterLines = (lines: any[], lookForMost: boolean) : number => {
  let filteredLines = lines.slice(),
    cols = filteredLines[0].length;

  for (let i = 0; i < cols; i++) {
    let rows = filteredLines.length;
    let oneCount = 0;
    for (let j = 0; j < rows; j++) {
      if (filteredLines[j][i] === '1') {
        oneCount++;
      }
    }

    let common = (oneCount >= rows / 2) ? '1' : '0';
    let filter = common;
    if (lookForMost === false) {
      filter = common === '1' ? '0' : '1';
    }

    filteredLines = filteredLines.filter(line => line[i] === filter);
    if (filteredLines.length < 2) break;
  }
  if (filteredLines.length > 1) console.log('this should not happen.');
  return parseInt(filteredLines[0], 2);
};

const getAnswer = () => {
  let lines = readFileSync('./inputs/03.txt', 'utf8').split("\n");
  
  let oxygenRating = filterLines(lines, true);
  let co2Rating = filterLines(lines, false);
  return oxygenRating * co2Rating;
};

let answer = getAnswer();
console.log(answer);