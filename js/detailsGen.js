import { randomBetween } from './nameGen.js'

/* under5: 6.2,
5_9: 6.2,
10_14: 6.2,
15_19: 6.2,
20_24: 6.8,
25_29: 7.3,
30_34: 6.8,
35_39: 6.5,
40_44: 5.9,
45_49: 6.5,
50_54: 6.6,
55_59: 6.8,
60_64: 6.2,
65_69: 5.3,
70_74: 4,
75_79: 2.8,
80_84: 1.9,
over84: 2,
// % */

const ageProbabilityLevels = [ // based on us statistics
  {0: 0},
  {62: [0,5]},
  {124: [5,10]},
  {186: [10,15]},
  {248: [15,20]},
  {316: [20,25]},
  {389: [25,30]},
  {457: [30,35]},
  {522: [35,40]},
  {581: [40,45]},
  {646: [45,50]},
  {712: [50,55]},
  {780: [55,60]},
  {842: [60,65]},
  {895: [65,70]},
  {935: [70,75]},
  {963: [75,80]},
  {982: [80,85]},
  {990: [85,90]},
  {995: [90,95]},
  {999: [95,104]},
  {1001: [104,113]}
]

const femaleHeightLevels = [ // randomized based on age, in inches
  {0: 0},
  {1: [16, 32]}, //from previous level to this level inclusive min, non-inclusive max
  {3: [27,38]}, 
  {6: [35, 45]}, 
  {11: [43, 58]}, 
  {16: [50, 76]},
  {21: [52, 76]},
  {113: [53, 77]},
]

const maleHeightLevels = [ // randomized based on age, in inches
  {0: 0},
  {1: [16, 32]}, //from previous level to this level inclusive min, non-inclusive max
  {3: [27,38]}, 
  {6: [35, 45]}, 
  {11: [44, 58]},
  {14: [50, 67]},
  {16: [52, 82]},
  {21: [52, 92]},
  {113: [50, 94]},
]

const femaleWeightLevels = [ // lbs per inch by age groups. Multiplied by 100
  {0: 0},
  {1: [40, 70]}, //from previous level to this level inclusive min, non-inclusive max
  {3: [70, 80]}, 
  {6: [83, 95]}, 
  {8: [95, 105]},
  {11: [110, 132]},
  {16: [142, 180]},
  {113: [175, 290]},
]

const maleWeightLevels = [ // lbs per inch by age groups. Multiplied by 100
  {0: 0},
  {1: [40, 70]}, //from previous level to this level inclusive min, non-inclusive max
  {3: [70, 80]}, 
  {6: [83, 95]}, 
  {8: [95, 105]},
  {11: [110, 132]},
  {16: [142, 180]},
  {113: [180, 360]},
]

const eyeColors = [
  {0: 0},
  {770: 'brown'},
  {870: 'blue'},
  {920: 'hazel'},
  {970: 'amber'},
  {990: 'green'},
  {999: 'grey'},
  {1001: 'violet'}
]

const hairColors = [
  {0: 0},
  {200: 'black'},
  {490: 'drk brown'},
  {720: 'lt brown'},
  {880: 'blonde'},
  {930: 'bald'},
  {995: 'auburn'},
  {1001: 'red'}
]

export function generateDetails(gender){
  let results = {
    age: getRandomAge(),
    height: '',
    weight: '',
    eyes: '',
    hair: '', 
    raw_height: ''
  }

  results.raw_height = getHeight(results.age, gender)
  results.height = formatHeight(results.raw_height)
  results.weight = getWeight(results.age, results.raw_height, gender)
  results.eyes = valueBasedOnLevels(eyeColors)
  results.hair = valueBasedOnLevels(hairColors)

  // regenerate any pairings that are not allowed
  while(results.hair === 'bald' && gender === 'female'){
    results.hair = valueBasedOnLevels(hairColors)
  }
  while( results.hair === 'bald' && results.age < 22){
    results.hair = valueBasedOnLevels(hairColors)
  }

  return results
}

function getRandomAge(){
  const ageKey = randomBetween(1,1000)
  let r = rangeBasedOnLevels(ageKey, ageProbabilityLevels)
  
  return randomBetween(r[0], r[1] - 1)
}

function getHeight(age, gender){
  const arr = gender === 'female' ? femaleHeightLevels : maleHeightLevels
  let r = rangeBasedOnLevels(age, arr)

  return randomWeightedToMiddle(r[0], r[1], 3, 70)
}

function getWeight(age, height, gender){
  const arr = gender === 'female' ? femaleWeightLevels : maleWeightLevels
  let r = rangeBasedOnLevels(age, arr)

  return Math.round((randomWeightedToMiddle(r[0], r[1], 3, 70) / 100) * height)
}

function rangeBasedOnLevels(val, arr){
  let range
  arr.forEach( (level, i) => {
    if( val < Object.keys(level)[0] 
      && val >= Object.keys(arr[i - 1])[0])
    {
      range = Object.values(level)[0]
    }
  })
  return range
}

function valueBasedOnLevels(arr){
  const num = randomBetween(1,1000)
  let val
  const l = arr.length;
  for( let i = 0; i < l ; i++){
    if( num < Object.keys( arr[i])[0]
      && num >= Object.keys( arr[i - 1])[0] )
    {
      val = Object.values( arr[i])[0]
      return val
    }
  }
}

// get a random number weighted to the middle of the range
// takes a min, max, rangeLength (the range length you want to 'mid' to be) and the weight (%) to place on the range
function randomWeightedToMiddle(min, max, rangeLength, rangeWeight){ // e.g. 1, 100, 10, 70
  const random100 = randomBetween(1,100)
  const midRange = [Math.ceil(((min + max) / 2) - (rangeLength / 2)), Math.floor(((min + max) / 2) + (rangeLength / 2))]
  if( random100 <= rangeWeight ){
    return randomBetween(midRange[0], midRange[1])
  }
  else {
    return randomBetween(min, max)
  }
}

function formatHeight(h){
  let feet = Math.floor(h/12)
  let inches = h % 12
  return `${feet}'${inches}"`
}