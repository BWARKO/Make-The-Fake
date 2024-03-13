class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0x00FF00, 1)               // (color, alpha)
            loadingBar.fillRect(0, h/2, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        this.load.image('title', 'sprites/title.png')

        this.load.spritesheet('player', 'sprites/playerAtlas.png', {
            frameWidth: 18,
            frameHeight: 23
        })
        this.load.spritesheet('sun', 'sprites/sun.png', {
            frameWidth: 34,
            frameHeight: 34
        })
        this.load.spritesheet('fire', 'sprites/fire.png', {
            frameWidth: 41,
            frameHeight: 34
        })

        // map        
        this.load.image('tilesetImage', 'map/gs-tilemap.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map/gs-map.json')

        this.load.image('bg', 'sprites/background.png')

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
        this.anims.create({
            key: 'player-idle',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2})
        })
        this.anims.create({
            key: 'player-right',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 3})
        })
        this.anims.create({
            key: 'player-left',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 7, end: 6})
        })
        this.anims.create({
            key: 'player-jump-right',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { frames: [
                9, 10, 10, 10, 10
            ]})         
        })
        this.anims.create({
            key: 'player-jump-left',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { frames: [
                12, 13, 13, 13, 13
            ]})
        }) 
        this.anims.create({
            key: 'player-jump',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { frames: [
                15, 16, 16, 16, 16
            ]})
        })

        this.anims.create({
            key: 'sunshine',
            frameRate:4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('sun', {start: 0, end: 1})
        })

        this.anims.create({
            key: 'burn',
            frameRate:4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fire', {start: 0, end: 1})
        })

        // go to Title scene
        this.scene.start('titleScene')
    }
}