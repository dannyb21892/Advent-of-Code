import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let min = 7;//200000000000000;
  let max = 27;//400000000000000;
  let lines = input.split('\n').filter(x=>x).map(line => {
    let pos = line.split(' @ ')[0].split(', ').map(Number);
    pos = {x: pos[0], y: pos[1]};
    let vel = line.split(' @ ')[1].split(', ').map(Number);
    vel = {x: vel[0], y: vel[1]};
    let slope = vel.y / vel.x;

    let tEnter = -1;
    let tExit = -1;
    if(pos.x >= min && pos.x <= max && pos.y >= min && pos.y <= max){
      //starts inside
      tEnter = 0;
      let xtExit;
      if(vel.x > 0){
        xtExit = (max - pos.x) / vel.x;
      }
      else if(vel.x < 0){
        xtExit = (min - pos.x) / vel.x;
      }

      let ytExit;
      if(vel.y > 0){
        ytExit = (max - pos.y) / vel.y;
      }
      else if(vel.y < 0){
        ytExit = (min - pos.y) / vel.y;
      }
      tExit = Math.min(xtExit, ytExit);
    }
    else {
      let xtEnter;
      let xtExit;
      if((pos.x < min && vel.x > 0)){
        xtEnter = (min - pos.x) / vel.x;
        xtExit = (max - pos.x) / vel.x;
      }
      else if((pos.x > max && vel.x < 0)){
        xtEnter = (max - pos.x) / vel.x;
        xtExit = (min - pos.x) / vel.x;
      }

      let ytEnter;
      let ytExit;
      if((pos.y < min && vel.y > 0)){
        ytEnter = (min - pos.y) / vel.y;
        ytExit = (max - pos.y) / vel.y;
      }
      else if((pos.y > max && vel.y < 0)){
        ytEnter = (max - pos.y) / vel.y;
        ytExit = (min - pos.y) / vel.y;
      }
      
      if(xtEnter && ytEnter){
        if((xtEnter >= ytEnter && xtEnter <= ytExit) || (ytEnter >= xtEnter && ytEnter <= xtExit)){
          tEnter = Math.max(xtEnter, ytEnter);
          tExit = Math.min(xtExit, ytExit);
        }
      }
    }
    // let posAtT = (t) => ({x: pos.x + vel.x*t, y: pos.y + vel.y*t});
    return {pos, vel, slope, tEnter, tExit};
  });
  //console.log(lines)

  let count = 0;

  lines.forEach((ha, a) => {
    //if(ha.tEnter >= 0){
      lines.slice(a+1).forEach((hb, b) => {
        //if(hb.tEnter >= 0){
          let xIntersect = ((ha.slope * ha.pos.x) - (hb.slope * hb.pos.x) + hb.pos.y - ha.pos.y) / (ha.slope - hb.slope);
          let yIntersect = (ha.slope * (xIntersect - ha.pos.x)) + ha.pos.y;
          if(xIntersect >= min && xIntersect <= max && yIntersect >= min && yIntersect <= max){
            //intersection is inside box
            if(
              ((xIntersect > ha.pos.x && ha.vel.x > 0) || (xIntersect < ha.pos.x && ha.vel.x < 0)) && 
              ((xIntersect > hb.pos.x && hb.vel.x > 0) || (xIntersect < hb.pos.x && hb.vel.x < 0))
            ){
              //intersection is in both futures
              console.log(a,b,xIntersect,yIntersect)
              count++;
            }
          }
        //}
      })
    //}
  });
  return count;
}

console.log(problem(input))

const problem2 = (input) => {

}

console.log(problem2(input))
