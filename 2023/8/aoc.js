import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let lr = lines[0].split('');
  let nodes = lines[1].split('\n').filter(Boolean).reduce((acc,n) => {
    let node = n.split(' =')[0]
    let obj = {
      L: n.split('(')[1].split(',')[0],
      R: n.split(')')[0].split(', ')[1]
    };
    acc[node] = obj;
    return acc
  }, {});
  let current = 'AAA';
  let i = -1;
  let count = 0;
  while(current !== 'ZZZ'){
    i = (i+1)%lr.length;
    count ++;
    current = nodes[current][lr[i]];
  }
  return count;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let lr = lines[0].split('');
  let current = [];
  let nodes = lines[1].split('\n').filter(Boolean).reduce((acc,n) => {
    let node = n.split(' =')[0]
    let obj = {
      L: n.split('(')[1].split(',')[0],
      R: n.split(')')[0].split(', ')[1]
    };
    acc[node] = obj;
    if(node.slice(-1)[0] === 'A') current.push(node);
    return acc
  }, {});

  let whenEndsInZ = [];
  let allIs = new Set();
  current.forEach(c => {
    let cycles = 0;
    let i = -1;
    let z = {};
    while(true){
      i = (i+1)%lr.length;
      if(i === 0) cycles++;
      c = nodes[c][lr[i]];
      if(c.slice(-1)[0] === 'Z'){
        if(!z[c]) {
          z[c] = [{i,cycles}];
          allIs.add(i);
        }
        else if(z[c].find(x => x.i === i)) break
        else {
          z[c].push({i,cycles});
          allIs.add(i);
        }
      }
    }
    whenEndsInZ.push(z)
  });
  let commoni = [...allIs].find(i => whenEndsInZ.every(z => Object.values(z)[0].map(x => x.i).includes(i)));
  let cycleRepeatCount = whenEndsInZ.map(x => {
    let counts = Object.values(x)[0].find(c => c.i === commoni);
    return counts.cycles || 1
  })
  let mincycles = cycleRepeatCount.reduce(lcm) - 1;
  return (mincycles * lr.length) + commoni + 1
}

function gcd(a,b){
  var t = 0;
  a < b && (t = b, b = a, a = t);
  t = a%b;
  return t ? gcd(b,t) : b;
}

function lcm(a,b){
  return a/gcd(a,b)*b;
}

console.log(problem2(input))
