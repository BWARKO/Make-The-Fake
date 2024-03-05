class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // CONSTANTS
        this.VELOCITY = 500

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.jump = false
        this.scale = 0.5
        this.body.gravity.y = 1000
        this.setDamping(true)
        this.setDragX(0.0001)
        this.body.setCollideWorldBounds(true)
    }

    update() {
        if (cursors.left.isDown) {
            this.body.velocity.x = -this.VELOCITY
        } 
        if (cursors.right.isDown) {
            this.body.velocity.x = this.VELOCITY
        } 
        
        if ((cursors.up.isDown || cursors.space.isDown) && this.jump) {
            this.body.velocity.y -= this.VELOCITY
            this.jump = false
        }

    }
}