const size = 300;
let framesCounter = 0;

let ambient1, ambient1Volume;
let ambient2, ambient2Volume;
let otherSounds, otherSoundsVolume;
let breaks, breaksVolume;

let lines = [];
let lineLoops = [];
let rects = [];
let rectPoints = [];

function preload() {
  ambient1 = new Tone.Player(
    "eterFolder/assets/ambient1Eter.mp3"
  ).toDestination();
  ambient2 = new Tone.Player(
    "eterFolder/assets/ambient2Eter.mp3"
  ).toDestination();
  otherSounds = new Tone.Player(
    "eterFolder/assets/otherSoundsEter.mp3"
  ).toDestination();
  breaks = new Tone.Player("eterFolder/assets/breaksEter.mp3").toDestination();

  ambient1.fadeOut = 0.1;
  ambient2.fadeOut = 0.1;
  otherSounds.fadeOut = 0.1;
  breaks.fadeOut = 0.1;

  ambient1.fadeIn = 0.1;
  ambient2.fadeIn = 0.1;
  otherSounds.fadeIn = 0.1;
  breaks.fadeIn = 0.1;
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);

  for (let i = 0; i < 15; i++) lines.push(new Line());
  for (let i = 0; i < 10; i++) lineLoops.push(new LineLoop());
  for (let i = 0; i < 2; i++) rects.push(new Rect());

  audioControlsSetup("eterFolder/assets/ambient1Eter.mp3", [
    ambient1,
    ambient2,
    otherSounds,
    breaks,
  ]);

  Tone.loaded().then(() => {
    //Volume meters
    ambient1Volume = new Tone.Meter({
      smoothing: 0.99,
    });
    ambient1.connect(ambient1Volume);

    ambient2Volume = new Tone.Meter();
    ambient2.connect(ambient2Volume);

    otherSoundsVolume = new Tone.Meter();
    otherSounds.connect(otherSoundsVolume);

    breaksVolume = new Tone.Meter();
    breaks.connect(breaksVolume);
  });
}

function draw() {
  const ambient1Level = ambient1Volume?.getValue() + 100;
  const breaksLevel = breaksVolume?.getValue() + 100;
  let otherSoundsLevel = otherSoundsVolume?.getValue() + 300;
  otherSoundsLevel = otherSoundsLevel > 0 ? otherSoundsLevel : 0;
  let ambient2Level = ambient2Volume?.getValue() + 100 / 3;
  ambient2Level = ambient2Level > 0 ? ambient2Level : 0;

  rectPoints = [];

  background(255);
  if (breaksLevel > 80) {
    filter(INVERT)
    document.body.style.background = 'black'
  } else {
    document.body.style.background = 'white'
  }

  stroke(otherSoundsLevel)
  noFill()
  circle(width/2, height/2, otherSoundsLevel)

  lineLoops.forEach((lineLoop) => {
    lineLoop.draw(ambient2Level);
  });

  lines.forEach((point) => {
    point.draw(ambient1Level);
    if (framesCounter % 84 === 0) point.changeMult();
  });

  lines.forEach((line) => {
    lineLoops.forEach((lineLoop) => {
      if (
        lineLoop.x1 < line.x &&
        lineLoop.x2 > line.x &&
        line.y1 < lineLoop.y &&
        line.y2 > lineLoop.y
      ) {
        stroke(0);
        fill(255);
        circle(line.x, lineLoop.y, 3);
        rectPoints.push({ x: line.x, y: lineLoop.y });
      }
    });
  });

  rects.forEach((rect) => {
    rect.draw(breaksLevel);
    if (framesCounter % 2 === 0) {
      const point1 = rectPoints[int(random(0, rectPoints.length))] ?? 0;
      const point2 = rectPoints[int(random(0, rectPoints.length))] ?? 0;
      rect.changePoints(point1, point2);
    }
  });

  if (isPlaying) framesCounter++;
  musicBar();
}
