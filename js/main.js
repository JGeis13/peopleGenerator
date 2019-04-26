import initiateUI from './ui.js'
import {getRandomName} from './nameGen.js'
import {generateDetails} from './detailsGen.js'

const ui = initiateUI();

$('#top > button').click(() => {
    const settings = ui.getSettings() // get any settings changed before running
    console.log(settings)

    $('#results').html('') // clear previously generated cards

    for( let i = 0; i < settings.q; i++){ // generate number of cards based on quantity setting
      let person = {
        nameInfo: getRandomName(settings.nf, settings.ft, settings.g)
      }
      
      person = {...person, ...generateDetails(person.nameInfo.gender)}

      ui.createCard(person)
    }
    
  }
)

console.log(femaleNames.length, maleNames.length, surnames.length);



