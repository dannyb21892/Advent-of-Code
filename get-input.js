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
      Cookie: 'session=53616c7465645f5f33bc11f64b60174a7a53c460daf7d9c23b2303292f9b7d788869de7d62024e8cb92bbae196fda9a6',
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
