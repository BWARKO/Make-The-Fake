// Name: Blake Warkenton
// Date: 16 February 2024

// credit documentation:
// https://freesound.org/people/stumpbutt/sounds/381690/
// https://freesound.org/people/Xiko__/sounds/711127/
// https://freesound.org/people/lulyc/sounds/346116/
// https://freesound.org/people/OwlStorm/sounds/404728/
// https://freesound.org/people/MATRIXXX_/sounds/515783/
// https://freesound.org/people/BloodPixelHero/sounds/580898/

let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1200,
    height: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Title, Play, UI, Gameover ]
}

const game = new Phaser.Game(config)

// define globals
let w = game.config.width
let h = game.config.height
let PADDING = 10

let gameWon = false
let lives = 3
let score = 0
let bombs = 1

let cursors
let wKey
let aKey
let sKey
let dKey
let spaceKey
let escKey
let attackKey
let throwKey