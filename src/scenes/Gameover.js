class Gameover extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        // insure no lasting UI or sound
        this.scene.stop('uiScene')
        this.sound.stopAll()

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
            this.explosion = this.add.sprite(w/2, h/2, 'explosion').setScale(12)
            this.explosion.anims.play('explosion-end')
            this.ping.play()
            this.explosion.anims.setRepeat(-1)

            this.gameoverText = this.add.bitmapText(w/2, h/2, 'gem', `YOU\nWIN`, 160).setOrigin(0.5).setTint(0x00FF00).setAlpha(1)
            this.scoreText = this.add.bitmapText(w/2, h/2, 'gem', score, 160).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)

            this.time.delayedCall(1750, () => {
                this.escText.setAlpha(1)
                this.pressText.setAlpha(1)
            
            }, null, this); 

            this.timer = this.time.addEvent({
                delay: 500,                
                callback: () => {
                    this.ping.play()

                    if (this.scoreText.alpha == 1) {
                        this.scoreText.setAlpha(0)
                        this.gameoverText.setAlpha(1)
                        this.toggle = false
                    } else {
                        this.gameoverText.setAlpha(0)
                        this.scoreText.setAlpha(1)
                        this.toggle = true
                    }
                },
                callbackScope: this,
                loop: true
            });
            
        } else {
            this.gameoverText = this.add.bitmapText(w/2, h/2, 'gem', `YOU\nLOSE`, 160).setOrigin(0.5).setTint(0x00FF00)
            this.death.play()

            this.time.delayedCall(1750, () => {
                this.escText.setAlpha(1)
                this.pressText.setAlpha(1)
                this.ping.play()

                this.timer = this.time.addEvent({
                    delay: 500,                
                    callback: () => {
                        if (this.pressText.alpha == 1) {
                            this.pressText.setAlpha(0)
                        } else {
                            this.pressText.setAlpha(1)
                            this.ping.play()
    
                        }
                    },
                    callbackScope: this,
                    loop: true
                });
    
            }, null, this); 
        }
        
        this.pressText = this.add.bitmapText(w-50, 50, 'gem', `SPACE TO RESTART`, 40).setOrigin(1, 0).setTint(0x00FF00).setAlpha(0)
        this.escText = this.add.bitmapText(50, 50, 'gem', `ESC TO TITLE`, 40).setTint(0x00FF00).setAlpha(0)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        
        // reset game settings
        gameWon = false
        lives = 3
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