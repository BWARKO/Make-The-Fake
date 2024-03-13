// Name: Blake Warkenton
// Date: 16 February 2024

// credit documentation:
// https://freesound.org/people/stumpbutt/sounds/381690/
// https://freesound.org/people/Xiko__/sounds/711127/
// https://freesound.org/people/lulyc/sounds/346116/
// https://freesound.org/people/OwlStorm/sounds/404728/
// https://freesound.org/people/MATRIXXX_/sounds/515783/
// https://freesound.org/people/BloodPixelHero/sounds/580898/
//
// questions:
// - clipping ramps
// - add groups to physics instead of individual objects (less code)
// - how to throw bomb, i.e. build animation with bomb or w/o?
// - title screen lags, happens when i tab back in and out
// - reset jump with bottom collision

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1200,
    height: 600,
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
let PADDING = 10

let cursors
let spaceKey
let escKey