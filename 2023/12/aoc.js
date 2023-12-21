import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath);

let log = false;

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return {
      springs: line.split(' ')[0].split(''),
      groups: line.split(' ')[1].split(',').map(Number)
    }
  });
  let sum = 0;
  lines.forEach(line => {
    let configs = findConfigs(line);
    //console.log(configs)
    sum += countConfigs(
      configs,
      line.springs.map((x,i) => x === '#' ? i : null).filter(x => x !== null)
    );
  })
  return sum;
}

let findConfigs = (line) => {
  let configsByGroup = [];
  line.groups.forEach((group,gi) => {
    let lastGroupConfigsEndAtTheseIndices = configsByGroup[gi-1] ? configsByGroup[gi-1].map(c => c.indexRange[1]) : [-2];
    let currentGroupConfigsIndexRanges = [];
    for(let i = Math.min(...lastGroupConfigsEndAtTheseIndices) + 2; i < line.springs.length; i++){
      //console.log('****\n', gi,i)
      let testGroupSlice = line.springs.slice(i,i+group);
      let noEmptySpots = testGroupSlice.every(testSpring => testSpring !== '.');
      let noBrokenOnLeft = line.springs[i-1] !== '#';
      let noBrokenOnEnds = noBrokenOnLeft && line.springs[i+group] !== '#';
      let remainingSpaceNeeded = line.groups.slice(gi + 1).reduce((acc,group) => acc + group + 1, 0);
      let existingRemainingSpace = line.springs.length - (i + group);
      let neededSpaceExists = existingRemainingSpace >= remainingSpaceNeeded;
      let islastGroup = gi === line.groups.length - 1;
      let unaccountedForBrokenSprings = islastGroup ? 
        line.springs.slice(i+group).find(spring => spring === '#') : false;
      //console.log(noEmptySpots, noBrokenOnEnds, neededSpaceExists, !unaccountedForBrokenSprings)
      //console.log(noBrokenOnLeft, i-1, Math.max(...lastGroupConfigsEndAtTheseIndices), !noBrokenOnLeft && i-1 > Math.max(...lastGroupConfigsEndAtTheseIndices), !neededSpaceExists, unaccountedForBrokenSprings)
      if(noEmptySpots && noBrokenOnEnds && neededSpaceExists && !unaccountedForBrokenSprings){
        //console.log(i, i + group-1)
        currentGroupConfigsIndexRanges.push({totalBeneath: 1, indexRange: [i, i + group-1]});
      }
      else if(currentGroupConfigsIndexRanges.length && 
        (
          (!noBrokenOnLeft && i-1 > Math.max(...lastGroupConfigsEndAtTheseIndices)) || 
          !neededSpaceExists || 
          unaccountedForBrokenSprings
        )
      ){
        break;
      }
    }
    configsByGroup.push(currentGroupConfigsIndexRanges);
  })
  //console.log(JSON.stringify(configsByGroup))
  return configsByGroup;
}

let countConfigs = (configs, requiredBrokenSpringIndices) => {
  configs.forEach((config, i) => {
    if(i === 0){
      config.forEach(option => option.totalBeneath = 1);
    }
    else {
      config.forEach(option => {
        option.totalBeneath = configs[i-1].reduce((acc, belowOption) => {
          return acc + (belowOption.indexRange[1] <= option.indexRange[0] - 2 &&
            !requiredBrokenSpringIndices.find(r => r < option.indexRange[0] && r > belowOption.indexRange[1])
             ? belowOption.totalBeneath : 0)
        }, 0)
      })
    }
  })
  //console.log(JSON.stringify(configs))

  return configs.slice(-1)[0].reduce((acc, topLevelOption) => acc + topLevelOption.totalBeneath, 0);
}

let countConfigs1 = (currents, currentIndex, all, requiredBrokenSpringIndices, memoized = {}, depth = 0) => {
  let sum = 0;
  //console.log(currentIndex)
  currents.forEach((current,ci) => {
    if(depth === 0) console.log(ci,'/',currents.length-1)
    if(currentIndex === all.length - 1){
      //console.log('end', currentIndex, current)
      sum++;
    }
    else {
      //console.log('not end', currentIndex, current);
      let memo = `${currentIndex}|${current[0]}`;
      let validNext = memoized[memo] || all[currentIndex + 1].filter(x => 
        x[1] <= current[0] - 2 &&
        !requiredBrokenSpringIndices.find(r => r < current[0] && r > x[1])
      );
      memoized[memo] = validNext;
      //console.log('next', validNext)
      sum += countConfigs(validNext, currentIndex + 1, all, requiredBrokenSpringIndices, memoized, depth + 1);
    }
  })
  return sum;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return {
      springs: (new Array(5).fill(line.split(' ')[0])).join('?').split(''),
      groups: (new Array(5).fill(line.split(' ')[1])).join(',').split(',').map(Number)
    }
  });
  let sum = 0;
  lines.forEach((line,i) => {
    //console.log(i)
    let configs = findConfigs(line);
    //console.log(configs)
    sum += countConfigs(
      configs,
      line.springs.map((x,i) => x === '#' ? i : null).filter(x => x !== null)
    );
  })
  return sum;
}

console.log(problem2(input))
