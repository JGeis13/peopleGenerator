
// maleNames, femaleNames, surnames

var $genSelect;
var $commonness ;
var $randomness ;


$('select').change(function(){
	$genSelect = $('#genSelect').val();
	$commonness = $('#commonness').val();
	$randomness = $('#randomness').val();
	if ($commonness !== 'any' ){
		$('#randomness').val('completely');
		$('#randomness').prop('disabled',true);
		$('#randomness').addClass('frozen');
	} else {
		$('#randomness').prop('disabled',false);
		$('#randomness').removeClass('frozen');
	}
});

// levels (<10%, 10-30,30-80,80<)
// frequency (0.7,0.2,0.075,0.025)


 $('#go').click(function(){
	$genSelect = $('#genSelect').val();
	$commonness = $('#commonness').val();
	$randomness = $('#randomness').val();
	var randLast;
	var name;
	var gen = gender();
	var male;
	var sur;
	var female;
	if ($commonness === 'any'){
		if ($randomness ==='lean common'){
			var male = pickName(maleNames,0.01,0.2,0.5, 0.7,0.9,0.925);
			var sur = pickName(surnames,0.01,0.2,0.5,0.7,0.9,0.925);
			var female = pickName(femaleNames,0.01,0.2,0.5,0.7,0.9,0.925);
		} else if ($randomness === 'completely'){
			var male = pickName(maleNames,0.01,0.2,0.5, 'x', 'y', 'z');
			var sur = pickName(surnames,0.01,0.2,0.5, 'x', 'y', 'z');
			var female = pickName(femaleNames,0.01,0.2,0.5,'x', 'y', 'z');
		} else if ($randomness === 'lean rare') {
			var male = pickName(maleNames,0.01,0.2,0.5, 0.08, 0.24,0.48);
			var sur = pickName(surnames,0.01,0.2,0.5, 0.08, 0.24,0.48);
			var female = pickName(femaleNames,0.01,0.2,0.5,0.08, 0.24,0.48);
		}
	} else if ($commonness === 'common'){
			var male = pickName(maleNames,0.1,0.2,0.5,  1,0.9,0.925);
			var sur = pickName(surnames,0.01,0.2,0.5,  1,0.9,0.925);
			var female = pickName(femaleNames,0.01,0.2,0.5,  1,0.9,0.925);
	} else if ($commonness === 'medium'){
			var male = pickName(maleNames,0.09,0.2,0.5,  0,0.95, 1);
			var sur = pickName(surnames,0.09,0.2,0.5,  0,0.95, 1);
			var female = pickName(femaleNames,0.09,0.2,0.5,  0,0.95, 1);
	} else if ($commonness === 'uncommon'){
			var male = pickName(maleNames,0.09,0.2,0.5,  -1, -1, 0);
			var sur = pickName(surnames,0.09,0.2,0.5,  -1, -1, 0);
			var female = pickName(femaleNames,0.09,0.2,0.5,  -1, -1, 0);
	}
	var previous = $('#result').text();
	document.getElementById('previous').innerHTML = previous;
	if($genSelect ==='either'){
		if(gen==="male"){
			printResult(male + " " + sur);
		} else {
			printResult(female + " " + sur);
		}
	} else if ($genSelect === 'male'){
		printResult(male + " " + sur);
	} else {
		printResult(female + " " + sur);
	}
});


function printResult( message){
	document.getElementById('result').innerHTML = message;
	
}


function pickName( array, x, y, z , xx, yy, zz){
	var freq= commonality(xx, yy, zz);
	var newLength;
	var rand = Math.random();
	if(freq === "most"){
		newLength = array.length * x;
		return  array[Math.floor(Math.random()* newLength)]
	} else if(freq === "second"){
		newLength = array.length * y;
		return  array[Math.floor((Math.random() * (newLength - (array.length * x))) + (array.length * x))]
	} else if(freq=== "third"){
		newLength = array.length * z;
		return   array[Math.floor((Math.random() * (newLength - (array.length * y))) + (array.length * y))]
	} else if(freq === "least"){
		newLength = array.length
		return   array[Math.floor((Math.random() * (newLength - (array.length * z))) + (array.length * z))]
	} else {
		return array[Math.floor(Math.random() * array.length)]
	}
}

function gender(){
	var randGen = Math.random();
	if(randGen < 0.5){
		return 'male';
	} else {
		return 'female';
	}
}

function commonality(x,y,z){
	var rand = Math.random();
	if(rand<x){
		return "most";
	} else if (rand >= x && rand < y){
		return "second";
	} else if (rand >= y && rand < z){
		return  "third";
	} else if (rand >= z){
		return "least";
	} else {
		return "any";
	}
}

