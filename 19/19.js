const rules = require('./input').rules;
const messages = require('./input').messages;

const testRules = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: a
5: b`;

const parsedRules = ((rules) => {
  let r = rules.split('\n').map(r => {
    let matches = r.split(': ')[1].split(' | ').map(match => match.split(' ').map(x => Number(x) || x));
    return {
      ruleNum: Number(r.split(':')[0]),
      matches: matches
    }
  });

  return r.sort((a,b) => a.ruleNum - b.ruleNum);
})(rules);

let substitute = (validStrings, rule) => {
  let newValidStrings = [];
  validStrings.forEach((v,i) => {
    let where = v.findIndex(x => x === rule.ruleNum);
    if(where >= 0){
      rule.matches.forEach(m => {
        newValidStrings.push([...v.slice(0,where), ...m, ...v.slice(where + 1)])
      })
    }
    else {
      newValidStrings.push(v)
    }
  })
  return newValidStrings
}

const validStringsForRule = (rules, startingRule) => {
 let validStrings = [[startingRule]];
 let finalStrings = [];
 let nextRule = validStrings[0].find(x => typeof(x) === 'number');

 while(nextRule !== undefined){
   validStrings = substitute(validStrings, rules[nextRule]);
   let finalStringsUpUntil = validStrings.findIndex(v => v.findIndex(c => typeof(c) === 'number') >= 0);
   if(finalStringsUpUntil === -1){
     finalStrings = [...finalStrings, ...validStrings];
     nextRule = undefined;
   }
   else{
     finalStrings = [...finalStrings, ...validStrings.slice(0,finalStringsUpUntil)];
     validStrings = validStrings.slice(finalStringsUpUntil);
     nextRule = validStrings[0].find(x => typeof(x) === 'number');
   }
 }

 return finalStrings.map(f => f.join(''));
}

//this finds all possible valid strings, which takes a while
const part1 = (rules, messages) => {
 let finalStrings = validStringsForRule(rules, 0);

 messages = messages.split('\n');
 let matchCount = 0;

 messages.forEach(m => {
   if(finalStrings.includes(m)){
     matchCount += 1;
   }
 });

 return matchCount
}

//this breaks it down and matches substring validity, which is MUCH faster
const part1Better = (rules, messages) => {
 //rule 0 becomes 8,11, which becomes 42, 42, 31
 let valid42 = validStringsForRule(rules, 42);
 let valid31 = validStringsForRule(rules, 31);
 //log these and note that both result in length 8 valid strings

 messages = messages.split('\n');
 let matchCount = 0;

 messages.forEach(m => {
   if(m.length === 24){
     let chunks = [m.slice(0, 8), m.slice(8, 16), m.slice(16)];
     if(valid42.includes(m.slice(0, 8)) &&
       valid42.includes(m.slice(8, 16)) &&
       valid31.includes(m.slice(16))){
         console.log(m)
       matchCount += 1;
     }
   }
 });

 return matchCount
}

//console.log(part1(parsedRules, messages)) //be prepared to wait a couple mins if you run this
console.log(part1Better(parsedRules, messages))

const part2 = (rules, messages) => {
  let valid42 = validStringsForRule(rules, 42);
  let valid31 = validStringsForRule(rules, 31);

  messages = messages.split('\n');
  let matchCount = 0;

  messages.forEach(m => {
    if(m.length % 8 === 0){
      let chunks = [];
      let chunk = 0;
      while(m[8*chunk]){
        chunks = [...chunks, m.slice(8*chunk, 8*(chunk+1))];
        chunk += 1;
      }
      chunks.reverse();
      let match31count = 0;
      let i = 0;
      while(i < chunks.length && valid31.includes(chunks[i])){
        match31count += 1;
        i += 1;
      }
      let difference31vs42 = match31count;
      while(i < chunks.length && valid42.includes(chunks[i])){
        difference31vs42 -= 1;
        i += 1;
      }
      if(match31count > 0 && difference31vs42 < 0 && i === chunks.length){
        matchCount += 1;
      }
    }
  });

  return matchCount
}

console.log(part2(parsedRules, messages))
