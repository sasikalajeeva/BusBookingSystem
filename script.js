// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
}

// Initialize navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showSection(btn.dataset.section);
    });
});

// Lesson cards
document.querySelectorAll('.lesson-card').forEach(card => {
    card.querySelector('.btn-lesson').addEventListener('click', () => {
        showSection('playground');
    });
});

// Code Playground Functions
const canvas = document.getElementById('canvas-output');
const ctx = canvas.getContext('2d');
const textOutput = document.getElementById('text-output');

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    textOutput.textContent = '';
}

// Drawing functions available in playground
window.drawCircle = function(x, y, radius, color = 'blue') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
};

window.drawSquare = function(x, y, size, color = 'blue') {
    ctx.fillStyle = color;
    ctx.fillRect(x - size/2, y - size/2, size, size);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - size/2, y - size/2, size, size);
};

window.drawStar = function(x, y, radius, color = 'yellow') {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
};

window.sayHello = function(name = 'Friend') {
    const message = `Hello, ${name}! 👋`;
    textOutput.textContent += message + '\n';
    return message;
};

window.calculate = function(a, b, operation = '+') {
    let result;
    switch(operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = b !== 0 ? a / b : 'Cannot divide by zero!';
            break;
        default:
            result = 'Unknown operation';
    }
    const message = `${a} ${operation} ${b} = ${result}`;
    textOutput.textContent += message + '\n';
    return result;
};

// Additional drawing functions
window.drawTriangle = function(x, y, size, color = 'green') {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
};

window.drawHexagon = function(x, y, size, color = 'purple') {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
};

window.drawLine = function(x1, y1, x2, y2, color = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};

window.drawText = function(text, x, y, size = 20, color = 'black') {
    ctx.fillStyle = color;
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, y);
};

window.drawRainbow = function(x, y, radius) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    for (let i = colors.length - 1; i >= 0; i--) {
        ctx.beginPath();
        ctx.arc(x, y, radius - (colors.length - 1 - i) * 15, 0, Math.PI);
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 20;
        ctx.stroke();
    }
};

window.drawGradient = function(x, y, size, color1, color2) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
};

window.setBackground = function(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Animation function
window.animate = function(callback, duration = 1000, fps = 60) {
    const frames = Math.floor((duration / 1000) * fps);
    let currentFrame = 0;
    const interval = 1000 / fps;
    
    const animateFrame = () => {
        if (currentFrame < frames) {
            callback(currentFrame);
            currentFrame++;
            setTimeout(animateFrame, interval);
        }
    };
    animateFrame();
};

// Sleep function for delays
window.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Make clearCanvas available globally
window.clearCanvas = clearCanvas;

// Run code from playground
document.getElementById('run-code').addEventListener('click', () => {
    const codeInput = document.getElementById('code-input').value;
    runCode(codeInput);
});

// Execute code safely
function runCode(code) {
    clearCanvas();
    textOutput.textContent = '';
    
    try {
        // Create a safe execution context
        const safeCode = `
            (function() {
                ${code}
            })();
        `;
        eval(safeCode);
    } catch (error) {
        textOutput.textContent = 'Error: ' + error.message;
        textOutput.style.color = '#ef4444';
    }
}

// Challenge checking
let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');

function checkChallenge(challengeNum) {
    const challengeCard = document.querySelector(`[data-challenge="${challengeNum}"]`);
    const codeInput = challengeCard.querySelector('.challenge-code').value;
    const feedback = document.getElementById(`feedback-${challengeNum}`);
    
    // Clear previous output
    clearCanvas();
    textOutput.textContent = '';
    
    let passed = false;
    let message = '';
    
    try {
        // Execute the code
        eval(codeInput);
        
        // Check based on challenge number
        switch(challengeNum) {
            case 1:
                // Check if a red circle was drawn
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let hasRed = false;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    if (imageData.data[i] > 200 && imageData.data[i+1] < 100 && imageData.data[i+2] < 100) {
                        hasRed = true;
                        break;
                    }
                }
                if (hasRed) {
                    passed = true;
                    message = '🎉 Awesome! You drew a red circle!';
                } else {
                    message = '❌ Try drawing a red circle using drawCircle(250, 250, 100, "red")';
                }
                break;
                
            case 2:
                // Check if multiple shapes were drawn
                const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixelCount = 0;
                for (let i = 0; i < imageData2.data.length; i += 4) {
                    if (imageData2.data[i] !== 255 || imageData2.data[i+1] !== 255 || imageData2.data[i+2] !== 255) {
                        pixelCount++;
                    }
                }
                if (pixelCount > 5000) {
                    passed = true;
                    message = '🎉 Great job! You drew multiple shapes!';
                } else {
                    message = '❌ Try drawing more shapes! Use drawSquare, drawStar, and drawCircle with different colors.';
                }
                break;
                
            case 3:
                // Check if a loop was used (look for pattern of circles)
                const imageData3 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixelCount3 = 0;
                for (let i = 0; i < imageData3.data.length; i += 4) {
                    if (imageData3.data[i] !== 255 || imageData3.data[i+1] !== 255 || imageData3.data[i+2] !== 255) {
                        pixelCount3++;
                    }
                }
                // Check if code contains 'for' keyword
                if (codeInput.includes('for') && pixelCount3 > 3000) {
                    passed = true;
                    message = '🎉 Excellent! You used a loop to create a pattern!';
                } else {
                    message = '❌ Try using a for loop! Example: for (let i = 0; i < 5; i++) { drawCircle(100 + i*80, 250, 30, "blue"); }';
                }
                break;
                
            case 4:
                // Check if rainbow was drawn
                if (codeInput.includes('drawRainbow')) {
                    passed = true;
                    message = '🎉 Amazing! You created a rainbow!';
                } else {
                    message = '❌ Try using drawRainbow(250, 250, 100)';
                }
                break;
                
            case 5:
                // Check if spiral pattern (multiple circles with changing positions)
                const imageData5 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixelCount5 = 0;
                for (let i = 0; i < imageData5.data.length; i += 4) {
                    if (imageData5.data[i] !== 255 || imageData5.data[i+1] !== 255 || imageData5.data[i+2] !== 255) {
                        pixelCount5++;
                    }
                }
                if (codeInput.includes('for') && pixelCount5 > 5000) {
                    passed = true;
                    message = '🎉 Fantastic! You created a spiral pattern!';
                } else {
                    message = '❌ Try using a loop with changing positions: for (let i = 0; i < 20; i++) { drawCircle(250 + i*10, 250 + i*5, 20 - i, "blue"); }';
                }
                break;
                
            case 6:
                // Check if animation was used
                if (codeInput.includes('animate')) {
                    passed = true;
                    message = '🎉 Incredible! You created an animation!';
                } else {
                    message = '❌ Try using animate(function(frame) { clearCanvas(); drawCircle(250 + frame*2, 250, 50, "red"); }, 100);';
                }
                break;
        }
        
    } catch (error) {
        message = '❌ Error: ' + error.message + '. Check your code syntax!';
    }
    
    // Show feedback
    feedback.textContent = message;
    feedback.className = 'challenge-feedback ' + (passed ? 'success' : 'error');
    
    // Update progress if challenge passed
    if (passed && !completedChallenges.includes(challengeNum)) {
        completedChallenges.push(challengeNum);
        localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
        updateProgress();
        // Celebrate!
        setTimeout(() => celebrate(), 100);
    }
    
    // Clear canvas after checking
    setTimeout(() => {
        clearCanvas();
    }, 3000);
}

