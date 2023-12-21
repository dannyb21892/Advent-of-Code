import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let funcs = [
    (x) => x*19,
    (x) => x+1,
    (x) => x+6,
    (x) => x+5,
    (x) => x*x,
    (x) => x+7,
    (x) => x*7,
    (x) => x+2
  ];
  let monkeys = input.split('\n\n').filter(x=>x).map((x,i) => {
    let lines = x.split('\n');
    return {
      items: lines[1].split(': ')[1].split(', ').map(Number),
      op: funcs[i],
      test: (x) => x%(Number(lines[3].split(' ').reverse()[0])) === 0 ? Number(lines[4].split(' ').reverse()[0]) : Number(lines[5].split(' ').reverse()[0])
    }
  });
  let inspectCount = Array(monkeys.length).fill(0);
  for(let round = 0; round < 20; round++){
    monkeys.forEach((m, mi) => {
      m.items.forEach(item => {
        inspectCount[mi] = inspectCount[mi] + 1;
        let newItem = Math.floor(m.op(item) / 3);
        monkeys[m.test(newItem)].items.push(newItem);
      });
      m.items = [];
    })
  }
  let sorted = inspectCount.sort((a,b) => b-a);
  return sorted[0]*sorted[1]
}

console.log(problem(input))

const problem2 = (input) => {
  let monkeys = input.split('\n\n').filter(x=>x).map((x,i) => {
    let lines = x.split('\n');
    return {
      items: lines[1].split(': ')[1].split(', ').map(Number),
      op: {
        type: lines[2].split(' ').reverse()[1],
        val: Number(lines[2].split(' ').reverse()[0])
      },
      divisor: Number(lines[3].split(' ').reverse()[0]),
      test: {
        true: Number(lines[4].split(' ').reverse()[0]),
        false: Number(lines[5].split(' ').reverse()[0])
      }
    }
  });
  monkeys.forEach(m => {
    m.items = m.items.map(item => {
      let divisibilities = [];
      monkeys.forEach(m => {
        divisibilities.push(item % m.divisor)
      });
      return divisibilities;
    })
  })
  console.log(monkeys)
  let inspectCount = Array(monkeys.length).fill(0);
  for(let round = 0; round < 10000; round++){
    monkeys.forEach((m, mi) => {
      m.items.forEach(item => {
        inspectCount[mi] = inspectCount[mi] + 1;
        let newItem = item.map((i, ii) => {
          if(m.op.type === '*'){
            return (i * (m.op.val || i)) % monkeys[ii].divisor;
          }
          else {
            return (i + m.op.val) % monkeys[ii].divisor;
          }
        });
        monkeys[m.test[newItem[mi] === 0]].items.push(newItem);
      });
      m.items = [];
    })
  }
  let sorted = inspectCount.sort((a,b) => b-a);
  return sorted[0]*sorted[1]
}

console.log(problem2(input))
