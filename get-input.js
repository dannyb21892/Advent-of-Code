//const input = require('./input').input;
import fetch from 'node-fetch';
import * as fs from 'fs';

const getInput = (day, year) => {
  const USER_AGENT = `node/${process.version} "dannyb-advent-of-code"/1.0`;
  const uri = `https://adventofcode.com/${year}/day/${day}/input`;
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
      //replace cookie with a real one stolen from network tab
      Cookie: 'session=53616c7465645f5fde980c15263e290bc8fcfec30edcc8dc7637003defd4cb5b84f7fb49e3db47a29d650f969cf60f964949eab5aa6e099e1059cd187244b52b',
      'User-Agent': USER_AGENT
    }
  }
  fetch(uri, options)
  .then(response => response.text())
  .then(response => {
    fs.writeFile('./input.js', "export const input = `" + response + "`", err => {
      if (err) {
        console.error(err)
        return
      }
      console.log('input written to input file for day ' + day)
    })
  });
}

export const getInputforDay = (existingInput, callerPath) => {
  const pathParams = callerPath.split('/');
  const day = pathParams[pathParams.length-2];
  const year = pathParams[pathParams.length-3];
  console.log(day, year)
  if(!existingInput){
    getInput(day, year)
  }
}
