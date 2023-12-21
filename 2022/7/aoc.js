import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let d = {};
  let path = [];
  let total = 0;
  lines.forEach(x => {
    let parts = x.split(' ');
    if(parts[0] === '$'){
      if(parts[1] === 'cd' && parts[2] !== '..'){
        path.push(parts[2]);
      }
      else if(parts[1] === 'cd' && parts[2] === '..'){
        let leaf = d;
        path.forEach(p => {
          if(!leaf[p]){
            leaf[p] = {};
          }
          leaf = leaf[p];
        });
        leaf['total'] = Object.values(leaf).map(l => {
          if(!Number.isNaN(Number(l))){
            return Number(l);
          }
          else {
            return l.total;
          }
        }).reduce((a,b) => a + (b || 0), 0);
        if(leaf['total'] <= 100000){
          total += leaf['total'];
        }
        path.pop();
      }
    }
    else {
      let leaf = d;
      path.forEach(p => {
        if(!leaf[p]){
          leaf[p] = {};
        }
        leaf = leaf[p];
      });
      if(parts[0] === 'dir'){
        leaf[parts[1]] = {};
      }
      else {
        leaf[parts[1]] = Number(parts[0]);
      }
    }
  });
  return total;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let d = {};
  let path = [];
  let sizes = {};
  lines.forEach(x => {
    let parts = x.split(' ');
    if(parts[0] === '$'){
      if(parts[1] === 'cd' && parts[2] !== '..'){
        path.push(parts[2]);
      }
      else if(parts[1] === 'cd' && parts[2] === '..'){
        let leaf = d;
        path.forEach(p => {
          if(!leaf[p]){
            leaf[p] = {};
          }
          leaf = leaf[p];
        });
        leaf['total'] = Object.values(leaf).map(l => {
          if(!Number.isNaN(Number(l))){
            return Number(l);
          }
          else {
            return l.total;
          }
        }).reduce((a,b) => a + (b || 0), 0);
        let curDir = path.slice(-1)[0];
        sizes[curDir] = leaf['total'];
        path.pop();
      }
    }
    else {
      let leaf = d;
      path.forEach(p => {
        if(!leaf[p]){
          leaf[p] = {};
        }
        leaf = leaf[p];
      });
      if(parts[0] === 'dir'){
        leaf[parts[1]] = {};
      }
      else {
        leaf[parts[1]] = Number(parts[0]);
      }
    }
  });
  d['/']['total'] = Object.values(d['/']).map(l => {
    if(!Number.isNaN(Number(l))){
      return Number(l);
    }
    else {
      return l.total;
    }
  }).reduce((a,b) => a + (b || 0), 0);
  let used = d['/']['total'];
  let needToDel = 30000000 - (70000000 - used);
  console.log(used, needToDel)
  return Object.entries(sizes).filter(([key, val]) => {
    return val >= needToDel
  }).sort((a,b) => {
    return a[1] - b[1]
  })[0]
}

console.log(problem2(input))
