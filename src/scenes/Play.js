class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        console.log('Play Scene')
        const bg1 = this.add.image(0, -430, 'bg').setScale(5).setOrigin(0)
        const bg2 = this.add.image(bg1.width*5, -430, 'bg').setScale(5).setOrigin(0)

        // create map
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        // spawns
        const playerSpawn = map.findObject('spawn', (obj) => obj.name === 'playerSpawn')

        const fireSpawn1 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn1')
        const fireSpawn2 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn2')
        const fireSpawn3 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn3')

        const beeSpawn = map.findObject('spawn', (obj) => obj.name === 'beeSpawn')

        // triggers
        const beeTriggerProperties = map.findObject('trigger', (obj) => obj.name === 'beeTrigger')

        // add player
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player').setOrigin(0.5, 1)

        // spawned objects
        this.bombs = this.physics.add.group([])

        this.sun = this.add.sprite(playerSpawn.x - 60, playerSpawn.y - 225, 'sun').setScale(5).setOrigin(0.5)
        this.sun.anims.play('sunshine')

        this.fire1 = new Fire(this, fireSpawn1.x, fireSpawn1.y, 'fire')
        this.fire2 = new Fire(this, fireSpawn2.x, fireSpawn2.y, 'fire')
        this.fire3 = new Fire(this, fireSpawn3.x, fireSpawn3.y, 'fire')
        this.fires = this.physics.add.group([this.fire1, this.fire2, this.fire3])

        this.bee = new Bee(this, beeSpawn.x, beeSpawn.y, 'bee')

        // trigger objects
        this.beeTrigger = this.add.rectangle(beeTriggerProperties.x, beeTriggerProperties.y, beeTriggerProperties.width, beeTriggerProperties.height, 0x00000).setOrigin(0.5, 0).setAlpha(0)
        this.physics.add.existing(this.beeTrigger)
        this.beeTrigger.body.setImmovable()

        // add layers
        const groundLayer = map.createLayer('ground', tileset)

        // layers collide
        groundLayer.setCollisionByProperty({collides: true})

        // update camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 150)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1).setFollowOffset(0, 150)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 150)

        // colliders

        // player
        this.physics.add.collider(this.player, groundLayer, () => {
            if (this.player.body.blocked.down && !this.player.jump) {
                this.player.stepSFX.play()
                this.player.jump = true
            } 
        })
        this.physics.add.collider(this.player, this.fires, () => {
            this.gameover = true
        })
        this.physics.add.collider(this.player, this.bee, () => {
            if (this.player.anims.currentAnim.key === 'player-kick') {
                this.bee.death()
            } else {
                this.gameover = true
            }
        })
        this.physics.add.collider(this.player, this.bombs, () => {
            this.gameover = true
        })

        // creatures/objects
        this.physics.add.collider(this.bombs, groundLayer)

        this.physics.add.collider(this.bee, groundLayer)
        this.physics.add.collider(this.bee, this.bombs, (bee, bomb) => {
            bee.death()
            bomb.explosion()

            this.beeTrigger.destroy()
            this.player.canMove = true
        })

        // event colliders
        this.physics.add.collider(this.player, this.beeTrigger, () => {
            this.player.canMove = false

            this.bee.body.setVelocityX(-200)
            this.bee.anims.play('bee-walk')
        })
        this.physics.add.collider(this.bee, this.beeTrigger, () => {
            this.bee.anims.play('bee-idle')
            this.bee.body.setVelocity(0)
            this.beeTrigger.destroy()

            this.player.canMove = true
        })


        this.physics.world.drawDebug = false
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        this.gameover = false

        cursors = this.input.keyboard.createCursorKeys()
        attackKey = this.input.keyboard.addKey('E')
        throwKey = this.input.keyboard.addKey('R')

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

        // check for gameover
        if (this.gameover) {
            this.bgm.stop()
            this.scene.start('gameoverScene')
        }

    }
}