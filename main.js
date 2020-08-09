/**
  Particles animation on canvas
 */

// canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
const ctx = canvas.getContext("2d");

// canvas text
ctx.font = "30px Verdana";
ctx.fillStyle = "white";
ctx.fillText("A", 0, 30);

// particles data
const data = ctx.getImageData(0, 0, 100, 100);
// console.log("data", data);
// ctx.strokeStyle = "white";
// ctx.strokeRect(0, 0, 100, 100);

// handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 150,
};

// mousemove envent listener
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log("mouse", mouse);
});

class Particle {
  constructor(x, y, size = 3) {
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;
    // this.size = size;
    this.size = Math.random() * size + 1;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < mouse.radius) {
      this.size = 30;
    } else {
      this.size = 3;
    }
  }
}
// new Particle(150, 100).draw();

// init particles
let particleArray = [];
function init(width = window.innerWidth, height = window.innerHeight) {
  particleArray = [];
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * width + 1;
    const y = Math.random() * height + 1;
    particleArray.push(new Particle(x, y));
  }
}
init();
console.log("particleArray", particleArray);

// animation loop with RAF
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
