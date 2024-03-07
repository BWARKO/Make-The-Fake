class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log('Title Screen')
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.5,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            this.bgm.setVolume(0.03)
            this.bgm.setRate(1)
            this.scene.start('playScene')
        }
    }
}