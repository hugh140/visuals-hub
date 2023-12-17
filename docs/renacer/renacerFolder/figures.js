class Point {
  constructor() {
    this.angle = Math.random() * 100;
    this.incrementAngle = random(-0.1, 0.1);
    this.pointRotate = createVector(width / 2, height / 2);
    this.x = 0;
    this.y = 0;
  }

  draw(kickLevel) {
    this.pointRotate.x = 150 * sin(this.angle) + width / 2;
    this.pointRotate.y = 150 * cos(this.angle) + width / 2;
    this.angle += this.incrementAngle;
    if (kickLevel > 0.85) this.incrementAngle = random(-0.1, 0.1);

    fill(255);
    circle(this.pointRotate.x, this.pointRotate.y, 20);

    this.x = this.pointRotate.x;
    this.y = this.pointRotate.y;
  }

  x() {
    return this.x;
  }

  y() {
    return this.y;
  }
}

class Curve {
  constructor() {
    this.yInit = random(0, height);
    this.yFinal = random(0, height);

    this.xFirstPoint = random(0, width);
    this.yFirstPoint = random(0, height);

    this.xSecondPoint = random(0, width);
    this.ySecondPoint = random(0, height);

    this.velocity = 4;
    this.oscVelocity = random(-0.01, 0.05);
    this.initVelocity = Math.random() > 0.5 ? this.velocity : -this.velocity;
    this.firstVelocity = this.finalVelocity =
      Math.random() > 0.5 ? this.velocity : -this.velocity;

    this.osc1 = 0;
    this.osc2 = 0;
  }

  draw(ambient2Level) {
    ambient2Level *= random(0.1, 20);
    fill(ambient2Level, ambient2Level, ambient2Level, 100);
    strokeWeight(ambient2Level && ambient2Level > -10 ? 1 : 0);

    bezier(
      -200,
      this.yInit,
      this.xFirstPoint,
      this.yFirstPoint,
      this.xSecondPoint,
      this.ySecondPoint,
      width + 200,
      this.yFinal
    );

    if (this.yInit > height || this.yInit < 0) this.initVelocity *= -1;
    this.yInit += this.initVelocity;

    this.yFirstPoint = sin(this.osc1) * 500 + this.xFirstPoint;
    this.osc1 += this.oscVelocity;

    this.ySecondPoint = cos(this.osc2) * 500 + this.xSecondPoint;
    this.osc2 += this.oscVelocity;

    if (this.yFinal > height || this.yFinal < 0) this.finalVelocity *= -1;
    this.yFinal += this.finalVelocity;
  }
}
