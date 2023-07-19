const toggleButton = document.getElementById('toggleButton');
const sectionContent = document.getElementById('sectionContent');
const c= document.getElementById("canvas")
const closeButton=document.getElementById("closeButton")
const clearButton = document.getElementById("clearButton");
const pb=document.getElementById("pb")

toggleButton.addEventListener('click', () => {
  if (sectionContent.style.display === 'none') {
    sectionContent.style.display = 'block';
    c.style.display='none'
  } else {
    sectionContent.style.display = 'none';
    c.style.display="block"
  }

  
});

clearButton.addEventListener('click', () => {
  clearCanvas();
  dots = [];
});

closeButton.addEventListener('click',()=>{
  sectionContent.style.display = 'none';
  c.style.display="block"
})


pb.addEventListener('click',()=>{
  sectionContent.style.display = 'none';
  c.style.display="block"
})


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let dotsMode = false;

let dots = [];
let points = [];

function activateDotsMode() {
  clearCanvas();
  patternMode = false;
  dotsMode = true;
  triMode = false;

  alert("Hover your mouse/hover on your touch screen to see cool effects");
}

function handleInput(x, y) {
  const rect = canvas.getBoundingClientRect();
  mouseX = x - rect.left;
  mouseY = y - rect.top;

  if (dotsMode) {
    updateDots();
  }
}

function handleTouchEvent(e) {
  e.preventDefault();
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleClickEvent(e) {
  handleInput(e.clientX, e.clientY);
}

canvas.addEventListener('mousemove', (e) => {
  handleInput(e.clientX, e.clientY);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('click', (e) => {
  handleInput(e.clientX, e.clientY);
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateDots() {
  const cohesionFactor = 0;
  const separationFactor = 0.02;
  const alignmentFactor = 0.02;
  const maxSpeed = 2;

  dots.push({
    x: mouseX,
    y: mouseY,
    vx: Math.random() * maxSpeed - maxSpeed / 2,
    vy: Math.random() * maxSpeed - maxSpeed / 2,
    color: getRandomColor(),
    size: Math.floor(Math.random() * 10) + 2
  });

  dots.forEach((dot) => {
    dot.x += dot.vx;
    dot.y += dot.vy;

    let dx = 0;
    let dy = 0;
    let count = 0;

    dots.forEach((otherDot) => {
      if (dot !== otherDot) {
        const distance = Math.sqrt((dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2);

        if (distance < 50) {
          dx += otherDot.x - dot.x;
          dy += otherDot.y - dot.y;
          count++;
        }

        if (distance < 10) {
          dot.vx -= (otherDot.x - dot.x) * separationFactor;
          dot.vy -= (otherDot.y - dot.y) * separationFactor;
        }
      }
    });

    if (count > 0) {
      dx /= count;
      dy /= count;
      dot.vx += dx * cohesionFactor;
      dot.vy += dy * cohesionFactor;
    }

    dot.vx += Math.random() * alignmentFactor - alignmentFactor / 2;
    dot.vy += Math.random() * alignmentFactor - alignmentFactor / 2;

    const speed = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);
    if (speed > maxSpeed) {
      dot.vx = (dot.vx / speed) * maxSpeed;
      dot.vy = (dot.vy / speed) * maxSpeed;
    }

    dot.x = Math.max(0, Math.min(dot.x, canvas.width));
    dot.y = Math.max(0, Math.min(dot.y, canvas.height));
  });

  dots = dots.filter((dot) => dot.x > 0 && dot.x < canvas.width && dot.y > 0 && dot.y < canvas.height);

  drawDots();
}

function drawDots() {
  clearCanvas();

  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();
    ctx.closePath();
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  requestAnimationFrame(animate);

  // Insert any additional animations or updates here
}

animate();
