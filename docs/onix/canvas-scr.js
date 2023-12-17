const cancion = new AudioTools();

const canvas = document.getElementById("canvas-script");
const ctx = canvas.getContext("2d");

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  canvas.width = window.innerWidth;
  canvas.height = canvas.width;
} else {
  canvas.height = window.innerHeight - 200;
  canvas.width = canvas.height;
}
const bodyDOM = document.querySelector("body");
// Variables
const expansionCuadrado = 80;

// Instanciar objetos
const circle = new Circle(150);
const point = new Point();
const point2 = new Point();

const line1 = new Line(
  -expansionCuadrado,
  -expansionCuadrado,
  -expansionCuadrado,
  expansionCuadrado
);
const line2 = new Line(
  expansionCuadrado,
  -expansionCuadrado,
  -expansionCuadrado,
  -expansionCuadrado
);
const line3 = new Line(
  expansionCuadrado,
  expansionCuadrado,
  expansionCuadrado,
  -expansionCuadrado
);
const line4 = new Line(
  -expansionCuadrado,
  expansionCuadrado,
  expansionCuadrado,
  expansionCuadrado
);

const backLine1 = new Line(
  20 - canvas.width / 2,
  -canvas.height / 2 - 100,
  20 - canvas.width / 2,
  canvas.height / 2 + 100,
  'rgb(150,150,150)'
);
const backLine2 = new Line(
  40 - canvas.width / 2,
  -canvas.height / 2 - 100,
  40 - canvas.width / 2,
  canvas.height / 2 + 100,
  'rgb(150,150,150)'
);
const backLine3 = new Line(
  canvas.width / 2 - 20,
  -canvas.height / 2 - 100,
  canvas.width / 2 - 20,
  canvas.height / 2 + 100,
  'rgb(150,150,150)'
);
const backLine4 = new Line(
  canvas.width / 2 - 40,
  -canvas.height / 2 - 100,
  canvas.width / 2 - 40,
  canvas.height / 2 + 100,
  'rgb(150,150,150)'
);

const centerLine = new Line(0, 0, 0, canvas.height / 2 + 100);

//Dibujar y animar objetos
const update = () => {
  const colorFondo = (-Math.abs(16 * cancion.getVolume() - 1) + 1) * 100;

  bodyDOM.style.backgroundColor = `rgb(${colorFondo - 10},${colorFondo - 10},${
    colorFondo - 10
  })`;
  ctx.fillStyle = `rgba(${colorFondo},${colorFondo},${colorFondo},0.5)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  line1.update(cancion.getVolume());
  line2.update(cancion.getVolume());
  line3.update(cancion.getVolume());
  line4.update(cancion.getVolume());

  backLine1.update(cancion.getVolume());
  backLine2.update(cancion.getVolume());
  backLine3.update(cancion.getVolume());
  backLine4.update(cancion.getVolume());

  centerLine.update(0)

  circle.update(cancion.getVolume());
  point.update(cancion.getVolume());
  point2.update(cancion.getVolume());

  requestAnimationFrame(update);
};
update();
