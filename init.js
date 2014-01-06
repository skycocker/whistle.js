//canvas
var graph = document.querySelector("#graph");
var ctx = graph.getContext('2d');

//player
var player = new Note();
player.init('#5BDE8D', '#5BDE8D', 10, 40, 50, graph);

//notes hit counter
var notesHit = 0;
var flo = document.querySelector('#flo');
var explanation = document.querySelector('#explanation')
flo.style.display = explanation.style.display = 'none';

//init
whistle.init(null, null, 'low');
step();

document.addEventListener('whistleReady', function() {
  document.querySelector('ol').querySelector('li').className = 'done';
  document.removeEventListener('whistleReady');
});

document.addEventListener('whistle', function() {
  document.querySelector('ol').querySelector('li:last-child').className = 'done';
  document.removeEventListener('whistle');
});
