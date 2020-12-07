const input = require('./input').input;
const invalid = require('./input').invalid;
const valid = require('./input').valid;



const validPassports = (input) => {
  const passports = input.split('|');
  let count = 0;
  const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid']//,'cid'];
  passports.forEach(p => {
    let valid = true;
    fields.forEach(f => {
      valid = valid && p.includes(f);
    })
    if(valid){
      count += 1;
    }
  });
  return count;
}

console.log(validPassports(input))

const validPassportsValues = (input) => {
  const passports = input.replace(/ /g, `\n`).split('|');
  let count = 0;
  passports.forEach(p => {
    console.log('---------------', p)
    let valid = true;
    const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
    fields.forEach(f => {
      valid = valid && p.includes(f);
    });
    if(valid){
      p.split('\n').filter(x => x !== '').forEach(pair => {
        let key = pair.split(':')[0];
        let value = pair.split(':')[1];
        let numVal = Number(value);
        console.log('new pair', key, value)
        if(key === 'byr'){
          valid = valid && value.length === 4 && numVal && numVal >= 1920 && numVal <= 2002;
          console.log('byr', valid)
        }
        if(key === 'iyr'){
          valid = valid && value.length === 4 && numVal && numVal >= 2010 && numVal <= 2020;
          console.log('iyr', valid)
        }
        if(key === 'eyr'){
          valid = valid && value.length === 4 && numVal && numVal >= 2020 && numVal <= 2030;
          console.log('eyr', valid)
        }
        if(key === 'hgt'){
          let unit = value.slice(value.length - 2);
          let num = value.slice(0, value.length - 2);
          let realNum = Number(num);
          valid = valid && (unit === 'cm' || unit === 'in') && realNum;
          if(unit === 'cm'){
            valid = valid && realNum >= 150 && realNum <= 193;
            console.log('hgt cm', valid)
          }
          else if(unit === 'in'){
            valid = valid && realNum >= 59 && realNum <= 76;
            console.log('hgt in', valid)
          }
        }
        if(key === 'hcl'){
          let rx = /\#[a-f0-9]{6}/gm;
          valid = valid && value.length === 7 && value.match(rx);
          console.log('hcl', valid)
        }
        if(key === 'ecl'){
          const colors = ['amb','blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
          valid = valid && colors.includes(value);
          console.log('ecl', valid)
        }
        if(key === 'pid'){
          let rx = /[0-9]{9}/gm;
          valid = valid && value.length === 9 && value.match(rx);
          console.log('pid', valid)
        }
      })
    }
    console.log(!!valid)
    if(valid){
      count += 1;
    }
  });
  return count;
}


console.log(validPassportsValues(input))
