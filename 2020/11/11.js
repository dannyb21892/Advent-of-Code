const input = require('./input').input;
const testInput = require('./input').testInput;

const buildGrid = input => {
  let inputArr = input.split('\n').map(row => row.split(''));
  let grid = [];
  inputArr.forEach((row,r) => {
    let newRow = []
    row.forEach((seat, s) => {
      newRow.push({
        base: seat,
        occupied: false,
      })
    })
    grid.push(newRow);
  });

  return grid;
}

const printGrid = grid => {
  console.log(grid.map(row => row.map(seat => seat.occupied === true ? '#' : seat.base).join('') + '\n').join(''))
}

const checkForSeats = (grid, r, s, y, x, onlyAdjacent = true) => {
  let ydelta = y;
  let xdelta = x;
  let output = 0;
  while(grid[r + y] && grid[r + y][s + x]){
    if(grid[r + y][s + x].base === 'L'){
      if(grid[r + y][s + x].occupied){
        output += 1;
      }
      break;
    }
    y += ydelta;
    x += xdelta;
    if(onlyAdjacent){ break; }
  }
  return output;
}

const part1 = (grid) => {
  let roundHadChanges = true;
  let round = 0;
  while(roundHadChanges){
    roundHadChanges = false;
    let changes = [];
    grid.forEach((row, r) => {
      row.forEach((seat, s) => {
        let occupiedAdjSeats = 0;
        for(let y = -1; y <= 1; y++){
          for(let x = -1; x <= 1; x++){
            if(!(x === 0 && y === 0)){
              occupiedAdjSeats += checkForSeats(grid, r, s, y, x);
            }
          }
        }
        if((seat.base === 'L' && !seat.occupied && occupiedAdjSeats === 0) || (seat.occupied && occupiedAdjSeats >= 4)){
          changes.push({row: r, seat: s})
          roundHadChanges = true;
        }
      })
    })
    changes.forEach(change => {
      grid[change.row][change.seat].occupied = !grid[change.row][change.seat].occupied;
    })
    round += 1;
  }
  let totalOccupied = 0;
  grid.forEach((row) => {
    row.forEach((seat) => {
      if(seat.occupied){
        totalOccupied += 1;
      }
    })
  });

  return totalOccupied;
}

console.log(part1(buildGrid(input)))

const part2 = (grid) => {
  let roundHadChanges = true;
  let round = 0;
  while(roundHadChanges){
    roundHadChanges = false;
    let changes = [];
    grid.forEach((row, r) => {
      row.forEach((seat, s) => {
        let visibleOccupied = 0;
        for(let y = -1; y <= 1; y++){
          for(let x = -1; x <= 1; x++){
            if(!(x === 0 && y === 0)){
              visibleOccupied += checkForSeats(grid, r, s, y, x, false);
            }
          }
        }

        if((seat.base === 'L' && !seat.occupied && visibleOccupied === 0) || (seat.occupied && visibleOccupied >= 5)){
          roundHadChanges = true;
          changes.push({row: r, seat: s})
        }
      });
    });

    changes.forEach(change => {
      grid[change.row][change.seat].occupied = !grid[change.row][change.seat].occupied;
    })
    round += 1;
  };

  let totalOccupied = 0;
  grid.forEach((row) => {
    row.forEach((seat) => {
      if(seat.occupied){
        totalOccupied += 1;
      }
    })
  });

  return totalOccupied;
}

console.log(part2(buildGrid(input)))
