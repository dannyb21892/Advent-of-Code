import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return line.split('').map(char => {
      return {
        char, beamDirs: []
      }
    })
  });
  lines.forEach((line,y) => {
    line.forEach((char,x) => {
      char.up = lines[y-1] ? lines[y-1][x] : null;
      char.down = lines[y+1] ? lines[y+1][x] : null;
      char.left = line[x-1] || null;
      char.right = line[x+1] || null;
      char.x = x;
      char.y = y;
    })
  })
  let charMap = {
    '|': {
      right: ['up', 'down'],
      left: ['up', 'down']
    },
    '-': {
      up: ['left', 'right'],
      down: ['left', 'right']
    },
    ']': {
      right: ['down'], left: ['up'],
      up: ['left'], down: ['right']
    },
    '/': {
      right: ['up'], left: ['down'],
      up: ['right'], down: ['left']
    }
  };
  let beams = [{spot: {right: lines[0][0]}, dir: 'right'}];
  let total = 0;
  while(beams.length){
    let newBeams = [];
    beams.forEach(beam => {
      beam.spot = beam.spot[beam.dir];
      if(beam.spot){
        if(!beam.spot.beamDirs.includes(beam.dir)){
          total += beam.spot.beamDirs.length === 0;
          beam.spot.beamDirs.push(beam.dir);
          if(charMap[beam.spot.char] && charMap[beam.spot.char][beam.dir]){
            charMap[beam.spot.char][beam.dir].forEach(newDir => {
              newBeams.push({spot: beam.spot, dir: newDir})
            })
          }
          else {
            newBeams.push(beam)
          }
        }
      }
    })
    beams = newBeams;
  }
  return total
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return line.split('').map(char => {
      return {
        char, beamDirs: []
      }
    })
  });
  lines.forEach((line,y) => {
    line.forEach((char,x) => {
      char.up = lines[y-1] ? lines[y-1][x] : null;
      char.down = lines[y+1] ? lines[y+1][x] : null;
      char.left = line[x-1] || null;
      char.right = line[x+1] || null;
      char.x = x;
      char.y = y;
    })
  })
  let charMap = {
    '|': {
      right: ['up', 'down'],
      left: ['up', 'down']
    },
    '-': {
      up: ['left', 'right'],
      down: ['left', 'right']
    },
    ']': {
      right: ['down'], left: ['up'],
      up: ['left'], down: ['right']
    },
    '/': {
      right: ['up'], left: ['down'],
      up: ['right'], down: ['left']
    }
  };
  let startingOptions = [];
  lines[0].forEach(topspot => startingOptions.push([{spot: {down: topspot}, dir: 'down'}]));
  lines.slice(-1)[0].forEach(bottomspot => startingOptions.push([{spot: {up: bottomspot}, dir: 'up'}]));
  lines.map(line => line[0]).forEach(leftspot => startingOptions.push([{spot: {right: leftspot}, dir: 'right'}]));
  lines.map(line => line.slice(-1)[0]).forEach(rightspot => startingOptions.push([{spot: {left: rightspot}, dir: 'left'}]));
  let test = [startingOptions.find(beam => beam[0].spot.right === lines[0][0] && beam[0].dir === 'right')];
  let sum = 0;
  startingOptions.forEach((beams,i) => {
    lines.forEach(line => line.forEach(spot => spot.beamDirs = []))
    let testSum = 0;
    while(beams.length){
      let newBeams = [];
      beams.forEach(beam => {
        beam.spot = beam.spot[beam.dir];
        if(beam.spot){
          if(!beam.spot.beamDirs.includes(beam.dir)){
            testSum += beam.spot.beamDirs.length === 0;
            beam.spot.beamDirs.push(beam.dir);
            if(charMap[beam.spot.char] && charMap[beam.spot.char][beam.dir]){
              charMap[beam.spot.char][beam.dir].forEach(newDir => {
                newBeams.push({spot: beam.spot, dir: newDir})
              })
            }
            else {
              newBeams.push(beam)
            }
          }
        }
      })
      beams = newBeams;
    }
    sum = Math.max(sum,testSum)
  })
  
  return sum
}

console.log(problem2(input))
