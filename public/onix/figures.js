class Line {
  constructor(xInicio, yInicio, xFinal, yFinal, color = 'white') {
    this.xInicio = xInicio;
    this.yInicio = yInicio;
    this.xFinal = xFinal;
    this.yFinal = yFinal;

    this.expansion = 30;
    this.colorSwitch = false;
    this.color = color;
  }

  update(sampleVolumen) {
    this.colorSwitch = !this.colorSwitch;

    this.draw(
      this.xInicio + Math.random() * sampleVolumen * this.expansion,
      this.yInicio + Math.random() * sampleVolumen * this.expansion,
      this.xFinal + Math.random() * sampleVolumen * this.expansion,
      this.yFinal + Math.random() * sampleVolumen * this.expansion,
      this.colorSwitch ? this.color : "black"
    );
  }

  draw(xI, yI, xF, yF, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(canvas.width / 2 + xI, canvas.height / 2 + yI);
    ctx.lineTo(canvas.width / 2 + xF, canvas.height / 2 + yF);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(canvas.width / 2 + xI, canvas.height / 2 + yI, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

class Circle {
  constructor(radius) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = radius;

    this.expansion = 100;
  }

  update(sampleVolumen) {
    this.draw(sampleVolumen);
  }

  draw(sampleVolumen) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(
      this.x,
      this.y,
      this.radius + sampleVolumen * this.expansion,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
}

class Point {
  constructor() {}

  update(sampleVolumen) {
    this.draw(sampleVolumen);
  }

  draw(sampleVolumen) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      sampleVolumen * 20 + 1,
      sampleVolumen * 20 + 1
    );
  }
}
