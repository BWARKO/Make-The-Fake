class Gameover extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        this.ping = this.sound.add('ping', { 
            mute: false,
            volume: 0.25,
            rate: 2,
        });

        this.death = this.sound.add('death', { 
            mute: false,
            volume: 2,
            rate: 1,
        });

        if (gameWon) {
            this.gameoverText = this.add.bitmapText(w/2, h/2, 'gem', `YOU\nWIN`, 160).setOrigin(0.5).setTint(0x00FF00)
        } else {
            this.gameoverText = this.add.bitmapText(w/2, h/2, 'gem', `YOU\nLOSE`, 160).setOrigin(0.5).setTint(0x00FF00)
            this.death.play()
        }
        
        this.pressText = this.add.bitmapText(w/2, h - PADDING, 'gem', `PRESS SPACE TO RESTART`, 40).setOrigin(0.5, 1).setTint(0x00FF00).setAlpha(0)
        this.escText = this.add.bitmapText(0 + PADDING*2, 0 + PADDING*2, 'gem', `ESC TO TITLE`, 20).setTint(0x00FF00).setAlpha(0)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.timer = this.time.addEvent({
            delay: 500,                
            callback: () => {
                this.escText.setAlpha(1)

                if (this.pressText.alpha > 0) {
                    this.pressText.setAlpha(0)
                } else {
                    this.pressText.setAlpha(1)
                    this.ping.play()

                }
            },
            callbackScope: this,
            loop: true
        });

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(escKey)) {
            this.scene.start('titleScene')
        }
    }
}