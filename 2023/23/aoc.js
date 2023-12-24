import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => 
    line.split('').map(spot => {
      return {spot, visited: false, dist: 0}
    })
  )

  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.adj = [];
      spot.x = x;
      spot.y = y;
      let left = line[x-1];
      if(left?.spot === '<'){
        spot.adj.push({spot: line[x-2], cost: 2})
      }
      else if(left?.spot === '.'){
        spot.adj.push({spot: line[x-1], cost: 1})
      }

      let right = line[x+1];
      if(right?.spot === '>'){
        spot.adj.push({spot: line[x+2], cost: 2})
      }
      else if(right?.spot === '.'){
        spot.adj.push({spot: line[x+1], cost: 1})
      }

      let up = lines[y-1] ? lines[y-1][x] : null;
      if(up?.spot === '^'){
        spot.adj.push({spot: lines[y-2][x], cost: 2})
      }
      else if(up?.spot === '.'){
        spot.adj.push({spot: lines[y-1][x], cost: 1})
      }

      let down = lines[y+1] ? lines[y+1][x] : null;
      if(down?.spot === 'v'){
        spot.adj.push({spot: lines[y+2][x], cost: 2})
      }
      else if(down?.spot === '.'){
        spot.adj.push({spot: lines[y+1][x], cost: 1})
      }

    })
  });

  let currents = [{spot: lines[0][1], from: null}];
  let end = lines.slice(-1)[0].slice(-2)[0];
  while(currents.length){
    let newCurrents = [];
    currents.forEach(current => {
      newCurrents = [
        ...newCurrents,
        ...current.spot.adj.filter(adj => adj.spot !== current.from).map(newCurrent => {
          newCurrent.spot.dist = Math.max(newCurrent.spot.dist, current.spot.dist + newCurrent.cost)
          return {spot: newCurrent.spot, from: current.spot}
        })
      ]
    });
    currents = newCurrents;
  }
  return end.dist;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => line.split('').map(spot => ({spot})));

  let start = lines[0][1];
  start.crossroads = true;
  let crossroads = [start];
  //turn every spot into an object that has an adj array of all adjacent open spots you could move to
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      if(spot.spot !== '#'){
        spot.adj = [];
        spot.x = x;
        spot.y = y;
        let left = line[x-1];
        if(left && left?.spot !== '#') spot.adj.push(line[x-1])
  
        let right = line[x+1];
        if(right && right?.spot !== '#') spot.adj.push(line[x+1])
  
        let up = lines[y-1] ? lines[y-1][x] : null;
        if(up && up?.spot !== '#') spot.adj.push(lines[y-1][x])
  
        let down = lines[y+1] ? lines[y+1][x] : null;
        if(down && down?.spot !== '#') spot.adj.push(lines[y+1][x])
  
        if(spot.adj.length > 2) {
          spot.crossroads = true;
          crossroads.push(spot);
        }
      }
    })
  });

  //for all spots marked as crossroads (adj.length > 2), start at each of the crossroads adj spots, and
  //march along them until you hit another crossroads. on the corresponding starting crossroad-adj spot, 
  //save the length of the path and the crossroads where it ends
  crossroads.forEach(crossroad => {
    crossroad.adj.forEach(current => {
      let spot = current;
      let allSpots = [spot];
      let done = false;
      while(!done){
        let nextSpot = spot.adj.find(adj => !allSpots.includes(adj) && !(allSpots.length === 1 && adj.crossroads));
        if(nextSpot) {
          spot = nextSpot
          allSpots.push(spot);
        }
        done = !nextSpot || spot.crossroads
      }
      current.pathSegment = {endSpot: spot, pathLength: allSpots.length - (current === start ? 1 : 0)}
    })
  });
  let end = lines.slice(-1)[0].slice(-2)[0];
  return dfs(start, 0, end).globalMax
}

let dfs = (current, pathLength, end, globalMax = 0) => {
  current.visited = true;
  let newPathLength = pathLength;
  let validAdj = current.adj.filter(a => a.pathSegment && !a.pathSegment.endSpot.visited);
  validAdj.forEach(v => {
    let result = dfs(v.pathSegment.endSpot, v.pathSegment.pathLength + pathLength, end, globalMax);
    newPathLength = Math.max(pathLength, result.newPathLength);
    globalMax = result.globalMax
  })
  current.visited = false;
  if(current === end){
    globalMax = Math.max(globalMax, newPathLength);
  }
  return {newPathLength, globalMax};
}

console.log(problem2(input))
//4722 too low