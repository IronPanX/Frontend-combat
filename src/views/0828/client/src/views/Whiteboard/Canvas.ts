import type { Socket } from "socket.io-client";

export default class Canvas {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  drawing = false;
  current = {
    color: "black",
    x: 0,
    y: 0,
  };
  socket: Socket;

  constructor(canvas: HTMLCanvasElement, socket: Socket) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (context) {
      this.context = context;
    }
    this.socket = socket;
  }

  drawLine = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    emit: boolean
  ) => {
    if (!this.canvas || !this.context) {
      return;
    }
    console.log("drawLine", x0, y0, x1, y1, color, emit);
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1 + 1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    this.socket.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
    });
  };

  onMouseDown = (e: MouseEvent) => {
    this.drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  };

  onMouseUp = (e: MouseEvent) => {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;

    this.drawLine(
      this.current.x,
      this.current.y,
      e.clientX,
      e.clientY,
      this.current.color,
      true
    );
  };

  onMouseMove = (e: MouseEvent) => {
    if (!this.drawing) {
      return;
    }
    this.drawLine(
      this.current.x,
      this.current.y,
      e.clientX,
      e.clientY,
      this.current.color,
      true
    );
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  };

  onDrawingEvent = (data: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    color: string;
  }) => {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.drawLine(
      data.x0 * w,
      data.y0 * h,
      data.x1 * w,
      data.y1 * h,
      data.color,
      false
    );
  };
}
