class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, h/2, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        // this.load.spritesheet('heart', 'sprites/heart.png', {
        //     frameWidth: 24,
        //     frameHeight: 24
        // })

        this.load.image('player', 'sprites/player.png')
        this.load.image('bg', '')

        // load audio assets
        this.load.audio('bgm', 'audios/bgm.wav')
        this.load.audio('walk', 'audios/walk.wav')
        this.load.audio('blast', 'audios/blast.wav')
        this.load.audio('death', 'audios/death.wav')
        this.load.audio('ping', 'audios/ping.wav')
        this.load.audio('heal', 'audios/heal.wav')

        // load font
        this.load.bitmapFont('gem', 'fonts/gem.png', 'fonts/gem.xml')

    }

    create() {
        // create anims
        // this.anims.create({
        // })

        // go to Title scene
        this.scene.start('titleScene')
    }
}