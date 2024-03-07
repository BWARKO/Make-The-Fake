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
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1600,
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
    scene: [ Load, Title, Play, Gameover ]
}

const game = new Phaser.Game(config)

// define globals
let w = game.config.width
let h = game.config.height

let cursors
let spaceKey
let escKey