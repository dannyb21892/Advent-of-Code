import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let position;
  let grid = input.split('\n\n')[0].split('\n').filter(x=>x).map((row, ri) => {
    return row.split('').map((spot, si) => {
      return {
        type: spot,
        x: si+1,
        y: ri+1,
        up: null,
        right: null,
        left: null,
        down: null
      }
    })
  });
  let maxRowSize = Math.max(...grid.map(r => r.length));
  grid = grid.map((row, ri) => {
    let paddingSize = maxRowSize - row.length;
    let padding = new Array(paddingSize).fill('').map((p, pi) => {
      return {
        type: ' ',
        x: pi + row.length + 1,
        y: ri+1,
        up: null,
        right: null,
        left: null,
        down: null
      }
    });
    return [...row, ...padding];
  });
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      if(spot.type !== ' '){
        if(!position){
          position = spot;
        }
        //right
        if(row[si+1] && row[si+1].type !== ' '){
          spot.right = row[si+1];
        }
        else {
          spot.right = row.find(r => r.type !== ' ');
        }
        //left
        if(row[si-1] && row[si-1].type !== ' '){
          spot.left = row[si-1];
        }
        else {
          spot.left = [...row].reverse().find(r => r.type !== ' ');
        }
        //up
        if(grid[ri-1] && grid[ri-1][si].type !== ' '){
          spot.up = grid[ri-1][si];
        }
        else {
          spot.up = grid.map(row => row[si]).reverse().find(r => r.type !== ' ');
        }
        //down
        if(grid[ri+1] && grid[ri+1][si].type !== ' '){
          spot.down = grid[ri+1][si];
        }
        else {
          spot.down = grid.map(row => row[si]).find(r => r.type !== ' ');
        }
      }
    })
  });
  let moves = input.split('\n\n')[1].split('');
  let facing = 'right';
  let turnMap = {
    right: {L: 'up', R: 'down', value: 0},
    left: {L: 'down', R: 'up', value: 2},
    up: {L: 'left', R: 'right', value: 3},
    down: {L: 'right', R: 'left', value: 1},
  };
  let move = '';
  moves.forEach(m => {
    if(m === 'L' || m === 'R'){
      for(let x = 1; x <= Number(move); x++){
        if(position[facing].type === '.'){
          position = position[facing];
        }
        else {
          break;
        }
      }
      //console.log('moving ', move, ' ', facing, ' to ', position.x, position.y)
      facing = turnMap[facing][m];
      //console.log('turning ', m, ' to face ', facing)
      move = '';
    }
    else {
      move = move + m;
    }
  });
  if(move){
    for(let x = 1; x <= Number(move); x++){
      position = position[facing];
    }
  }
  return (position.y * 1000) + (position.x * 4) + turnMap[facing].value
}

console.log(problem(input))

