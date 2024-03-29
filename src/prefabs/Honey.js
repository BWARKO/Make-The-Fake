class Honey extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add to scene/engine
        scene.add.existing(this)

        // vars
        this.score = 800

        this.scene = scene
        this.initX = x
        this.initY = y

        // settings in build honey cant be killed till it starts forming
        
    }

    attack() {
        this.spit = this.scene.add.sprite(this.x+20, this.y+80, 'drip').setScale(5).setOrigin(0.5)
        this.spit.anims.play('honey-projectile')

        this.scene.physics.add.existing(this.spit)
        this.scene.projectiles.add(this.spit)

        this.spit.setAngle(90)
        this.spit.body.setSize(6, 3)
        this.spit.body.setOffset(23,46)

        this.spit.body.setVelocityX(-300)
    }

    build () {
        this.dripping = this.scene.add.sprite(this.initX, this.initY - 100, 'drip').setScale(5).setOrigin(0.5)
        this.dripping.anims.play('dripping')
        this.anims.play('honey-build')

        // settings
        this.scene.physics.add.existing(this)
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setGravityY(1500)
        this.body.setImmovable()
        this.body.setSize(this.width-4, this.height-4)

        this.scene.timer = this.scene.time.delayedCall(3000, () => {
            this.dripping.destroy()
            this.anims.play('honey-mouth')

            this.scene.timer = this.scene.time.addEvent({
                delay: 1500,                
                callback: () => {
                this.attack()
                },
                callbackScope: this,
                loop: true
            })

            this.scene.player.canMove = true
        }, null, this); 
    }

    death () {
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
                this.destroy()
            }, null, this); 
        }, null, this); 
    }
}