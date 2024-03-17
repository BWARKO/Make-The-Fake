class Bee extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        //vars
        this.scene = scene

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // settings
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setSize(45, 30)
        this.body.setOffset(2, 5)
        this.body.setGravityY(1500)
        this.body.setImmovable()
    }

    attack() {
        this.scene.timer = this.scene.time.delayedCall(2000, () => {
            this.body.setVelocityX(-200)
            this.anims.play('bee-walk')

        }, null, this); 
    }

    death() {
        if (this.scene.timer) {
            this.scene.timer.remove()
        }
        this.body.destroy()

        this.anims.play('explosion-start')
        this.scoreText = this.scene.add.bitmapText(this.x, this.y, 'gem', `500`, 70).setOrigin(0.5).setTint(0x00FF00)

        this.scene.time.delayedCall(1000, () => {
            this.anims.play('explosion-end')

            this.scene.time.delayedCall(500, () => {
                this.scoreText.destroy()
                this.destroy()

            }, null, this); 
        }, null, this); 
    }
}