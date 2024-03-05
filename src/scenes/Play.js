class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        console.log('Play Scene')

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // temp to get to game over screen
        this.input.keyboard.on('keydown-R', function() {
            this.scene.start('gameoverScene')
        }, this)
    }

    update() {
        
    }
}