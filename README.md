# Evol, the Hunger Game

<h1>Introduction</h1>

Welcome to "Evol, The Hunger Game" where the ultimate objective is to consume enough particles to grow larger than any other on the level! Get ready to embark on an exciting adventure through each level as you aim to dominate and establish your supremacy. Keep in mind that success hinges on both consuming and evading the larger entities to secure the top position.ß

You can experience the [Demo](https://works.creaturexd.com/evol/) here!


<h2>Game Setup</h2>

In this game, you will take control of the black bubble as the player and navigate it through a colorful playground filled with bubbles of various sizes. 

```mermaid
---
Evol, the HUnger Game - Diagram
---
flowchart TD;
  A(Initialize canvas - adaptive to different devices)
  B(Define player and related objects)
  C(Generate entities randomly without overlapping, allowing the player to passage through)
  D(Define all the functions in objects related to position, size, color, movement, generation check, collision check etc, for later invocation)
  E(Add event listeners - adaptive to keyboard, mouse and touchscreen movement)
  F(Invoke the init and animation function used to initialize all state variables)
  G[Wait for User to control movement]
  H{ Restart }
  I[if player size is smaller than the entity it touched, player size shrinks]
  J[if player is the smallest entity]
  K[if player size is bigger than the entity it touched, player size increase while the smaller entity gets absorbed]
  L[if player is the biggest entity]
  M(Update all state variables impacted by the user interaction)
  N(Trigger transition animation and re-initiate canvas)

  subgraph Setup
    A --> B
    B --> C
    C --> D
    D --> E
  end
  subgraph Running
    E --> F
    F --> G
    G --> H
    G --> I
    G --> K
    I --> J
    I --> K
    K --> I
    K --> L
    L --WIN--> H
    J --LOSE--> H
    H --> M
    M --> N
    N --> G
  end
  ```




Your mission is to become the largest bubble in the playground by consuming smaller bubbles and growing in size.

![Initial Wining Sketch](https://github.com/bfcxfm/evol/blob/main/img/win.png#center)

Be cautious though! If your bubble accidentally touches a bubble larger than itself, your size will start to shrink. To emerge victorious, swiftly maneuver away from larger bubbles to avoid diminishing in size. Remember, the player will only triumph if they remain larger than any other bubble in the playground.

![Initial Losing Sketch](https://github.com/bfcxfm/evol/blob/main/img/lose.png#center)


<h3>Adaptive Design</h3>

Get ready to experience the game on a variety of devices with an adaptive design feature. Whether you're playing on a desktop (with a screen width larger than 768px), an iPad, or a mobile device, this game is designed with tailored controls for each platform.

<p align="center">
    <img src="https://github.com/bfcxfm/evol/blob/main/img/mobile.gif" alt="Mobile Mode">
</p>

On desktop, enjoy seamless gameplay with keyboard and mouse control support, allowing you to navigate your bubble player with precision and ease. For iPad and mobile users, immerse yourself in the game with touch screen control support, making it intuitive and convenient to maneuver your bubble through the playground.

![Desktop Mode](https://github.com/bfcxfm/evol/blob/main/img/desktop.gif#center)

<h3>Favourites and Challenges</h3>

A primary feature of the game involves the algorithmic generation of bubbles without overlapping, coupled with the implementation of animations triggered by bubble interactions - a favored aspect of the game.

```
---
Favourite and Challenging parts
---
static generateNonOverlappingPosition(radius, bubbles, color) {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
        y = Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
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
        let difference;
        if (totalDistance >= largerBubble.radius){
            difference = largerBubble.radius + smallerBubble.radius - totalDistance;
        } else {
            difference = 0;
            smallerBubble.radius = 0;
            speed = 0 ;

        }

        // Remove the smaller bubble
        const index = bubbles.indexOf(smallerBubble);
        if (index !== -1 && index !== bubbles.length-1) {
            bubbles.splice(index, 1);
            score += 1;
        
            // Increase the radius of the larger bubble in slow motion
            let radiusIncrement = smallerBubble.radius * 0.05;
            let totalIncrease = largerBubble.radius + smallerBubble.radius*0.5;
            let intervalId = setInterval(() => {
                largerBubble.radius += radiusIncrement;
                largerBubble.color = randomItem(colorChange);
                if (largerBubble.radius >=  totalIncrease) {
                    largerBubble.color = 'black';
                    clearInterval(intervalId);
                    
                }
            }, 50); // Increase the radius every 50 milliseconds

        } else if (index === bubbles.length-1) {
            let radiusIncrement = difference * 0.5 * 0.05;
            let radiusReduce = difference * 0.05 ; 
            let totalIncrease, totalReduce;
            if (difference > 0){
            totalIncrease = largerBubble.radius + difference * 0.5;
            totalReduce = smallerBubble.radius - difference;
            } else {
                totalIncrease = largerBubble.radius + smallerBubble.radius;
                totalReduce = smallerBubble.radius;
            }
            
            let intervalId = setInterval(() => {
                largerBubble.radius += radiusIncrement;
                smallerBubble.radius -= radiusReduce;
                largerBubble.color = randomItem(colorChange);
                if (smallerBubble.radius > radiusReduce) {
                    smallerBubble.radius -= radiusReduce;
                } else {
                    smallerBubble.radius = 0;
                    speed = 0;
                    clearInterval(intervalId)
                }

                if (largerBubble.radius < totalIncrease) {
                    largerBubble.radius += radiusIncrement;
                    largerBubble.color = randomItem(colorChange);
                } else {
                    clearInterval(intervalId);
                }                   
            }, 5); // Increase the radius every 5 milliseconds
}}}
```


<h3>Future Implementation</h3>

1. **Zoom in and Zoom out**

    The screen will track the user's point of view, enabling zoom in and zoom out functionalities to provide users with a broader perspective of the entire game environment.

2. **Infinite Canvas with Pan**

    Implementing an infinite canvas will allow users to explore a vast world beyond the game's boundaries and facilitate seamless, continuous exploration within the game environment.

