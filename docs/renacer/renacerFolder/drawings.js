function drawCircun() {
  noFill();
  stroke(100);
  circle(width / 2, height / 2, 300);
}

function drawRhythmCircle(kickLevel, hihatsLevel) {
  strokeWeight(kickLevel * 10);
  stroke(255);
  const rythmSize = size + kickLevel * 100;
  let osc1 = 0,
    osc2 = 0,
    osc3 = 0,
    osc4 = 0;
  if (hihatsLevel > -70) {
    osc1 = sin(oscIncrement) * 20;
    osc2 = sin(oscIncrement + 1) * 20;
    osc3 = sin(oscIncrement + 2) * 20;
    osc4 = sin(oscIncrement + 3) * 20;
  }
  oscIncrement += 0.12;
  arc(width / 2, height / 2, rythmSize + osc1, rythmSize + osc1, 0, HALF_PI);
  arc(width / 2, height / 2, rythmSize + osc2, rythmSize + osc2, HALF_PI, PI);
  arc(
    width / 2,
    height / 2,
    rythmSize + osc3,
    rythmSize + osc3,
    PI,
    PI + HALF_PI
  );
  arc(
    width / 2,
    height / 2,
    rythmSize + osc4,
    rythmSize + osc4,
    PI + HALF_PI,
    TWO_PI
  );
}

function drawNodes(kickLevel, hihatsLevel) {
  stroke(hihatsLevel > -70 ? 0 : map(kickLevel ?? 0, 0, 1, 75, 150));
  strokeWeight(1);
  points.forEach((point) => {
    point.draw(kickLevel);
    const randomPoint = points[round(random(0, points.length - 1))];
    line(point?.x, point?.y, randomPoint?.x, randomPoint?.y);
  });
}

function drawHexagon(kickLevel, hihatsLevel) {
  const randomMovement = hihatsLevel > -50 ? random(-5, 5) : 0;
  let y1, x2, y2, x3, y3;
  if (kickLevel > 0.5) {
    y1 =
      Math.random() > 0.5
        ? height / 2 + 150 + randomMovement
        : height / 2 - 150 + randomMovement;
    x2 =
      Math.random() > 0.5
        ? width / 2 + 129.9 + randomMovement
        : width / 2 - 129.9 + randomMovement;
    y2 =
      Math.random() > 0.5
        ? height / 2 + 100 + randomMovement
        : height / 2 - 100 + randomMovement;
    x3 =
      Math.random() > 0.5
        ? width / 2 + 129.9 + randomMovement
        : width / 2 - 129.9 + randomMovement;
    y3 =
      Math.random() > 0.5
        ? height / 2 + 75 + randomMovement
        : height / 2 - 75 + randomMovement;
  }

  if (hihatsLevel > -70) fill(30);
  else noFill();

  strokeWeight(hihatsLevel > -70 ? 3 : 1);
  stroke(hihatsLevel > -70 ? 50 : 50);
  triangle(width / 2 + randomMovement, y1, x2, y2, x3, y3);
  strokeWeight(1);
}

function drawCircle(hihatsLevel) {
  if (hihatsLevel > -70) {
    fill(255);
    circle(width / 2, height / 2, 20);
    noFill();
    stroke(255);
    circle(width / 2, height / 2, 50 + (hihatsLevel + 100));
  }
}

function drawCurves(ambient2Level) {
  curves.forEach(curve => curve.draw(ambient2Level))
  strokeWeight(1)
  stroke(50)
}
