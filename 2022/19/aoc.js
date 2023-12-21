import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;
import * as _ from 'lodash';
getInputforDay(input, filePath)

const problem = (input) => {
  let blueprints = input.split('\n').filter(x=>x).map(x =>{
    return {
      ore: {
        ore: Number(x.split('ore robot costs ')[1].split(' ')[0])
      },
      clay: {
        ore: Number(x.split('clay robot costs ')[1].split(' ')[0])
      },
      obsidian: {
        ore: Number(x.split('obsidian robot costs ')[1].split(' ')[0]),
        clay: Number(x.split('obsidian robot costs ')[1].split(' ')[3])
      },
      geode: {
        ore: Number(x.split('geode robot costs ')[1].split(' ')[0]),
        obsidian: Number(x.split('geode robot costs ')[1].split(' ')[3])
      }
    }
  });
  let qualities = blueprints.map((bp, i) => {
    console.log('on bp number ', i+1)
    let time = new Date().valueOf();
    let maxGeodes = findMaxGeodes(
      bp,
      24,
      {ore: 1, clay: 0, obsidian: 0, geode: 0},
      [{ore: 0, clay: 0, obsidian: 0, geode: 0}],
      {},
      {}
    )[0].geode;
    console.log(maxGeodes, new Date().valueOf() - time);
    return (i+1) * maxGeodes;
  });

  return qualities.reduce((a,b) => a + b);
}

const findMaxGeodes = (bp, timeLeft, bots, resources, mostGeodeBotsByTime, memoization) => {
  if(timeLeft === 0){
    return resources
  }
  else if(mostGeodeBotsByTime[timeLeft] && (resources[0].geode < mostGeodeBotsByTime[timeLeft].geode && bots.geode < mostGeodeBotsByTime[timeLeft].geodeBots)){
    return [];
  }
  else {
    let resourceState = resources[0];
    let resourceOptions = [];
    for(let botToBuild of ['geode', 'obsidian', 'clay', 'ore']){
      let neededResources = Object.entries(bp[botToBuild]);
      let hasResourcesForThisBot = neededResources.reduce((a, [resourceType, quantityNeeded]) => {
        return a && resourceState[resourceType] >= quantityNeeded
      }, true);
      if(hasResourcesForThisBot){
        let {newBots, newResources} = buildBot(bp, bots, resourceState, botToBuild)
        newResources = gainResources(bots, newResources);
        if(!mostGeodeBotsByTime[timeLeft]){
          mostGeodeBotsByTime[timeLeft] = { geode: 0, geodeBots: 0 };
        }
        if(newResources.geode >= mostGeodeBotsByTime[timeLeft].geode && newBots.geode >= mostGeodeBotsByTime[timeLeft].geodeBots){
          mostGeodeBotsByTime[timeLeft] = {
            geode: newResources.geode,
            geodeBots: newBots.geode
          };
          console.log(mostGeodeBotsByTime)
        }
        // let stateKey = generateStateKey(timeLeft, newBots, newResources);
        let newResourceOptions;
        // if(memoization[stateKey]){
        //   newResourceOptions = memoization[stateKey];
        // }
        // else {
          newResourceOptions = findMaxGeodes(bp, timeLeft-1, newBots, [newResources], mostGeodeBotsByTime, memoization);
        //   memoization[stateKey] = newResourceOptions;
        // }
        resourceOptions = [...resourceOptions,  ...newResourceOptions];
      }
    }
    //replace the above for loop with the commented code at the bottom of the file if you want an uglier but slightly faster solution
    //always allow option to build no robots and instead simply gain resources
    let newResources = gainResources(bots, resourceState);
    if(!mostGeodeBotsByTime[timeLeft]){
      mostGeodeBotsByTime[timeLeft] = { geode: 0, geodeBots: 0 };
    }
    if(newResources.geode >= mostGeodeBotsByTime[timeLeft].geode && bots.geode >= mostGeodeBotsByTime[timeLeft].geodeBots){
      mostGeodeBotsByTime[timeLeft] = {
        geode: newResources.geode,
        geodeBots: bots.geode
      };
    }
    let stateKey = generateStateKey(timeLeft, bots, resourceState);
    let newResourceOptions;
    // if(memoization[stateKey]){
    //   newResourceOptions = memoization[stateKey];
    // }
    // else {
      newResourceOptions = findMaxGeodes(bp, timeLeft - 1, _.default.cloneDeep(bots), [newResources], mostGeodeBotsByTime, memoization);
    //   memoization[stateKey] = newResourceOptions;
    // }
    resourceOptions = [...resourceOptions, ...newResourceOptions]
    //determine the branch of all the ones tried above which resulted in the most geode in resources
    return determineBestResourceOptions(resourceOptions);
  }
}

