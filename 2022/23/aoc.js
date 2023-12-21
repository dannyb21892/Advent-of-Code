import { input, test, test2 } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let dirs = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
  let flatGrid = [];
  let elves = [];
  let grid = input.split('\n').filter(x=>x).map((row, ri) => row.split('').map((spot, si) => {
    let s = {
      type: spot,
      x: si,
      y: ri,
      adj: {}
    };
    flatGrid.push(s);
    if(spot === '#') elves.push(s);
    return s;
  }));
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      let NW = flatGrid.find(spot => spot.y === ri-1 && spot.x === si-1);
      if(!NW){ NW = {type: '.', y: ri-1, x: si-1, adj: {SE: spot}}; flatGrid.push(NW)}
      let N = flatGrid.find(spot => spot.y === ri-1 && spot.x === si);
      if(!N){ N = {type: '.', y: ri-1, x: si, adj: {S: spot}}; flatGrid.push(N)}
      let NE = flatGrid.find(spot => spot.y === ri-1 && spot.x === si+1);
      if(!NE){ NE = {type: '.', y: ri-1, x: si+1, adj: {SW: spot}}; flatGrid.push(NE)}
      let W = flatGrid.find(spot => spot.y === ri && spot.x === si-1);
      if(!W){ W = {type: '.', y: ri, x: si-1, adj: {E: spot}}; flatGrid.push(W)}
      let E = flatGrid.find(spot => spot.y === ri && spot.x === si+1);
      if(!E){ E = {type: '.', y: ri, x: si+1, adj: {W: spot}}; flatGrid.push(E)}
      let SW = flatGrid.find(spot => spot.y === ri+1 && spot.x === si-1);
      if(!SW){ SW = {type: '.', y: ri+1, x: si-1, adj: {NE: spot}}; flatGrid.push(SW)}
      let S = flatGrid.find(spot => spot.y === ri+1 && spot.x === si);
      if(!S){ S = {type: '.', y: ri+1, x: si, adj: {N: spot}}; flatGrid.push(S)}
      let SE = flatGrid.find(spot => spot.y === ri+1 && spot.x === si+1);
      if(!SE){ SE = {type: '.', y: ri+1, x: si+1, adj: {NW: spot}}; flatGrid.push(SE)}
      let adj = { NW, N, NE, W, E, SW, S, SE }
      Object.entries(adj).forEach(([key,val]) => spot.adj[key] = val);
    })
  });
  let order = ['N', 'S', 'W', 'E'];
  let coordRelations = {
    N: {x: 0, y: -1},
    S: {x: 0, y: 1},
    W: {x: -1, y :0},
    E: {x: 1, y: 0}
  };
  let opposites = {
    N: 'S',
    S: 'N',
    E: 'W',
    W: 'E'
  }
  for(let round = 0; round < 10; round++){
    //console.log('ROUND ', round, '********')
    let proposedMoves = [];
    let dontNeedToMove = 0;
    let proposedMovesFreq = {};
    elves.forEach((e, i) => {
      if(Object.values(e.adj).find(a => a.type === '#')){
        //console.log(e)
        let attempt = 0;
        while(attempt < 4){
          let dir = order[(round + attempt)%4];
          let testSpots = dirs.filter(d => d.includes(dir)).map(d => e.adj[d] ? e.adj[d].type : '.');
          //if(round === 1) console.log(round, i, attempt, dir, testSpots)
          if(!testSpots.includes('#')){
            let proposedMove = e.adj[dir];
            //console.log(proposedMove, '\n\n')
            if(!proposedMove){
              proposedMove = {
                type: '.', x: coordRelations[dir].x + e.x, y: coordRelations[dir].y + e.y, adj: {}
              }
              proposedMove.adj[opposites[dir]] = e;
              flatGrid.push(proposedMove);
            }
            proposedMoves.push(proposedMove);
            proposedMovesFreq[`${proposedMove.x}-${proposedMove.y}`] = (proposedMovesFreq[`${proposedMove.x}-${proposedMove.y}`] || 0) + 1;
            break;
          }
          else if(attempt === 3){
            proposedMoves.push(undefined)
          }
          attempt++;
        }
      }
      else{
        dontNeedToMove++;
        proposedMoves.push(undefined);
      }
    });
    if(dontNeedToMove === elves.length) break;
    proposedMoves.forEach((p,i) => {
      if(p && proposedMovesFreq[`${p.x}-${p.y}`] === 1){
        //console.log(elves[i].x, elves[i].y, 'to', p.x, p.y)
        p.type = '#';
        elves[i].type = '.';

        let NW,N,NE,W,E,SW,S,SE;
        if(!p.adj.NW){
          NW = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x-1);
          if(!NW){ NW = {type: '.', y: p.y-1, x: p.x-1, adj: {SE: p}}; flatGrid.push(NW)}
        }
        if(!p.adj.N){
          N = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x);
          if(!N){ N = {type: '.', y: p.y-1, x: p.x, adj: {S: p}}; flatGrid.push(N)}
        }
        if(!p.adj.NE){
          NE = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x+1);
          if(!NE){ NE = {type: '.', y: p.y-1, x: p.x+1, adj: {SW: p}}; flatGrid.push(NE)}
        }
        if(!p.adj.W){
          W = flatGrid.find(spot => spot.y === p.y && spot.x === p.x-1);
          if(!W){ W = {type: '.', y: p.y, x: p.x-1, adj: {E: p}}; flatGrid.push(W)}
        }
        if(!p.adj.E){
          E = flatGrid.find(spot => spot.y === p.y && spot.x === p.x+1);
          if(!E){ E = {type: '.', y: p.y, x: p.x+1, adj: {W: p}}; flatGrid.push(E)}
        }
        if(!p.adj.SW){
          SW = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x-1);
          if(!SW){ SW = {type: '.', y: p.y+1, x: p.x-1, adj: {NE: p}}; flatGrid.push(SW)}
        }
        if(!p.adj.S){
          S = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x);
          if(!S){ S = {type: '.', y: p.y+1, x: p.x, adj: {N: p}}; flatGrid.push(S)}
        }
        if(!p.adj.SE){
          SE = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x+1);
          if(!SE){ SE = {type: '.', y: p.y+1, x: p.x+1, adj: {NW: p}}; flatGrid.push(SE)}
        }
        let adj = { NW, N, NE, W, E, SW, S, SE }
        Object.entries(adj).forEach(([key,val]) => p.adj[key] = p.adj[key] || val);

        elves[i] = p;
      }
      else {
        //console.log(elves[i].x, elves[i].y, 'cant move')
      }
    })
  }

  let minX = Math.min(...elves.map(e => e.x));
  let maxX = Math.max(...elves.map(e => e.x));
  let minY = Math.min(...elves.map(e => e.y));
  let maxY = Math.max(...elves.map(e => e.y));
  let area = (maxY - minY + 1)*(maxX - minX + 1);
  console.log(minX, maxX, minY, maxY, area)
  return area - flatGrid.filter(f => f.type === '#' && f.x >= minX && f.x <= maxX && f.y >= minY && f.y <= maxY).length;
}

