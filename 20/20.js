const input = require('./input').input;

const base = tile => [...tile];
const r90 = tile => {
  let out = [];
  let flip = flipv(tile);
  for(let i = 0; i < flip.length; i++){
    out = [...out, flip.map(row => row[i])];
  }
  return out;
};
const r180 = tile => flipv(fliph(tile));
const r270 = tile => {
  let out = [];
  let flip = fliph(tile);
  for(let i = 0; i < flip.length; i++){
    out = [...out, flip.map(row => row[i])];
  }
  return out;
};
const fliph = tile => tile.map(row => [...row].reverse());
const flipv = tile => [...tile].reverse();

const parseInput = (input) => {
  return input.split('\n\n').map(tile => {
    let id = tile.split('\n')[0].split(' ')[1].slice(0,4);
    let base = tile.split('\n').slice(1).map(row => row.split(''));
    let transformations = {
      id: Number(id),
      xforms: {
        base: {tile: base},
        r90: {tile: r90(base)},
        r180: {tile: r180(base)},
        r270: {tile: r270(base)},
        fliph: {tile: fliph(base)},
        flipv: {tile: flipv(base)},
        r90flip: {tile: r90(flipv(base))},
        r270flip: {tile: r270(flipv(base))}
      }
    };
    Object.entries(transformations.xforms).forEach(([k,v]) => {
      transformations.xforms[k]['edges'] = parseEdges(v.tile);
    });
    return transformations;
  })
};

parseEdges = (tile) => {
  return {
    top: {edge: tile[0].join(''), matches: []},
    bottom: {edge: tile[tile.length - 1].join(''), matches: []},
    right: {edge: tile.map(row => row[row.length - 1]).join(''), matches: []},
    left: {edge: tile.map(row => row[0]).join(''), matches: []}
  }
}

printTile = (tile) => console.log(Object.values(tile.xforms)
  .map(tile => tile.tile.map(row => row.join('')).join('\n')).join('\n\n')
);

const edgeOpposites = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};

const part1 = (tiles) => {
  let possibleCorners = [];
  tiles.forEach(tile => {
    Object.entries(tile.xforms).forEach(([xform, data]) => {
      Object.entries(data.edges).forEach(([edgeType, edge]) => {
        tiles.forEach(testTile => {
          if(testTile.id !== tile.id){
            Object.entries(testTile.xforms).forEach(([testXform, testData]) => {
              if(testData.edges[edgeOpposites[edgeType]].edge === edge.edge){
                edge['matches'] = [...edge['matches'], {id: testTile.id, xform: testXform}];
              }
            })
          }
        })
      });
      if(data.edges.right.matches.length > 0 && data.edges.bottom.matches.length > 0
        && data.edges.left.matches.length === 0 && data.edges.top.matches.length === 0){
        possibleCorners = [...possibleCorners, tile.id]
      }
    })
  });

  return [...new Set(possibleCorners)].reduce((a,b) => a*b);
}

//console.log(part1(parseInput(input)))

const stripEdges = tile => tile.slice(1, tile.length - 1).map(row => row.slice(1, row.length - 1));

