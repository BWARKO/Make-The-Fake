class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // var
        this.scene = scene

        // settings
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setSize(7, 14)
    }

    pickup() {
        this.body.destroy()
        this.scene.coinAmount += 1

        this.anims.play('coin-pickup')
        this.scene.time.delayedCall(250, () => {
            this.anims.play('coin-explosion')
            this.scene.time.delayedCall(500, () => {
                this.destroy()
            }, null, this); 
        }, null, this); 
    }
}