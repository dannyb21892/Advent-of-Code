import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let start;
  let lines = input.split('\n').filter(x=>x)
  .map((line) => 
    line.split('').map(spot => ({spot, visited: false}))
  );
  let north = ['|','L','J'];
  let south = ['|','7','F'];
  let east = ['-','L','F'];
  let west = ['-','7','J'];
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.connections = [];
      if((spot.spot === 'S' || north.includes(spot.spot)) && lines[y-1] && south.includes(lines[y-1][x]?.spot)){
        spot.connections.push(lines[y-1][x])
      }
      if((spot.spot === 'S' || south.includes(spot.spot)) && lines[y+1] && north.includes(lines[y+1][x]?.spot)){
        spot.connections.push(lines[y+1][x])
      }
      if((spot.spot === 'S' || west.includes(spot.spot)) && east.includes(line[x-1]?.spot)){
        spot.connections.push(line[x-1])
      }
      if((spot.spot === 'S' || east.includes(spot.spot)) && west.includes(line[x+1]?.spot)){
        spot.connections.push(line[x+1])
      }
      if(spot.spot === 'S') {
        spot.visited = true;
        start = spot;
      }
      return spot;
    })
  })
  let max = 1;
  let currents = start.connections;
  while(currents.find(c => c.connections.find(x => !x.visited))){
    let newCurrents = [];
    let incrementedMax = false;
    currents.forEach(c => {
      c.visited = true;
      c.dist = incrementedMax ? max - 1 : max;
      let newc = c.connections.find(x => !x.visited);
      if(newc) {
        newc.dist = incrementedMax ? max : max + 1;
        newCurrents.push(newc);
        if(!incrementedMax){
          incrementedMax = true;
          max++;
        }
      }
    })
    currents = newCurrents;
  }
  // console.log(lines.map(line => 
  //   line.map(spot => 
  //     spot.spot === 'S' ? '0 ' : ((spot.dist > 9 ? spot.dist : ((spot.dist || '.') + ' ')) || '. ')
  //   ).join('')).join('\n')
  // )
  return max
}

console.log(problem(input))

const problem2 = (input) => {
  //parse field and add one layer of . padding around sides
  let lines = input.split('\n').filter(x=>x)
  .map((line) => {
    return [
      {spot: '.', visited: false},
      ...line.split('').map(spot => ({spot, visited: false})),
      {spot: '.', visited: false}
    ]
  });
  let paddingFirst = [];
  let paddingLast = [];
  lines[0].forEach(x => {
    paddingFirst.push({spot: '.', visited: false});
    paddingLast.push({spot: '.', visited: false});
  });
  lines = [
    paddingFirst,
    ...lines,
    paddingLast
  ];
  //identify all pipe connections, on the loop or otherwise
  let start;
  let north = ['|','L','J'];
  let south = ['|','7','F'];
  let east = ['-','L','F'];
  let west = ['-','7','J'];
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.connections = [];
      if((spot.spot === 'S' || north.includes(spot.spot)) && lines[y-1] && south.includes(lines[y-1][x]?.spot)){
        spot.connections.push(lines[y-1][x])
      }
      if((spot.spot === 'S' || south.includes(spot.spot)) && lines[y+1] && north.includes(lines[y+1][x]?.spot)){
        spot.connections.push(lines[y+1][x])
      }
      if((spot.spot === 'S' || west.includes(spot.spot)) && east.includes(line[x-1]?.spot)){
        spot.connections.push(line[x-1])
      }
      if((spot.spot === 'S' || east.includes(spot.spot)) && west.includes(line[x+1]?.spot)){
        spot.connections.push(line[x+1])
      }
      if(spot.spot === 'S') {
        spot.loop = true;
        spot.spot = '7'
        start = spot;
      }
      return spot;
    })
  })
  //starting on S, use connections found above to traverse and identify the loop
  let current = start;
  let next = current.connections.find(c => !c.loop)
  while(next){
    current = next;
    current.loop = true;
    next = current.connections.find(c => !c.loop);
  }
  // console.log(lines.map(line => 
  //   line.map(spot => 
  //     spot.loop ? spot.spot : '.'
  //   ).join(' ')).join('\n')
  // )
  // console.log('\n\n')

  //double the size of the grid to ensure passageways between loop lines for flood fill
  let newLines = [];
  lines.forEach(line => {
    let newLineThis = [];
    let newLineNext = [];
    line.forEach((spot) => {
      if(spot.loop && east.includes(spot.spot)){
        newLineThis = [...newLineThis, spot, {spot: '-', loop: true, fake: true}]
      }
      else {
        newLineThis = [...newLineThis, spot, {spot: '.', loop: false, fake: true}]
      }

      if(spot.loop && south.includes(spot.spot)){
        newLineNext = [...newLineNext, {spot: '|', loop: true, fake: true}, {spot: '.', loop: false, fake: true}]
      }
      else {
        newLineNext = [...newLineNext, {spot: '.', loop: false, fake: true}, {spot: '.', loop: false, fake: true}]
      }
    });
    newLines = [...newLines, newLineThis, newLineNext];
  });
  lines = newLines;
  //turn playing field into linked grid for easy traversal
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      spot.up = lines[y-1] ? lines[y-1][x] : null;
      spot.down = lines[y+1] ? lines[y+1][x] : null;
      spot.left = line[x-1] || null;
      spot.right = line[x+1] || null;
    })
  })
  //begin filling from top left, known to be outside the loop by visually checking
  let outsides = [lines[0][0]];
  lines[0][0].outside = true;
  while(outsides.length){
    let newOutsides = [];
    outsides.forEach(o => {
      let r = o.right;
      if(r && !r.loop && !r.outside){
        r.outside = true;
        newOutsides.push(r);
      }

      let l = o.left;
      if(l && !l.loop && !l.outside){
        l.outside = true;
        newOutsides.push(l);
      }

      let u = o.up;
      if(u && !u.loop && !u.outside){
        u.outside = true;
        newOutsides.push(u);
      }

      let d = o.down;
      if(d && !d.loop && !d.outside){
        d.outside = true;
        newOutsides.push(d);
      }
    })
    outsides = newOutsides;
  }

  let count = 0;
  lines.forEach(line => line.forEach(spot => {
    count = count + ((!spot.outside && !spot.loop && !spot.fake) ? 1 : 0)
  }));
  // console.log(lines.map(line => 
  //   line.map(spot => 
  //     !spot.outside && !spot.loop && !spot.fake ? '#' : spot.spot
  //   ).join('')).join('\n')
  // )
  return count;

}

console.log(problem2(input))