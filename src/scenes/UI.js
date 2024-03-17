class UI extends Phaser.Scene {
    constructor() {
        super('uiScene')
    }

    create() {
        this.scoreDiff = 0

        this.background = this.add.rectangle(0, 0, w, h/6.4, 0x00340e).setOrigin(0)
        this.bottomLine = this.add.rectangle(this.background.x, this.background.y+this.background.height, this.background.width, 5, 0x00FF00).setOrigin(0, 1)
        this.leftLine = this.add.rectangle(this.background.width/3, this.background.y, 5, this.background.height, 0x00FF00).setOrigin(0.5, 0)
        this.rightLine = this.add.rectangle(this.background.width*2/3, this.background.y, 5, this.background.height, 0x00FF00).setOrigin(0.5, 0)

        this.scoreText = this.add.bitmapText(this.background.width/2, this.background.height/2, 'gem', score, 70).setOrigin(0.5).setTint(0x00FF00)
        
        this.life1 = this.add.image((this.background.width*1/12), this.background.height/2, 'life').setScale(5)
        this.life2 = this.add.image((this.background.width*2/12), this.background.height/2, 'life').setScale(5)
        this.life3 = this.add.image((this.background.width*3/12), this.background.height/2, 'life').setScale(5)

        this.bomb1 = this.add.image((this.background.width*9/12), this.background.height/2, 'bomba').setScale(5)



    }

    update() {
        if (this.scoreText.text != score) {
            this.scoreText.text = score
        }

        if (lives == 2 && this.life3.alpha == 1) {
            this.life3.setAlpha(0)
        } else if (lives == 1 && this.life2.alpha == 1) {
            this.life3.setAlpha(0)
            this.life2.setAlpha(0)
        } else if (lives == 0 && this.life1.alpha == 1) {
            this.life3.setAlpha(0)
            this.life2.setAlpha(0)
            this.life1.setAlpha(0)
        }

        if (bombs == 0) {
            this.bomb1.setAlpha(0)
        }
    }
}