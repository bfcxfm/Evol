 /*----- constants -----*/
 const canvas = document.querySelector("canvas");
 const ctx = canvas.getContext("2d");
 canvasWidth = 900; //set canvasWidth
 canvasHeight = 900; //set canvasHeight
//  const color = ['E6E6E6','F7F7F7','DCDCDC','FFFFF'];
 const color = ['red','orange'];
 const randomColor = randomItem(color);
 const sizes = ['25','75','150','300'];
 const randomSize = randomItem(sizes);

//  const size = {
//     's': '25',
//     'm': '75',
//     'l': '150',
//     'xl': '300',
//  };
 


 /*----- state variables -----*/
 var bubbles = [];
 var players = [];

 var num25 = Math.floor(Math.random() * 12) + 1; // Random number between 1 and 15
 var num75 = Math.floor(Math.random() * (num25 * 0.5)) + 1; // Random number between 1 and half of num25
 var num150 = Math.floor(Math.random() * (num75 * 0.5)) + 1; // Random number between 1 and half of num75
 var num300 = Math.floor(Math.random() * (num150 * 0.5)) + 1; // Random number between 1 and half of num150



 /*----- cached elements  -----*/
 const restart = document.querySelector('#restart');
 const level = document.querySelector('h3');
 // window.requestAnimationFrame(animate);


 /*----- event listeners -----*/
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

// levels

//  function bubbleLevel() {
//     var num25 = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 15
//     var num75 = Math.floor(Math.random() * (num25 * 0.5)) + 1; // Random number between 1 and half of num25
//     var num150 = Math.floor(Math.random() * (num75 * 0.5)) + 1; // Random number between 1 and half of num75
//     var num300 = Math.floor(Math.random() * (num150 * 0.5)) + 1; // Random number between 1 and half of num150

//     generateBubbles();
// }




 class Bubble {
    //constructor
    constructor(x, y, radius, color) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.radius = radius
    }

    //getter
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
    
    //setter
    //method

    static generateNonOverlappingPosition(radius, bubbles) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (canvasWidth - 2 * radius)) + radius;
            y = Math.floor(Math.random() * (canvasHeight - 2 * radius)) + radius;
        } while (Bubble.checkOverlapWithCenter(x, y, radius) || bubbles.some(bubble => Bubble.checkOverlap(bubble, x, y, radius + 50)));
        return new Bubble(x, y, radius, 'blue');
    }

    static checkOverlap(bubble, x, y, radius) {
        return Math.hypot(bubble.x - x, bubble.y - y) < bubble.radius + radius;
    }

    static checkOverlapWithCenter(x, y, radius) {
        // Check if the bubble's area intersects with the center square
        return x - radius < canvasWidth / 2 + 25 &&
               x + radius > canvasWidth / 2 - 25 &&
               y - radius < canvasHeight / 2 + 25 &&
               y + radius > canvasHeight / 2 - 25;
    }


    draw() {
        ctx.beginPath();
        //Arc needs x, y, radius, start angle, end angle, counterclockwise
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        //This is to fill the circle drawn
        ctx.fill();
    }


 }



 function initialize() {
    canvas.width = canvasWidth; //set canvasWidth = clientWidth 
    canvas.height = canvasHeight; //set canvasHeight = clientHeight
 }


 initialize();

//  generateBubbles(ctx);

    
 function drawBubbles(num25, num75, num150, num300) {
    const sizes = [25, 75, 150, 300];
    const counts = [num25, num75, num150, num300];
    const circles = [];

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const count = counts[i];

        for (let j = 0; j < count; j++) {
            let position;
            do {
                position = Bubble.generateNonOverlappingPosition(size);
            } while (circles.some(circle => Bubble.checkOverlap(circle, { x: position.x, y: position.y, radius: size })))

            const bubble = new Bubble(position.x, position.y, size, 'blue');
            circles.push(bubble);
            ctx.beginPath();
            ctx.arc(position.x, position.y, randomSize, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
        }
    }
 }



