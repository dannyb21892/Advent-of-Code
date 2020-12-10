const input = require('./input').input;

const part1 = (input) => {
  let arr = input.split('\n').map(x => Number(x)).sort((a,b) => a-b);
  arr = [0,...arr,arr[arr.length-1] + 3];
  let diffs1 = 0;
  let diffs3 = 0;
  arr.forEach((x, i) => {
    if(i < arr.length - 1){
      if(arr[i+1] - x === 1){
        diffs1 += 1;
      }
      if(arr[i+1] - x === 3){
        diffs3 += 1;
      }
    }
  });
  return diffs1 * diffs3
}

console.log(part1(input))

const part2 = (input) => {
  let arr = input.split('\n').map(x => Number(x)).sort((a,b) => a-b);
  arr = [0,...arr,arr[arr.length-1] + 3];
  let dag = {};//directed acyclic graph
  arr.forEach(x => {
    dag[x] = {
      val: x,
      nextNodes: [],
      nextPathWeights: []
    }
  });

  arr.forEach(x => {
    let nexts = arr.filter(y => y <= (x + 3) && y > x).map(y => dag[y]);
    dag[x].nextNodes = nexts;
  });

  arr.reverse().slice(1).forEach((x,i) => {
    if(i === 0){
      dag[x].nextNodes.forEach(n => dag[x].nextPathWeights.push(1));
    }
    else {
      dag[x].nextNodes.forEach(n => dag[x].nextPathWeights.push(n.nextPathWeights.reduce((a,b) => a + b, 0)))
    }
  });

  return dag[arr.reverse()[0]].nextPathWeights.reduce((a,b) => a + b)
}

console.log(part2(input))
