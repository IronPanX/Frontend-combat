export default class Pencil {
  draw = false;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.draw = false;
    this.ctx = ctx;

    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
  }

  mousedown(e: MouseEvent) {
    e.preventDefault();

    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);

    this.draw = true;
  }

  mousemove(e: MouseEvent) {
    if (this.draw) {
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
    }
  }

  mouseup(e: MouseEvent) {
    if (this.draw) {
      this.mousemove(e);
      this.draw = false;
    }
  }
}
