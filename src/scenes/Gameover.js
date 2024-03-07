class Gameover extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        console.log('Gameover scene')

        this.gameoverText = this.add.bitmapText(w/2, h/3, 'gem', `GAMEOVER`, 160).setOrigin(0.5).setTint(0x00FF00)
        this.tempText = this.add.bitmapText(w/2, h/2 - 60, 'gem', `haha theres nothing here... or anywhere in this game yet!`, 20).setOrigin(0.5).setTint(0x00FF00)

        this.pressText = this.add.bitmapText(w/2, h/2, 'gem', `PRESS SPACE TO RESTART`, 60).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)
        this.escText = this.add.bitmapText(0 + PADDING, 0 + PADDING, 'gem', `ESC TO TITLE`, 60).setTint(0x00FF00)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.ping = this.sound.add('ping', { 
            mute: false,
            volume: 0.5,
            rate: 2,
        });

        this.death = this.sound.add('death', { 
            mute: false,
            volume: 2,
            rate: 1,
        });
        this.death.play()

        this.timer = this.time.addEvent({
            delay: 500,                
            callback: () => {
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