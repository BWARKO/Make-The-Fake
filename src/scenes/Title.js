class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log('Title Screen')
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            this.scene.start('playScene')
        }
    }
}