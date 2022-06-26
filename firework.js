
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Firework{
    constructor(x, y, radius, velocityX, velocityY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.opacity = 1;
    }
    update() {
        this.velocityY -= gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.opacity -= 0.01;
        if (this.opacity < 0) {
            this.opacity = 0;
        }
    }

    draw() {
        canvasContext.save();
        canvasContext.globalAlpha = this.opacity;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.restore();
    }

}

let gravity = -0.1;
let fireworks = [];
let subFireworks = [];
let initializeCount = 0;
let maximumInitialize = 1;
let initDelay = 500;
let fireworkRadius = 5;
let speedMultiplier = 7;
let particleCount = 100;
let fireworkColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
let createSubFireworks = (x, y, count, speedMultiplier) => {
    let created = 0;
    let radians = (Math.PI * 2 ) / count;
    while (created < count) {
        let subColors = '#' + Math.floor(Math.random() * 16777215).toString(16)
        let firework = new Firework(x, y , fireworkRadius,
                            Math.cos(radians * created) * Math.random() * speedMultiplier,
                            Math.sin(radians * created) * Math.random() * speedMultiplier,
                            subColors);
        subFireworks.push(firework);
        created++;
    }
}
let update = () => {
    canvasContext.fillStyle = "rgba(10, 0, 0, 0.1)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    if (initializeCount < maximumInitialize) {
        let firework = new Firework(Math.random() * canvas.width, Math.random()* 70 + canvas.height, fireworkRadius, 3 * (Math.random() - 0.5), -12,  '#' + Math.floor(Math.random() * 16777215).toString(16));

        fireworks.push(firework);
        setTimeout(() => {
            initializeCount--;
        }, initDelay);
        initializeCount++
    }
    fireworks.forEach((firework,index) => {
        if (firework.opacity <= 0.1) {
            fireworks.splice(index, 1);
            createSubFireworks(firework.x, firework.y, particleCount, speedMultiplier);
        }else {
            firework.update();
        }
    })

    subFireworks.forEach((subFirework, index) => {
        if (subFirework <= 0) {
            subFireworks.splice(index, 1);
        }else {
            subFirework.update();
        }
    })
}

let draw = () => {
    fireworks.forEach((firework) => {
        firework.draw();
    });

    subFireworks.forEach((subFirework) => {
        subFirework.draw();
    })
}

let animate = () => {
    requestAnimationFrame(animate);
    update();
    draw();
}

animate()
