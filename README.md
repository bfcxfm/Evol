# Evol, the Hunger Game

<h1>Introduction</h1>

Welcome to "Evol, The Hunger Game" where the ultimate objective is to consume enough particles to grow larger than any other on the level! Get ready to embark on an exciting adventure through each level as you aim to dominate and establish your supremacy. Keep in mind that success hinges on both consuming and evading the larger entities to secure the top position.ß

You can experience the [Demo](https://works.creaturexd.com/evol/) here!


<h2>Game Setup</h2>

In this game, you will take control of the black bubble as the player and navigate it through a colorful playground filled with bubbles of various sizes. 

<!-- <img src="https://i.imgur.com/XagTF9B.jpg" /> -->
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

