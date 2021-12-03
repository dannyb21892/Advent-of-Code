const input = require('./input').input;

const parse = input => {
  return input.split('\n').map(l => {
    if(l.slice(0,2) === 'ma'){
      return {
        type: 'mask',
        value: l.split(' = ')[1]
      }
    }
    else {
      return {
        type: 'write',
        address: Number(l.split('[')[1].split(']')[0]),
        value: Number(l.split(' = ')[1])
      }
    }
  });
}

const part1 = (input) => {
  let memory = {};
  let mask;
  input.forEach(i => {
    if(i.type === 'mask'){
      mask = i.value;
    }
    else {
      let binVal = i.value.toString(2);
      let padding = 36 - binVal.length;
      let binArr = binVal.split('');
      if(padding > 0){
        binArr = [...Array(padding).fill(0), ...binArr];
      }
      let masked = binArr.map((bit, m) => mask[m] === 'X' ? bit : mask[m]).join('');
      memory[i.address] = Number.parseInt(masked, 2)
    }
  });
  return Object.values(memory).reduce((a,b) => a+b)
}

console.log(part1(parse(input)))

const allAddresses = (arr, out) => {
  if(!out){
    out = [[...arr]];
  }
  let xIndex = arr.findIndex(x => x === 'X');
  if(xIndex >= 0){
    let float0 = [...arr.slice(0,xIndex), '0', ...arr.slice(xIndex + 1)];
    let float1 = [...arr.slice(0,xIndex), '1', ...arr.slice(xIndex + 1)];
    return [...out, ...allAddresses(float0), ...allAddresses(float1)];
  }
  else {
    return out;
  }
}

const part2 = (input) => {
  let memory = {};
  let mask;
  input.forEach((i, ind) => {
    if(i.type === 'mask'){
      mask = i.value;
    }
    else {
      let binAddress = i.address.toString(2);
      let padding = 36 - binAddress.length;
      let binArr = binAddress.split('');
      if(padding > 0){
        binAddress = [...Array(padding).fill('0'), ...binAddress];
      }
      let masked = binAddress.map((bit, m) => mask[m] === '0' ? bit : mask[m]);
      let addresses = allAddresses(masked);
      addresses.filter(a => !a.includes('X')).forEach(a => {
        memory[Number.parseInt(a.join(''), 2)] = i.value
      })
    }
  });
  return Object.values(memory).reduce((a,b) => a + (b || 0));
}

let testIn = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`


console.log(part2(parse(input)))
