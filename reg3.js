const canvas = document.getElementById("planetCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let planets = [];
let moons = [];

let timeSpeed = 1;
let animationPaused = false;

class Planet {
  constructor(distanceFromSun, radius, color, orbitSpeed) {
    this.distanceFromSun = distanceFromSun;
    this.radius = radius;
    this.color = color;
    this.angle = 0;
    this.orbitSpeed = orbitSpeed;
  }

  update() {
    if (!animationPaused) {
      this.angle += this.orbitSpeed * timeSpeed;
    }
  }

  draw() {
    const x = centerX + this.distanceFromSun * Math.cos(this.angle);
    const y = centerY + this.distanceFromSun * Math.sin(this.angle);
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    return { x, y };
  }
}

class Moon extends Planet {
  constructor(distanceFromPlanet, radius, color, orbitSpeed, parentPlanet) {
    super(distanceFromPlanet, radius, color, orbitSpeed);
    this.parentPlanet = parentPlanet;
  }

  draw() {
    const parentCoords = this.parentPlanet.draw();
    const x = parentCoords.x + this.distanceFromSun * Math.cos(this.angle);
    const y = parentCoords.y + this.distanceFromSun * Math.sin(this.angle);
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create Earth and its moon
const earth = new Planet(150, 20, "blue", 0.01);
const moon = new Moon(40, 10, "gray", 0.05, earth);

planets.push(earth);
moons.push(moon);

// Draw the Sun
function drawSun() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
}

// Update and render all celestial bodies
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSun();

  planets.forEach((planet) => {
    planet.update();
    planet.draw();
  });

  moons.forEach((moon) => {
    moon.update();
    moon.draw();
  });

  if (!animationPaused) {
    requestAnimationFrame(update);
  }
}

// Event listeners for Pause/Resume buttons
document.getElementById("pauseBtn").addEventListener("click", () => {
  animationPaused = true;
  document.getElementById("pauseBtn").disabled = true;
  document.getElementById("resumeBtn").disabled = false;
});

document.getElementById("resumeBtn").addEventListener("click", () => {
  animationPaused = false;
  document.getElementById("pauseBtn").disabled = false;
  document.getElementById("resumeBtn").disabled = true;
  update();
});

// Event listener for speed adjustment slider
document.getElementById("slider").addEventListener("input", (e) => {
  timeSpeed = parseFloat(e.target.value);
});

// Start the animation
update();
