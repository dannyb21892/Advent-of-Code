import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let rows = input.split('\n');
  rows = rows.map(r => r.split('').map(Number));
  const maxRow = rows.length - 1;
  const rowSize = rows[0].length - 1;
  let out = 0;
  rows.forEach((r,i) => {
    r.forEach((s,j) => {
      let adj = [];
      if(j > 0){
        adj.push(r[j-1]);
      }
      if(j < rowSize){
        adj.push(r[j+1]);
      }
      if(i > 0){
        adj.push(rows[i-1][j]);
      }
      if(i < maxRow){
        adj.push(rows[i+1][j]);
      }
      let smaller = adj.find(x => x <= s);
      if(smaller === undefined){
        out += s+1;
      }
    })
  })
  return out
}

console.log(problem(input))

const checkAdjacents = (point, basins) => {
  point.adj.forEach(a => {
    if(!a.basin && a.val !== 9){
      a.basin = point.basin;
      basins[a.basin] = basins[a.basin] + 1;
      checkAdjacents(a, basins);
    }
  })
}

const problem2 = (input) => {
  let rows = input.split('\n');
  rows = rows.map(r => r.split('').map(Number));
  let basinNum = 1;
  const basins = {1: 0};
  rows.forEach((r,i) => {
    r.forEach((s,j) => {
      r[j] = {
        val: s,
        adj: [],
        low: false,
        basin: null
      }
    })
  })

  const maxRow = rows.length - 1;
  const rowSize = rows[0].length - 1;
  rows.forEach((r,i) => {
    r.forEach((s,j) => {
      if(j > 0){
        s.adj.push(r[j-1]);
      }
      if(j < rowSize){
        s.adj.push(r[j+1]);
      }
      if(i > 0){
        s.adj.push(rows[i-1][j]);
      }
      if(i < maxRow){
        s.adj.push(rows[i+1][j]);
      }
      let smaller = s.adj.find(x => x.val <= s.val);
      if(smaller === undefined){
        s.low = true;
        s.basin = basinNum;
        basins[basinNum] = basins[basinNum]+1;
        basinNum++;
        basins[basinNum] = 0;
      }
    })
  });

  let all = [];
  rows.forEach(r => {
    all = [...all, ...r];
  });
  let lows = all.filter(x => x.low);

  lows.forEach(l => checkAdjacents(l, basins));

  return Object.values(basins).sort((a,b) => b-a).slice(0,3).reduce((a,b) => a*b,1);
}



console.log(problem2(input))
