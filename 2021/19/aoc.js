import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let scanners = input.split('\n\n').map(s => {
    return s.split('\n').slice(1).map(coords => {
      coords = coords.split(',');
      return {x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2])}
    })
  });

  let locatedScanners = [scanners[0]];
  scanners = scanners.slice(1);
  while(scanners.length){
    let newScanners = [];
    scanners.forEach((scanner,i) => {
      let scannerMapped = false;
      let scannerPerspectives = generatePerspectives(scanner);
      let p = 0;
      for(let perspective of scannerPerspectives) {
        for(let ls of locatedScanners) {
          for(let pPoint of perspective) {
            for(let lsPoint of ls) {
              let translation = {
                x: lsPoint.x - pPoint.x,
                y: lsPoint.y - pPoint.y,
                z: lsPoint.z - pPoint.z
              };
              let translatedPerspective = perspective.map(tpPoint => {
                return {
                  x: tpPoint.x + translation.x,
                  y: tpPoint.y + translation.y,
                  z: tpPoint.z + translation.z
                }
              });

              let commonPoints = translatedPerspective.filter(tpPoint =>
                ls.find(lsTestPoint => lsTestPoint.x === tpPoint.x &&
                                       lsTestPoint.y === tpPoint.y &&
                                       lsTestPoint.z === tpPoint.z)
              );
              if(commonPoints.length >= 12){
                locatedScanners.push(translatedPerspective);
                scannerMapped = true;
                break;
              }
            }
            if(scannerMapped) break;
          }
          if(scannerMapped) break;
        }
        if(scannerMapped) break;
      }
      if(!scannerMapped){
        newScanners.push(scanner)
      }
    });
    scanners = newScanners;
  }

  let allBeacons = [];
  locatedScanners.forEach(ls => allBeacons = [
    ...allBeacons,
    ...ls.map(lsPoint => `${lsPoint.x},${lsPoint.y},${lsPoint.z}`)
  ]);
  allBeacons = [...new Set(allBeacons)];
  return allBeacons.length
}

let generatePerspectives = points => {
  let output = [];
  let rules = [
    {x: [1,'x'], y: [1,'y'], z: [1,'z']},
    {x: [1,'z'], y: [1,'y'], z: [-1,'x']},
    {x: [-1,'x'], y: [1,'y'], z: [-1,'z']},
    {x: [-1,'z'], y: [1,'y'], z: [1,'x']},
    {x: [-1,'x'], y: [-1,'y'], z: [1,'z']},
    {x: [-1,'z'], y: [-1,'y'], z: [-1,'x']},
    {x: [1,'x'], y: [-1,'y'], z: [-1,'z']},
    {x: [1,'z'], y: [-1,'y'], z: [1,'x']},

    {x: [-1,'y'], y: [1,'x'], z: [1,'z']},
    {x: [1,'z'], y: [1,'x'], z: [1,'y']},
    {x: [1,'y'], y: [1,'x'], z: [-1,'z']},
    {x: [-1,'z'], y: [1,'x'], z: [-1,'y']},
    {x: [1,'y'], y: [-1,'x'], z: [1,'z']},
    {x: [-1,'z'], y: [-1,'x'], z: [1,'y']},
    {x: [-1,'y'], y: [-1,'x'], z: [-1,'z']},
    {x: [1,'z'], y: [-1,'x'], z: [-1,'y']},

    {x: [1,'x'], y: [1,'z'], z: [-1,'y']},
    {x: [1,'y'], y: [1,'z'], z: [1,'x']},
    {x: [-1,'x'], y: [1,'z'], z: [1,'y']},
    {x: [-1,'y'], y: [1,'z'], z: [-1,'x']},
    {x: [1,'x'], y: [-1,'z'], z: [1,'y']},
    {x: [1,'y'], y: [-1,'z'], z: [-1,'x']},
    {x: [-1,'x'], y: [-1,'z'], z: [-1,'y']},
    {x: [-1,'y'], y: [-1,'z'], z: [1,'x']},
  ];
  rules.forEach(rule => {
    let perspectiveGroup = [];
    points.forEach(point => {
      perspectiveGroup.push({
        x: rule.x[0] * point[rule.x[1]],
        y: rule.y[0] * point[rule.y[1]],
        z: rule.z[0] * point[rule.z[1]]
      })
    });
    output.push(perspectiveGroup);
  });
  return output;
}

console.log(problem(input))

const problem2 = (input) => {
  let scanners = input.split('\n\n').map(s => {
    return s.split('\n').slice(1).map(coords => {
      coords = coords.split(',');
      return {x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2])}
    })
  });

  let locatedScanners = [scanners[0]];
  let scannerLocations = [{x: 0, y: 0, z: 0}];
  scanners = scanners.slice(1);
  while(scanners.length){
    let newScanners = [];
    scanners.forEach((scanner,i) => {
      let scannerMapped = false;
      let scannerPerspectives = generatePerspectives(scanner);
      for(let perspective of scannerPerspectives) {
        for(let ls of locatedScanners) {
          for(let pPoint of perspective) {
            for(let lsPoint of ls) {
              let translation = {
                x: lsPoint.x - pPoint.x,
                y: lsPoint.y - pPoint.y,
                z: lsPoint.z - pPoint.z
              };
              let translatedPerspective = perspective.map(tpPoint => {
                return {
                  x: tpPoint.x + translation.x,
                  y: tpPoint.y + translation.y,
                  z: tpPoint.z + translation.z
                }
              });
              let commonPoints = translatedPerspective.filter(tpPoint =>
                ls.find(lsTestPoint => lsTestPoint.x === tpPoint.x &&
                                       lsTestPoint.y === tpPoint.y &&
                                       lsTestPoint.z === tpPoint.z)
              );
              if(commonPoints.length >= 12){
                locatedScanners.push(translatedPerspective);
                scannerLocations.push(translation);
                scannerMapped = true;
                break;
              }
            }
            if(scannerMapped) break;
          }
          if(scannerMapped) break;
        }
        if(scannerMapped) break;
      }
      if(!scannerMapped){
        newScanners.push(scanner)
      }
    });
    scanners = newScanners;
  }

  let maxDist = 0;
  scannerLocations.forEach((sl1, i) => {
    scannerLocations.slice(i).forEach((sl2) => {
      let dist = Math.abs(sl1.x - sl2.x) +
                 Math.abs(sl1.y - sl2.y) +
                 Math.abs(sl1.z - sl2.z);
      if(dist > maxDist){
        maxDist = dist;
      }
    })
  })
  return maxDist;
}

console.log(problem2(input))
