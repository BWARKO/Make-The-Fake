class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        console.log('Play Scene')
        this.add.image(0, -430, 'bg').setScale(5).setOrigin(0)

        // create map
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        // spawns
        const playerSpawn = map.findObject('spawn', (obj) => obj.name === 'playerSpawn')
        const fireSpawn1 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn1')

        // add player
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player').setOrigin(0.5, 1)

        // spawned objects
        this.sun = this.add.sprite(playerSpawn.x - 60, playerSpawn.y - 225, 'sun').setScale(5).setOrigin(0.5)
        this.sun.anims.play('sunshine')

        this.fire1 = new Fire(this, fireSpawn1.x, fireSpawn1.y, 'fire')
        this.fires = this.add.group([this.fire1, ])

        // add layers
        const roofLayer = map.createLayer('roof', tileset)
        const floorLayer = map.createLayer('floor', tileset)

        // layers collide
        floorLayer.setCollisionByProperty({collides: true})
        roofLayer.setCollisionByProperty({collides: true})

        // update camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 150)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1).setFollowOffset(0, 150)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 150)

        // colliders
        this.physics.add.collider(this.player, floorLayer, () => {
            if (!this.player.jump) {
                this.player.stepSFX.play()
                this.player.jump = true
            }
        })
        this.physics.add.collider(this.player, roofLayer)

        this.physics.add.collider(this.player, this.fires, () => {
            this.bgm.stop()
            this.scene.start('gameoverScene')
        })

        this.physics.world.drawDebug = false
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // temp to get to game over screen
        this.input.keyboard.on('keydown-R', function() {
            this.bgm.stop()
            this.scene.start('gameoverScene')
        }, this)

        cursors = this.input.keyboard.createCursorKeys()

        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.05,
            rate: 1,
            loop: true 
        });
        this.bgm.play()
    }

    update() {
        // run player
        this.player.update()
    }
}