const input = require('./input').input;

const highestSeatID = (input) => {
  let highestID = 0;
  input.forEach(passport => {
    let rowMin = 0;
    let exp = 6;
    passport.slice(0,7).split('').forEach(fb => {
      if(fb === 'B'){
        rowMin += Math.pow(2, exp);
      }
      exp -= 1;
    });
    let colMin = 0;
    exp = 2;
    passport.slice(7).split('').forEach(lr => {
      if(lr === 'R'){
        colMin += Math.pow(2, exp);
      }
      exp -= 1;
    });

    let id = 8 * rowMin + colMin;
    if(id > highestID){
      highestID = id;
    }
  });
  return highestID
}

console.log(highestSeatID(input))

const mySeatId = (input) => {
  let allIds = [];
  input.forEach(passport => {
    let rowMin = 0;
    let exp = 6;
    passport.slice(0,7).split('').forEach(fb => {
      if(fb === 'B'){
        rowMin += Math.pow(2, exp);
      }
      exp -= 1;
    });
    let colMin = 0;
    exp = 2;
    passport.slice(7).split('').forEach(lr => {
      if(lr === 'R'){
        colMin += Math.pow(2, exp);
      }
      exp -= 1;
    });

    let id = 8 * rowMin + colMin;
    allIds.push(id);
  });
  allIds.sort((a,b) => a-b);
  return allIds.find((seat, i) => seat === (allIds[i + 1] - 2)) + 1;
}

console.log(mySeatId(input))
