// Name: Blake Warkenton
// Date: 16 February 2024

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 800,
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

let cursors
let spaceKey
let escKey