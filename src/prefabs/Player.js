class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // CONSTANTS/VARS
        this.VELOCITY = 500

        this.step = false

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.jump = false
        this.scale = 0.5
        this.body.gravity.y = 1000
        this.setDamping(true)
        this.setDragX(0.0001)
        this.body.setCollideWorldBounds(true)

        this.stepSFX = scene.sound.add('walk', { 
            mute: false,
            volume: 0.5,
            rate: 0.5, 
        });
    }

    update() {
        if (cursors.left.isDown) {
            this.body.velocity.x = -this.VELOCITY
            this.step = true
        } else if (cursors.right.isDown) {
            this.body.velocity.x = this.VELOCITY
            this.step = true
        } else {
            this.step = false
        }
        
        if ((cursors.up.isDown || cursors.space.isDown) && this.jump) {
            this.stepSFX.play()
            this.body.velocity.y -= this.VELOCITY
            this.jump = false
        }

        if (this.step && this.jump && !this.stepSFX.isPlaying) {
            this.stepSFX.play()
        } 

    }
}