const input = require('./input').input;

const parse = input => {
  return input.split('\n').map(x => x.split(''));
}

const addShell3d = grid => {
  let height = grid[0].length + 2;
  let width = grid[0][0].length + 2;
  let topLayer = new Array(height).fill().map(x => new Array(width).fill('.'));
  let bottomLayer = new Array(height).fill().map(x => new Array(width).fill('.'));
  return [
    topLayer,
    ...grid.map(layer => {
      return [
        new Array(width).fill('.'),
        ...layer.map(row => {
          return ['.', ...row, '.']
        }),
        new Array(width).fill('.')
      ]
    }),
    bottomLayer
  ]
}

const part1 = (input) => {
  let zeroLayer = input.split('\n').map(x => x.split(''));
  let space = [zeroLayer];
  let cycle = 1;
  while(cycle <= 6){
    let changes = [];
    space = addShell3d(space);
    space.forEach((layer, z) => {
      layer.forEach((row, y) => {
        row.forEach((cube, x) => {
          let activeNeighbors = 0;
          let xmin = Math.max(0, x - 1);
          let xmax = Math.min(row.length - 1, x + 1);
          let ymin = Math.max(0, y - 1);
          let ymax = Math.min(layer.length - 1, y + 1);
          let zmin = Math.max(0, z - 1);
          let zmax = Math.min(space.length - 1, z + 1);

          for(let z_ = zmin; z_ <= zmax; z_++){
            for(let y_ = ymin; y_ <= ymax; y_++){
              for(let x_ = xmin; x_ <= xmax; x_++){
                if(!(x_ === x && y_ === y && z_ === z)){
                  activeNeighbors += space[z_][y_][x_] === '#' ? 1 : 0;
                }
              }
            }
          }
          if(cube === '#' && activeNeighbors !== 2 && activeNeighbors !== 3){
            changes.push({x: x, y: y, z: z, val: '.'})
          }
          else if(cube === '.' && activeNeighbors === 3){
            changes.push({x: x, y: y, z: z, val: '#'})
          }
        })
      })
    })

    changes.forEach(change => space[change.z][change.y][change.x] = change.val);
    cycle += 1;
  }

  let active = 0;

  space.forEach((layer, z) => {
    layer.forEach((row, y) => {
      row.forEach((cube, x) => {
        if(cube === '#'){
          active += 1;
        }
      })
    })
  })

  return active;
}

console.log(part1(input))

const addShell4d = hyperspace => {
  let space = hyperspace[0];
  let plane = space[0];
  let line = plane[0];

  let depth = space.length + 2;
  let height = plane.length + 2;
  let width = line.length + 2;

  return [
    new Array(depth).fill().map(layer => new Array(height).fill().map(line => new Array(width).fill('.'))),
    ...hyperspace.map(space => {
      return [
        new Array(height).fill().map(x => new Array(width).fill('.')),
        ...space.map(layer => {
          return [
            new Array(width).fill('.'),
            ...layer.map(row => {
              return ['.', ...row, '.']
            }),
            new Array(width).fill('.')
          ]
        }),
        new Array(height).fill().map(x => new Array(width).fill('.'))
      ]
    }),
    new Array(depth).fill().map(layer => new Array(height).fill().map(line => new Array(width).fill('.')))
  ]
}

const part2 = (input) => {
  let zeroLayer = input.split('\n').map(x => x.split(''));
  let hyperspace = [[zeroLayer]];
  let cycle = 1;
  while(cycle <= 6){
    let changes = [];
    hyperspace = addShell4d(hyperspace);
    hyperspace.forEach((space, w) => {
      space.forEach((layer, z) => {
        layer.forEach((row, y) => {
          row.forEach((cube, x) => {
            let activeNeighbors = 0;
            let xmin = Math.max(0, x - 1);
            let xmax = Math.min(row.length - 1, x + 1);
            let ymin = Math.max(0, y - 1);
            let ymax = Math.min(layer.length - 1, y + 1);
            let zmin = Math.max(0, z - 1);
            let zmax = Math.min(space.length - 1, z + 1);
            let wmin = Math.max(0, w -1);
            let wmax = Math.min(hyperspace.length - 1, w + 1);

            for(let w_ = wmin; w_ <= wmax; w_++){
              for(let z_ = zmin; z_ <= zmax; z_++){
                for(let y_ = ymin; y_ <= ymax; y_++){
                  for(let x_ = xmin; x_ <= xmax; x_++){
                    if(!(x_ === x && y_ === y && z_ === z && w_ === w)){
                      activeNeighbors += hyperspace[w_][z_][y_][x_] === '#' ? 1 : 0;
                    }
                  }
                }
              }
            }

            if(cube === '#' && activeNeighbors !== 2 && activeNeighbors !== 3){
              changes.push({w: w, x: x, y: y, z: z, val: '.'})
            }
            else if(cube === '.' && activeNeighbors === 3){
              changes.push({w: w, x: x, y: y, z: z, val: '#'})
            }
          })
        })
      })
    });

    changes.forEach(change => hyperspace[change.w][change.z][change.y][change.x] = change.val);
    cycle += 1;
  }

  let active = 0;

  hyperspace.forEach((space, w) => {
    space.forEach((layer, z) => {
      layer.forEach((row, y) => {
        row.forEach((cube, x) => {
          if(cube === '#'){
            active += 1;
          }
        })
      })
    })
  })

  return active;
}

console.log(part2(input))
