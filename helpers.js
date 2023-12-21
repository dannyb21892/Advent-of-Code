export const rotateArrayClockwise90 = (lines) => lines.map((line,i) => lines.map(line => line[i]).reverse());

export const rotateArrayCounterClockwise90 = (lines) => lines.map((line,i) => lines.map(line => line[lines.length - (i+1)]));

export function gcd(a,b){
  var t = 0;
  a < b && (t = b, b = a, a = t);
  t = a%b;
  return t ? gcd(b,t) : b;
}

//if you have more than 2 numbers in an array and you want to lcm them all, just use array.reduce(lcm, 1)
export function lcm(a,b){
  return a/gcd(a,b)*b;
}