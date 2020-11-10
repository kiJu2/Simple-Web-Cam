var eggStatus ={
  'breakEgg' : 0,
  'bloodEgg' : 0,
  'pollutionEgg' : 0,
  'blackEgg' : 0,
  'emptyEgg' : 0,
}
var keyHitCount = 0;
const GRID_RATIO = 3;

sumDic = ( obj ) => {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

updateEggStatus = (status) =>{
  console.log(status)
  document.getElementById(status).innerHTML = eggStatus[status];
  document.getElementById('result').innerHTML = sumDic(eggStatus)
}

countEgg = (status) =>{
  eggStatus[status] += 1
  updateEggStatus(status);
}

resetDic = ( obj ) => {
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      obj[el] = 0;
      updateEggStatus(el)
    }
  }
  return obj;
}


handleKeyDonw = (event) =>{
  keyHitCount += 1;
  switch(event.key){
    case('1'):
      snapshot()
      renderSnapshots()
      drawGrid(GRID_RATIO)
      break
    case('2'):
      countEgg('breakEgg')
      break
    case('3'):
      countEgg('bloodEgg')
      break
    case('0'):
      eggStatus = resetDic(eggStatus)
      
      break;
  }
}

handleValueScope = (event) =>{
  console.log("keyDown");
}

// video.addEventListener('click', snapshot, false);
window.addEventListener('keydown', handleKeyDonw, false);
const inputs = Array.from(document.getElementsByClassName("input-width"));
inputs.map((element) =>  {
  element.addEventListener("keydown", handleValueScope)
})