function updateProgress() {
    const total = 6;
    const completed = completedChallenges.length;
    const progressPercent = (completed / total) * 100;
    
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('progress-count').textContent = completed;
}

// Initialize progress on load
updateProgress();

// Allow Enter key to run code in playground
document.getElementById('code-input').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('run-code').click();
    }
});

// Add some example code suggestions
document.querySelectorAll('.challenge-code').forEach(textarea => {
    textarea.addEventListener('focus', function() {
        if (this.value === '// Your code here' || this.value.trim() === '') {
            this.value = '';
            }
        });
    });

// Add celebration animation when challenge is completed
function celebrate() {
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'fall 3s linear forwards';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 100);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Template copying function
function copyTemplate(templateName) {
    const templates = {
        rainbow: 'drawRainbow(250, 250, 100);',
        stars: `for (let i = 0; i < 5; i++) {
  drawStar(100 + i*80, 250, 30, 'yellow');
}`,
        gradient: "drawGradient(250, 250, 150, 'red', 'blue');",
        triangles: `for (let i = 0; i < 6; i++) {
  drawTriangle(80 + i*70, 250, 40, 'green');
}`,
        animate: `animate(function(frame) {
  clearCanvas();
  drawCircle(250 + frame*2, 250, 50, 'purple');
}, 100);`,
        target: `for (let i = 5; i > 0; i--) {
  drawCircle(250, 250, i*20, i % 2 === 0 ? 'red' : 'white');
}`
    };
    
    const code = templates[templateName];
    if (code) {
        const codeInput = document.getElementById('code-input');
        codeInput.value = code;
        showSection('playground');
        // Scroll to code input
        codeInput.focus();
    }
}

// Load example code
function loadExample(exampleName) {
    const examples = {
        basic: `// Basic shapes example
drawCircle(100, 100, 50, 'red');
drawSquare(200, 200, 100, 'blue');
drawStar(300, 300, 40, 'yellow');`,
        pattern: `// Pattern example using loops
for (let i = 0; i < 5; i++) {
  drawCircle(100 + i*80, 250, 30, 'blue');
  drawStar(100 + i*80, 150, 20, 'yellow');
}`,
        animation: `// Animation example
animate(function(frame) {
  clearCanvas();
  drawCircle(250 + Math.sin(frame/10)*100, 250, 50, 'purple');
  drawStar(250, 250 + Math.cos(frame/10)*100, 30, 'yellow');
}, 200);`
    };
    
    const code = examples[exampleName];
    if (code) {
        document.getElementById('code-input').value = code;
    }
}

