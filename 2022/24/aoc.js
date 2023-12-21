import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;
import * as _ from 'lodash';

getInputforDay(input, filePath)

let moveMap = {
  '>': 'right',
  '<': 'left',
  '^': 'up',
  'v': 'down'
}

let dirs = ['right', 'down', 'left', 'up', 'self'];

const problem = (input) => {
  let position;
  let goal;
  let possibleSpacesAtCurrentTime = [];
  let grid = input.split('\n').filter(x=>x).map((row, ri) => {
    return row.split('').map((spot, si) => {
      let space = {
        x: si, y: ri, type: spot === '#' ? 'wall' : 'space'
      };
      if(space.type !== 'wall'){
        space.content = spot === '.' ? [] : [spot];
        space.oldContent = [];
        space.latestTimeVisited = -1;
        space.self = space;
      }
      if(ri === 0 && si === 1){
        position = space;
        space.latestTimeVisited = 0;
        possibleSpacesAtCurrentTime.push(space);
      }
      return space
    });
  });
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      if(ri === grid.length-1 && si === row.length-2){
        goal = spot;
      }
      if(spot.type === 'space'){
        spot.canGo = {left: false, right: false, up: false, down: false, self: true}
        if(si === 1 && spot !== position){
          spot.left = row.slice(-2,-1)[0];//{x: row.slice(-2,-1)[0].x, y: row.slice(-2,-1)[0].y};
        }
        else if(spot !== position && spot !== goal){
          spot.left = row[si-1];//{x: row[si-1].x, y: row[si-1].y};
          spot.canGo.left = true;
        }

        if(si === row.length - 2 && spot !== goal){
          spot.right = row[1];//{x: row[1].x, y: row[1].y};
        }
        else if(spot !== position && spot !== goal){
          spot.right = row[si+1];//{x: row[si+1].x, y: row[si+1].y};
          spot.canGo.right = true;
        }

        if(ri === 1){
          if(si === 1){
            spot.up = grid[0][1];//{x: 1, y: 0};
            spot.canGo.up = true;
          }
          else {
            spot.up = grid.slice(-2,-1)[0][si];//{x: grid.slice(-2,-1)[0][si].x, y: grid.slice(-2,-1)[0][si].y};
          }
        }
        else {
          if(grid[ri-1]){
            spot.up = grid[ri-1][si];//{x: grid[ri-1][si].x, y: grid[ri-1][si].y};
            spot.canGo.up = true;
          }
        }

        if(ri === grid.length - 2){
          if(si === row.length - 2){
            spot.down = grid[grid.length - 1][row.length - 2];
            spot.canGo.down = true;
          }
          else {
            spot.down = grid[1][si];
          }
        }
        else {
          if(grid[ri+1]){
            spot.down = grid[ri+1][si];//{x: grid[ri+1][si].x, y: grid[ri+1][si].y};
            spot.canGo.down = true;
          }
        }
      }
    })
  });
  let t = 0;
  while(goal.latestTimeVisited === -1){
    let newPossibleSpacesAtCurrentTime = [];
    t++;
    grid = advance(grid);
    possibleSpacesAtCurrentTime.forEach(s => {
      dirs.forEach(d => {
        if(s.canGo[d] && s[d].content.length === 0){
          s[d].latestTimeVisited = t;
          if(!newPossibleSpacesAtCurrentTime.includes(s[d])){
            newPossibleSpacesAtCurrentTime.push(s[d]);
          }
        }
      });
    });
    possibleSpacesAtCurrentTime = newPossibleSpacesAtCurrentTime;
  }
  return goal.latestTimeVisited
}

let advance = (grid) => {
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      if(spot.type !== 'wall'){
        spot.oldContent = spot.content;
        spot.content = [];
      }
    })
  })
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      spot.oldContent?.forEach(move => {
        let moveTo = grid[ri][si][moveMap[move]];
        //console.log(ri, si, spot, move, moveTo)
        grid[moveTo.y][moveTo.x].content.push(move);
      })
    })
  });
  return grid;
}
let time = new Date().valueOf()
console.log(problem(input))
console.log('time for part 1 was', new Date().valueOf() - time, 'ms')

