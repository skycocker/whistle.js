//note object
function Note() {
  this.init = function(color, colorHit, width, height, posx, targetCanvas) {
    this.color = color;
    this.colorHit = colorHit;
    this.width = width;
    this.height = height || 0;
    this.posx = posx || 0;
    this.hit = false;
    this.targetCanvas = targetCanvas;
    this.ctx = this.targetCanvas.getContext('2d');
  }

  this.redraw = function(height) {
    if(height) this.height = height;

    this.ctx.fillStyle = this.hit ? this.colorHit : this.color;
    this.ctx.beginPath();
    this.ctx.fillRect(this.posx, this.targetCanvas.height, this.width, -this.height *2);
    this.ctx.closePath();
  }
}
//
