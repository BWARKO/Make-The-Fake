class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')

        // CNSTS
        this.CREDITS = 'INSPO: ADVENTURE TIME S2 E16\n        (HIDDEN LINK BELOW)\n\nSOUND: FREESOUND.ORG\n\nFONT: NATHAN ALTICE(but actually phaser)\n\nEVERYTHING ELSE: BLAKE WARKENTON'
        this.CONTROLS = 'E - KICK\n\nQ - THROW BOMB\n\nSPACE - JUMP\n\nWASD/ARROWS - MOVE\n\n'
    }

    create() {
        // insure no lasting UI or sound
        this.scene.stop('uiScene')
        this.sound.stopAll()

        this.fade = false
        this.transitioning = false
        this.credits = false
        this.controls = false

        this.playScene
        
        this.background = this.add.rectangle(0,0,w,h, 0x000000).setScale(5)
        this.titleImage = this.add.image(w/2, h/2, 'title').setScale(6,8)
        this.pressText = this.add.bitmapText(this.titleImage.width*6-20, this.titleImage.height*8-20, 'gem', `PRESS SPACE`, 40).setOrigin(1).setTint(0x00FF00).setAlpha(0)

        this.spaceText = this.add.bitmapText(w-50, h-50, 'gem', `SPACE TO CONTINUE`, 40).setTint(0x00FF00).setOrigin(1).setAlpha(0)

        // credits
        this.creditsTitle = this.add.bitmapText(w/2, h/6, 'gem', 'CREDITS', 120).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)
        this.creditsText = this.add.bitmapText(w/2, h*7/12, 'gem', this.CREDITS, 60).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)

        // controls
        this.controlsTitle = this.add.bitmapText(w/2, h/6, 'gem', 'CONTROLS', 120).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)
        this.controlsText = this.add.bitmapText(w/2, h*7/12, 'gem', this.CONTROLS, 60).setOrigin(0.5).setTint(0x00FF00).setAlpha(0)



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
        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            if (!this.transitioning) {
                this.timer.remove()

                this.transitioning = true

                this.titleImage.destroy()
                this.pressText.destroy()
                
                this.timer = this.time.delayedCall(750, () => {
                    this.spaceText.setAlpha(1)
                    this.creditsTitle.setAlpha(1)
                    this.creditsText.setAlpha(1)
                }, null, this); 
            } else {
                if (!this.credits) {
                    this.credits = true
                    this.creditsTitle.destroy()
                    this.creditsText.destroy()
                    
                    this.controlsTitle.setAlpha(1)
                    this.controlsText.setAlpha(1)
                } else if (!this.controls) {
                    this.controls = true
                    this.controlsTitle.destroy()
                    this.controlsText.destroy()
                    this.spaceText.destroy()
    
                    this.bgm.stop()
                    this.scene.launch('playScene')
                    this.playScene = this.scene.get('playScene')
                    this.scene.bringToTop(this)
    
                    this.fade = true
                }
            }
        } 

        if (this.fade) {
            this.timer.remove()
            this.levelText = this.add.bitmapText(w/2, h/2, 'gem', 'LEVEL - 1', 60).setOrigin(0.5).setTint(0x00FF00) 

            this.background.alpha -= 0.01

            if (this.background.alpha  <= 0) {
                this.playScene.player.canMove = true
                this.scene.stop(this)
            }
        } else if (this.playScene) {
            if (this.playScene.player) {
                this.playScene.player.canMove = false
            }
        }

    }
}