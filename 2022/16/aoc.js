import { input, test, test2 } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let valves = input.split('\n').filter(x=>x).map(x => {
    return {
      valve: x.split(' ')[1],
      flow: Number(x.split('=')[1].split(';')[0]),
      to: x.split('valve')[1].split(' ').slice(1).join(' ').split(', '),
    }
  });
  valves.forEach(v => {
    v.to = v.to.map(x => valves.find(y => y.valve === x))
  });
  let flows = valves.filter(v => v.flow);
  let current = valves.find(x => x.valve === 'AA');
  valves.forEach(v => {
    let visited = [v];
    let lastRound = [v]
    let distances = {};
    let distance = 0;
    while(!flows.every(f => visited.includes(f))){
      distance++;
      let thisRound = [];
      lastRound.forEach(vis => {
        thisRound = [...thisRound, ...vis.to]
        vis.to.forEach(t => distances[t.valve] = Math.min(distances[t.valve] || Infinity, distance));
      })
      lastRound = thisRound.filter(x => !visited.includes(x))
      visited = [...visited, ...lastRound];
    }
    v.distances = distances;
  });
  let pressures = traverse(current, flows);
  return Math.max(...pressures)
}

let traverse = (current, flows, timeLeft = 30, pressure = 0) => {
  let availableFlows = flows.filter(f => current.distances[f.valve] < timeLeft);
  if(!availableFlows.length){
    return [pressure];
  }
  else {
    let pressures = [];
    availableFlows.forEach(f => {
      let p = traverse(
        f,
        availableFlows.filter(x => x !== f),
        timeLeft - current.distances[f.valve] - 1,
        pressure + f.flow * (timeLeft - current.distances[f.valve] - 1),
      );
      pressures = [...pressures, ...p]
    });
    return pressures;
  }
}

console.log(problem(input))

const problem2 = (input) => {
  let valves = input.split('\n').filter(x=>x).map(x => {
    return {
      valve: x.split(' ')[1],
      flow: Number(x.split('=')[1].split(';')[0]),
      to: x.split('valve')[1].split(' ').slice(1).join(' ').split(', '),
    }
  });
  valves.forEach(v => {
    v.to = v.to.map(x => valves.find(y => y.valve === x))
  });
  //flows = positive flow valves
  let flows = valves.filter(v => v.flow);
  let current = valves.find(x => x.valve === 'AA');
  valves.forEach(v => {
    let visited = [v];
    let lastRound = [v]
    let distances = {};
    let distance = 0;
    while(!flows.every(f => visited.includes(f))){
      distance++;
      let thisRound = [];
      lastRound.forEach(vis => {
        thisRound = [...thisRound, ...vis.to]
        vis.to.forEach(t => distances[t.valve] = Math.min(distances[t.valve] || Infinity, distance));
      })
      lastRound = thisRound.filter(x => !visited.includes(x))
      visited = [...visited, ...lastRound];
    }
    valves.forEach(x => {
      if((!flows.includes(x) || x === v) && distances[x.valve]){
        delete distances[x.valve];
      }
    })
    //distances attribute of each valve represents how far it it is from all positive flow valves
    /*example for valve AA where positive flow valves BB, CC and DD are 5, 1 and 6 time steps away respectively:
      {
        valve: 'AA',
        flow: 0,
        distances: {
          BB: 5, CC: 1, DD: 6
        }
      }
    */
  }
    v.distances = distances;
  });
  //each of these inputs has two elements. for each, the first element represents the human, and the second represents the elephant
  return traverse2([current, current], [flows, flows], [26,26], [0, 0], ['AA', 'AA']);
}

const traverse2 = (current, flows, timeLeft, pressure, path) => {
  let availableFlows = [
    flows[0].filter(f => f.valve !== current[0].valve && current[0].distances[f.valve] < timeLeft[0]),
    flows[1].filter(f => f.valve !== current[1].valve && current[1].distances[f.valve] < timeLeft[1])
  ];

  if(!availableFlows[0].length && !availableFlows[1].length){
    //if neither human nor elephant has available positive flow valves to go to, return the sum of their pressures to this point
    return pressure[0] + pressure[1];
  }
  else if(availableFlows[0].length && !availableFlows[1].length){
    //if human has an available path to a positive flow valve, take it
    let maxPressure = 0;
    availableFlows[0].forEach(f => {
      let notF = [availableFlows[0].filter(x => x !== f), []];
      let newTime = [timeLeft[0] - current[0].distances[f.valve] - 1, timeLeft[1]];
      let newCurrent = [f, current[1]];
      let newPressure = [
        pressure[0] + f.flow * (timeLeft[0] - current[0].distances[f.valve] - 1),
        pressure[1]
      ];
      let p = traverse2(
        newCurrent,
        notF,
        newTime,
        newPressure,
        [path[0] + f.valve, path[1]]
      );
      maxPressure = Math.max(maxPressure, p)
    })
    return maxPressure
  }
  else if(!availableFlows[0].length && availableFlows[1].length) {
    //if elephant has an available path to a positive flow valve, take it
    let maxPressure = 0;
    availableFlows[1].forEach(f => {
      let notF = [[], availableFlows[1].filter(x => x !== f)];
      let newTime = [timeLeft[0], timeLeft[1] - current[1].distances[f.valve] - 1];
      let newCurrent = [current[0], f];
      let newPressure = [
        pressure[0],
        pressure[1] + f.flow * (timeLeft[1] - current[1].distances[f.valve] - 1)
      ];
      let p = traverse2(
        newCurrent,
        notF,
        newTime,
        newPressure,
        [path[0], path[1] + f.valve]
      );
      maxPressure = Math.max(maxPressure, p)
    })
    return maxPressure
  }
  else {
    //if both human and elephant have an available path to a positive flow valve, take them
    let maxPressure = 0;
    availableFlows[0].forEach(f => {
      let notFElephant = availableFlows[1].filter(x => x !== f);
      notFElephant.forEach(f2 => {
        let notForF2Elephant = notFElephant.filter(x => x !== f2);
        let notForF2Human = availableFlows[0].filter(x => (x !== f && x !== f2));
        let notFOrF2 = [
          notForF2Human,
          notForF2Elephant
        ];
        let newTime = [
          timeLeft[0] - current[0].distances[f.valve] - 1,
          timeLeft[1] - current[1].distances[f2.valve] - 1
        ];
        let newPressureHuman = pressure[0] + f.flow * (timeLeft[0] - current[0].distances[f.valve] - 1);
        let newPressureElephant = pressure[1] + f2.flow * (timeLeft[1] - current[1].distances[f2.valve] - 1);
        let newPressure = [newPressureHuman, newPressureElephant];
        let newCurrent = [f, f2];
        let newPath = [path[0] + f.valve, path[1] + f2.valve];
        let p = traverse2(
          newCurrent,
          notFOrF2,
          newTime,
          newPressure,
          newPath
        );
        let p2 = traverse2(
          newCurrent,
          notFOrF2,
          newTime,
          newPressure,
          newPath
        );
        maxPressure = Math.max(maxPressure, p, p2)
      })
    });
    return maxPressure;
  }
}

console.log(problem2(input))
