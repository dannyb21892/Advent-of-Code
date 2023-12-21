import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input, size) => {
  let correctBeacons = [];
  let lines = input.split('\n').filter(x=>x).map(x => {
    let sensor = {
      x: Number(x.split('x=')[1].split(',')[0]),
      y: Number(x.split('y=')[1].split(':')[0]),
    };
    let beacon = {
      x: Number(x.split('x=')[2].split(',')[0]),
      y: Number(x.split('y=')[2]),
    };
    if(beacon.y === size && !correctBeacons.find(b => b.x === beacon.x)){
      correctBeacons.push(beacon)
    }
    let dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    return {
      sensor, beacon, dist
    }
  });
  //let cant = [];
  let ranges = [];
  lines.forEach(x => {
    let distToTarget = Math.abs(size - x.sensor.y);
    if(distToTarget <= x.dist){
      ranges.push([
        x.sensor.x - Math.abs(distToTarget - x.dist),
        x.sensor.x + Math.abs(distToTarget - x.dist)
      ]);
    }
  });
  let min = Math.min(...ranges.map(r => r[0]));
  let max = Math.max(...ranges.map(r => r[1]));
  let count = 0;
  for(let i = min; i <= max; i++){
    count += ranges.find(r => r[0] <= i && r[1] >= i) ? 1 : 0;
  }
  return count - correctBeacons.length;
}

console.log(problem(input, 2000000))

const problem2 = (input, size) => {
  let beacons = [];
  let lines = input.split('\n').filter(x=>x).map(x => {
    let sensor = {
      x: Number(x.split('x=')[1].split(',')[0]),
      y: Number(x.split('y=')[1].split(':')[0]),
    };
    let beacon = {
      x: Number(x.split('x=')[2].split(',')[0]),
      y: Number(x.split('y=')[2]),
    };
    if(!beacons.find(b => b.x === beacon.x && b.y === beacon.y)){
      beacons.push(beacon)
    }
    let dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    return {sensor, beacon, dist}
  });
  let furthestFromEachBeacon = beacons.map(b => {
    let relevant = lines.filter(x => x.beacon.x === b.x && x.beacon.y === b.y);
    let maxDist = Math.max(...relevant.map(x => x.dist))
    return relevant.find(r => r.dist === maxDist);
  });
  let i = -1;
  let done = false;
  let ranges = [];
  while(!done){
    i++;
    let shouldBreak = false;
    ranges = [];
    lines.forEach(x => {
      let distToi = Math.abs(i - x.sensor.y);
      if(distToi <= x.dist){
        ranges.push([
          x.sensor.x - Math.abs(distToi - x.dist),
          x.sensor.x + Math.abs(distToi - x.dist)
        ])
      }
    })
    if(!coverage(ranges, [0,size])){
      done = true;
    };
  }
  let j = -1;
  done = false;
  while(!done){
    j++;
    let range = ranges.find(r => r[0] <= j && r[1] >= j);
    if(!range) done = true;
  }
  return (j * 4000000) + i;
}

let coverage = (ranges, [coverageMin, coverageMax]) => {
  ranges.sort((a, b) => a[0] - b[0]);
  for(let [rangeMin, rangeMax] of ranges) {
    if(
      coverageMin < rangeMin ||
      coverageMax < rangeMin ||
      coverageMin > coverageMax
    ){
      break;
    }
    coverageMin = Math.max(coverageMin, rangeMax + 1);
  }
  return coverageMin > coverageMax
}

console.log(problem2(input, 4000000))
