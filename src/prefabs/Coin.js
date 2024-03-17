class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // var
        this.score = 10

        this.scene = scene

        // settings
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setSize(7, 14)
    }

    pickup() {
        this.body.destroy()

        this.anims.play('coin-pickup')
        this.scene.pingSFX.setLoop(false)
        this.scene.pingSFX.setRate(2.5)
        this.scene.pingSFX.play()

        this.scene.time.delayedCall(250, () => {
            this.anims.play('coin-explosion')
            this.scene.time.delayedCall(500, () => {
                score += this.score

                this.destroy()
            }, null, this); 
        }, null, this); 
    }
}