// Game functions
let secretNumber = Math.floor(Math.random() * 100) + 1;
let gameAttempts = 0;

window.guessNumber = function(guess) {
    gameAttempts++;
    const output = document.getElementById('game-output');
    if (guess === secretNumber) {
        output.innerHTML = `<p style="color: green; font-weight: bold;">🎉 Correct! You guessed it in ${gameAttempts} tries!</p>`;
        secretNumber = Math.floor(Math.random() * 100) + 1;
        gameAttempts = 0;
    } else if (guess < secretNumber) {
        output.innerHTML = `<p>Too low! Try a higher number. (Attempt ${gameAttempts})</p>`;
    } else {
        output.innerHTML = `<p>Too high! Try a lower number. (Attempt ${gameAttempts})</p>`;
    }
};

function runGame() {
    const code = document.getElementById('game-code').value;
    try {
        eval(code);
    } catch (error) {
        document.getElementById('game-output').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    gameAttempts = 0;
    document.getElementById('game-output').innerHTML = '<p>Game reset! Guess a number between 1 and 100.</p>';
}

// Color mixer
const colorMixer = {
    red: {r: 255, g: 0, b: 0},
    blue: {r: 0, g: 0, b: 255},
    green: {r: 0, g: 255, b: 0},
    yellow: {r: 255, g: 255, b: 0},
    purple: {r: 128, g: 0, b: 128},
    orange: {r: 255, g: 165, b: 0},
    pink: {r: 255, g: 192, b: 203},
    cyan: {r: 0, g: 255, b: 255}
};

window.mixColors = function(color1, color2) {
    const c1 = colorMixer[color1.toLowerCase()] || {r: 128, g: 128, b: 128};
    const c2 = colorMixer[color2.toLowerCase()] || {r: 128, g: 128, b: 128};
    
    const mixed = {
        r: Math.floor((c1.r + c2.r) / 2),
        g: Math.floor((c1.g + c2.g) / 2),
        b: Math.floor((c1.b + c2.b) / 2)
    };
    
    const colorStr = `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
    const display = document.getElementById('color-display');
    display.style.backgroundColor = colorStr;
    display.innerHTML = `<p style="color: white; padding: 20px; text-align: center; font-weight: bold;">${color1} + ${color2} = ${colorStr}</p>`;
    return colorStr;
};

function runColorMixer() {
    const code = document.getElementById('color-code').value;
    try {
        eval(code);
    } catch (error) {
        document.getElementById('color-display').innerHTML = `<p style="color: red; padding: 20px;">Error: ${error.message}</p>`;
    }
}

// Art generator
function generateArt() {
    const artCanvas = document.getElementById('art-canvas');
    const artCtx = artCanvas.getContext('2d');
    artCtx.clearRect(0, 0, artCanvas.width, artCanvas.height);
    
    const shapes = ['circle', 'square', 'star', 'triangle'];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    
    for (let i = 0; i < 20; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * artCanvas.width;
        const y = Math.random() * artCanvas.height;
        const size = 20 + Math.random() * 60;
        
        artCtx.fillStyle = color;
        artCtx.strokeStyle = 'black';
        artCtx.lineWidth = 2;
        
        switch(shape) {
            case 'circle':
                artCtx.beginPath();
                artCtx.arc(x, y, size/2, 0, 2 * Math.PI);
                artCtx.fill();
                artCtx.stroke();
                break;
            case 'square':
                artCtx.fillRect(x - size/2, y - size/2, size, size);
                artCtx.strokeRect(x - size/2, y - size/2, size, size);
                break;
            case 'star':
                artCtx.save();
                artCtx.translate(x, y);
                artCtx.beginPath();
                for (let j = 0; j < 5; j++) {
                    const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2;
                    const px = Math.cos(angle) * size/2;
                    const py = Math.sin(angle) * size/2;
                    if (j === 0) artCtx.moveTo(px, py);
                    else artCtx.lineTo(px, py);
                }
                artCtx.closePath();
                artCtx.fill();
                artCtx.stroke();
                artCtx.restore();
                break;
            case 'triangle':
                artCtx.beginPath();
                artCtx.moveTo(x, y - size/2);
                artCtx.lineTo(x - size/2, y + size/2);
                artCtx.lineTo(x + size/2, y + size/2);
                artCtx.closePath();
                artCtx.fill();
                artCtx.stroke();
                break;
        }
    }
}

// Initialize - show home section by default
showSection('home');
