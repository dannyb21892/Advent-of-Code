import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
}

console.log(problem(input))
let globalSmallestEnergy = Infinity;

const problem2 = (hallways) => {
  let spaces = [];
  for(let i = 0; i <= 10; i++){
    spaces.push({
      id: i,
      content: null,
      canStop: !(i > 0 && i < 10 && i%2 === 0),
      isDestinationFor: null,
      locked: false,
      done: false,
      adj: {
        left: null,
        right: null,
        up: null,
        down: null
      }
    })
  }
  spaces.forEach((s,i) => {
    if(i > 0) s.adj.left = spaces[i-1];
    if(i < 10) s.adj.right = spaces[i+1];
    if(i > 0 && i < 10 && i%2 === 0){
      let hallway = [];
      for(let j = 0; j < hallways[0].length; j++){
        hallway.push({
          id: 11 + (hallways[0].length*((i/2)-1)) + j,
          content: hallways[(i/2)-1][j],
          canStop: false,
          isDestinationFor: Math.pow(10,(i/2)-1),
          locked: false,
          done: false,
          adj: {
            left: null,
            right: null,
            up: null,
            down: null
          }
        })
      }
      hallway.forEach((h,j)=>{
        if(j === 0) h.adj.up = s;
        if(j > 0) h.adj.up = hallway[j-1];
        if(j < 3) h.adj.down = hallway[j+1];
      })
      s.adj.down = hallway[0];
      spaces = [...spaces, ...hallway]
    }
  });
  return moveTokens(spaces);
}

const moveTokens = (spaces, energy = 0, depth = 0, moves = [],) => {
  let movablePieces = spaces.filter(s => s.content && !s.done);
  if(!movablePieces.length){
    if(energy < globalSmallestEnergy){
      globalSmallestEnergy = energy;
      console.log('done with energy ', energy, ' at depth ', depth)
      moves.forEach(m => console.log(m))
    }
    return {
      energy: energy,
      done: true,
      moves: moves,
    }
  }
  else {
    let statesAfterOneMove = [];
    //console.log(energy, depth)
    //drawBoard(spaces)
    movablePieces.forEach(mp => {
      let logopenmoves = false
      let openMoves = findOpenMoves(mp, [], 1, logopenmoves);
      let validMoves = openMoves.filter(m => {
        let destinationSpaces = spaces.filter(s => {
          return s.isDestinationFor === mp.content && !s.done
        });
        let maxOpenDestSpaceId = Math.max(...destinationSpaces.map(ds => ds.id));
        if(mp.locked){
          return m.space.id === maxOpenDestSpaceId
        }
        else {
          return (m.space.id === maxOpenDestSpaceId || m.space.canStop)
        }
      });
      validMoves.forEach((vm, vm_i) => {
        let newBoard = copyBoard(spaces);
        let newVm = newBoard.find(s => s.id === vm.space.id);
        let newMp = newBoard.find(s => s.id === mp.id);
        newVm.content = mp.content;
        newVm.locked = !newVm.isDestinationFor;
        if(newVm.isDestinationFor === newVm.content){
          let done = true;
          let testSpace = newVm;
          while(testSpace.adj.down){
            testSpace = testSpace.adj.down;
            done = done && testSpace.done;
          }
          newVm.done = done;
        }
        newMp.content = null;
        newMp.locked = false;

        statesAfterOneMove.push({
          board: newBoard,
          energy: energy + (newVm.content * vm.depth)
        })
      })
    })
    if(statesAfterOneMove.length){
      let responses = statesAfterOneMove.map((state,i) => {
        return moveTokens(state.board, state.energy, depth+1, [...moves, drawBoard(state.board)])
      }).filter(res => res.done);
      let minEnergy = Math.min(...responses.map(res => res.energy || Infinity))
      let output = responses.find(res => res.energy === minEnergy) || {energy: Infinity, done: false};
      return output
    }
    else {
      return  {
        energy: energy,
        done: false,
        moves: moves,
      }
    }
  }
}

const findOpenMoves = (origin, destinationSpaces = [], depth = 1, logopenmoves = false) => {
  let newDestinationSpaces = Object.values(origin.adj).filter(Boolean).map(nds => {
    return {space: nds, depth: depth}
  }).filter(s => {
    return (!s.space.content &&
    !destinationSpaces.map(ds => ds.space).includes(s.space))
  });
  destinationSpaces = [
    ...destinationSpaces,
    ...newDestinationSpaces
  ]
  if(logopenmoves && origin.id === 111) console.log(origin.adj, destinationSpaces.map(d => ([d.space.id, d.depth])));
  newDestinationSpaces.forEach(ds => {
    destinationSpaces = findOpenMoves(ds.space, destinationSpaces, depth+1, logopenmoves);
  })
  return destinationSpaces
}

const copyBoard = spaces => {
  spaces = spaces.map(space => {
    return {
      ...space,
      adj: {}
    }
  });
  let hallLength = (spaces.length - 11) / 4;
  let hallStarts = [];
  for(let h = 0; h <= 3; h++){
    hallStarts.push(11 + (h*hallLength))
  }
  spaces.forEach((s,i) => {
    if(i > 0 && i <= 10) s.adj.left = spaces[i-1];
    if(i < 10) s.adj.right = spaces[i+1];
    if(i > 0 && i < 10 && i%2 === 0){
      s.adj.down = spaces[hallStarts[(i/2)-1]];
      spaces[hallStarts[(i/2)-1]].adj.up = s;
    }
    else if(i > 10){
      let hallNum = Math.floor((i - 11)/hallLength);
      let positionInHall = (i-11)%hallLength;
      if(positionInHall > 0){
        s.adj.up = spaces[i-1];
      }
      if(positionInHall < (hallLength - 1)){
        s.adj.down = spaces[i+1];
      }
    }
    //console.log(i, s.adj)
  });

  return spaces
}

const drawBoard = spaces => {
  let numCharMap = {
    1: 'A', 10: 'B', 100: 'C', 1000: 'D'
  }
  let mappedSpaces = spaces.map(s => s.content ? numCharMap[s.content] : '.');
  let rows = [
    mappedSpaces.slice(0,11)
  ];
  let hallLength = (spaces.length - 11) / 4;
  for(let i = 0; i < hallLength; i++){
    rows.push(
      ['|','|',
        mappedSpaces[11 + i],'|',
        mappedSpaces[11 + i + hallLength],'|',
        mappedSpaces[11 + i + (2*hallLength)],'|',
        mappedSpaces[11 + i + (3*hallLength)],
        '|','|'
      ]
    )
  }
  return rows.map(r => r.join('')).join('\n')+'\n\n'
}

const hallways = [
  [1,1000,1000,10],
  [100,100,10,1],
  [10,10,1,1000],
  [1000,1,100,100]
]

const hallwaysSmall = [
  [1,10],
  [100,1],
  [10,1000],
  [1000,100]
]

const hallwaysExSmall = [
  [1,10],
  [10,1],
]
console.log(problem2(hallways))
