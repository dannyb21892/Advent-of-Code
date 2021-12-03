const input = require('./input').input;

const part1 = (input) => {
  const earliest = Number(input.split('\n')[0]);
  let buses = input.split('\n')[1].split(',').filter(x => x !== 'x').map(x => Number(x));
  let bustimes = buses.map(b => ({id: b, time: b - (earliest % b)})).sort((a,b) => a.time - b.time);
  console.log(bustimes)
  return bustimes[0].id * (bustimes[0].time)
}

console.log(part1(input))


const part2 = (input) => {
  let n = 0;
  let t = 0;
  while(true){
    let test_t = 93854 + n * 164851;
    if(test_t % 13 === 0){
      let test_tb = (test_t + 13) / 1073;
      if(Math.floor(test_tb) === test_tb){
        let test_tc = (test_t - 899) / 943;
        if(Math.floor(test_tc) === test_tc){
          let test_td = (test_t - 89) / 323;
          if(Math.floor(test_td) === test_td){
            t = test_t;
            break;
          }
        }
      }
    }
    n = n+1;
  }
  return t
}


// const mult467 = Array(354).fill(467).map((x,i) => x*i);
// const mult353 = Array(468).fill(353).map((x,i) => x*i);
// console.log(mult353.find(x => mult467.includes(x - 31)));
//
// const mult41 = Array(24).fill(41).map((x,i) => x*i);
// const mult23 = Array(42).fill(23).map((x,i) => x*i);
// console.log(mult41, mult23)
// console.log(mult41.find(x => mult23.includes(x + 64)));

console.log(part2(input))
