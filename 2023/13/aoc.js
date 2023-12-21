import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let patterns = input.split('\n\n').filter(x=>x).map(p => 
    p.split('\n').map(x => x.split(''))
  );
  let sum = 0;
  patterns.forEach((pattern) => {
    let hori = false;
    //console.log(pattern)
    pattern.forEach((row,i) => {
      let above = i + 1;
      let below = pattern.length - i - 1;
      //console.log(above,below)
      let horiMirrorDist = Math.min(above, below);
      if(horiMirrorDist){
        let upper = pattern.slice(i-horiMirrorDist+1, i+1).reverse().map(row => row.join('')).join('');
        let lower = pattern.slice(i+1, i+horiMirrorDist+1).map(row => row.join('')).join('');
        //console.log(i-horiMirrorDist+1, i+1, upper)
        //console.log(i+1, i+horiMirrorDist+1, lower)
        if(upper === lower){
          console.log(i+1, 'hori')
          sum += 100*(i+1);
          hori = true;
        }
      }
    })
    
    if(!hori){
      pattern = pattern[0].map((col,c)=>pattern.map(row => row[c]).reverse());
      //console.log(pattern)
      pattern.forEach((row,i) => {
        let above = i + 1;
        let below = pattern.length - i - 1;
        //console.log(above,below)
        let vertMirrorDist = Math.min(above, below);
        if(vertMirrorDist){
          let upper = pattern.slice(i-vertMirrorDist+1, i+1).reverse().map(row => row.join('')).join('');
          let lower = pattern.slice(i+1, i+vertMirrorDist+1).map(row => row.join('')).join('');
          //console.log(i-vertMirrorDist+1, i+1, upper)
          //console.log(i+1, i+vertMirrorDist+1, lower)

          if(upper === lower){
            //console.log(i+1, 'vert')
            sum += i+1;
            hori = true;
          }
        }
      })
    }
  });
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let patterns = input.split('\n\n').filter(x=>x).map(p => 
    p.split('\n').map(x => x.split(''))
  );
  let sum = 0;
  patterns.forEach((pattern) => {
    let hori = false;
    //console.log(pattern)
    pattern.forEach((row,i) => {
      let above = i + 1;
      let below = pattern.length - i - 1;
      //console.log(above,below)
      let horiMirrorDist = Math.min(above, below);
      if(horiMirrorDist){
        let upper = pattern.slice(i-horiMirrorDist+1, i+1).reverse().map(row => row.join('')).join('').split('');
        let lower = pattern.slice(i+1, i+horiMirrorDist+1).map(row => row.join('')).join('').split('');
        //console.log(i-vertMirrorDist+1, i+1, upper)
        //console.log(i+1, i+vertMirrorDist+1, lower)
        let diffs = 0;
        upper.forEach((char,c) => {
          diffs += char === lower[c] ? 0 : 1;
        })
        if(diffs === 1){
          //console.log(i+1, 'vert')
          console.log(i+1, 'hori')
          sum += 100*(i+1);
          hori = true;
        }
      }
    })
    
    if(!hori){
      pattern = pattern[0].map((col,c)=>pattern.map(row => row[c]).reverse());
      //console.log(pattern)
      pattern.forEach((row,i) => {
        let above = i + 1;
        let below = pattern.length - i - 1;
        //console.log(above,below)
        let vertMirrorDist = Math.min(above, below);
        if(vertMirrorDist){
          let upper = pattern.slice(i-vertMirrorDist+1, i+1).reverse().map(row => row.join('')).join('').split('');
          let lower = pattern.slice(i+1, i+vertMirrorDist+1).map(row => row.join('')).join('').split('');
          //console.log(i-vertMirrorDist+1, i+1, upper)
          //console.log(i+1, i+vertMirrorDist+1, lower)
          let diffs = 0;
          upper.forEach((char,c) => {
            diffs += char === lower[c] ? 0 : 1;
          })
          if(diffs === 1){
            //console.log(i+1, 'vert')
            sum += i+1;
            hori = true;
          }
        }
      })
    }
  });
  return sum
}

console.log(problem2(input))
