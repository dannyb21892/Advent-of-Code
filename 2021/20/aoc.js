import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input, iterations = 2) => {
  let lines = input.split('\n\n');
  let alg = lines[0].split('');

  lines = lines[1].split('\n').map(line => {
    return ['0', ...line.split('').map(char => char === '.' ? '0' : '1'), '0'];
  });

  lines = [
    new Array(lines[0].length).fill('0'),
    ...lines,
    new Array(lines[0].length).fill('0'),
  ];

  for(let i = 1; i <= iterations; i++){
    let newLines = new Array(lines.length).fill().map(row => {
      return new Array(lines[0].length).fill('0');
    })

    for(let row = 0; row <= lines.length - 1; row++){
      for(let col = 0; col <= lines[0].length - 1; col++){
        let str = '';
        for(let r = row-1; r <= row+1; r++){
          for(let c = col-1; c <= col+1; c++){
            str += lines[r] && lines[r][c] ? lines[r][c] : i%2 === 1 ? '0' : '1';
          }
        }
        newLines[row][col] = alg[parseInt(str,2)] === '.' ? '0' : '1';
      }
    }

    let padding = i%2 === 1 ? '1' : '0';
    lines = [
      new Array(newLines[0].length + 2).fill(padding),
      ...newLines.map(line => [padding, ...line, padding]),
      new Array(newLines[0].length + 2).fill(padding),
    ];
  }

  return lines.reduce((a,b) => a + b.reduce((a,b) => a + Number(b), 0), 0);
}

console.log(problem(input))

const problem2 = (input) => {
  return problem(input, 50)
}

console.log(problem2(input))
