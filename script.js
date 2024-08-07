const canvas = document.querySelector('canvas'),
toolsBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector('#fill-color'),
ctx = canvas.getContext('2d');

let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5;

window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const drawRect = (e) => {
  if(!fillColor.checked){
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
  ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prev
  ctx.arc(e.offsetX, e.offsetY, prevMouseX - e.offsetX, 0, 2 * Math.PI);
  ctx.stroke();
}
const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
  if (!isDrawing) return;

  if(selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if(selectedTool === "rectangle"){
    drawRect();
  }
}

toolsBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(btn.id);
  });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);