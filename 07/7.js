const input = require('./input').input;

const buildTree = (input) => {
  let rules = input.split('.\n');
  rules = rules.slice(0, rules.length - 1)
  let ruleTree = {};
  rules.forEach(rule => {
    let parts = rule.split(' bags contain ');
    let container = parts[0];
    let containees = parts[1].split(', ');
    if(!ruleTree[container]){
      ruleTree[container] = {
        bagType: container,
        contains: [],
        //containedBy: []
      };
    }
    containees.forEach(c => {
      let count = c.split(' ')[0];
      count = count === 'no' ? 0 : Number(count);
      let bagType = c.split(' ');
      bagType = bagType.slice(1, bagType.length - 1).join(' ');
      bagType = count === 0 ? 'none' : bagType;
      ruleTree[container].contains.push({
        bagType: bagType,
        count: count
      })
      if(!ruleTree[bagType]){
        ruleTree[bagType] = {
          bagType: bagType,
          contains: [],
          //containedBy: []
        };
      };
      // ruleTree[bagType].containedBy.push({
      //   bagType: container,
      //   count: count
      // })
    })
  });
  return ruleTree;
}

const recursivelyCheckTreeStartingAt = (tree, bag) => {
  if(bag.bagType === 'none' || (bag.contains.length === 1 && bag.contains[0].bagType === "none")){
    return false;
  }
  else if(bag.contains.map(c => c.bagType).includes('shiny gold')){
    //console.log('!!!!!', bag)
    return true;
  }
  else {
    let recursiveReturn = false;
    bag.contains.forEach(innerBag => {
      if(!recursiveReturn){
        recursiveReturn = false || recursivelyCheckTreeStartingAt(tree, tree[innerBag.bagType]);
      }
    })
    return recursiveReturn
  }
}

const part1 = (tree) => {
  let count = 0;
  Object.keys(tree).forEach(bag => {
    if(recursivelyCheckTreeStartingAt(tree, tree[bag])){
      count += 1;
    }
  });
  return count;
}

const tree = buildTree(input);

console.log(part1(tree))

recursivelyCountBags = (tree, bag, sumSoFar) => {
  let subSum = 0;
  //console.log(bag, sumSoFar)
  if(bag.contains.length === 1 && bag.contains[0].bagType === "none"){
    return {sumSoFar: sumSoFar, subSum: subSum};
  }
  else {
    subSum += bag.contains.map(innerBag => innerBag.count).reduce((a,b) => a + b);
    bag.contains.forEach(innerBag => {
      subSum = subSum + innerBag.count * recursivelyCountBags(tree, tree[innerBag.bagType], sumSoFar).subSum;
    });
    return {sumSoFar: sumSoFar + subSum, subSum: subSum}
  }
}

const part2 = (tree) => {
  return recursivelyCountBags(tree, tree['shiny gold'], 0)
}


console.log(part2(tree))
