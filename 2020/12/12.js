const input = require('./input').input;

const part1 = (input) => {
  let moves = input.split('\n').map(move => {
    return {
      move: move.slice(0,1),
      amount: Number(move.slice(1))
    }
  });

  let ship = {
    x: 0,
    y: 0,
    angle: 90
  };

  const dirMap = {
    0: {x: 0, y: -1},
    90: {x: 1, y: 0},
    180: {x: 0, y: 1},
    270: {x: -1, y: 0},
  }
  const compass = {
    N: {x: 0, y: -1},
    E: {x: 1, y: 0},
    S: {x: 0, y: 1},
    W: {x: -1, y: 0},
  }

  moves.forEach(m => {
    if(m.move === 'L'){
      ship.angle = (ship.angle - m.amount) % 360;
      if(ship.angle < 0){
        ship.angle = ship.angle + 360;
      }
    }
    else if(m.move === 'R'){
      ship.angle = (ship.angle + m.amount) % 360;
      if(ship.angle < 0){
        ship.angle = ship.angle + 360;
      }
    }
    else if(m.move === 'F'){
      ship.x = ship.x + (m.amount * dirMap[ship.angle].x);
      ship.y = ship.y + (m.amount * dirMap[ship.angle].y);
    }
    else {
      ship.x = ship.x + (m.amount * compass[m.move].x);
      ship.y = ship.y + (m.amount * compass[m.move].y);
    }
  });

  return Math.abs(ship.x) + Math.abs(ship.y)
}

console.log(part1(input))

const rotate = (x, y, amount, clockwise = true) => {
  let outx;
  let outy;
  if((clockwise && amount === 90) || (!clockwise && amount === 270)){
    outx = y;
    outy = -x;
  }
  else if((!clockwise && amount === 90) || (clockwise && amount === 270)){
    outx = -y;
    outy = x;
  }
  else if(amount === 180){
    outx = -x;
    outy = -y;
  }
  return {x: outx, y: outy}
}

const part2 = (input) => {
  let moves = input.split('\n').map(move => {
    return {
      move: move.slice(0,1),
      amount: Number(move.slice(1))
    }
  });

  let ship = {
    x: 0,
    y: 0,
  };
  let waypoint = {
    x: 10,
    y: 1,
    dx: 10,
    dy: 1
  }

  const compass = {
    N: {x: 0, y: 1},
    E: {x: 1, y: 0},
    S: {x: 0, y: -1},
    W: {x: -1, y: 0},
  }

  moves.forEach((m) => {
    if(m.move === 'L' || m.move === 'R'){
      let r = rotate(waypoint.dx, waypoint.dy, m.amount, m.move === 'R');
      waypoint.dx = r.x;
      waypoint.dy = r.y;
      waypoint.x = ship.x + waypoint.dx;
      waypoint.y = ship.y + waypoint.dy;
    }
    else if(m.move === 'F'){
      ship.x = ship.x + (m.amount * waypoint.dx);
      ship.y = ship.y + (m.amount * waypoint.dy);
      waypoint.x = ship.x + waypoint.dx;
      waypoint.y = ship.y + waypoint.dy;
    }
    else {
      waypoint.x = waypoint.x + (m.amount * compass[m.move].x);
      waypoint.y = waypoint.y + (m.amount * compass[m.move].y);
      waypoint.dx = waypoint.dx + (m.amount * compass[m.move].x);
      waypoint.dy = waypoint.dy + (m.amount * compass[m.move].y);
    }
  });
  return Math.abs(ship.x) + Math.abs(ship.y)
}

console.log(part2(input))