console.log(problem(input))

const problem2 = (input) => {
  let dirs = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
  let flatGrid = [];
  let elves = [];
  let grid = input.split('\n').filter(x=>x).map((row, ri) => row.split('').map((spot, si) => {
    let s = {
      type: spot,
      x: si,
      y: ri,
      adj: {}
    };
    flatGrid.push(s);
    if(spot === '#') elves.push(s);
    return s;
  }));
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      let NW = flatGrid.find(spot => spot.y === ri-1 && spot.x === si-1);
      if(!NW){ NW = {type: '.', y: ri-1, x: si-1, adj: {SE: spot}}; flatGrid.push(NW)}
      let N = flatGrid.find(spot => spot.y === ri-1 && spot.x === si);
      if(!N){ N = {type: '.', y: ri-1, x: si, adj: {S: spot}}; flatGrid.push(N)}
      let NE = flatGrid.find(spot => spot.y === ri-1 && spot.x === si+1);
      if(!NE){ NE = {type: '.', y: ri-1, x: si+1, adj: {SW: spot}}; flatGrid.push(NE)}
      let W = flatGrid.find(spot => spot.y === ri && spot.x === si-1);
      if(!W){ W = {type: '.', y: ri, x: si-1, adj: {E: spot}}; flatGrid.push(W)}
      let E = flatGrid.find(spot => spot.y === ri && spot.x === si+1);
      if(!E){ E = {type: '.', y: ri, x: si+1, adj: {W: spot}}; flatGrid.push(E)}
      let SW = flatGrid.find(spot => spot.y === ri+1 && spot.x === si-1);
      if(!SW){ SW = {type: '.', y: ri+1, x: si-1, adj: {NE: spot}}; flatGrid.push(SW)}
      let S = flatGrid.find(spot => spot.y === ri+1 && spot.x === si);
      if(!S){ S = {type: '.', y: ri+1, x: si, adj: {N: spot}}; flatGrid.push(S)}
      let SE = flatGrid.find(spot => spot.y === ri+1 && spot.x === si+1);
      if(!SE){ SE = {type: '.', y: ri+1, x: si+1, adj: {NW: spot}}; flatGrid.push(SE)}
      let adj = { NW, N, NE, W, E, SW, S, SE }
      Object.entries(adj).forEach(([key,val]) => spot.adj[key] = val);
    })
  });
  let order = ['N', 'S', 'W', 'E'];
  let coordRelations = {
    N: {x: 0, y: -1},
    S: {x: 0, y: 1},
    W: {x: -1, y :0},
    E: {x: 1, y: 0}
  };
  let opposites = {
    N: 'S',
    S: 'N',
    E: 'W',
    W: 'E'
  }
  let round = 0;
  while(true){
    //console.log('ROUND ', round, '********')
    let proposedMoves = [];
    let dontNeedToMove = 0;
    let proposedMovesFreq = {};
    elves.forEach((e, i) => {
      if(Object.values(e.adj).find(a => a.type === '#')){
        //console.log(e)
        let attempt = 0;
        while(attempt < 4){
          let dir = order[(round + attempt)%4];
          let testSpots = dirs.filter(d => d.includes(dir)).map(d => e.adj[d] ? e.adj[d].type : '.');
          //if(round === 1) console.log(round, i, attempt, dir, testSpots)
          if(!testSpots.includes('#')){
            let proposedMove = e.adj[dir];
            //console.log(proposedMove, '\n\n')
            if(!proposedMove){
              proposedMove = {
                type: '.', x: coordRelations[dir].x + e.x, y: coordRelations[dir].y + e.y, adj: {}
              }
              proposedMove.adj[opposites[dir]] = e;
              flatGrid.push(proposedMove);
            }
            proposedMoves.push(proposedMove);
            proposedMovesFreq[`${proposedMove.x}-${proposedMove.y}`] = (proposedMovesFreq[`${proposedMove.x}-${proposedMove.y}`] || 0) + 1;
            break;
          }
          else if(attempt === 3){
            proposedMoves.push(undefined)
          }
          attempt++;
        }
      }
      else{
        dontNeedToMove++;
        proposedMoves.push(undefined);
      }
    });
    if(dontNeedToMove === elves.length) break;
    proposedMoves.forEach((p,i) => {
      if(p && proposedMovesFreq[`${p.x}-${p.y}`] === 1){
        //console.log(elves[i].x, elves[i].y, 'to', p.x, p.y)
        p.type = '#';
        elves[i].type = '.';

        let NW,N,NE,W,E,SW,S,SE;
        if(!p.adj.NW){
          NW = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x-1);
          if(!NW){ NW = {type: '.', y: p.y-1, x: p.x-1, adj: {SE: p}}; flatGrid.push(NW)}
        }
        if(!p.adj.N){
          N = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x);
          if(!N){ N = {type: '.', y: p.y-1, x: p.x, adj: {S: p}}; flatGrid.push(N)}
        }
        if(!p.adj.NE){
          NE = flatGrid.find(spot => spot.y === p.y-1 && spot.x === p.x+1);
          if(!NE){ NE = {type: '.', y: p.y-1, x: p.x+1, adj: {SW: p}}; flatGrid.push(NE)}
        }
        if(!p.adj.W){
          W = flatGrid.find(spot => spot.y === p.y && spot.x === p.x-1);
          if(!W){ W = {type: '.', y: p.y, x: p.x-1, adj: {E: p}}; flatGrid.push(W)}
        }
        if(!p.adj.E){
          E = flatGrid.find(spot => spot.y === p.y && spot.x === p.x+1);
          if(!E){ E = {type: '.', y: p.y, x: p.x+1, adj: {W: p}}; flatGrid.push(E)}
        }
        if(!p.adj.SW){
          SW = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x-1);
          if(!SW){ SW = {type: '.', y: p.y+1, x: p.x-1, adj: {NE: p}}; flatGrid.push(SW)}
        }
        if(!p.adj.S){
          S = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x);
          if(!S){ S = {type: '.', y: p.y+1, x: p.x, adj: {N: p}}; flatGrid.push(S)}
        }
        if(!p.adj.SE){
          SE = flatGrid.find(spot => spot.y === p.y+1 && spot.x === p.x+1);
          if(!SE){ SE = {type: '.', y: p.y+1, x: p.x+1, adj: {NW: p}}; flatGrid.push(SE)}
        }
        let adj = { NW, N, NE, W, E, SW, S, SE }
        Object.entries(adj).forEach(([key,val]) => p.adj[key] = p.adj[key] || val);

        elves[i] = p;
      }
      else {
        //console.log(elves[i].x, elves[i].y, 'cant move')
      }
    })
    round++;
  }
  return round+1;
}

console.log(problem2(input))