const problem2 = (input) => {
  let startingPoint;
  let position;
  let goal;
  let possibleSpacesAtCurrentTime = [];
  let grid = input.split('\n').filter(x=>x).map((row, ri) => {
    return row.split('').map((spot, si) => {
      let space = {
        x: si, y: ri, type: spot === '#' ? 'wall' : 'space'
      };
      if(space.type !== 'wall'){
        space.content = spot === '.' ? [] : [spot];
        space.oldContent = [];
        space.latestTimeVisited = -1;
        space.latestTimeVisited2 = -1;
        space.latestTimeVisited3 = -1;
        space.self = space;
      }
      if(ri === 0 && si === 1){
        position = space;
        startingPoint = space;
        space.latestTimeVisited = 0;
        possibleSpacesAtCurrentTime.push(space);
      }
      return space
    });
  });
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      if(ri === grid.length-1 && si === row.length-2){
        goal = spot;
      }
      if(spot.type === 'space'){
        spot.canGo = {left: false, right: false, up: false, down: false, self: true}
        if(si === 1 && spot !== position){
          spot.left = row.slice(-2,-1)[0];//{x: row.slice(-2,-1)[0].x, y: row.slice(-2,-1)[0].y};
        }
        else if(spot !== position && spot !== goal){
          spot.left = row[si-1];//{x: row[si-1].x, y: row[si-1].y};
          spot.canGo.left = true;
        }

        if(si === row.length - 2 && spot !== goal){
          spot.right = row[1];//{x: row[1].x, y: row[1].y};
        }
        else if(spot !== position && spot !== goal){
          spot.right = row[si+1];//{x: row[si+1].x, y: row[si+1].y};
          spot.canGo.right = true;
        }

        if(ri === 1){
          if(si === 1){
            spot.up = grid[0][1];//{x: 1, y: 0};
            spot.canGo.up = true;
          }
          else {
            spot.up = grid.slice(-2,-1)[0][si];//{x: grid.slice(-2,-1)[0][si].x, y: grid.slice(-2,-1)[0][si].y};
          }
        }
        else {
          if(grid[ri-1]){
            spot.up = grid[ri-1][si];//{x: grid[ri-1][si].x, y: grid[ri-1][si].y};
            spot.canGo.up = true;
          }
        }

        if(ri === grid.length - 2){
          if(si === row.length - 2){
            spot.down = grid[grid.length - 1][row.length - 2];
            spot.canGo.down = true;
          }
          else {
            spot.down = grid[1][si];
          }
        }
        else {
          if(grid[ri+1]){
            spot.down = grid[ri+1][si];//{x: grid[ri+1][si].x, y: grid[ri+1][si].y};
            spot.canGo.down = true;
          }
        }
      }
    })
  });
  let t = 0;
  //going to goal
  while(goal.latestTimeVisited === -1){
    t++;
    grid = advance(grid);
    let newPossibleSpacesAtCurrentTime = [];
    possibleSpacesAtCurrentTime.forEach(s => {
      dirs.forEach(d => {
        if(s.canGo[d] && s[d].content.length === 0){
          s[d].latestTimeVisited = t;
          if(!newPossibleSpacesAtCurrentTime.includes(s[d])){
            newPossibleSpacesAtCurrentTime.push(s[d]);
          }
        }
      });
    });
    possibleSpacesAtCurrentTime = newPossibleSpacesAtCurrentTime;
  }
  //going back
  goal.latestTimeVisited2 = t;
  possibleSpacesAtCurrentTime = [goal];
  while(startingPoint.latestTimeVisited2 === -1){
    t++;
    grid = advance(grid);
    let newPossibleSpacesAtCurrentTime = [];
    possibleSpacesAtCurrentTime.forEach(s => {
      dirs.forEach(d => {
        if(s.canGo[d] && s[d].content.length === 0){
          s[d].latestTimeVisited2 = t;
          if(!newPossibleSpacesAtCurrentTime.includes(s[d])){
            newPossibleSpacesAtCurrentTime.push(s[d]);
          }
        }
      });
    });
    possibleSpacesAtCurrentTime = newPossibleSpacesAtCurrentTime;
  }

  //going to goal again
  startingPoint.latestTimeVisited3 = t;
  possibleSpacesAtCurrentTime = [startingPoint];
  while(goal.latestTimeVisited3 === -1){
    t++;
    grid = advance(grid);
    let newPossibleSpacesAtCurrentTime = [];
    possibleSpacesAtCurrentTime.forEach(s => {
      dirs.forEach(d => {
        if(s.canGo[d] && s[d].content.length === 0){
          s[d].latestTimeVisited3 = t;
          if(!newPossibleSpacesAtCurrentTime.includes(s[d])){
            newPossibleSpacesAtCurrentTime.push(s[d]);
          }
        }
      });
    });
    possibleSpacesAtCurrentTime = newPossibleSpacesAtCurrentTime;
  }
  return goal.latestTimeVisited3
}

time = new Date().valueOf();
console.log(problem2(input))
console.log('time for part 1 was', new Date().valueOf() - time, 'ms')
