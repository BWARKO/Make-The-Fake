class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // CONSTANTS/VARS
        this.VELOCITY = 450

        this.canMove = true
        this.step = false
        this.jump = false
        this.kick = false
        this.lastDir = 1

        this.scene = scene

        // add to scene/engine
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scale = 5
        this.body.setSize(10, 19)
        this.body.setGravityY(1500)
        this.setDamping(true)
        this.setDragX(0.0001)
        this.setMaxVelocity(500)
        this.body.setCollideWorldBounds(true)

        this.stepSFX = scene.sound.add('walk', { 
            mute: false,
            volume: 0.2,
            rate: 0.5, 
        });

        this.anims.play('player-idle')
    }

    update() {
        // check jump
        if (!this.body.blocked.down && this.jump) {
            this.jump = false
        }

        // movement
        if ((cursors.left.isDown || aKey.isDown) && this.canMove) {
            this.lastDir = -1
            this.body.velocity.x = -this.VELOCITY
            this.step = true

            if ((this.anims.currentAnim.key !== 'player-left' && this.anims.currentAnim.key !== 'player-kick' && this.anims.currentAnim.key !== 'player-throw') && this.jump || !this.anims.isPlaying) {
                this.anims.play('player-left')
            }
        } else if ((cursors.right.isDown || dKey.isDown) && this.canMove) {
            this.lastDir = 1
            this.body.velocity.x = this.VELOCITY
            this.step = true

            if ((this.anims.currentAnim.key !== 'player-right' && this.anims.currentAnim.key !== 'player-kick' && this.anims.currentAnim.key !== 'player-throw') && this.jump || !this.anims.isPlaying) {
                this.anims.play('player-right')
            }
        } else {
            if ((this.anims.currentAnim.key !== 'player-idle' && this.anims.currentAnim.key !== 'player-kick' && this.anims.currentAnim.key !== 'player-throw') && this.jump || !this.anims.isPlaying) {
                this.anims.play('player-idle')
            }
            this.step = false
        }
        
        if ((cursors.up.isDown || cursors.space.isDown || wKey.isDown) && this.jump && this.canMove) {
            this.stepSFX.play()
            this.body.velocity.y -= this.VELOCITY*2
            this.jump = false

            if (this.body.velocity.x == this.VELOCITY) {
                this.anims.play('player-jump-right')
            } else if (this.body.velocity.x == -this.VELOCITY) {
                this.anims.play('player-jump-left')
            } else {
                this.anims.play('player-jump')

            }
        }

        // attack
        if (attackKey.isDown && this.canMove && this.kick) {
            if (this.body.velocity.y >= 0) {
                this.body.setVelocityY(-300)
            }
            this.body.velocity.x += this.VELOCITY
            this.anims.play('player-kick')

            this.kick = false
            this.jump = false
        } 

        if (throwKey.isDown && bombs && this.anims.currentAnim.key !== 'player-throw' && this.jump && this.canMove) {
            if (this.lastDir == -1) {
                this.setFlipX(true)
            } 
            this.anims.play('player-throw')

            this.scene.time.delayedCall(100, () => {
                this.bomb = new Bomb(this.scene, this.x, this.y-100, 'bomb').setOrigin(0.5, 1)
                this.scene.bombs.add(this.bomb)

                this.scene.time.delayedCall(400, () => {
                    this.setFlipX(false)
                    this.canMove = true
                    this.bomb.throw(this.lastDir)
                }, null, this); 
            }, null, this); 

            bombs -= 1
        }

        if (this.anims.currentAnim.key === 'player-throw') {
            if (this.body.velocity.y < 0) {
                this.body.setVelocityY(0)
            }

            this.body.setVelocityX(0)
            this.canMove = false
        }

        // play step
        if (!this.scene.gameover && this.step && this.jump && !this.stepSFX.isPlaying && this.anims.currentAnim.key !== 'player-throw') {
            this.stepSFX.play()
        } 
    }
}