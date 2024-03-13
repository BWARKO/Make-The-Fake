class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // CONSTANTS/VARS
        this.VELOCITY = 400

        this.step = false
        this.jump = false

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scale = 5
        this.body.setSize(14, 19)
        this.body.gravity.y = 1500
        this.setDamping(true)
        this.setDragX(0.0001)
        this.setMaxVelocity(500)
        this.body.setCollideWorldBounds(true)

        this.stepSFX = scene.sound.add('walk', { 
            mute: false,
            volume: 0.5,
            rate: 0.5, 
        });

        this.anims.play('player-idle')
    }

    update() {
        if (cursors.left.isDown) {
            if (this.anims.currentAnim.key !== 'player-left' && this.jump) {
                this.anims.play('player-left')
            }
            this.body.velocity.x = -this.VELOCITY
            this.step = true
        } else if (cursors.right.isDown) {
            this.body.velocity.x = this.VELOCITY
            this.step = true

            if (this.anims.currentAnim.key !== 'player-right' && this.jump) {
                this.anims.play('player-right')
            }
        } else {
            if (this.anims.currentAnim.key !== 'player-idle' && this.jump) {
                this.anims.play('player-idle')
            }
            this.step = false
        }
        
        if ((cursors.up.isDown || cursors.space.isDown) && this.jump) {
            this.stepSFX.play()
            this.body.velocity.y -= this.VELOCITY*2
            this.jump = false

            if (this.body.velocity.x > 0) {
                this.anims.play('player-jump-right')
            } else if (this.body.velocity.x < 0) {
                this.anims.play('player-jump-left')
            } else {
                this.anims.play('player-jump')

            }
        }

        if (this.step && this.jump && !this.stepSFX.isPlaying) {
            this.stepSFX.play()
        } 

    }
}