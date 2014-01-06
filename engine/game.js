function step() {
  ctx.clearRect(0, 0, graph.width, graph.height);
  player.redraw(whistle.intensity);
  notes.forEach(function(note) {
    note.posx < 0 ? note.posx = graph.width : --note.posx;
    note.redraw();

    if(noteHit(player, note)) note.hit = true;
    if(note.hit && notesHit < notes.length) ++notesHit;
  });
  if(notesHit == notes.length && flo.style.display == 'none') {
    graph.style.float = 'left';
    flo.style.display = 'inline-block';
    explanation.style.display = 'block';
  } else {
    notesHit = 0;
  }

  requestAnimationFrame(step);
}

function noteHit(obj1, obj2) {
  if(obj1.posx == Math.round(obj2.posx / 10) * 10) {
    return Math.round(obj1.height / 10) * 10 == obj2.height ? true : false;
  }
}
