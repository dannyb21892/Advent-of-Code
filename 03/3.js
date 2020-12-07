const input = require('./input').input;

const countTreeAlongSlope = (input, right, down) => {
  let count = 0;
  let x = 0;
  let y = 0;
  const mod = input[0].length;
  while(input[y]){
    count += input[y][x] === '#' ? 1 : 0;
    x += right;
    x = x % mod;
    y += down;
  }
  return count;
}

console.log(countTreeAlongSlope(input, 3, 1))

console.log(
  countTreeAlongSlope(input, 3, 1) *
  countTreeAlongSlope(input, 1, 1) *
  countTreeAlongSlope(input, 5, 1) *
  countTreeAlongSlope(input, 7, 1) *
  countTreeAlongSlope(input, 1, 2)
)
