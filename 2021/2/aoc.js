const input = require('./input').input;

const problem = (input) => {
  const lines = input.split('\n');
  let x = 0;
  let d = 0;
  lines.forEach(l => {
    const s = l.split(' ');
    if(s[0] === 'forward'){
      x += Number(s[1]);
    }
    else if(s[0] === 'down'){
      d += Number(s[1]);
    }
    else if(s[0] === 'up'){
      d -= Number(s[1]);
    }
  });
  return x*d
}

console.log(problem(input))

const problem2 = (input) => {
  const lines = input.split('\n');
  let x = 0;
  let a = 0;
  let d = 0;
  lines.forEach(l => {
    const s = l.split(' ');
    if(s[0] === 'forward'){
      x += Number(s[1]);
      d += a*s[1];
    }
    else if(s[0] === 'down'){
      a += Number(s[1]);
    }
    else if(s[0] === 'up'){
      a -= Number(s[1]);
    }
  });
  return x*d
}

console.log(problem2(input))
