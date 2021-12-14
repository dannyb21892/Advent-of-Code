import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let poly = lines[0];
  let rules = lines[1].split('\n').map(l => l.split(' -> ')).map(l => {
    return {
      in: l[0],
      out: l[1]
    }
  });

  for(let i = 0; i < 10; i++){
    poly = replace(poly, rules)
  }
  let polyArray = poly.split('');
  let chars = new Array(...new Set(polyArray));
  let freqs = chars.map(c => polyArray.filter(p => p === c).length);
  return (Math.max(...freqs) - Math.min(...freqs))
}

const replace = (poly, rules) => {
  let newPoly = '';
  for(let i = 0; i < poly.length - 1; i++){
    newPoly += poly[i]
    let rule = rules.find(r => r.in === (poly[i] + poly[i+1]));
    if(rule){
      newPoly += rule.out;
    }
  }
  newPoly += poly[poly.length - 1];
  return newPoly;
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n').filter(x=>x);
  let poly = lines[0];//the base polymer chain
  let rules = lines[1].split('\n').map(l => l.split(' -> ')).map(l => {
    return {
      in: l[0],
      out: l[1]
    }
  });//list of rules of with in and out attributes

  let pairFreqs = {};//count the frequencies of every pair of adjacent letters
  for(let i = 0; i < poly.length - 1; i++){
    let pair = poly[i] + poly[i+1];
    pairFreqs[pair] = (pairFreqs[pair] || 0) + 1;
  }

  let iterations = 40;
  //see below for replace2 function
  pairFreqs = replace2(pairFreqs, rules, iterations);

  //get all unique letters present in the final string
  let chars = new Array(...new Set(Object.keys(pairFreqs).join('').split('')));

  //set up to track the frequencies of each character, seed it with one each
  //for the start and end characters, which are the same as in the initial polymer
  let charFreqs = {};
  charFreqs[poly[0]] = 1;
  charFreqs[poly[poly.length - 1]] = 1;

  //for each pair, add that pair's frequency to each of the two letters comprising it
  Object.entries(pairFreqs).forEach(([pair,freq]) => {
    charFreqs[pair[0]] = (charFreqs[pair[0]] || 0) + freq;
    charFreqs[pair[1]] = (charFreqs[pair[1]] || 0) + freq;
  });

  //divide all frequencies by 2 since every letter is counted in two pairs
  //note the initial seeding of the first and last letter is meant to offset this
  Object.keys(charFreqs).forEach((c) => {
    charFreqs[c] = charFreqs[c] / 2;
  });
  return (Math.max(...Object.values(charFreqs)) - Math.min(...Object.values(charFreqs)))
}

const replace2 = (pairFreqs, rules, iterations) => {
  let i = 0;
  while(i < iterations){
    //each run of the loop iterates through all pairs, and transforms them
    //via the corresponding rule, reducing its frequency since the pair is broken
    //and increasing the frequency of the two new pairs that form in its place
    let newPairFreqs = {...pairFreqs};
    Object.entries(pairFreqs).forEach(([pair, freq]) => {
      let r = rules.find(r => r.in === pair);
      if(r){
        newPairFreqs[pair] = newPairFreqs[pair] - freq;
        let newPair1 = pair[0] + r.out;
        let newPair2 = r.out + pair[1];

        newPairFreqs[newPair1] = (newPairFreqs[newPair1] || 0) + freq;
        newPairFreqs[newPair2] = (newPairFreqs[newPair2] || 0) + freq;
      }
    })
    pairFreqs = newPairFreqs;
    i++;
  }
  return pairFreqs;
}

console.log(problem2(input))
