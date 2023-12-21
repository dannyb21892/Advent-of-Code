import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let wires = input.split('\n').map(wire => wire.split(','));
  let wireSegments = {wire0: [], wire1: []};
  let smallestDist = Infinity;
  wires.forEach((wire, w_i) => {
    let wireNum = 'wire' + w_i;
    let startCoord = [0,0];
    wire.forEach(segment => {
      let endCoord = [...startCoord];
      let dir = segment[0];
      let dist = Number(segment.slice(1));
      let constantAxis = 'y';
      let varyAxis = 'x'
      if(dir === 'R'){
        endCoord[0] = endCoord[0] + dist;
      }
      else if(dir === 'L'){
        endCoord[0] = endCoord[0] - dist;
      }
      else if(dir === 'U'){
        endCoord[1] = endCoord[1] + dist;
        constantAxis = 'x';
        varyAxis = 'y';
      }
      else if(dir === 'D'){
        endCoord[1] = endCoord[1] - dist;
        constantAxis = 'x';
        varyAxis = 'y';
      }
      let newSeg = {
        varyAxis: varyAxis,
        constantAxis: constantAxis,
        x: [...new Set([Math.min(startCoord[0], endCoord[0]), Math.max(startCoord[0], endCoord[0])])],
        y: [...new Set([Math.min(startCoord[1], endCoord[1]), Math.max(startCoord[1], endCoord[1])])]
      };
      wireSegments[wireNum].push(newSeg);
      if(w_i === 1){
        let intersections = wireSegments.wire0.forEach(seg => {
          if(newSeg.constantAxis !== seg.constantAxis &&
          !(seg[seg.constantAxis][0] === 0 && newSeg[newSeg.constantAxis][0] === 0) &&
          seg[seg.constantAxis][0] >= newSeg[newSeg.varyAxis][0] &&
          seg[seg.constantAxis][0] <= newSeg[newSeg.varyAxis][1] &&
          newSeg[newSeg.constantAxis][0] >= seg[seg.varyAxis][0] &&
          newSeg[newSeg.constantAxis][0] <= seg[seg.varyAxis][1]){
            smallestDist = Math.min(
              smallestDist,
              Math.abs(seg[seg.constantAxis][0]) + Math.abs(newSeg[newSeg.constantAxis][0])
            );
          }
        });
      }
      startCoord = endCoord;
    })
  })
  return smallestDist
}

console.log(problem(input))

const problem2 = (input) => {

}

console.log(problem2(input))
