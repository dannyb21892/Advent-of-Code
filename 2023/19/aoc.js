import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;
import * as __ from 'lodash';
const _ = __.default;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let startFlow;
  let flows = lines[0].split('\n').filter(Boolean).map(w => {
    let name = w.split('{')[0];
    let rules = w.split('{')[1].split('}')[0].split(',');
    let lastRule = rules.slice(-1)[0];
    let out = {name, rules: []}
    out.rules = rules.slice(0,-1).map(rule => {
      let comp = rule[1];
      let num = Number(rule.slice(2).split(':')[0]);
      let dest = rule.split(':')[1];
      return {
        part: rule[0],
        func: (x) => eval(`x${comp}${num}`),
        dest,
      }
    });
    out.rules.push({dest: lastRule});
    if(name === 'in'){
      startFlow = out
    }
    return out
  });

  let parts = lines[1]
    .replaceAll('=','":')
    .replaceAll('{','{"')
    .replaceAll(',',',"')
    .split('\n').filter(Boolean).map(JSON.parse);
  
  let accepted = [];
  parts.forEach(part => {
    let currentFlow = startFlow;
    while(true){
      let dest;
      for(let rule of currentFlow.rules){
        if(rule === currentFlow.rules.slice(-1)[0]){
          dest = rule.dest;
        }
        else if(rule.func(part[rule.part])){
          dest = rule.dest;
          break;
        }
      }
      if(dest === 'R'){
        break;
      }
      else if(dest === 'A'){
        accepted.push(part);
        break;
      }
      else {
        currentFlow = flows.find(flow => flow.name === dest);
      }
    }
  })
  return accepted.reduce((acc, rule) => acc + Object.values(rule).reduce((a,b) => a + b, 0), 0);
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let startFlow;
  let flows = lines[0].split('\n').filter(Boolean).map(w => {
    let name = w.split('{')[0];
    let rules = w.split('{')[1].split('}')[0].split(',');
    let lastRule = rules.slice(-1)[0];
    let out = {name, rules: []}
    out.rules = rules.slice(0,-1).map(rule => {
      let comp = rule[1];
      let opposite = comp === '>' ? '<=' : '>=';
      let num = Number(rule.slice(2).split(':')[0]);
      let dest = rule.split(':')[1];
      return {
        part: rule[0],
        failRange: comp === '<' ? {min: num, max: 4000} : {min: 1, max: num}, //4000 - num + 1 : num, 
        successRange: comp === '<' ? {min: 1, max: num - 1} : {min: num + 1, max: 4000},
        failFunc: (x) => eval(`x${opposite}${num}`),
        func: (x) => eval(`x${comp}${num}`),
        dest,
      }
    });
    out.rules.push({dest: lastRule});
    if(name === 'in'){
      startFlow = out
    }
    return out
  });

  let ranges = {x: {min: 1, max: 4000}, m: {min: 1, max: 4000}, a: {min: 1, max: 4000}, s: {min: 1, max: 4000}}
  return findPathsToAcceptance({flow: startFlow, ranges}, flows).reduce((acc, box) => 
    acc + Object.values(box).reduce((acc2, dimension) => 
      acc2 * (dimension.max - dimension.min + 1), 1
    ), 0
  )
}

let findPathsToAcceptance = (flowState, allFlows) => {
  let ranges = [];
  flowState.flow.rules.forEach(rule => {
    let nextRanges = _.cloneDeep(flowState.ranges);
    if(rule.part){
      nextRanges[rule.part] = {
        min: Math.max(rule.successRange.min, flowState.ranges[rule.part].min),
        max: Math.min(rule.successRange.max, flowState.ranges[rule.part].max)
      }
    };

    if(rule.dest === 'A'){
      ranges.push(nextRanges)
    }
    else if (rule.dest !== 'R'){
      let nextFlow = allFlows.find(flow => flow.name === rule.dest);
      ranges = [
        ..._.cloneDeep(ranges),
        ...findPathsToAcceptance({flow: nextFlow, ranges: nextRanges}, allFlows)
      ]
    }

    if(rule.part){
      flowState.ranges[rule.part] = {
        min: Math.max(rule.failRange.min, flowState.ranges[rule.part].min),
        max: Math.min(rule.failRange.max, flowState.ranges[rule.part].max)
      }
    }
  });
  return ranges
}

console.log(problem2(input))
