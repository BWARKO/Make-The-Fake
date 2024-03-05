class Gameover extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        console.log('Gameover scene')
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

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