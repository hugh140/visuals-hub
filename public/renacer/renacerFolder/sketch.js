const size = 300;
let oscIncrement = 0;

let kick, kickVolume;
let ambient, ambientVolume;
let hihats, hihatsVolume;
let ambient2, ambient2Volume;
let drums, drumsVolume;

let points = [];
let curves = [];

function preload() {
  kick = new Tone.Player(
    "renacerFolder/assets/kickRenacer.mp3"
  ).toDestination();
  drums = new Tone.Player(
    "renacerFolder/assets/drumsRenacer.mp3"
  ).toDestination();
  hihats = new Tone.Player(
    "renacerFolder/assets/hihatsRenacer.mp3"
  ).toDestination();
  ambient = new Tone.Player(
    "renacerFolder/assets/ambientRenacer.mp3"
  ).toDestination();
  ambient2 = new Tone.Player(
    "renacerFolder/assets/ambient2Renacer.mp3"
  ).toDestination();

  kick.fadeOut = 0.1;
  drums.fadeOut = 0.1;
  hihats.fadeOut = 0.1;
  ambient.fadeOut = 0.1;
  ambient2.fadeOut = 0.1;

  kick.fadeIn = 0.1;
  drums.fadeIn = 0.1;
  hihats.fadeIn = 0.1;
  ambient.fadeIn = 0.1;
  ambient2.fadeIn = 0.1;
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 4; i++) points.push(new Point());
  for (let i = 0; i < 10; i++) curves.push(new Curve());

  audioControlsSetup("renacerFolder/assets/drumsRenacer.mp3", [
    kick,
    drums,
    hihats,
    ambient,
    ambient2,
  ]);

  Tone.loaded().then(() => {
    //Volume meters
    kickVolume = new Tone.Meter();
    kick.connect(kickVolume);

    ambient2Volume = new Tone.Meter();
    ambient2.connect(ambient2Volume);

    ambientVolume = new Tone.Meter();
    ambient.connect(ambientVolume);

    hihatsVolume = new Tone.Meter();
    hihats.connect(hihatsVolume);
  });
}

function draw() {
  //Volume constants
  kickLevel = (kickVolume?.getValue() + 100) / 100;
  hihatsLevel = hihatsVolume?.getValue() ?? -100;
  ambientLevel = ambientVolume?.getValue() ? ambientVolume.getValue() + 15 : 0;
  ambient2Level = ambient2Volume?.getValue()
    ? ambient2Volume.getValue() + 15
    : 0;

  if (ambientLevel > -50)
    background((kickLevel > 0.5 ? kickLevel : 0) * 25);
  else background(kickLevel * 100);

  drawCurves(ambient2Level);
  drawCircun();
  drawRhythmCircle(kickLevel, hihatsLevel);
  drawNodes(kickLevel, hihatsLevel);
  drawHexagon(kickLevel, hihatsLevel);
  drawCircle(hihatsLevel);

  fill(255);
  musicBar();
}
