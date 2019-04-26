// button animate (maybe css)

// card animation (maybe css)

export default function(){

  // Update Display When Changing Options
  const $quantity = $('input[name=quantity]')
  const $nameFrequency = $('input[name=freq-num]')
  const $gender = $('input[name=gender]')

  $quantity.on('input', function(e){
    updateOptionsDisplay('quantity', e.target.value)
  })

  $nameFrequency.on('input', function(e){
    updateOptionsDisplay('freq', e.target.value)
  })

  $gender.on('input', function(e){
    updateOptionsDisplay('gender', e.target.value)
  })

  function updateOptionsDisplay(type, val){
    $(`#${type} > label > span:nth-child(1)`).text(val)
  }

  // Show/hide options panel
  $('#options-toggle').click( function(){
    $('#options').toggleClass('hidden')
    if($('#options').hasClass('hidden')){
      $(this).text('Show Options')
    } else {
      $(this).text('Hide Options')
    }
  })

  $gender.on('change', function(){
    console.log($gender.val())
  })  

  // Return current settings
  function getSettings(){
    return {
      q: $quantity.val(),
      nf: $nameFrequency.val(),
      ft: $('select[name=freq-type]').val(),
      g: $("input[name=gender]:checked").val()
    }
  }

  // Card Builder
  function createCard(dataObj){
    const {nameInfo, age, height, weight, eyes, hair} = dataObj
    const card = $('<div class="card"></div>')
    
    card.html(`
    <div class='card-head'>
      <h3>${nameInfo.fullName}</h3>
    </div>
    <div class='card-body'>

      <div class="divTable">
        <div class="divTableRow">
          <div class="divTableCell">Gender:</div>
          <div class="divTableCell" style='text-transform: capitalize;'>${nameInfo.gender}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">Age:</div>
          <div class="divTableCell">${age}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">Height:</div>
          <div class="divTableCell">${height}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">Weight:</div>
          <div class="divTableCell">${weight} lbs</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">Eyes:</div>
          <div class="divTableCell" style='text-transform: capitalize;'>${eyes}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">Hair:</div>
          <div class="divTableCell" style='text-transform: capitalize;'>${hair}</div>
        </div>
      </div>

    </div>
    `)
    $('#results').append(card)
  }

  return {
    createCard: createCard,
    getSettings: getSettings
  }
}