const buildBot = (bp, bots, resources, type) => {
  let newResources = _.default.cloneDeep(resources);
  let newBots = _.default.cloneDeep(bots);
  newBots[type] = newBots[type] + 1;
  Object.entries(bp[type]).forEach(([resource, cost]) => {
    newResources[resource] = newResources[resource] - cost;
  })
  return {newBots, newResources};
}

const gainResources = (bots, resources) => {
  resources = _.default.cloneDeep(resources);
  Object.keys(bots).forEach(key => {
    resources[key] = resources[key] + bots[key];
  });
  return resources;
}

let generateStateKey = (timeLeft, bots, resources) => {
  return `${timeLeft}-${bots.ore}-${bots.clay}-${bots.obsidian}-${bots.geode}-${resources.ore}-${resources.clay}-${resources.obsidian}-${resources.geode}`
}

const determineBestResourceOptions = (resourceOptions) => {
  let maxGeodeOfOptions = 0;
  resourceOptions.forEach(r => {
    maxGeodeOfOptions = Math.max(maxGeodeOfOptions, r.geode)
  });
  let bestResourceOptions = resourceOptions.filter(r => r.geode === maxGeodeOfOptions);
  return bestResourceOptions;
}

console.log('answer: ', problem(input))

const problem2 = (input) => {

}

console.log(problem2(input))


/* if(resourceState.obsidian >= bp.geode.obsidian && resourceState.ore >= bp.geode.ore){
  let {newBots, newResources} = buildBot(bp, bots, resourceState, 'geode')
  mostGeodeBotsByTime[timeLeft] = Math.max(mostGeodeBotsByTime[timeLeft] || 0, newBots.geode);
  newResources = gainResources(bots, newResources);
  let stateKey = generateStateKey(timeLeft, newBots, newResources);
  let newResourceOptions;
  if(memoization[stateKey]){
    newResourceOptions = memoization[stateKey];
  }
  else {
    newResourceOptions = findMaxGeodes(bp, timeLeft-1, newBots, [newResources], mostGeodeBotsByTime, memoization);
    memoization[stateKey] = newResourceOptions;
  }
  resourceOptions = [...resourceOptions,  ...newResourceOptions];
}
if(resourceState.clay >= bp.obsidian.clay && resourceState.ore >= bp.obsidian.ore){
  let {newBots, newResources} = buildBot(bp, bots, resourceState, 'obsidian')
  newResources = gainResources(bots, newResources);
  let stateKey = generateStateKey(timeLeft, newBots, newResources);
  let newResourceOptions;
  if(memoization[stateKey]){
    newResourceOptions = memoization[stateKey];
  }
  else {
    newResourceOptions = findMaxGeodes(bp, timeLeft-1, newBots, [newResources], mostGeodeBotsByTime, memoization);
    memoization[stateKey] = newResourceOptions;
  }
  resourceOptions = [...resourceOptions,  ...newResourceOptions];
}
if(resourceState.ore >= bp.clay.ore){
  let {newBots, newResources} = buildBot(bp, bots, resourceState, 'clay')
  newResources = gainResources(bots, newResources);
  let stateKey = generateStateKey(timeLeft, newBots, newResources);
  let newResourceOptions;
  if(memoization[stateKey]){
    newResourceOptions = memoization[stateKey];
  }
  else {
    newResourceOptions = findMaxGeodes(bp, timeLeft-1, newBots, [newResources], mostGeodeBotsByTime, memoization);
    memoization[stateKey] = newResourceOptions;
  }
  resourceOptions = [...resourceOptions,  ...newResourceOptions];
}
if(resourceState.ore >= bp.ore.ore){
  let {newBots, newResources} = buildBot(bp, bots, resourceState, 'ore')
  newResources = gainResources(bots, newResources);
  let stateKey = generateStateKey(timeLeft, newBots, newResources);
  let newResourceOptions;
  if(memoization[stateKey]){
    newResourceOptions = memoization[stateKey];
  }
  else {
    newResourceOptions = findMaxGeodes(bp, timeLeft-1, newBots, [newResources], mostGeodeBotsByTime, memoization);
    memoization[stateKey] = newResourceOptions;
  }
  resourceOptions = [...resourceOptions,  ...newResourceOptions];
} */
