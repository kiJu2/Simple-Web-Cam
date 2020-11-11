captureVideo = () =>{
  captureSteelShot();
  renderImg();
}

document.querySelector("video").addEventListener('click', captureVideo, false);
document.querySelector("button").addEventListener('click', captureVideo, false);