const part2 = (tiles) => {
  let image = [[]];
  let pool = tiles;

  tiles.forEach(tile => {
    Object.entries(tile.xforms).forEach(([xform, data]) => {
      Object.entries(data.edges).forEach(([edgeType, edge]) => {
        tiles.forEach(testTile => {
          if(testTile.id !== tile.id){
            Object.entries(testTile.xforms).forEach(([testXform, testData]) => {
              if(testData.edges[edgeOpposites[edgeType]].edge === edge.edge){
                edge['matches'] = [...edge['matches'], {id: testTile.id, xform: testXform}];
              }
            })
          }
        })
      });
      if(!image[0][0] && data.edges.right.matches.length > 0 && data.edges.bottom.matches.length > 0
        && data.edges.left.matches.length === 0 && data.edges.top.matches.length === 0){
        image[0][0] = {id: tile.id, xform: xform};
        pool = pool.filter(t => t.id !== tile.id);
      }
    });
  });

  for(let row = 0; row < 12; row++){
    for(let col = 0; col < 12; col++){
      if(row + col !== 0){
        if(col > 0){
          let leftAdj = tiles.find(t => t.id === image[row][col-1].id).xforms[image[row][col-1].xform];
          let topAdj = row === 0 ? null : tiles.find(t => t.id === image[row-1][col].id).xforms[image[row-1][col].xform];
          let possibleNexts = pool.map(tile => {
            let match = null;
            Object.entries(tile.xforms).forEach(([xform, data]) => {
              if(data.edges.left.edge === leftAdj.edges.right.edge &&
                (!topAdj || (topAdj && data.edges.top.edge === topAdj.edges.bottom.edge))){
                match = {id: tile.id, xform: xform};
              }
            });
            return match
          }).filter(x => x);
          if(possibleNexts.length === 1){
            image[row][col] = possibleNexts[0];
          }
          else{
            console.log('multiple matches!')
          }
        }
        else {
          image = [...image, []]
          let topAdj = tiles.find(t => t.id === image[row-1][col].id).xforms[image[row-1][col].xform];
          let possibleNexts = pool.map(tile => {
            let match = null;
            Object.entries(tile.xforms).forEach(([xform, data]) => {
              if(data.edges.top.edge === topAdj.edges.bottom.edge){
                match = {id: tile.id, xform: xform};
              }
            });
            return match
          }).filter(x => x);
          if(possibleNexts.length === 1){
            image[row][col] = possibleNexts[0];
          }
          else {
            console.log('multiple matches!')
          }
        }
        pool = pool.filter(t => t.id !== image[row][col].id);
      }
    }
  }

  image.forEach((row, r) => {
    row.forEach((col, c) => {
      image[r][c] = stripEdges(tiles.find(tile => tile.id === col.id).xforms[col.xform].tile);
    });
  });

  let finalImage = [];

  image.forEach((row, r) => {
    for(let i = 0; i < 8; i++){
      let finalRow = [];
      row.forEach(tile => finalRow = [...finalRow, ...tile[i]])
      finalImage[8*r + i] = finalRow;
    }
  });

  let finalxForms = [
    finalImage,
    r90(finalImage),
    r180(finalImage),
    r270(finalImage),
    fliph(finalImage),
    flipv(finalImage),
    r90(flipv(finalImage)),
    r270(flipv(finalImage))
  ];

  let foundOrientation = false;
  let waterRoughness = 0;

  for(let xform of finalxForms){
    if(!foundOrientation){
      for(let row = 0; row < xform.length; row++){
        if(row > 0 && row < xform.length - 1){
          let rowLength = xform[row].length;
          for(let col = 0; col < rowLength; col++){
            let possibleSeaMonster = [
              xform[row][col] === '#',
              xform[row+1][col+1] === '#',
              xform[row+1][col+4] === '#',
              xform[row][col+5] === '#',
              xform[row][col+6] === '#',
              xform[row+1][col+7] === '#',
              xform[row+1][col+10] === '#',
              xform[row][col+11] === '#',
              xform[row][col+12] === '#',
              xform[row+1][col+13] === '#',
              xform[row+1][col+16] === '#',
              xform[row][col+17] === '#',
              xform[row][col+18] === '#',
              xform[row-1][col+18] === '#',
              xform[row][col+19] === '#',
            ];
            if(possibleSeaMonster.reduce((a,b) => a && b)){
              xform[row][col] = 'O';
              xform[row+1][col+1] = 'O';
              xform[row+1][col+4] = 'O';
              xform[row][col+5] = 'O';
              xform[row][col+6] = 'O';
              xform[row+1][col+7] = 'O';
              xform[row+1][col+10] = 'O';
              xform[row][col+11] = 'O';
              xform[row][col+12] = 'O';
              xform[row+1][col+13] = 'O';
              xform[row+1][col+16] = 'O';
              xform[row][col+17] = 'O';
              xform[row][col+18] = 'O';
              xform[row-1][col+18] = 'O';
              xform[row][col+19] = 'O';
              foundOrientation = true;
            }
          }
        }
      }
      if(foundOrientation){
        for(let row of xform){
          for(let col of row){
            waterRoughness += col === '#' ? 1 : 0;
          }
        }
      }
    }
  }
  return waterRoughness;
}

console.log(part2(parseInput(input)))
