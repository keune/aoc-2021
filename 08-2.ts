import {readFileSync} from 'fs';

const strDiff = (a: string, b:string): string => {
  return a.split('').filter(el => !b.split('').includes(el)).join('');
};

const strIntersect = (a: string, b:string): string => {
  return a.split('').filter(el => b.split('').includes(el)).join('');
};

const alphabet = 'abcdefg';

const getAnswer = () => {
  let lines = readFileSync('./inputs/08.txt', 'utf8').split("\n");
  let res = 0;
  for (let i = 0; i < lines.length; i++) {
    let uspAndOutput = lines[i].split(' | ');
    let output: string[]  = uspAndOutput[1].split(' ').map(el => el.split('').sort().join(''));
    let patterns: string[] = uspAndOutput[0].split(' ').map(el => el.split('').sort().join(''));

    // find 1 - only 2-segment
    let oneLetters = patterns.filter(el => el.length == 2)![0];

    // find 4 - only 4-segment
    let fourLetters = patterns.filter(el => el.length == 4)![0];
    
    // find 7 - only 3-segment
    let sevenLetters = patterns.filter(el => el.length == 3)![0];

    // go over 6-segments
    let sixStrings = patterns.filter(el => el.length == 6);
    
    // if intersect with 4's segments == 4 it's 9
    let nineLetters = sixStrings.filter(str => strIntersect(str, fourLetters).length == 4)![0];
    
    // two 6-segment is left
    sixStrings = sixStrings.filter(str => str != nineLetters);

    // the diff of 4 and 1 is two segments, with index 1 and 3
    let segmentsOneAndThree = strDiff(fourLetters, oneLetters);
    
    // x = diff(4,1)
    // intersect 2 6-segment with x
    // if length == 2 it's 6
    // the other one is 0
    let zeroLetters: string;
    let sixLetters: string;
    if (strIntersect(sixStrings[0], segmentsOneAndThree).length == 2) {
      sixLetters = sixStrings[0];
      zeroLetters = sixStrings[1];
    } else {
      sixLetters = sixStrings[1];
      zeroLetters = sixStrings[0];
    }

    // the only unknowns at this point are 3 5-segment: 2, 3 and 5
    let fiveStrings = patterns.filter(el => el.length == 5);

    // the only segment 6 doesn't have is #2
    let segment2 = strDiff(alphabet, sixLetters)![0];

    // 9 has same segments with 5 + index 2
    let fiveLetters = fiveStrings.filter(str => strDiff(nineLetters, str)![0] == segment2)![0];
    
    // two 5-segment left, 2 and 3
    fiveStrings = fiveStrings.filter(str => str != fiveLetters);

    // diff (9,2) is 2, diff(9,3) is 1
    let twoLetters: string;
    let threeLetters: string;
    if (strDiff(nineLetters, fiveStrings[0]).length == 1) {
      threeLetters = fiveStrings[0];
      twoLetters = fiveStrings[1];
    } else {
      threeLetters = fiveStrings[1];
      twoLetters = fiveStrings[0];
    }

    let letters: string[] = [
      zeroLetters,
      oneLetters,
      twoLetters,
      threeLetters,
      fourLetters,
      fiveLetters,
      sixLetters,
      sevenLetters,
      alphabet,
      nineLetters
    ];

    let ov = '';
    output.forEach(el => {
      let val = letters.indexOf(el);
      if (val != -1)
        ov += val;
      else
        throw 'this should not have happened';
    });

    res += +ov;
  }
  return res;
};

let answer = getAnswer();
console.log(answer);