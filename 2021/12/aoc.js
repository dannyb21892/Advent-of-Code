import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let nodes = [];
  lines.forEach(line => {
    let n = line.split('-');
    const first = nodes.find(x => x.val === n[0]) || {
      val: n[0],
      big: n[0] === n[0].toUpperCase(),
      adjacents: [],
    };
    let second = nodes.find(x => x.val === n[1]) || {
      val: n[1],
      big: n[1] === n[1].toUpperCase(),
      adjacents: [first],
    };
    if(!first.adjacents.includes(second)){
      first.adjacents.push(second);
    }
    if(!second.adjacents.includes(first)){
      second.adjacents.push(first);
    }
    if(!nodes.includes(first)){
      nodes.push(first)
    }
    if(!nodes.includes(second)){
      nodes.push(second)
    }
  });

  const start = nodes.find(x => x.val === 'start');
  let pathTotal = findPaths(nodes, start);
  return pathTotal
}

const findPaths = (nodes, current, path = [], pathCount = 0) => {
  path.push(current);
  current.adjacents.forEach(adj => {
    if((!path.includes(adj) || adj.big) && adj.val !== 'end'){
      pathCount = findPaths(nodes, adj, [...path], pathCount);
    }
    else if (adj.val === 'end'){
      pathCount += 1;
    }
  })
  return pathCount
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let nodes = [];
  lines.forEach(line => {
    let n = line.split('-');
    const first = nodes.find(x => x.val === n[0]) || {
      val: n[0],
      big: n[0] === n[0].toUpperCase(),
      adjacents: [],
    };
    let second = nodes.find(x => x.val === n[1]) || {
      val: n[1],
      big: n[1] === n[1].toUpperCase(),
      adjacents: [first],
    };
    if(!first.adjacents.includes(second)){
      first.adjacents.push(second);
    }
    if(!second.adjacents.includes(first)){
      second.adjacents.push(first);
    }
    if(!nodes.includes(first)){
      nodes.push(first)
    }
    if(!nodes.includes(second)){
      nodes.push(second)
    }
  });

  const start = nodes.find(x => x.val === 'start');
  let pathTotal = findPaths2(nodes, start);
  return pathTotal
}

const findPaths2 = (nodes, current, path = {smallFlag: false, path: []}, pathCount = 0) => {
  path.path.push(current);
  current.adjacents.forEach(adj => {
    if(adj.val !== 'end' &&
      (adj.big || (!adj.big && !path.path.includes(adj)) ||
        (!adj.big && path.path.includes(adj) && !path.smallFlag && adj.val.length <= 3)
      )
    ){
      pathCount = findPaths2(
        nodes,
        adj,
        {
          smallFlag: path.smallFlag || (!path.smallFlag && !adj.big && path.path.includes(adj)),
          path: [...path.path]
        },
        pathCount,
      );
    }
    else if (adj.val === 'end'){
      pathCount += 1;
    }
  })
  return pathCount
}

console.log(problem2(input))
