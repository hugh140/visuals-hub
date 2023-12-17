class Line {
  constructor() {
    this.color = random(0, 200);
    this.mult = random(0, 8);
    this.size = this.mult * 10;
    this.direction = Math.random() > 0.5; //If "direction" is true, the direction will be at right

    this.x = 0;
    this.y1 = 0;
    this.y2 = 0;
  }

  draw(ambient1Level) {
    stroke(this.color + ambient1Level * 1.5);
    strokeWeight(1);
    ambient1Level *= this.mult;

    if (this.direction) {
      line(ambient1Level, this.size, ambient1Level, height - this.size);
      this.x = ambient1Level;
    } else {
      line(
        width - ambient1Level,
        this.size,
        width - ambient1Level,
        height - this.size
      );
      this.x = width - ambient1Level;
    }
    this.y1 = this.size;
    this.y2 = height - this.size;
  }

  changeMult() {
    this.mult = random(0, 8);
  }
}

class LineLoop {
  constructor() {
    this.speed = Math.random();
    this.direction = Math.random() > 0.5; //If "direction" is true, the direction will be at down
    this.weight = random(0, 3);
    this.color = random(200, 240);
    this.fillColor = random(200, 255);

    this.y = random(0, height);
    this.x1 = random(0, width);
    this.x2 = random(this.x1, width);
  }

  draw(ambient2Level) {
    strokeWeight(this.weight);
    stroke(this.color - ambient2Level * 2);
    line(this.x1, this.y, this.x2, this.y);

    strokeWeight(1);
    circle(this.x1, this.y, 5);
    circle(this.x2, this.y, 5);

    if (this.direction) this.y += this.speed + ambient2Level;
    else this.y -= this.speed * ambient2Level + this.speed;

    if (this.y < 50) {
      this.y = 70;
      this.direction = !this.direction;
      this.x1 = random(0, width);
      this.x2 = random(0, width);
    }
    if (this.y > height - 50) {
      this.y = height - 70;
      this.direction = !this.direction;
      this.x1 = random(0, width);
      this.x2 = random(0, width);
    }
  }
}

class Rect {
  constructor() {
    this.color = random(0, 150);
    this.point1 = { x: 0, y: 0 };
    this.point2 = { x: 0, y: 0 };
  }

  draw(breaksLevel) {
    if (breaksLevel > 0) {
      breaksLevel += 100
      fill(this.color, this.color, this.color, breaksLevel);
      stroke(200 - breaksLevel);
      strokeWeight(1)
      rect(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    }
  }

  changePoints(point1, point2) {
    this.point1 = point1
    this.point2 = point2
    this.color = random(0, 150);
  }
}
