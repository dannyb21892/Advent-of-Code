import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  const lines = input.split('\n').map(l => {
    return {
      in: l.split(' | ')[0].split(' '),
      out: l.split(' | ')[1].split(' '),
    }
  });
  let count = 0;
  lines.forEach(l => {
    l.out.forEach(o => {
      if(o.length === 2 || o.length === 4 || o.length === 3 || o.length === 7){
        count++
      }
    })
  })
  return count
}

console.log(problem(input))

const arraysEqual = (a_in,b_in) => {
  const a = [...a_in];
  const b = [...b_in];
  a.sort();
  b.sort();
  if(a.length !== b.length){
    return false
  }
  else{
    let out = true;
    a.forEach((x,i) => out = out && x === b[i]);
    return out;
  }
}

const problem2 = (input) => {
  const lines = input.split('\n').map(l => {
    return {
      in: l.split(' | ')[0].split(' '),
      out: l.split(' | ')[1].split(' '),
      both: l.split(' | ').join(' ').split(' ')
    }
  });

  let total = 0;
  lines.forEach(line => {
    //console.log(line);
    const map = ['','','','','','',''];
    const one = line.both.find(l => l.length === 2).split('');
    //console.log('one: ', one)
    const seven = line.both.find(l => l.length === 3).split('');
    //console.log('seven: ', seven)
    map[0] = seven.find(x => !one.includes(x));//top
    //console.log('map 0: ', map[0])
    const four = line.both.find(l => l.length === 4).split('');
    //console.log('four: ', four)
    const three = line.both.find(l => {
      if(l.length !== 5){
        return false
      }
      let out = true;
      seven.forEach(s => out = out && l.includes(s));
      return out;
    }).split('');
    //console.log('three: ', three)

    map[3] = three.find(x => !one.includes(x) && four.includes(x));//middle
    //console.log('map 3: ', map[3])

    map[1] = four.find(x => !map.includes(x) && !one.includes(x));//topleft
    //console.log('map 1: ', map[1])

    const five = line.both.find(l => {
      if(l.length !== 5){
        return false
      }
      let out = true;
      map.forEach(m => out = out && l.includes(m));
      return out;
    }).split('');
    //console.log('five: ', five)

    const two = line.both.find(l => l.length === 5 && l !== five.join('') && l !== three.join('')).split('');
    //console.log('two: ', two)

    map[2] = two.find(x => one.includes(x));//topright
    //console.log('map 2: ', map[2])

    map[5] = five.find(x => one.includes(x));//bottomright
    //console.log('map 5: ', map[5])

    const nine = line.both.find(l => {
      if(l.length !== 6){
        return false
      }
      let out = true;
      map.forEach(m => out = out && l.includes(m));
      return out;
    }).split('');
    //console.log('nine: ', nine)

    map[6] = nine.find(x => !map.includes(x));//bottom
    //console.log('map 6: ', map[6])

    const eight = line.both.find(l => l.length === 7).split('');
    map[4] = eight.find(x => !map.includes(x));//bottomleft
    //console.log('map 4: ', map[4])


    let numOut = '';
    line.out.forEach(out => {
      const one = [map[2], map[5]];
      const two = [map[0], map[2], map[3], map[4], map[6]];
      const three = [map[0], map[2], map[3], map[5], map[6]];
      const four = [map[1], map[2], map[3], map[5]];
      const five = [map[0], map[1], map[3], map[5], map[6]];
      const six = [map[0], map[1], map[3], map[4], map[5], map[6]];
      const seven = [map[0], map[2], map[5]];
      const eight = [...map];
      const nine = [map[0], map[1], map[2], map[3], map[5], map[6]];
      const zero = [map[0], map[1], map[2], map[4], map[5], map[6]];
      const nums = [zero, one, two, three, four, five, six, seven, eight, nine];
      let outdigit = undefined;
      nums.forEach((n,i) => {
        if(arraysEqual(n,out)){
          numOut += i;
          outdigit = i;
        }
      })
      //console.log(map, out, outdigit)
    })
    total += Number(numOut);
  })
  return total
}

console.log(problem2(input))
