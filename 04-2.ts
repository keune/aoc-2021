import {readFileSync} from 'fs';

const getAnswer = () => {
  const SIZE = 5;
  const MARKED = -1;
  let data = readFileSync('./inputs/04.txt', 'utf8').split("\n\n");
  let numbers = data.shift()!.split(',').map(s => +s);
  let boardLines = data.map(d => d.split("\n"));
  let boards = boardLines.map(bl => bl.map(line => line.split(' ').filter(s => s != '').map(s => +s)));
  let res = 0;
  let winners:number[] = [];
  let numberAtWin = null;
  

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      if (winners.includes(boardIndex)) continue;
      const board = boards[boardIndex];

      // marking
      for (let a = 0; a < SIZE; a++) {
        for (let b = 0; b < SIZE; b++) {
          if (board[a][b] == number) {
            board[a][b] = MARKED;
          }
        }
      }

      // check
      for (let a = 0; a < SIZE; a++) {
        let horizontalLine = true;
        let verticalLine = true;
        for (let b = 0; b < SIZE; b++) {
          if (board[a][b] != MARKED) {
            horizontalLine = false;
          }
          if (board[b][a] != MARKED) {
            verticalLine = false;
          }
        }
        if (horizontalLine || verticalLine) {
          winners.push(boardIndex);
          numberAtWin = number;
          break;
        }
      }
    }
  }
  
  if (winners) {
    let lastWinnerIndex = winners[winners.length - 1];
    let board = boards[lastWinnerIndex];
    let total = 0;
    for (let a = 0; a < SIZE; a++) {
      for (let b = 0; b < SIZE; b++) {
        if (board[a][b] != MARKED) {
          total += board[a][b];
        }
      }
    }
    return total * numberAtWin!;
  }
  return null;
};

let answer = getAnswer();
console.log(answer);