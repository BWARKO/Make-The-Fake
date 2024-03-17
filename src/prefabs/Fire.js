class Fire extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this,)

        // settings
        this.setScale(5)
        this.setOrigin(0.5)
        this.body.setSize(this.width, this.height/4)
        this.body.setOffset(0, 30)
        this.body.moves = false
        this.anims.play('burn')
    }
}