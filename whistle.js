var actx = new webkitAudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    analyser = null,
    disp = null;

function gotStream(stream) {
  inputPoint = actx.createGain();

  realAudioInput = actx.createMediaStreamSource(stream);
  audioInput = realAudioInput;
  audioInput.connect(inputPoint);

  analyser = actx.createAnalyser();
  analyser.fftSize = 2048;
  
  inputPoint.connect(analyser);

  zeroGain = actx.createGain();
  zeroGain.gain.value = 0.0;
  inputPoint.connect(zeroGain);
  zeroGain.connect(actx.destination);
  
   
  updateAnalysers();
}

function updateAnalysers() {
  var freqByteData = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteFrequencyData(freqByteData);

  if( (freqByteData[47] > 150) && (freqByteData[48] > 150) && (freqByteData[49] > 150) && (freqByteData[50] > 150) ) {
    console.log("whistled");
  } else {
    window.requestAnimationFrame(updateAnalysers);
  }
}

window.onload = function() {
  disp = document.querySelector('#displayer');
  navigator.webkitGetUserMedia({ audio: true }, gotStream, function(error) {
    console.log(error);
  });
};

