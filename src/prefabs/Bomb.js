class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this) 

        // var
        this.scene = scene
        this.timer

        // settings
        this.setScale(5)
        this.setOrigin(0.5, 1)
        this.body.setCircle(5, 5)
        this.body.setOffset(4, 14)

        this.anims.play('bomb-lit')
    }

    throw(direction) {
        this.setDamping(true)
        this.setDragX(0.5)
        this.setBounce(0.8)

        this.body.setGravityY(1500)
        this.body.setVelocityX(500 * direction)
        this.body.setVelocityY(-400)

        this.timer = this.scene.time.delayedCall(3000, () => {
            this.explosion()
        }, null, this); 
    }

    explosion() {
        this.timer.remove()

        this.body.destroy()

        this.anims.play('coin-explosion')
        this.scene.time.delayedCall(500, () => {
            this.destroy()
        }, null, this); 
    }
}