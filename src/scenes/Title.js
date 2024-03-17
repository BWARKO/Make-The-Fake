class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')

        // CNSTS
        this.CREDITS = 'INSPO: ADVENTURE TIME(S2 E16)\n\nSOUNDS: FREESOUND.ORG\n\nFONT: PHASER DOCUMENTATION\n\nEVERYTHING ELSE: BLAKE WARKENTON'
    }

    create() {
        // insure no lasting UI or sound
        this.scene.stop('uiScene')
        this.sound.stopAll()

        this.fade = false
        this.transitioning = false

        this.playScene
        
        this.background = this.add.rectangle(0,0,w,h, 0x000000).setScale(5)
        this.titleImage = this.add.image(w/2, h/2, 'title').setScale(6,8)
        this.pressText = this.add.bitmapText(this.titleImage.width*6-20, this.titleImage.height*8-20, 'gem', `PRESS SPACE`, 40).setOrigin(1).setTint(0x00FF00).setAlpha(0)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.05,
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
        if (Phaser.Input.Keyboard.JustDown(spaceKey) && !this.transitioning) {
            this.timer.remove()

            this.bgm.stop()
            this.scene.launch('playScene')
            this.playScene = this.scene.get('playScene')
            this.scene.bringToTop(this)

            this.transitioning = true

            this.titleImage.destroy()
            this.pressText.destroy()
            
            this.timer = this.time.delayedCall(750, () => {
                this.escText = this.add.bitmapText(w-50, h-50, 'gem', `ESC TO SKIP`, 40).setTint(0x00FF00).setOrigin(1)


                this.creditsTitle = this.add.bitmapText(w/2, h/6, 'gem', 'CREDITS', 120).setOrigin(0.5).setTint(0x00FF00)
                this.creditsText = this.add.bitmapText(w/2, h*7/12, 'gem', this.CREDITS, 60).setOrigin(0.5).setTint(0x00FF00)

                this.timer = this.time.delayedCall(5000, () => {
                    this.creditsTitle.destroy()
                    this.creditsText.destroy()

                    this.controlsTitle = this.add.bitmapText(w/2, h/6, 'gem', 'CONTROLS', 120).setOrigin(0.5).setTint(0x00FF00)
                    this.controlsText = this.add.bitmapText(w/2, h*7/12, 'gem', 'E - KICK\n\nQ - THROW BOMB\n\nSPACE - JUMP\n\nWASD/ARROWS - MOVE\n\n', 60).setOrigin(0.5).setTint(0x00FF00)

                    this.timer = this.time.delayedCall(5000, () => {  
                        this.controlsTitle.destroy()
                        this.controlsText.destroy()
                        this.escText.destroy()

                        this.levelText = this.add.bitmapText(w/2, h/2, 'gem', 'LEVEL - 1', 60).setOrigin(0.5).setTint(0x00FF00)
                        this.fade = true           
                    }, null, this);
                }, null, this); 
            }, null, this); 
        }

        if (this.fade) {
           
            this.background.alpha -= 0.01

            if (this.background.alpha  <= 0) {
                this.playScene.player.canMove = true
                this.scene.stop(this)
            }
        } else if (this.transitioning && Phaser.Input.Keyboard.JustDown(escKey)) {
            this.playScene.player.canMove = true
            this.scene.stop(this)
        } else if (this.playScene) {
            if (this.playScene.player) {
                this.playScene.player.canMove = false
            }
        }
    }
}