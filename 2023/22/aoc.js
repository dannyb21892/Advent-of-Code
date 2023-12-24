import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
import * as __ from 'lodash';
const _ = __.default;
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map((line, name) => {
    let coords = line.split('~').map(coord => coord.split(',').map(Number))
    let output = {
      name,
      x: {min: Math.min(coords[0][0], coords[1][0]), max: Math.max(coords[0][0], coords[1][0])},
      y: {min: Math.min(coords[0][1], coords[1][1]), max: Math.max(coords[0][1], coords[1][1])},
      z: {min: Math.min(coords[0][2], coords[1][2]), max: Math.max(coords[0][2], coords[1][2])},
      supportedBy: []
    };
    output.grounded = output.z.min === 1;
    return output;
  });
  let nonGrounded = lines.filter(piece => !piece.grounded);
  let grounded = lines.filter(piece => piece.grounded);
  while(nonGrounded.length){
    let newNonGrounded = [];
    nonGrounded.sort((a,b) => a.z.min - b.z.min).forEach(piece => {
      let groundedBelow = grounded.filter(gpiece => 
        (gpiece.x.min <= piece.x.max && gpiece.x.max >= piece.x.min) &&
        (gpiece.y.min <= piece.y.max && gpiece.y.max >= piece.y.min) &&
        gpiece.z.max === piece.z.min - 1
      );
      if(groundedBelow.length){
        piece.grounded = true;
        piece.supportedBy = [...piece.supportedBy, ...groundedBelow];
        grounded.push(piece);
      }
      else if(piece.z.min === 2){
        piece.grounded = true;
        grounded.push(piece);
        piece.z.min -=1;
        piece.z.max -=1;
      }
      else {
        newNonGrounded.push(piece);
        piece.z.min -=1;
        piece.z.max -=1;
      }
    });
    nonGrounded = newNonGrounded;
  };

  let total = 0;
  lines.forEach(piece => {
    let pieceExclusivelySupportsThisOne = lines.find(test => test.supportedBy.length === 1 && test.supportedBy[0] === piece);
    if(!pieceExclusivelySupportsThisOne) {
      total++;
    }
  })
  return total
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map((line, name) => {
    let coords = line.split('~').map(coord => coord.split(',').map(Number))
    let output = {
      name,
      x: {min: Math.min(coords[0][0], coords[1][0]), max: Math.max(coords[0][0], coords[1][0])},
      y: {min: Math.min(coords[0][1], coords[1][1]), max: Math.max(coords[0][1], coords[1][1])},
      z: {min: Math.min(coords[0][2], coords[1][2]), max: Math.max(coords[0][2], coords[1][2])},
      supportedBy: []
    };
    output.grounded = output.z.min === 1;
    return output;
  });
  let nonGrounded = lines.filter(piece => !piece.grounded);
  let grounded = lines.filter(piece => piece.grounded);
  while(nonGrounded.length){
    let newNonGrounded = [];
    nonGrounded.sort((a,b) => a.z.min - b.z.min).forEach(piece => {
      let groundedBelow = grounded.filter(gpiece => 
        (gpiece.x.min <= piece.x.max && gpiece.x.max >= piece.x.min) &&
        (gpiece.y.min <= piece.y.max && gpiece.y.max >= piece.y.min) &&
        gpiece.z.max === piece.z.min - 1
      );
      if(groundedBelow.length){
        piece.grounded = true;
        piece.supportedBy = [...piece.supportedBy, ...groundedBelow];
        grounded.push(piece);
      }
      else if(piece.z.min === 2){
        piece.grounded = true;
        grounded.push(piece);
        piece.z.min -=1;
        piece.z.max -=1;
      }
      else {
        newNonGrounded.push(piece);
        piece.z.min -=1;
        piece.z.max -=1;
      }
    });
    nonGrounded = newNonGrounded;
  };

  let total = 0;
  lines.forEach((piece,i) => {
    let linesCopy = _.cloneDeep(lines);
    let pieceCopy = linesCopy.find(c => c.name === piece.name);
    let add = recursivelyFindChainReaction([pieceCopy], linesCopy) - 1;
    total += add;
  })
  return total
}

let recursivelyFindChainReaction = (fallingPieces, allPieces, depth = 0) => {
  let output = fallingPieces.length
  let newFallingPieces = allPieces.filter(test => {
    //pieces that are supported by something, but all its supports are in allFallingPieces array
    if(test.supportedBy.length){
      test.supportedBy = test.supportedBy.filter(support => !fallingPieces.includes(support))
      return test.supportedBy.length === 0
    }
  });
  if(newFallingPieces.length){
    output += recursivelyFindChainReaction(newFallingPieces, allPieces, depth+1);
  }
  return output;
}

console.log(problem2(input))