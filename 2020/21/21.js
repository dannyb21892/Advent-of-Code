const input = require('./input').input;

const parse = input => {
  let foods = input.split('\n');
  foods = foods.map(f => {
    return {
      ingredients: f.split(' (')[0].split(' '),
      allergens: f.split('contains ')[1].split(')')[0].split(', ')
    }
  });
  return foods
}

const part1 = (foods) => {
  let allergens = [];
  foods.forEach(f => allergens = [...allergens, ...f.allergens]);
  allergens = [...new Set(allergens)];

  ingredientsThatCouldBeAnAllergen = [];

  allergens.forEach(a => {
    let aFoods = foods.filter(f => f.allergens.includes(a));
    let commonIngs = [];
    let allIngs = aFoods.map(f => f.ingredients);
    aFoods.forEach(f => {
      f.ingredients.forEach(ing => {
        let presentInAll = allIngs.map(ingSet => ingSet.includes(ing)).reduce((a,b) => a && b);
        if(presentInAll){
          commonIngs = [...commonIngs, ing];
        }
      })
    });
    ingredientsThatCouldBeAnAllergen = [...ingredientsThatCouldBeAnAllergen, ...commonIngs];
  });

  let ingredientsThatCantBeAnAllergen = [];
  foods.forEach(f =>
    ingredientsThatCantBeAnAllergen = [
      ...ingredientsThatCantBeAnAllergen,
      ...f.ingredients.filter(ing => !ingredientsThatCouldBeAnAllergen.includes(ing))
    ]
  );

  return ingredientsThatCantBeAnAllergen.length
}

console.log(part1(parse(input)))


const part2 = (foods) => {
  let allergens = [];
  foods.forEach(f => allergens = [...allergens, ...f.allergens]);
  allergens = [...new Set(allergens)];

  ingredientsThatCouldBeAnAllergen = {};

  allergens.forEach(a => {
    let aFoods = foods.filter(f => f.allergens.includes(a));
    let commonIngs = [];
    let allIngs = aFoods.map(f => f.ingredients);
    aFoods.forEach(f => {
      f.ingredients.forEach(ing => {
        let presentInAll = allIngs.map(ingSet => ingSet.includes(ing)).reduce((a,b) => a && b);
        if(presentInAll){
          commonIngs = [...commonIngs, ing];
        }
      })
    });
    ingredientsThatCouldBeAnAllergen[a] = [...new Set(commonIngs)];
  });

  let pairs = Object.entries(ingredientsThatCouldBeAnAllergen);
  let defAllergen = [];
  while(pairs.length){
    console.log(pairs)
    let solved = pairs.find(x => x[1].length === 1);
    defAllergen = [...defAllergen, {allergen: solved[0], ing: solved[1][0]}];
    pairs = pairs.filter(p => p[0] !== solved[0]).map(p => {return [p[0], p[1].filter(ing => ing !== solved[1][0])]});
  }

  return defAllergen.sort((a,b) => {
    let textA = a.allergen.toUpperCase();
    let textB = b.allergen.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }).map(x => x.ing).join(',')
}

console.log(part2(parse(input)))
