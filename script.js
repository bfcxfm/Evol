/*----- constants -----*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 900; //set canvasWidth
const canvasHeight = 900; //set canvasHeight
const color = ['#e6e6e6','#f7f7f7','#fffff'];
const sizes = [15, 30, 125, 150];


/*----- state variables -----*/
let player;
let bubbles = [];
let players = [];
var speed = 15;

/*----- cached elements -----*/
const restartBtn = document.querySelector('button');
const message = document.querySelector('h3');

/*----- event listeners -----*/

 restartBtn.addEventListener('click', restartGame);

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
        this.xVelocity = 0;
        this.yVelocity = 0;
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

    // moveLeft() {
    //     if (this.x > 0) {
    //         this.x -= speed;
    //     }
    // }

    moveLeft() {
        this.xVelocity = Math.min(this.xVelocity + 0.5, speed);
        this.x -= this.xVelocity;

        // Wrap around the canvas horizontally
        if (this.x < -this.radius) {
            this.x = canvasWidth + this.radius;
        }
    }

    // moveRight() {
    //     if (this.x < canvasWidth) {
    //         this.x += speed;
    //     }
    // }

    moveRight() {
        this.xVelocity = Math.min(this.xVelocity + 0.5, speed);
        this.x += this.xVelocity;

        // Wrap around the canvas horizontally
        if (this.x > canvasWidth + this.radius) {
            this.x = -this.radius;
        }
    }

    // moveUp() {
    //     if (this.y > 0) {
    //         this.y -= speed;
    //     }
    // }

    moveUp() {
        this.yVelocity = Math.min(this.yVelocity + 0.5, speed);
        this.y -= this.yVelocity;

        // Wrap around the canvas vertically
        if (this.y < -this.radius) {
            this.y = canvasHeight + this.radius;
        }
    }


    // moveDown() {
    //     if (this.y < canvasHeight) {
    //         this.y += speed;
    //     }
    // }

    moveDown() {
        this.yVelocity = Math.min(this.yVelocity + 0.5, speed);
        this.y += this.yVelocity;

        // Wrap around the canvas vertically
        if (this.y > canvasHeight + this.radius) {
            this.y = -this.radius;
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

    touch(otherBubble) {
        // Check if the bubbles are touching
        if (Bubble.checkOverlap(this, otherBubble.x, otherBubble.y, otherBubble.radius)) {
            // Determine the bubble with the smaller radius
            const smallerBubble = this.radius < otherBubble.radius ? this : otherBubble;
            const largerBubble = this.radius >= otherBubble.radius ? this : otherBubble;
            const totalDistance = Math.hypot(this.x - otherBubble.x, this.y - otherBubble.y);
            const difference = largerBubble.radius + smallerBubble.radius - totalDistance;
            console.log(difference);

            // Remove the smaller bubble
            const index = bubbles.indexOf(smallerBubble);
            console.log(index);
            if (index !== -1 && index !== bubbles.length-1) {
                
                bubbles.splice(index, 1);
            
                console.log(bubbles);
                console.log(players);
                // Increase the radius of the larger bubble
                // largerBubble.radius += smallerBubble.radius*0.5;
                // Increase the radius of the larger bubble in slow motion
                let radiusIncrement = smallerBubble.radius * 0.05;
                let totalIncrease = largerBubble.radius + smallerBubble.radius*0.5;
                let intervalId = setInterval(() => {
                    largerBubble.radius += radiusIncrement;
                    // smallerBubble.radius -= radiusIncrement;
                    if (largerBubble.radius >=  totalIncrease) {
                        clearInterval(intervalId);
                    }
                }, 50); // Increase the radius every 50 milliseconds
            } else if (index === bubbles.length-1) {
                // largerBubble.radius += difference*0.5;
                // smallerBubble.radius -= difference;
                let radiusIncrement = difference * 0.5 * 0.05;
                let radiusReduce = difference * 0.05 ; 
                let totalIncrease = largerBubble.radius + difference*0.5;
                let totalReduce = smallerBubble.radius - difference;
                let intervalId = setInterval(() => {
                    largerBubble.radius += radiusIncrement;
                    smallerBubble.radius -= radiusReduce ;
                    if (largerBubble.radius >=  totalIncrease || smallerBubble.radius >= totalReduce ) {
                        clearInterval(intervalId);
                    }
                }, 50); // Increase the radius every 50 milliseconds
                console.log(bubbles);
                console.log(players);

            }
        


            
        }
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
    bubbles.push(player);
    // players.push(player);
    
}

startGame();





function restartGame() {
    bubbles = [];
    players = [];
    startGame();
}

function animate(step) {
    //Runs animate over and over again 60 frames per second
    initialize();
    let playerIsBiggest = true; // Flag to check if the player is the biggest
    let playerIsSmallest = true; // Flag to check if the player is the smallest

    // player.draw();


    bubbles.forEach((bubble,index) => {
        
        bubble.draw();
        // Check for collisions with other bubbles
        for (let i = index + 1; i < bubbles.length; i++) {
            bubble.touch(bubbles[i]);
        }
        // Check if player's radius is smaller than any other bubble
        if (bubble !== player && player.radius <= bubble.radius) {
            playerIsBiggest = false;
        }

        // Check if player's radius is bigger than any other bubble
        if (bubble !== player && player.radius >= bubble.radius) {
            playerIsSmallest = false;
        }
    });

    // If player is the biggest
    if (playerIsBiggest) {
        message.innerHTML = 'YOU WIN';
    }

    // If player is the smallest
    if (playerIsSmallest) {
        message.innerHTML = 'YOU LOSE';
    }




    
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);


