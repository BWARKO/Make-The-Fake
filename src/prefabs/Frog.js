class Frog extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        //vars
        this.score = 1000

        this.scene = scene

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // settings
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setSize(23, 23)
        this.body.setOffset(28, 2)
        this.body.setGravityY(1500)
        this.body.setImmovable(true)
    }

    attack() {
        this.scene.timer = this.scene.time.delayedCall(1500, () => {
            this.anims.play('frog-eat')

            this.scene.timer = this.scene.time.delayedCall(225, () => {
                this.scene.player.setAlpha(0)

                this.scene.timer = this.scene.time.delayedCall(500, () => {
                    lives = 0
                    this.scene.timer = this.scene.time.delayedCall(1000, () => {
                        this.poop = this.scene.add.sprite(this.x + 65, this.y, 'frog').setScale(5).setOrigin(0.5)
                        this.scene.blastSFX.play()
                        this.poop.anims.play('frog-poop')

                        this.scene.gameover = true
                    }, null, this); 
                }, null, this); 
            }, null, this); 
        }, null, this); 
    }

    death() {
        if (this.scene.timer) {
            this.scene.timer.remove()
        }
        this.body.destroy()

        this.scene.pingSFX.setLoop(true)
        this.scene.pingSFX.play()
        this.anims.play('explosion-start')
        this.scoreText = this.scene.add.bitmapText(this.x, this.y, 'gem', this.score, 70).setOrigin(0.5).setTint(0x00FF00)

        this.scene.time.delayedCall(1000, () => {
            this.anims.play('explosion-end')

            this.scene.time.delayedCall(500, () => {
                score += this.score

                this.scene.pingSFX.setLoop(false)
                this.scoreText.destroy()
                this.destroy

            }, null, this); 
        }, null, this); 
    }
}