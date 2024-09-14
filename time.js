
function displayTime() {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate the time elapsed since the page loaded in seconds
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    // Convert elapsed seconds to Earth days
    const elapsedDays = elapsedSeconds;

    // Format the elapsed time as days, hours, minutes, and seconds
    const days = Math.floor(elapsedDays);
    const hours = Math.floor((elapsedDays - days) * 24);
    const minutes = Math.floor((elapsedDays - days - hours) * 60);
    const seconds = Math.floor((elapsedDays - days - hours - minutes) * 60);

    // Update the display element with the formatted time
    document.getElementById("timeDisplay").textContent = `${days} `;

    // Schedule the next update
    setTimeout(displayTime, 1000); // Update every second
}

// Get the current time when the page loads
const startTime = new Date().getTime();

// Initial display on window load
window.onload = displayTime;


const message = document.getElementById('message');
setTimeout(() => {
  message.classList.add('visible');

  // Hide the message after 5 seconds
  setTimeout(() => {
    message.classList.remove('visible');
  }, 5000);
}, 2000);

// const planets = [
//   { id: 'earth', orbitClass: 'earth-orbit', speed: 1 },
//   { id: 'mars', orbitClass: 'mars-orbit', speed: 0.5 }
// ];

// let animationIntervals = [];
// let isPaused = false;

// // Function to rotate planets around the sun
// function rotatePlanets(speedMultiplier) {
//   clearPreviousIntervals();
//   planets.forEach(planet => {
//       let planetEl = document.getElementById(planet.id);
//       let orbitEl = document.querySelector(`.${planet.orbitClass}`);
//       let angle = 0;

//       const interval = setInterval(() => {
//           if (!isPaused) {
//               angle = (angle + planet.speed * speedMultiplier) % 360;
//               let radians = angle * (Math.PI / 180);
//               let orbitRadius = orbitEl.offsetWidth / 2;
//               let centerX = orbitEl.offsetLeft + orbitRadius;
//               let centerY = orbitEl.offsetTop + orbitRadius;

//               let x = centerX + orbitRadius * Math.cos(radians) - planetEl.offsetWidth / 2;
//               let y = centerY + orbitRadius * Math.sin(radians) - planetEl.offsetHeight / 2;

//               planetEl.style.left = `${x}px`;
//               planetEl.style.top = `${y}px`;
//           }
//       }, 1000 / 60);

//       animationIntervals.push(interval);
//   });
// }

// // Speed slider logic
// const speedSlider = document.getElementById('speedSlider');
// const speedDisplay = document.getElementById('speedDisplay');

// speedSlider.addEventListener('input', function() {
//   let speedMultiplier = this.value;
//   speedDisplay.textContent = `${speedMultiplier}x`;  // Update speed display
//   clearPreviousIntervals();
//   rotatePlanets(speedMultiplier);
// });

// // Pause and Resume logic
// document.getElementById('pauseBtn').addEventListener('click', function() {
//   isPaused = true;
// });

// document.getElementById('resumeBtn').addEventListener('click', function() {
//   isPaused = false;
// });

// // Clear previous intervals
// function clearPreviousIntervals() {
//   animationIntervals.forEach(interval => clearInterval(interval));
//   animationIntervals = [];
// }

// // Initial planet rotation
// rotatePlanets(1); // Default speed

let earthOrbit = document.querySelector('.earth');
let marsOrbit = document.querySelector('.mars');
let speedSlider = document.getElementById('speedSlider');
let speedDisplay = document.getElementById('speedDisplay');
let pauseBtn = document.getElementById('pauseBtn');
let resumeBtn = document.getElementById('resumeBtn');
let currentSpeed = 1;
let isPaused = false;

// Function to update speed of rotation
function updateSpeed() {
    currentSpeed = speedSlider.value;
    earthOrbit.style.animationDuration = `${365 / currentSpeed}s`;
    marsOrbit.style.animationDuration = `${20 / currentSpeed}s`;
    speedDisplay.textContent = `${currentSpeed}x`;
}

// Pause/Resume functionality
pauseBtn.addEventListener('click', () => {
    isPaused = true;
    earthOrbit.style.animationPlayState = 'paused';
    marsOrbit.style.animationPlayState = 'paused';
});

resumeBtn.addEventListener('click', () => {
    isPaused = false;
    earthOrbit.style.animationPlayState = 'running';
    marsOrbit.style.animationPlayState = 'running';
});

// Slider change event
speedSlider.addEventListener('input', updateSpeed);

// Initialize
updateSpeed();




