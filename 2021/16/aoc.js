import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let bin = input.split('')
    .map(hex => {
      let binary = parseInt(hex,16).toString(2);
      while(binary.length < 4){
        binary = '0' + binary;
      }
      return binary
    })
    .reduce((a,b) => a + b, '');

  return parseBinary(bin).versionTotal;
}

const parseBinary = (bin, versionTotal = 0, depth = 0, subPacketCount = 1) => {
  //console.log('new call')
  //for(let subPackets = 1; subPackets <= subPacketCount; subPackets++){
    //console.log('new loop at depth ', depth, bin, '\n', 'subPackets', subPacketCount)
    if(parseInt(bin,2) !== 0 && !isNaN(parseInt(bin,2))){
      let ver = parseInt(bin.slice(0,3), 2);
      versionTotal += ver;
      let typeId = parseInt(bin.slice(3,6), 2);
      if(typeId === 4){
        let literal = '';
        let i = 0;
        while(true){
          let chunk = bin.slice(6 + 5*i, 11 + 5*i);
          literal += chunk.slice(1);
          if(chunk[0] === '0'){
            break;
          }
          i++;
        }
        literal = parseInt(literal, 2);
        bin = bin.slice(11 + 5*i);
        //console.log('literal type \n', !!bin, '\n\n')
        while(parseInt(bin,2) !== 0 && !isNaN(parseInt(bin,2))){
          //console.log('calling again from literal')
          let response = parseBinary(bin, versionTotal, depth + 1);
          bin = response.newBin;
          versionTotal = response.versionTotal;
        }
        //break;
      }
      else {
        let lengthTypeId = bin[6];
        if(lengthTypeId === '0'){
          let subPacketsBitLength = parseInt(bin.slice(7,22),2);
          let subPacketsBits = bin.slice(22, 22 + subPacketsBitLength);
          //console.log('op type 0', subPacketsBitLength, subPacketsBits, '\n');
          let response = parseBinary(subPacketsBits, versionTotal, depth + 1);
          bin = bin.slice(22 + subPacketsBitLength);
          versionTotal = response.versionTotal;
          while(parseInt(bin,2) !== 0 && !isNaN(parseInt(bin,2))){
            //console.log('calling again')
            response = parseBinary(bin, versionTotal, depth + 1);
            bin = response.newBin;
            versionTotal = response.versionTotal;
          }
        }
        else {
          let numberOfSubPackets = parseInt(bin.slice(7, 18),2);
          //console.log('op type 1', numberOfSubPackets, '\n')
          let response = parseBinary(bin.slice(18), versionTotal, depth + 1, numberOfSubPackets);
          bin = response.newBin;
          versionTotal = response.versionTotal;
        }
      }
    }
  //}
  return {
    versionTotal: versionTotal,
    newBin: bin,
  }
}

console.log(problem(input))

const problem2 = (input) => {
  let bin = input.split('')
    .map(hex => {
      let binary = parseInt(hex,16).toString(2);
      while(binary.length < 4){
        binary = '0' + binary;
      }
      return binary
    })
    .reduce((a,b) => a + b, '');

  return parseBinary2(bin).val;
}

const parseBinary2 = (bin) => {
  let ver = parseInt(bin.slice(0,3), 2);
  let typeId = parseInt(bin.slice(3,6), 2);
  let val = null;
  //console.log(bin, ver, typeId)
  if(typeId === 4){
    let literal = '';
    let i = 0;
    while(true){
      let chunk = bin.slice(6 + 5*i, 11 + 5*i);
      literal += chunk.slice(1);
      if(chunk[0] === '0'){
        break;
      }
      i++;
    }
    literal = parseInt(literal, 2);
    val = literal;
    bin = bin.slice(11 + 5*i);
    //console.log(literal, bin, '\n\n')
  }
  else {
    let lengthTypeId = bin[6];
    let args = [];
    if(lengthTypeId === '0'){
      let subPacketsBitLength = parseInt(bin.slice(7,22),2);
      let subPacketsBits = bin.slice(22, 22 + subPacketsBitLength);
      while(isNotZerosAndNaN(subPacketsBits)){
        //console.log('type id 0\n\n')
        let response = parseBinary2(subPacketsBits);
        subPacketsBits = response.bin;
        args.push(response.val || 0)
      }
      bin = bin.slice(22 + subPacketsBitLength);
    }
    else {
      let numberOfSubPackets = parseInt(bin.slice(7, 18),2);
      for(let i = 1; i <= numberOfSubPackets; i++){
        //console.log('type id 1 subpacket ', i, ' out of ', numberOfSubPackets, '\n\n')
        let response = parseBinary2(bin.slice(i === 1 ? 18 : 0));
        bin = response.bin;
        args.push(response.val || 0)
      }
    }
    val = evalOpByType(typeId, args);
  }
  return {
    bin: bin,
    val: val,
  }
}

const evalOpByType = (typeId, args) => {
  if(typeId === 0){
    return args.reduce((a,b) => a + b, 0);
  }
  else if(typeId === 1){
    return args.reduce((a,b) => a * b, 1);
  }
  else if(typeId === 2){
    return Math.min(...args);
  }
  else if(typeId === 3){
    return Math.max(...args);
  }
  else if(typeId === 5){
    return args[0] > args[1] ? 1 : 0;
  }
  else if(typeId === 6){
    return args[0] < args[1] ? 1 : 0;
  }
  else if(typeId === 7){
    return args[0] === args[1] ? 1 : 0;
  }
}

const isNotZerosAndNaN = bin => (parseInt(bin,2) !== 0 && !isNaN(parseInt(bin,2)));

console.log(problem2(input))
