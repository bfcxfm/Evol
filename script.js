/*----- constants -----*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 900; //set canvasWidth
const canvasHeight = 900; //set canvasHeight
const color = ['#E6E6E6','#F7F7F7','#FFFFF'];
const sizes = [15, 30, 125, 150];


/*----- state variables -----*/
let player;
let bubbles = [];
let players = [];
var speed = 5;

/*----- cached elements -----*/
const restartBtn = document.querySelector('button');
const level = document.querySelector('h3');

/*----- event listeners -----*/

 restartBtn.addEventListener('click', startGame);

//  window.onload = function() {
//     restartGame();
//  };

window.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" || event.key == "d" ) {
        player.moveRight();
    } 
    if (event.key == "ArrowLeft" || event.key == "a" ) {
        player.moveLeft();
    }
    if (event.key == "ArrowUp" || event.key == "w" ) {
        player.moveUp();
    }
    if (event.key == "ArrowDown" || event.key == "s" ) {
        player.moveDown();
    }
        
 })

/*----- functions -----*/
function randomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function handlePlayerInput(event) {
    // Update player position based on key press
}

class Bubble {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }

    // Getter and setter

    getBXPos() {
        return this.x;
    }

    getBYPos() {
        return this.y;
    }
    getTop() {
        return this.y-this.radius;
    }
    getBtm(){
        return this.y+this.radius;
    }
    getLeft() {
        return this.x-this.radius;
    }
    getRight() {
        return this.x+this.radius;
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= speed*10;
        }
    }

    moveRight() {
        if (this.x < canvasWidth) {
            this.x += speed*10;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= speed*10;
        }
    }

    moveDown() {
        if (this.y < canvasHeight) {
            this.y += speed*10;
        }
    }

    // Methods

    static generateNonOverlappingPosition(radius, bubbles, color) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (canvasWidth - 2 * radius)) + radius;
            y = Math.floor(Math.random() * (canvasHeight - 2 * radius)) + radius;
        } while (bubbles.some(bubble => Bubble.checkOverlap(bubble, x, y, radius + 15)));
        return new Bubble(x, y, radius, color);
    }

    static checkOverlap(bubble, x, y, radius) {
        return Math.hypot(bubble.x - x, bubble.y - y) < bubble.radius + radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function generateBubbles() {
    const num15 = Math.floor(Math.random() * 30) + 15;
    const num30 = Math.floor(Math.random() * (num15 * 0.5)) + 1;
    const num125 = Math.floor(Math.random() * (num30 * 0.5)) + 1;
    const num150 = Math.floor(Math.random() * (num125 * 0.5)) + 1;

    for (let i = 0; i < num150; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(150, bubbles, randomItem(color));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num125; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(125, bubbles, randomItem(color));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num30; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(30, bubbles, randomItem(color));
        bubbles.push(bubble);
        bubble.draw();
    }
    for (let i = 0; i < num15; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(15, bubbles, randomItem(color));
        bubbles.push(bubble);
        bubble.draw();
    }
}

function initialize() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
} 

initialize();



function startGame() {
    generateBubbles();
    player = Bubble.generateNonOverlappingPosition(20, bubbles, 'black');
    player.draw();
    players.push(player);
    
}

startGame();



// function restartGame() {
//     let bubbles = [];
//     let players = [];
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     StartGame();
//     window.requestAnimationFrame(animate);
// }

// function animate(step) {
//     //Runs animate over and over again 60 frames per second
//     initialize();

//     player.draw();
    

    
//     window.requestAnimationFrame(animate);
// }

// window.requestAnimationFrame(animate);
