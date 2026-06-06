/**
 * Pixel Blast Background Effect
 * Inspired by ReactBits - Implemented in Vanilla JS
 */

const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');

let width, height, pixels = [];
const pixelSize = 3;
const pixelCount = 150;
const colors = ['#4f46e5', '#ec4899', '#06b6d4']; // Indigo, Pink, Cyan

function init() {
    resize();
    createPixels();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);

class Pixel {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * pixelSize + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 100 + 100;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function createPixels() {
    pixels = [];
    for (let i = 0; i < pixelCount; i++) {
        pixels.push(new Pixel());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    pixels.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', init);
