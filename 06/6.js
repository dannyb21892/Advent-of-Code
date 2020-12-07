const input = require('./input').input;

const totalquestionspergroup = (input) => {
  let groups = input.split('\n\n');
  let sum = 0;
  groups.forEach((g, i) => {
    let unique = [...new Set(g.split('\n').join('').split(''))];
    sum += unique.length;
  })
  return sum
}

console.log(totalquestionspergroup(input))

const intersection = (input) => {
  let groups = input.split('\n\n');
  let sum = 0;
  groups.forEach((g, i) => {
    let people = g.split('\n').map(x => x.split(''));
    let unique = [...new Set(g.split('\n').join('').split(''))];
    unique.forEach(ans => {
      let common = true;
      people.forEach(p => common = common && p.includes(ans))
      sum += common ? 1 : 0;
    })
  })
  return sum
}


console.log(intersection(input))
