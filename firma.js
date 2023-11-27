const canvas = document.querySelector('canvas');
const botonLimpiar = document.querySelector('.boton-limpiar');
const botonImagen = document.querySelector('.boton-imagen');
const botonContrato = document.querySelector('.boton-contrato');

const ctx = canvas.getContext('2d');
let modoEscritura = false;
let xAnterior = 0,
  yAnterior = 0,
  xActual = 0,
  yActual = 0;

const COLOR = 'blue';
const GROSOR = 2;

const limpiarPad = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
limpiarPad();

botonLimpiar.addEventListener('click', (e) => {
  e.preventDefault();
  limpiarPad();
});

botonImagen.addEventListener('click', (e) => {
  e.preventDefault();

  const enlace = document.createElement('a');
  enlace.download = "Firma.png";
  enlace.href = canvas.toDataURL();
  enlace.click();
});

window.obtenerImagen = () => {
  return canvas.toDataURL();
};

botonContrato.addEventListener('click', (e) => {
  e.preventDefault();

  const ventana = window.open('contrato.html');
});

const obtenerPosicionCursor = (e) => {
  positionX = e.clientX - e.target.getBoundingClientRect().left;
  positionY = e.clientY - e.target.getBoundingClientRect().top;

  return [positionX, positionY];
};

const OnClicOToqueIniciado = (e) => {
  modoEscritura = true;
  [xActual, yActual] = obtenerPosicionCursor(e);

  ctx.beginPath();
  ctx.fillStyle = COLOR;
  ctx.fillRect(xActual, yActual, GROSOR, GROSOR);
  ctx.closePath();
};

const OnMouseDedoMovido = (e) => {
  if (!modoEscritura) return;

  let target = e;
  if (e.type.includes("touch")) {
    target = e.touches[0];
  }
  xAnterior = xActual;
  yAnterior = yActual;
  [xActual, yActual] = obtenerPosicionCursor(target);

  ctx.beginPath();
  ctx.lineWidth = GROSOR; // Corregir el nombre de la propiedad
  ctx.strokeStyle = COLOR;
  ctx.moveTo(xAnterior, yAnterior);
  ctx.lineTo(xActual, yActual);
  ctx.stroke();
  ctx.closePath();
};

const OnClicDedoLevantado = () => {
  modoEscritura = false;
};

['mousedown', 'touchstart'].forEach(nombreEvento => {
  canvas.addEventListener(nombreEvento, OnClicOToqueIniciado, { passive: true });
});

['mousemove', 'touchmove'].forEach(nombreEvento => {
  canvas.addEventListener(nombreEvento, OnMouseDedoMovido, { passive: true });
});

['mouseup', 'touchend'].forEach(nombreEvento => {
  canvas.addEventListener(nombreEvento, OnClicDedoLevantado, { passive: true });
});
