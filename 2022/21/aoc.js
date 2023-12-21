import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;
import * as _ from 'lodash';

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => {
    let arg = x.split(': ')[1];
    let dependencies = arg.split(' ').length === 1 ? [] : [arg.split(' ')[0], arg.split(' ')[2]];
    return {
      name: x.split(':')[0],
      number: arg,
      dependencies,
      yelled: dependencies.length === 0
    }
  });
  lines.forEach(x => {
    x.dependencies = x.dependencies.map(y => lines.find(z => z.name === y));
  })
  lines.forEach(x => {
    let operation = x.number.split(' ')[1];
    x.number = x.dependencies.length ?
      () => eval(`${x.dependencies[0].number}${operation}${x.dependencies[1].number}`) :
      Number(x.number);
    x.dependents = lines.filter(y => y.dependencies.includes(x))
  });
  let root = lines.find(x => x.name === 'root');
  let logged = false;
  while(!root.yelled){
    let theseWillYell = lines.filter(x => !x.yelled && x.dependencies[0].yelled && x.dependencies[1].yelled);
    theseWillYell.forEach(x => {
      if(!logged){
        logged = true;
      }
      x.number = x.number();
      x.yelled = true;
    })
  }
  return root.number
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(x => {
    let arg = x.split(': ')[1];
    let dependencies = arg.split(' ').length === 1 ? [] : [arg.split(' ')[0], arg.split(' ')[2]];
    return {
      name: x.split(':')[0],
      number: arg,
      dependencies,
      yelled: dependencies.length === 0
    }
  });
  lines.forEach(x => {
    x.dependencies = x.dependencies.map(y => lines.find(z => z.name === y));
  })
  let whatToYell = 3759566892500;
  let done = false;
  while(!done){
    whatToYell++;
    let newLines = _.default.cloneDeep(lines);
    done = prob2test(newLines, whatToYell);
  }
  return whatToYell
}

let prob2test = (newLines, whatToYell) => {
  let root;
  newLines.forEach(x => {
    let operation = x.number.split(' ')[1];
    x.number = x.dependencies.length ?
      () => eval(`${x.dependencies[0].number}${operation}${x.dependencies[1].number}`) :
      Number(x.name === 'humn' ? whatToYell : x.number);
    if(x.name === 'root'){
      root = x;
      x.number = () => {
        console.log(x.dependencies[0].number, x.dependencies[1].number)
        return x.dependencies[0].number === x.dependencies[1].number
      }
    }
    x.dependents = newLines.filter(y => y.dependencies.includes(x))
  });
  newLines.find(x => x.name === 'humn').number = whatToYell;
  while(!root.yelled){
    let theseWillYell = newLines.filter(x => !x.yelled && x.dependencies[0].yelled && x.dependencies[1].yelled);
    theseWillYell.forEach(x => {
      x.number = x.number();
      x.yelled = true;
    })
  }
  return root.number
}

console.log(problem2(input))