drawBubbles(2,4,5,6);

 var player = new Bubble(450,450,30,'black');
 player.draw();
 players.push(player);



   //Non Overlapping posiiton
   function NonOLPos(radius) {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
        y = Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
    } while (x === 450 && y === 450); // Avoid player location
    
    return { x, y };
 }

 //check overlapping
 
 function checkOL(bubble1, bubble2) {
    return Math.hypot(bubble2.x - bubble1.x, bubble2.y - bubble1.y) < bubble1.radius + bubble2.radius;
 }



 function drawBubbles(num25, num75, num150, num300) {
    const sizes = [25, 75, 150, 300];
    const counts = [num25, num75, num150, num300];
    const circles = [];

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const count = counts[i];

        for (let j = 0; j < count; j++) {
            let position;
            do {
                position = NonOLPos(size);
            } while (circles.some(circle => checkOL(circle, { x: position.x, y: position.y, radius: size })))

            const bubble = new Bubble(position.x, position.y, size,randomColor);
            circles.push(bubble);
            ctx.beginPath();
            ctx.arc(position.x, position.y, randomSize, 0, 2 * Math.PI);
            ctx.fillStyle = randomColor;
            ctx.fill();
        }
    }
 }






 function generateBubbles() {
    const bubbles = [];
    const sizes = [25, 75, 150, 300];
    const numBubbles = Math.floor(Math.random() * 11) + 5; // Random number between 5 and 15

    for (let i = 0; i < numBubbles; i++) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const bubble = Bubble.generateNonOverlappingPosition(size, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
}


function generateBubbles(ctx) {
    
    // Generate bubbles for each size
    for (let i = 0; i < num300; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(300, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < num150; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(150, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < num75; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(75, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < num25; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(25, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
}



class Bubble {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    static generateNonOverlappingPosition(radius, bubbles) {
        let x, y;
        do {
            x = Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
            y = Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
        } while (Bubble.checkOverlapWithCenter(x, y, radius) || bubbles.some(bubble => Bubble.checkOverlap(bubble, x, y, radius + 30)));

        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Generating random hex color
        return new Bubble(x, y, radius, randomColor);
    }

    static checkOverlap(bubble, x, y, radius) {
        return Math.hypot(bubble.x - x, bubble.y - y) < bubble.radius + radius;
    }

    static checkOverlapWithCenter(x, y, radius) {
        // Check if the bubble's area intersects with the center square
        return x - radius < canvas.width / 2 + 25 &&
               x + radius > canvas.width / 2 - 25 &&
               y - radius < canvas.height / 2 + 25 &&
               y + radius > canvas.height / 2 - 25;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function generateBubbles(ctx) {
    const bubbles = [];
    const sizes = [25, 75, 150, 300];

    // Calculate the number of bubbles for each size based on the specified conditions
    const numBubbles300 = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    const numBubbles150 = Math.floor(Math.random() * (numBubbles300 * 2)) + 1; // Random number between 1 and twice the number of bubbles with radius 300
    const numBubbles75 = Math.floor(Math.random() * (numBubbles150 * 2)) + 1; // Random number between 1 and twice the number of bubbles with radius 150
    const numBubbles25 = Math.floor(Math.random() * (numBubbles75 * 2)) + 1; // Random number between 1 and twice the number of bubbles with radius 75

    // Generate bubbles for each size
    for (let i = 0; i < numBubbles300; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(300, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < numBubbles150; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(150, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < numBubbles75; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(75, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
    for (let i = 0; i < numBubbles25; i++) {
        const bubble = Bubble.generateNonOverlappingPosition(25, bubbles);
        bubbles.push(bubble);
        bubble.draw(ctx);
    }
}

const canvas = document.createElement('canvas');
canvas.width = 900;
canvas.height = 900;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

generateBubbles(ctx);



