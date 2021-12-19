import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let grid = input.split('\n')
    .map((l,i) => l.split('').map((n,j) => {
      return {
        risk: Number(n),
        totalRisk: (!(i || j) ? 0 : Infinity),
        visited: false,
        adj: [],
      }
    }));

  grid.forEach((row, ri) => {
    row.forEach((pos, pi) => {
      let up = grid[ri-1] ? grid[ri-1][pi] : null;
      let down = grid[ri+1] ? grid[ri+1][pi] : null;
      let left = grid[ri][pi-1] || null;
      let right = grid[ri][pi+1] || null;
      let adj = [up, down, left, right];
      adj.forEach(a => {
        if(a){
          pos.adj.push(a)
        }
      });
    })
  });

  let destination = grid[grid.length - 1][grid[0].length - 1];

  let allNodes = [];
  grid.forEach(row => allNodes = [...allNodes, ...row]);

  let current = allNodes[0];
  while(!destination.visited){
    let unvisitedAdj = current.adj.filter(a => !a.visited);
    unvisitedAdj.forEach(a => {
      a.totalRisk = Math.min(a.totalRisk, current.totalRisk + a.risk)
    });
    current.visited = true;
    let unvisited = allNodes.filter(n => !n.visited);
    if(unvisited.length){
      let minRisk = Math.min(...unvisited.map(n => n.totalRisk));
      current = unvisited.find(a => a.totalRisk === minRisk);
    }
  }
  return destination.totalRisk
}

//console.log(problem(input))

const problem2 = (input) => {
  let grid = input.split('\n')
    .map((l,i) => l.split('').map((n,j) => {
      return
      {
        risk: Number(n),
        totalRisk: (!(i || j) ? 0 : Infinity),
        visited: false,
        adj: [],
      }
    }));

  grid.forEach((row, ri) => {
    let newRow = [...row];
    for(let i = 1; i <= 4; i++){
      newRow = [...newRow, ...row.map(pos => {
          let newRisk = pos.risk + i;
          return {
            risk: newRisk > 9 ? newRisk - 9 : newRisk,
            totalRisk: Infinity,
            visited: false,
            adj: []
          }
        })
      ]
    }
    grid[ri] = newRow;
  });

  let newGrid = [...grid];
  console.log(grid.length, grid[0].length)

  for(let i = 1; i <= 4; i++){
    grid.forEach((row, ri) => {
      let newRow = row.map(pos => {
        let newRisk = pos.risk + i;
        return {
          risk: newRisk > 9 ? newRisk - 9 : newRisk,
          totalRisk: Infinity,
          visited: false,
          adj: []
        }
      });
      newGrid.push(newRow);
    })
  }

  grid = newGrid;

  grid.forEach((row, ri) => {
    row.forEach((pos, pi) => {
      let up = grid[ri-1] ? grid[ri-1][pi] : null;
      let down = grid[ri+1] ? grid[ri+1][pi] : null;
      let left = grid[ri][pi-1] || null;
      let right = grid[ri][pi+1] || null;
      let adj = [up, down, left, right];
      adj.forEach(a => {
        if(a){
          pos.adj.push(a)
        }
      });
    })
  });

  let destination = grid[grid.length - 1][grid[0].length - 1];

  let allNodes = [];
  grid.forEach(row => allNodes = [...allNodes, ...row]);
  grid = null;

  let current = allNodes[0];
  while(!destination.visited){
    let unvisitedAdj = current.adj.filter(a => !a.visited);
    unvisitedAdj.forEach(a => {
      a.totalRisk = Math.min(a.totalRisk, current.totalRisk + a.risk)
    });
    current.visited = true;
    let unvisited = allNodes.filter(n => !n.visited);
    if(unvisited.length){
      let minRisk = Infinity;
      unvisited.forEach(n => minRisk = (minRisk < n.totalRisk) ? minRisk : n.totalRisk);
      current = unvisited.find(a => a.totalRisk === minRisk);
    }
  }
  return destination.totalRisk
}

console.log(problem2(input))
