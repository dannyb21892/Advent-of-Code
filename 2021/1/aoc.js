const input = require('./input').input;
const test = require('./input').test;

const problem = (input) => {
  const rows = input.split('\n').map(Number);
  let count = 0;
  rows.forEach((x,i) => {
    if(i > 0 && x > rows[i-1]){
      count++;
    }
  })
  return count
}

//console.log(problem(input))

const problem2 = input => {
  const rows = input.split('\n').map(Number);
  const range = [];
  count = 0;
  rows.forEach((x,i) => {
    if(i > 2) {
      const old = range.reduce((a,b) => a+b,0);
      console.log(range)
      range.shift()
      range.push(x);
      const newsum = range.reduce((a,b) => a+b,0);
      console.log(range)
      if(newsum > old){
        count++
      }
      console.log(newsum > old)
    }
    else {
      range.push(x);
    }
  })
  return count
}

console.log(problem2(input))
