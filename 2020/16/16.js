const rules = require('./input').rules;
const ticket = require('./input').ticket;
const others = require('./input').others;

const testRules = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`;

const testTicket = `7,1,14`;

const testOthers = `7,3,47
40,4,50
55,2,20
38,6,12`;

const part1 = (input, rules) => {
  let tickets = input.split('\n').map(t => t.split(',').map(x => Number(x)));
  rules = rules.split('\n').map(r => r.split(': ')[1]).map(r => {
    let left = r.split(' or ')[0];
    let right = r.split(' or ')[1];
    return [
      [Number(left.split('-')[0]), Number(left.split('-')[1])],
      [Number(right.split('-')[0]), Number(right.split('-')[1])]
    ];
  });

  let invalids = tickets.map((t, ti) => t.filter((n, ni) => {
    let valid = false;
    for(let rule of rules) {
      valid = valid || (n >= rule[0][0] && n <= rule[0][1]) || (n >= rule[1][0] && n <= rule[1][1]);
    };
    return !valid
  }));

  return invalids.map(i => i.reduce((a,b) => a + b, 0)).reduce((a,b) => a + b, 0)
}


console.log(part1(others, rules))

const discardInvalids = (others, rules) => {
  let tickets = others.split('\n').map(t => t.split(',').map(x => Number(x)));
  rules = rules.split('\n').map(r => r.split(': ')[1]).map(r => {
    let left = r.split(' or ')[0];
    let right = r.split(' or ')[1];
    return [
      [Number(left.split('-')[0]), Number(left.split('-')[1])],
      [Number(right.split('-')[0]), Number(right.split('-')[1])]
    ];
  });

  let invalids = tickets.map((t, ti) => t.filter((n, ni) => {
    let valid = false;
    for(let rule of rules) {
      valid = valid || (n >= rule[0][0] && n <= rule[0][1]) || (n >= rule[1][0] && n <= rule[1][1]);
    };
    return !valid
  }));

  return tickets.filter((t, ti) => invalids[ti].length === 0)
}

const part2 = (others, rules, ticket) => {
  ticket = ticket.split(',').map(x => Number(x))
  let tickets = discardInvalids(others, rules);
  rules = rules.split('\n').map(r => r.split(': ')).map(r => {
    let name = r[0];
    let left = r[1].split(' or ')[0];
    let right = r[1].split(' or ')[1];
    return {
      name: name,
      left: {
        min: Number(left.split('-')[0]),
        max: Number(left.split('-')[1]),
      },
      right: {
        min: Number(right.split('-')[0]),
        max: Number(right.split('-')[1]),
      },
      position: null
    };
  });

  tickets.forEach((t, ti) => {
    tickets[ti] = t.map((n, ni) => {
      let ruleMap = {value: n, ruleMap: {}};
      for(let rule of rules) {
        let valid = (n >= rule.left.min && n <= rule.left.max) || (n >= rule.right.min && n <= rule.right.max);
        ruleMap['ruleMap'][rule.name] = valid;
      };
      return ruleMap
    });
  });

  tickets.forEach((t, ti) => {
    t.forEach((n, ni) => {
      Object.entries(n.ruleMap).forEach(rule => {
        if(!rule[1]){
          tickets.forEach(t => t[ni].ruleMap[rule[0]] = false)
        }
      })
    })
  });

  while(rules.findIndex(r => r.position === null) >= 0){
    tickets[0].forEach((n, ni) => {
      if(!n.done){
        let possibleRules = Object.entries(n.ruleMap).filter(r => r[1]);
        if(possibleRules.length === 1){
          n.done = true;
          let rule = rules.find(r => r['name'] === possibleRules[0][0]);
          rule.position = ni;
          tickets[0].forEach((n_, ni_) => {
            if(ni_ !== ni){
              n_.ruleMap[rule.name] = false;
            }
          });
        }
      }
    })
  }

  rules.forEach(r => {
    r.position = ticket[r.position];
  })

  let product = 1;
  rules.forEach(r => {
    if(r.name.includes('departure')){
      product = product * r.position;
    }
  })

  return product
}

const testRules2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19`;

const testTicket2 = `11,12,13`;

const testOthers2 = `3,9,18
15,1,5
5,14,9`;

//console.log(part2(testOthers2, testRules2, testTicket2))
console.log(part2(others, rules, ticket))
