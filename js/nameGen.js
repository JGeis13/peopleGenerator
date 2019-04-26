
// Divide each list into 5 levels
  // Might not be equal, might be a percentage
// Name frequency is based on the levels, inclusive or exclusive
// Within selected group, randomly select name
// Combine With surname
// Return Combined Name

// maleNames, femaleNames, surnames

const maleLevels = {0: 0, 1: 15, 2: 30, 3: 50, 4: 70, 5: 100}
const femaleLevels = {0: 0, 1: 15, 2: 30, 3: 50, 4: 70, 5: 100}
const surLevels = {0: 0, 1: 5, 2: 15, 3: 30, 4: 60, 5: 100}

export function randomBetween(min, max){ // both inclusive
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNamePart(array, levels, group, type){
  const len = array.length - 1
  let upperLimit, lowerLimit, arrayUpper, arrayLower

  if(type === 'exc'){
    upperLimit = levels[group]
    lowerLimit = levels[group-1]
  }
  else if( type === 'inc>'){
    upperLimit = levels[5]
    lowerLimit = levels[group-1]
  }
  else if ( type === 'inc<'){
    upperLimit = levels[group]
    lowerLimit = levels[0]
  }

  arrayUpper = Math.floor(len * (upperLimit / 100))
  arrayLower = Math.floor(len * (lowerLimit / 100))

  return array[randomBetween(arrayLower, arrayUpper)]
}

export function getRandomName(group, type, nameType){ // groups 1-5; types: inc>, inc<, exc; nameType: male, female, random
  const args = [group, type]
  const hyphenated = randomBetween(1,20) === 1 ? true : false; // create a hyphenated last name 5% of the time
  if(nameType === 'random'){
    let g = ['female', 'male']
    nameType = g[randomBetween(0,1)]
  }

  let first = nameType === 'female' ? randomNamePart(femaleNames, femaleLevels, ...args) : randomNamePart(maleNames, maleLevels, ...args)
  let last = randomNamePart(surnames, surLevels, ...args)
  hyphenated ? last += '-' + randomNamePart(surnames, surLevels, ...args) : null

  return {
    firstName: first.toLowerCase(),
    lastName: last.toLowerCase(),
    fullName: (first + ' ' + last).toLowerCase(),
    gender: nameType
  }

}

