import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return line.split('').map(spot => { return {spot}})
  });
  let currents = [];
  lines.forEach((line, y) => {
    line.forEach((spot, x) => {
      spot.x = x;
      spot.y = y;
      spot.up = lines[y-1] ? lines[y-1][x] : null;
      spot.down = lines[y+1] ? lines[y+1][x] : null;
      spot.left = line[x-1] || null;
      spot.right = line[x+1] || null;
      spot.adj = [spot.up, spot.down, spot.left, spot.right].filter(x => x && x.spot !== '#');
      if(!spot.adj) console.log(spot)
      if(spot.spot === 'S') currents.push(spot);
    })
  });

  for(let steps = 1; steps <= 64; steps++){
    let newCurrents = new Set();
    currents.forEach(c => {
      c.adj.forEach(adj => {
        newCurrents.add(adj)
      });
    })
    currents = [...newCurrents];
  }
  return currents.length
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return line.split('').map(spot => { return {spot}})
  });
  let currents = [];
  lines.forEach((line, y) => {
    line.forEach((spot, x) => {
      spot.x = x;
      spot.y = y;
      spot.visited = false;
      spot.existingGridCoordsByStepCount = new Set(['{"x":0,"y":0}']);
      spot.nextExistingGridCoordsByStepCount = new Set();
      if(lines[y-1] && lines[y-1][x].spot !== '#'){
        spot.up = (fromCoords) => {
          lines[y-1][x].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y})
          )
          return lines[y-1][x];
        }
      }
      else if(!lines[y-1] && lines.slice(-1)[0][x].spot !== '#'){
        spot.up = (fromCoords) => {
          lines.slice(-1)[0][x].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y - 1})
          );
          return lines.slice(-1)[0][x];
        };
      }

      if(lines[y+1] && lines[y+1][x].spot !== '#'){
        spot.down = (fromCoords) => {
          lines[y+1][x].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y})
          )
          return lines[y+1][x];
        }
      }
      else if(!lines[y+1] && lines.slice(-1)[0][x].spot !== '#'){
        spot.down = (fromCoords) => {
          lines[0][x].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y + 1})
          );
          return lines[0][x];
        };
      }

      if(line[x-1] && line[x-1].spot !== '#'){
        spot.left = (fromCoords) => {
          line[x-1].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y})
          )
          return line[x-1];
        }
      }
      else if(!line[x-1] && line.slice(-1)[0].spot !== '#'){
        spot.left = (fromCoords) => {
          line.slice(-1)[0].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x-1,"y":fromCoords.y})
          );
          return line.slice(-1)[0];
        };
      }

      if(line[x+1] && line[x+1].spot !== '#'){
        spot.right = (fromCoords) => {
          line[x+1].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x,"y":fromCoords.y})
          )
          return line[x+1];
        }
      }
      else if(!line[x+1] && line[0].spot !== '#'){
        spot.right = (fromCoords) => {
          line[0].nextExistingGridCoordsByStepCount.add(
            JSON.stringify({"x":fromCoords.x+1,"y":fromCoords.y})
          );
          return line[0];
        };
      }

      spot.adj = [spot.up, spot.down, spot.left, spot.right].filter(Boolean);
      if(spot.spot === 'S') currents.push(spot);
    })
  });
  let gridZeroLastVisited = 0;
  for(let steps = 1; steps <= 5000; steps++){
    if(steps % 131 === 0) console.log(steps, currents.reduce((acc,c) => acc + c.existingGridCoordsByStepCount.size, 0))
    let newCurrents = new Set();
    currents.forEach(c => {
      c.adj.forEach(adj => {
        c.existingGridCoordsByStepCount.forEach(fromCoords => {
          let newCurrent = adj(JSON.parse(fromCoords));
          // if(!newCurrent.visited && newCurrent.nextExistingGridCoordsByStepCount.has('{"x":0,"y":0}')){
          //   newCurrent.visited = true;
          //   gridZeroLastVisited = steps;
          //   //console.log(gridZeroLastVisited);
          // }
          newCurrents.add(newCurrent);
        })
      });
    })
    currents = [...newCurrents].map(nc => {
      nc.existingGridCoordsByStepCount = nc.nextExistingGridCoordsByStepCount;
      nc.nextExistingGridCoordsByStepCount = new Set();
      return nc
    });
  }
  //console.log(currents)
  return currents.reduce((acc,c) => acc + c.existingGridCoordsByStepCount.size, 0);
}

console.log(problem2(input))
