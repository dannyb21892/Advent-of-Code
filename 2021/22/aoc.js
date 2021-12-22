import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input, part = 1) => {
  let sections = input.split('\n\n').filter(Boolean).map(section => section.split('\n').map(line => {
    let parts = line.split(' ');
    let output = {
      on: false,
      coords: {
        x: {},
        y: {},
        z: {}
      }
    };
    output.on = parts[0] === 'on';
    let coords = parts[1].split(',').forEach(coord => {
      let parts = coord.split('=');
      let bounds = parts[1].split('..').map(Number)
      output.coords[parts[0]].min = bounds[0];
      output.coords[parts[0]].max = bounds[1];
    })
    return output
  }));
  let onCubes = [{...sections[0][0].coords}];
  let coords = ['x','y','z'];

  let sectionsToUse = part === 1 ? sections[0] : [...sections[0], ...sections[1]];
  console.log(sectionsToUse)

  sectionsToUse.slice(1).forEach((line, l_i) => {
    console.log(l_i)
    // console.log('\n\n',l_i)
    // console.log(onCubes.reduce((totalVol, cube) => {
    //   let output = totalVol;
    //   let addVol = Object.values(cube).reduce((vol, coord) => {
    //     return vol * (coord.max - coord.min + 1)
    //   }, 1);
    //   return totalVol + addVol
    // }, 0));
    // console.log(onCubes)

    let newOnCubes = [line.coords];
    let overlapped = true;
    while(overlapped){
      overlapped = false;
      for(let [nc_i, newCube] of newOnCubes.entries()) {
        let shouldBreak = false;
        //find overlaps
        for(let [oc_i, onCube] of onCubes.entries()) {
          let overlap = {
            x: null, y: null, z: null
          }
          let nonOverlaps = {
            x: [], y: [], z: []
          }
          let remainder = {
            x: [], y: [], z: []
          }
          let allThreeGroups = {
            overlap: overlap, nonOverlaps: nonOverlaps, remainder: remainder
          }
          for(let coord of coords){
            if(newCube[coord].max >= onCube[coord].min &&
              newCube[coord].min <= onCube[coord].max){
              overlap[coord] = {
                min: Math.max(onCube[coord].min, newCube[coord].min),
                max: Math.min(onCube[coord].max, newCube[coord].max),
              };

              if(newCube[coord].min <= (onCube[coord].min - 1)){
                nonOverlaps[coord].push({
                  min: newCube[coord].min,
                  max: onCube[coord].min - 1,
                });
              }
              if(newCube[coord].max >= (onCube[coord].max + 1)){
                nonOverlaps[coord].push({
                  min: onCube[coord].max + 1,
                  max: newCube[coord].max,
                });
              }

              if(newCube[coord].max + 1 <= onCube[coord].max){
                remainder[coord].push({
                  min: newCube[coord].max + 1,
                  max: onCube[coord].max
                })
              }
              if(newCube[coord].min - 1 >= onCube[coord].min){
                remainder[coord].push({
                  min: onCube[coord].min,
                  max: newCube[coord].min - 1
                })
              }
            }
          }
          //console.log(overlap, nonOverlaps, remainder)
          if(overlap.x && overlap.y && overlap.z){
            let sideCubes = {};
            let edgeCubes = {};
            let cornerCubes = {};
            let relevantPortrudingGroup = line.on ? 'nonOverlaps' : 'remainder';
            relevantPortrudingGroup = allThreeGroups[relevantPortrudingGroup];
            overlapped = true;
            coords.forEach(firstCoord => {
              let otherCoords = coords.filter(c => c !== firstCoord);
              relevantPortrudingGroup[firstCoord].forEach((firstPortrusion, p1_i) => {
                let sideCubeKey = [];
                let newSideCube = { x: null, y: null, z: null};
                newSideCube[firstCoord] = {...firstPortrusion};
                sideCubeKey.push(`${firstCoord}${p1_i}`)
                otherCoords.forEach(secondCoord => {
                  newSideCube[secondCoord] = {
                    min: Math.max(onCube[secondCoord].min, newCube[secondCoord].min),
                    max: Math.min(onCube[secondCoord].max, newCube[secondCoord].max)
                  };
                  sideCubeKey.push(secondCoord)

                  if(relevantPortrudingGroup[secondCoord].length){
                    relevantPortrudingGroup[secondCoord].forEach((secondPortrusion, p2_i) => {
                      let edgeCubeKey = [];
                      let newEdgeCube = { x: null, y: null, z: null};
                      newEdgeCube[firstCoord] = {...firstPortrusion};
                      edgeCubeKey.push(`${firstCoord}${p1_i}`)
                      newEdgeCube[secondCoord] = {...secondPortrusion};
                      edgeCubeKey.push(`${secondCoord}${p2_i}`)

                      let thirdCoord = otherCoords.find(c => c !== secondCoord);
                      newEdgeCube[thirdCoord] = {
                        min: Math.max(onCube[thirdCoord].min, newCube[thirdCoord].min),
                        max: Math.min(onCube[thirdCoord].max, newCube[thirdCoord].max)
                      };
                      edgeCubeKey.push(thirdCoord)
                      edgeCubes[edgeCubeKey.sort().join('')] = newEdgeCube;

                      if(relevantPortrudingGroup[thirdCoord].length){
                        relevantPortrudingGroup[thirdCoord].forEach((thirdPortrusion, p3_i) => {
                          let cornerCubeKey = [];
                          let newCornerCube = { x: null, y: null, z: null};
                          newCornerCube[firstCoord] = {...firstPortrusion};
                          cornerCubeKey.push(`${firstCoord}${p1_i}`)
                          newCornerCube[secondCoord] = {...secondPortrusion};
                          cornerCubeKey.push(`${secondCoord}${p2_i}`)
                          newCornerCube[thirdCoord] = {...thirdPortrusion};
                          cornerCubeKey.push(`${thirdCoord}${p3_i}`)
                          cornerCubes[cornerCubeKey.sort().join('')] = newCornerCube;
                        })
                      }

                    });
                  }
                });
                sideCubes[sideCubeKey.sort().join('')] = newSideCube;
              })
            })
            let addOnCubes = [
              ...Object.values(sideCubes),
              ...Object.values(edgeCubes),
              ...Object.values(cornerCubes),
            ];

            if(line.on){
              newOnCubes = [
                ...newOnCubes.slice(0, nc_i),
                ...addOnCubes,
                ...newOnCubes.slice(nc_i+1)
              ];
            }
            else {
              onCubes = [
                ...onCubes.slice(0, oc_i),
                ...addOnCubes,
                ...onCubes.slice(oc_i+1)
              ];
            }
            shouldBreak = true;
            break;
          }
        }
        if(shouldBreak) {
          break;
        }
      }
      if(!overlapped){
        break;
      }
    }
    if(line.on){
      onCubes = [...onCubes, ...newOnCubes];
    }
  });

  let totalVol = onCubes.reduce((totalVol, cube) => {
    let output = totalVol;
    let addVol = Object.values(cube).reduce((vol, coord) => {
      return vol * (coord.max - coord.min + 1)
    }, 1);
    return totalVol + addVol
  }, 0);
  // console.log(totalVol);
  // console.log(onCubes)
  return totalVol
}

console.log(problem(input, 1))


console.log(problem(input, 2))
