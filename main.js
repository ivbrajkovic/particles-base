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
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const force = (mouse.radius - distance) / mouse.radius;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

// init particles
let particleArray = [];
function init(width = canvas.width, height = canvas.height) {
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
  connect();
  requestAnimationFrame(animate);
}
animate();

// connect particles
function connect(distanceThreshold = 50) {
  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.hypot(dx, dy);
      const opacityValue = 1 - distance / distanceThreshold;

      if (distance < distanceThreshold) {
        ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}