const problem2 = (input) => {
  let position;
  //example '12': 5 means positions with x coord mod 50 = 1 and y coord mod 50 = 2 belong to cube face 5
  //unfolded cube map looks like this, with each face being 50x50:
  //   [1][2]
  //   [3]
  //[4][5]
  //[6]
  let faceMap = {
    '10': 1,
    '20': 2,
    '11': 3,
    '02': 4,
    '12': 5,
    '03': 6
  };

  //set up initial grid with face attribution, absolute coords, and coords relative to face
  let grid = input.split('\n\n')[0].split('\n').filter(x=>x).map((row, ri) => {
    return row.split('').map((spot, si) => {
      return {
        type: spot,
        x: si+1,
        y: ri+1,
        up: null,
        right: null,
        left: null,
        down: null,
        face: faceMap[`${Math.floor(si/50)}${Math.floor(ri/50)}`],
        faceX: si%50,
        faceY: ri%50,
      }
    })
  });
  let maxRowSize = Math.max(...grid.map(r => r.length));
  let flatGrid = [];
  //pad grid rows with extra whitespace, and build a flat array with all points
  grid = grid.map((row, ri) => {
    let paddingSize = maxRowSize - row.length;
    let padding = new Array(paddingSize).fill('').map((p, pi) => {
      return {
        type: ' ',
        x: pi + row.length + 1,
        y: ri+1,
        up: null,
        right: null,
        left: null,
        down: null,
      }
    });
    let newRow = [...row, ...padding];
    flatGrid = [...flatGrid, ...newRow]
    return newRow;
  });

  //build 2d linked list, assigning up/down/left/right attributes based on cube map
  grid.forEach((row, ri) => {
    row.forEach((spot, si) => {
      if(spot.type !== ' '){
        if(!position){
          //set initial starting position
          position = spot;
        }

        //right
        if(row[si+1] && row[si+1].type !== ' '){
          spot.right = row[si+1];
        }
        else {
          if(spot.face === 3){
            spot.right = flatGrid.find(g => g.face === 2 && g.faceY === 49 && g.faceX === spot.faceY);
          }
          if(spot.face === 2){
            spot.right = flatGrid.find(g => g.face === 5 && g.faceX === 49 && g.faceY === Math.abs(spot.faceY - 49));
          }
          if(spot.face === 5){
            spot.right = flatGrid.find(g => g.face === 2 && g.faceX === 49 && Math.abs(g.faceY - 49) === spot.faceY);
          }
          if(spot.face === 6){
            spot.right = flatGrid.find(g => g.face === 5 && g.faceY === 49 && g.faceX === spot.faceY);
          }
        }

        //left
        if(row[si-1] && row[si-1].type !== ' '){
          spot.left = row[si-1];
        }
        else {
          if(spot.face === 1){
            spot.left = flatGrid.find(g => g.face === 4 && g.faceX === 0 && g.faceY === Math.abs(spot.faceY - 49));
          }
          else if(spot.face === 4){
            spot.left = flatGrid.find(g => g.face === 1 && g.faceX === 0 && Math.abs(g.faceY - 49) === spot.faceY);
          }
          else if(spot.face === 6){
            spot.left = flatGrid.find(g => g.face === 1 && g.faceY === 0 && g.faceX === spot.faceY);
          }
          else if(spot.face === 3){
            spot.left = flatGrid.find(g => g.face === 4 && g.faceY === 0 && g.faceX === spot.faceY);
          }
        }

        //up
        if(grid[ri-1] && grid[ri-1][si].type !== ' '){
          spot.up = grid[ri-1][si];
        }
        else {
          if(spot.face === 1){
            spot.up = flatGrid.find(g => g.face === 6 && g.faceX === 0 && g.faceY === spot.faceX);
          }
          if(spot.face === 2){
            spot.up = flatGrid.find(g => g.face === 6 && g.faceY === 49 && g.faceX === spot.faceX);
          }
          if(spot.face === 4){
            spot.up = flatGrid.find(g => g.face === 3 && g.faceX === 0 && g.faceY === spot.faceX);
          }
        }

        //down
        if(grid[ri+1] && grid[ri+1][si].type !== ' '){
          spot.down = grid[ri+1][si];
        }
        else {
          if(spot.face === 6){
            spot.down = flatGrid.find(g => g.face === 2 && g.faceY === 0 && g.faceX === spot.faceX);
          }
          if(spot.face === 2){
            spot.down = flatGrid.find(g => g.face === 3 && g.faceX === 49 && g.faceY === spot.faceX);
          }
          if(spot.face === 5){
            spot.down = flatGrid.find(g => g.face === 6 && g.faceX === 49 && g.faceY === spot.faceX);
          }
        }
      }
    })
  });

  let moves = input.split('\n\n')[1].split('');
  let facing = 'right';
  let turnMap = {
    right: {L: 'up', R: 'down', value: 0},
    left: {L: 'down', R: 'up', value: 2},
    up: {L: 'left', R: 'right', value: 3},
    down: {L: 'right', R: 'left', value: 1},
  };
  //example, '14': 'right' means moving from face 1 to face 4 leaves you facing right
  let cubeFacingTransformations = {
    '14': 'right',
    '41': 'right',
    '16': 'right',
    '61': 'down',
    '26': 'up',
    '62': 'down',
    '23': 'left',
    '32': 'up',
    '25': 'left',
    '52': 'left',
    '34': 'down',
    '43': 'right',
    '56': 'left',
    '65': 'up'
  }
  let move = '';
  moves.forEach(m => {
    if(m === 'L' || m === 'R'){
      for(let x = 1; x <= Number(move); x++){
        if(position[facing].type === '.'){
          let oldFace = position.face;
          //let oldPosition = position;
          position = position[facing];
          let newFace = position.face;
          // if(cubeFacingTransformations[`${oldFace}${newFace}`]){
          //   console.log('moving', facing, 'from', oldPosition.faceX, oldPosition.faceY, 'in face', oldFace, 'to', position.faceX, position.faceY, 'in face', newFace, 'and now facing', cubeFacingTransformations[`${oldFace}${newFace}`])
          // }
          facing = cubeFacingTransformations[`${oldFace}${newFace}`] || facing;
        }
        else {
          break;
        }
      }
      //console.log('moving ', move, ' ', facing, ' to ', position.x, position.y)
      facing = turnMap[facing][m];
      //console.log('turning ', m, ' to face ', facing)
      move = '';
    }
    else {
      move = move + m;
    }
  });
  //handle a leftover move
  if(move){
    for(let x = 1; x <= Number(move); x++){
      let oldFace = position.face;
      position = position[facing];
      let newFace = position.face;
      facing = cubeFacingTransformations[`${oldFace}${newFace}`] || facing;
    }
  }
  return (position.y * 1000) + (position.x * 4) + turnMap[facing].value
}

console.log(problem2(input))
