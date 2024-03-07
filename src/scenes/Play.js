class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        console.log('Play Scene')

        // create level

        // temp
        this.bg = this.add.tileSprite(0, h/2, 3200, 193, 'bg').setOrigin(0, 0.5)

        this.ground = this.add.rectangle(0, h-20, 3200, 50, 0x00FF00).setOrigin(0, 0.5)
        this.layerground = this.add.rectangle(0, h-17, 3200, 50, 0x000000).setOrigin(0, 0.5)
        this.physics.add.existing(this.ground)
        this.ground.body.setImmovable(true)

        // temp text
        this.pressR = this.add.bitmapText(w/2, h/3, 'gem', `Press 'R' to simulate GAMEOVER`, 60).setOrigin(0.5).setTint(0x00FF00)

        // add player
        this.player = new Player(this, w/2, h/2, 'player').setOrigin(0.5)

        // update camera
        this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
        this.physics.world.setBounds(0, 0, this.bg.width, 800)

        // colliders
        this.physics.add.collider(this.player, this.ground, () => {
            if (!this.player.jump) {
                this.player.stepSFX.play()
                this.player.jump = true
            }
        })

        this.physics.world.drawDebug = false
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // temp to get to game over screen
        this.input.keyboard.on('keydown-R', function() {
            this.bgm.stop()
            this.scene.start('gameoverScene')
        }, this)

        cursors = this.input.keyboard.createCursorKeys()

        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.05,
            rate: 1,
            loop: true 
        });
        this.bgm.play()
    }

    update() {
        // run player
        this.player.update()
    }
}