import { input, test, test2 } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let cubes = input.split('\n').filter(x=>x).map(a => {
    return {
      x: Number(a.split(',')[0]),
      y: Number(a.split(',')[1]),
      z: Number(a.split(',')[2]),
      adj: []
    }
  });
  cubes.forEach(cube => {
    cube.adj = cubes.filter(c => {
      return (c.x === cube.x && c.y === cube.y && Math.abs(c.z - cube.z) === 1) ||
             (c.x === cube.x && c.z === cube.z && Math.abs(c.y - cube.y) === 1) ||
             (c.z === cube.z && c.y === cube.y && Math.abs(c.x - cube.x) === 1)
    })
  });
  return cubes.reduce((a,b) => a + (6 - b.adj.length), 0)
}

console.log(problem(input))

const problem2 = (input) => {
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  let cubes = input.split('\n').filter(x=>x).map(a => {
    let x = Number(a.split(',')[0]);
    maxX = Math.max(maxX, x);
    let y = Number(a.split(',')[1]);
    maxY = Math.max(maxY, y);
    let z = Number(a.split(',')[2]);
    maxZ = Math.max(maxZ, z);
    return { x, y, z, adj: {} }
  });
  cubes.forEach(cube => {
    cube.adj.left = cubes.find(c => (c.z === cube.z) && (c.y === cube.y) && (c.x === cube.x - 1));
    cube.adj.right = cubes.find(c => (c.z === cube.z) && (c.y === cube.y) && (c.x === cube.x + 1));
    cube.adj.up = cubes.find(c => (c.x === cube.x) && (c.z === cube.z) && (c.y === cube.y + 1));
    cube.adj.down = cubes.find(c => (c.x === cube.x) && (c.z === cube.z) && (c.y === cube.y - 1));
    cube.adj.front = cubes.find(c => (c.x === cube.x) && (c.y === cube.y) && (c.z === cube.z - 1));
    cube.adj.back = cubes.find(c => (c.x === cube.x) && (c.y === cube.y) && (c.z === cube.z + 1));
  });
  let externalSpots = branchOut([{x: -1, y: -1, z: -1}], cubes, [], maxX+1, maxY+1, maxZ+1);
  let total = 0;
  externalSpots.forEach(cube => {
    let left = cubes.find(c => (c.z === cube.z) && (c.y === cube.y) && (c.x === cube.x - 1));
    if(left){
      total++;
    }

    let right = cubes.find(c => (c.z === cube.z) && (c.y === cube.y) && (c.x === cube.x + 1));
    if(right){
      total++;
    }

    let up = cubes.find(c => (c.x === cube.x) && (c.z === cube.z) && (c.y === cube.y + 1));
    if(up){
      total++;
    }

    let down = cubes.find(c => (c.x === cube.x) && (c.z === cube.z) && (c.y === cube.y - 1));
    if(down){
      total++;
    }

    let front = cubes.find(c => (c.x === cube.x) && (c.y === cube.y) && (c.z === cube.z - 1));
    if(front){
      total++;
    }

    let back = cubes.find(c => (c.x === cube.x) && (c.y === cube.y) && (c.z === cube.z + 1));
    if(back){
      total++;
    }
  })
  return total;
}

let branchOut = (currentSpots, cubes, externalVisitedSpots, maxX, maxY, maxZ) => {
  externalVisitedSpots = [...externalVisitedSpots, ...currentSpots];
  let newSpotSet = [];
  currentSpots.forEach(c => {
    let left = {x: c.x-1, y: c.y, z: c.z};
    if(left.x >= 0 &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === left.x && cube.y === left.y && cube.z === left.z
      )
    ) {
      newSpotSet.push(left);
    }

    let right = {x: c.x+1, y: c.y, z: c.z};
    if(right.x <= maxX &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === right.x && cube.y === right.y && cube.z === right.z
      )
    ) {
      newSpotSet.push(right);
    }

    let up = {x: c.x, y: c.y+1, z: c.z};
    if(up.y <= maxY &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === up.x && cube.y === up.y && cube.z === up.z
      )
    ) {
      newSpotSet.push(up);
    }

    let down = {x: c.x, y: c.y-1, z: c.z};
    if(down.y >= 0 &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === down.x && cube.y === down.y && cube.z === down.z
      )
    ) {
      newSpotSet.push(down);
    }

    let front = {x: c.x, y: c.y, z: c.z-1};
    if(front.z >= 0 &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === front.x && cube.y === front.y && cube.z === front.z
      )
    ) {
      newSpotSet.push(front);
    }

    let back = {x: c.x, y: c.y, z: c.z+1};
    if(back.z <= maxZ &&
      ![...cubes, ...externalVisitedSpots, ...newSpotSet].find(
        cube => cube.x === back.x && cube.y === back.y && cube.z === back.z
      )
    ) {
      newSpotSet.push(back);
    }
  });
  if(newSpotSet.length){
    return branchOut(newSpotSet, cubes, externalVisitedSpots, maxX, maxY, maxZ);
  }
  else {
    return externalVisitedSpots;
  }
}

console.log(problem2(input))
