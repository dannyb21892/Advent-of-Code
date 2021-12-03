const input = require('./input').input;

const problem = (input) => {
  const lines = input.split('\n');
  let output = '';
  let output2 = '';
  lines[0].split('').forEach((x,i) => {
    let zerocount = 0;
    let onecount = 0;
    lines.forEach(l => {
      if(l[i] === '0'){
        zerocount++
      }
      else {
        onecount++
      }
    });
    output += zerocount > onecount ? '0' : '1';
    output2 += zerocount > onecount ? '1' : '0';
  });
  return parseInt(output, 2)*parseInt(output2, 2)
}

console.log(problem(input))

const problem2 = (input) => {
  const lines = input.split('\n');
  const lines2 = [...lines];
  let o2 = lines;
  let co2 = lines2;
  lines[0].split('').forEach((x,i) => {
    let zerocount = 0;
    let onecount = 0;
    o2.forEach(l => {
      if(l[i] === '0'){
        zerocount++
      }
      else {
        onecount++
      }
    });
    if(o2.length > 1){
      o2 = o2.filter(l => l[i] === (zerocount > onecount ? '0' : '1'))
    }
    
    zerocount = 0;
    onecount = 0;
    co2.forEach(l => {
      if(l[i] === '0'){
        zerocount++
      }
      else {
        onecount++
      }
    });
    console.log(zerocount, onecount, (zerocount > onecount ? '0' : '1'))

    if(co2.length > 1){
      co2 = co2.filter(l => l[i] === (onecount >= zerocount  ? '0' : '1'))
    }
  });
  console.log(o2, co2)
  return parseInt(o2[0], 2)*parseInt(co2[0], 2)
}

console.log(problem2(input))
