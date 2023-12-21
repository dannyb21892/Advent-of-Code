import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
import * as helpers from '../../helpers.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let modules = input.split('\n').filter(x=>x).map(line => {
    let module = line.split(' -> ')[0];
    let name = module.slice(1);
    let dests = line.split(' -> ')[1].split(', ');
    if(module[0] === '%'){
      module = {
        type: 'flipflop',
        name,
        state: false, //false = low, true = high
        func: (module, input, from) => {
          if(!input){
            module.state = !module.state;
            return module.state;
          }
        },
        dests
      };
    }
    else if(module[0] === '&'){
      module = {
        type: 'conjunction',
        name,
        connectedLastStates: {},//to be populated after we set up these initial module configs
        func: (module, input, from) => {
          module.connectedLastStates[from.name] = input;
          let allOn = Object.values(module.connectedLastStates).every(state => state);
          return !allOn;
        },
        dests
      };
    }
    else {
      module = {
        type: 'broadcaster',
        name: 'broadcaster',
        dests,
        func: (module, input, from) => input
      }
    }
    return module;
  });
  modules.forEach(m => {
    //replace destination names with destination module objects
    m.dests = m.dests.map(dest => modules.find(x => x.name === dest)).filter(Boolean);
  });
  modules.forEach(m => {
    if(m.type === 'conjunction'){
      //set previous state entries
      modules.filter(module => {
        return module.dests.find(m2 => m2 === m)
      }).forEach(conInput => {
        m.connectedLastStates[conInput.name] = false;
      })
    }
  })
  
  let low = 0;
  let high = 0;
  for(let button = 1; button <= 1000; button++){
    //init pulses array with button to broadcaster
    //a pulse has "to", "value", and "from" entries
    let currentPulses = [{to: modules.find(m => m.name === 'broadcaster'), value: false}];
    low += 1;//button press sends a low input to broadcaster
    while(currentPulses.length){
      let nextPulses = [];
      currentPulses.forEach((pulse) => {
        //run the module's function to determine the output signal
        let output = pulse.to.func(pulse.to, pulse.value, pulse.from);
        if(output !== undefined){
          //output would be undefined if no signal is propagated, such as high input to flipflop
          if(output){
            //if destination array is empty, add 1 anyway since it sends a pulse to the nonexistent output module
            high += pulse.to.dests.length || 1;
          }
          else {
            low += pulse.to.dests.length || 1;
          }
          nextPulses = [
            ...nextPulses,
            //for each destination, create a pulse from here to there with the value found above
            ...pulse.to.dests.map(dest => ({to: dest, value: output, from: pulse.to}))
          ];
        }
      })
      currentPulses = nextPulses;
    }
    //console.log(`(${button}, ${low}, ${high})`)
  }
  return low * high
}

console.log(problem(input))

const problem2 = (input) => {
  let modules = input.split('\n').filter(x=>x).map(line => {
    let module = line.split(' -> ')[0];
    let name = module.slice(1);
    let dests = line.split(' -> ')[1].split(', ');
    if(module[0] === '%'){
      module = {
        type: 'flipflop',
        name,
        state: false, //false = low, true = high
        func: (module, input, from, button) => {
          if(!input){
            module.state = !module.state;
            return module.state;
          }
        },
        dests
      };
    }
    else if(module[0] === '&'){
      module = {
        type: 'conjunction',
        name,
        connectedLastStates: {},//to be populated after we set up these initial module configs
        func: (module, input, from, button) => {
          module.connectedLastStates[from.name] = input;
          let allOn = Object.values(module.connectedLastStates).every(state => state);
          return !allOn;
        },
        dests
      };
    }
    else {
      module = {
        type: 'broadcaster',
        name: 'broadcaster',
        dests,
        func: (module, input, from, button) => input
      }
    }
    return module;
  });
  modules.forEach(m => {
    //replace destination names with destination module objects
    m.dests = m.dests.map(dest => modules.find(x => x.name === dest)).filter(Boolean);
  });
  modules.forEach(m => {
    if(m.type === 'conjunction'){
      //set previous state entries
      modules.filter(module => {
        return module.dests.find(m2 => m2 === m)
      }).forEach(conInput => {
        m.connectedLastStates[conInput.name] = false;
      })
    }
  })
  
  let low = 0;
  let high = 0;
  let button = 0;
  let finalConjunction = 'sq';
  //it was observed manually that the final conjunction, sq, receives high pulses from these 4 inputs cyclically each
  //so we just need to find the first button press for each where it sends high, then lcm the 4 numbers
  let semifinalConjunctionsEarliestLowPulse = {fv: null, kk: null, vt: null, xr: null};
  while(!Object.values(semifinalConjunctionsEarliestLowPulse).every(Boolean)){
    button++;
    //init pulses array with button to broadcaster
    //a pulse has "to", "value", and "from" entries
    let currentPulses = [{to: modules.find(m => m.name === 'broadcaster'), value: false}];
    low += 1;//button press sends a low input to broadcaster
    while(currentPulses.length){
      let nextPulses = [];
      currentPulses.forEach((pulse) => {
        //run the module's function to determine the output signal
        let output = pulse.to.func(pulse.to, pulse.value, pulse.from, button);
        if(pulse.to.name === finalConjunction && pulse.value){
          semifinalConjunctionsEarliestLowPulse[pulse.from.name] = 
            semifinalConjunctionsEarliestLowPulse[pulse.from.name] || button;
        }
        if(output !== undefined){
          //output would be undefined if no signal is propagated, such as high input to flipflop
          if(output){
            //if destination array is empty, add 1 anyway since it sends a pulse to the nonexistent output module
            high += pulse.to.dests.length || 1;
          }
          else {
            low += pulse.to.dests.length || 1;
          }
          nextPulses = [
            ...nextPulses,
            //for each destination, create a pulse from here to there with the value found above
            ...pulse.to.dests.map(dest => ({to: dest, value: output, from: pulse.to}))
          ];
        }
      })
      currentPulses = nextPulses;
    }
  }
  return Object.values(semifinalConjunctionsEarliestLowPulse).reduce(helpers.lcm, 1)
}

console.log(problem2(input))
