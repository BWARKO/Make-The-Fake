class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        // insure no lasting UI or sound
        this.scene.stop('uiScene')
        this.sound.stopAll()
        
        this.add.image(w/2, h/2, 'title').setScale(6)
        this.pressText = this.add.bitmapText(w/2, h-50, 'gem', `PRESS SPACE`, 60).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.3,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play()

        this.ping = this.sound.add('ping', { 
            mute: false,
            volume: 0.25,
            rate: 2,
        });

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
            this.bgm.stop()
            this.scene.start('playScene')
        }
    }
}