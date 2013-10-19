/*
  whistle.js - whistle detector
  url/latest source: https://github.com/skycocker/whistle.js

  Copyright 2013 Michal Siwek
  Released under the terms of GNU General Public License (version 3 or later) (http://www.gnu.org/licenses/gpl.txt)
*/

(function(window, document, navigator) {
  window.requestAnimationFrame = window.requestAnimationFrame ||
                                 window.msRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame ||
                                 window.webkitRequestAnimationFrame;
  
  window.AudioContext = window.AudioContext ||
                        window.webkitAudioContext;
  
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;
  
  var actx = new AudioContext();
  var audioInput = null,
      rawAudioInput = null,
      inputNode = null,
      analyser = null;

  var whistleEvent = null,
      whistleReadyEvent = null;

  function Whistle() {
    this.init = function(whistleEventName, once, precision) {
      this.whistleEventName = whistleEventName || "whistle";
      this.once = once || false;
      
      this.whistling = null;
      this.intensity = null;
      
      if(precision == "low") {
        this.precision = 150;
      } else {
        this.precision = 250;
      }

      navigator.getUserMedia({ audio: true }, startStream, function(error) {
        console.log("error: " + error);
      });

      whistleEvent = new CustomEvent(
        this.whistleEventName, {
          bubbles: true,
          cancelable: true
        }
      );

      whistleReadyEvent = new CustomEvent(
        'whistleReady', {
          bubbles: true,
          cancelable: true
        }
      );
    }
  }

  var whistle = window.whistle = new Whistle();
  
  function startStream(stream) {
    inputNode = actx.createGain();

    rawAudioInput = actx.createMediaStreamSource(stream);
    audioInput = rawAudioInput;
    audioInput.connect(inputNode);

    analyser = actx.createAnalyser();
    analyser.fftSize = 2048;

    inputNode.connect(analyser);

    zeroGain = actx.createGain();
    zeroGain.gain.value = 0.0;
    inputNode.connect(actx.destination);

    document.dispatchEvent(whistleReadyEvent);
    
    analyse();
  }

  function analyse() {
    var frequencies = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencies);
    
    for(var i=29; i<=80; ++i) {
      if(frequencies[i] > whistle.precision) {
        document.dispatchEvent(whistleEvent);
        whistle.whistling = true;
        whistle.intensity = (i - 29) * 2;
      } else {
        whistle.whistling = false;
      }
    }
    if(!whistle.once) {
      requestAnimationFrame(analyse);
    }
  }
})(window, document, navigator)
