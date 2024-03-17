class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // insure no lasting UI or sound
        this.scene.stop('uiScene')
        this.sound.stopAll()

        // reset scene vars
        score = 0
        bombs = 1
        this.gameover = false

        // var(s)
        this.timer

        // backgrounds
        const bg1 = this.add.image(0, -430, 'bg').setScale(5).setOrigin(0)
        const bg2 = this.add.image(bg1.width*5, -430, 'bg').setScale(5).setOrigin(0)
        const bg3 = this.add.image(bg1.width*5 + bg2.width*5, -430, 'bg').setScale(5).setOrigin(0)

        // create map
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        this.map = map // for reference

            // spawns
        const playerSpawn = map.findObject('spawn', (obj) => obj.name === 'playerSpawn')

        const coinSpawn1 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn1')
        const coinSpawn2 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn2')
        const coinSpawn3 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn3')
        const coinSpawn4 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn4')
        const coinSpawn5 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn5')
        const coinSpawn6 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn6')
        const coinSpawn7 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn7')
        const coinSpawn8 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn8')
        const coinSpawn9 = map.findObject('spawn', (obj) => obj.name === 'coinSpawn9')

        const fireSpawn1 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn1')
        const fireSpawn2 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn2')
        const fireSpawn3 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn3')
        const fireSpawn4 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn4')
        const fireSpawn5 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn5')
        const fireSpawn6 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn6')
        const fireSpawn7 = map.findObject('spawn', (obj) => obj.name === 'fireSpawn7')

        const beeSpawn = map.findObject('spawn', (obj) => obj.name === 'beeSpawn')
        const dripSpawn = map.findObject('spawn', (obj) => obj.name === 'dripSpawn')
        const frogSpawn = map.findObject('spawn', (obj) => obj.name === 'frogSpawn')


            // triggers
        const beeTriggerProperties = map.findObject('trigger', (obj) => obj.name === 'beeTrigger')
        const honeyTriggerProperties = map.findObject('trigger', (obj) => obj.name === 'honeyTrigger')
        const frogTriggerProperties = map.findObject('trigger', (obj) => obj.name === 'frogTrigger')

            // add player
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player').setOrigin(0.5, 1)

            // spawned objects
        this.bombs = this.physics.add.group([])
        this.projectiles = this.physics.add.group([])

        this.coin1 = new Coin(this, coinSpawn1.x, coinSpawn1.y, 'coin')
        this.coin2 = new Coin(this, coinSpawn2.x, coinSpawn2.y, 'coin')
        this.coin3 = new Coin(this, coinSpawn3.x, coinSpawn3.y, 'coin')
        this.coin4 = new Coin(this, coinSpawn4.x, coinSpawn4.y, 'coin')
        this.coin5 = new Coin(this, coinSpawn5.x, coinSpawn5.y, 'coin')
        this.coin6 = new Coin(this, coinSpawn6.x, coinSpawn6.y, 'coin')
        this.coin7 = new Coin(this, coinSpawn7.x, coinSpawn7.y, 'coin')
        this.coin8 = new Coin(this, coinSpawn8.x, coinSpawn8.y, 'coin')
        this.coin9 = new Coin(this, coinSpawn9.x, coinSpawn9.y, 'coin')
        this.coins = this.physics.add.group([this.coin1, this.coin2, this.coin3, this.coin4, this.coin5, this.coin6, this.coin7, this.coin8, this.coin9,])


        this.sun = this.add.sprite(playerSpawn.x - 60, playerSpawn.y - 225, 'sun').setScale(5).setOrigin(0.5)
        this.sun.anims.play('sunshine')

        this.fire1 = new Fire(this, fireSpawn1.x, fireSpawn1.y, 'fire')
        this.fire2 = new Fire(this, fireSpawn2.x, fireSpawn2.y, 'fire')
        this.fire3 = new Fire(this, fireSpawn3.x, fireSpawn3.y, 'fire')
        this.fire4 = new Fire(this, fireSpawn4.x, fireSpawn4.y, 'fire')
        this.fire5 = new Fire(this, fireSpawn5.x, fireSpawn5.y, 'fire')
        this.fire6 = new Fire(this, fireSpawn6.x, fireSpawn6.y, 'fire')
        this.fire7 = new Fire(this, fireSpawn7.x, fireSpawn7.y, 'fire')
        this.fires = this.physics.add.group([this.fire1, this.fire2, this.fire3, this.fire4, this.fire5, this.fire6, this.fire7])

        this.bee = new Bee(this, beeSpawn.x, beeSpawn.y, 'bee')
        this.honey = new Honey(this, dripSpawn.x, dripSpawn.y + 100, 'honeybee')
        this.frog = new Frog(this, frogSpawn.x, frogSpawn.y, 'frog')

        this.drip = this.add.sprite(dripSpawn.x, dripSpawn.y, 'drip').setScale(5).setOrigin(0.5)

            // trigger objects
        this.beeTrigger = this.add.rectangle(beeTriggerProperties.x, beeTriggerProperties.y, beeTriggerProperties.width, beeTriggerProperties.height, 0x00000).setOrigin(0.5, 0).setAlpha(0)
        this.physics.add.existing(this.beeTrigger)
        this.beeTrigger.body.setImmovable()

        this.honeyTrigger = this.add.rectangle(honeyTriggerProperties.x, honeyTriggerProperties.y, honeyTriggerProperties.width, honeyTriggerProperties.height, 0x00000).setOrigin(0.5, 0).setAlpha(0)
        this.physics.add.existing(this.honeyTrigger)
        this.honeyTrigger.body.setImmovable()

        this.frogTrigger = this.add.rectangle(frogTriggerProperties.x, frogTriggerProperties.y, frogTriggerProperties.width, frogTriggerProperties.height, 0x00000).setOrigin(0.5, 0).setAlpha(0)
        this.physics.add.existing(this.frogTrigger)
        this.frogTrigger.body.setImmovable()

            // add map layer(s)
        const groundLayer = map.createLayer('ground', tileset)

        // create UI
        this.scene.launch('uiScene')

        // layers collide
        groundLayer.setCollisionByProperty({collides: true})

        // update camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels - 800)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1).setFollowOffset(0, 250)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // colliders

            // player
        this.physics.add.collider(this.player, groundLayer, () => {
            if (this.player.body.blocked.down && !this.player.jump) {
                this.player.stepSFX.play()
                this.player.jump = true
                this.player.kick = true
            } 
        })
        this.physics.add.overlap(this.player, this.coins, (p, coin) => {
            coin.pickup()
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
        this.physics.add.collider(this.player, this.honey, () => {
            if (this.player.anims.currentAnim.key === 'player-kick') {
                this.honey.death()
            } else {
                this.gameover = true
            }
        })
        this.physics.add.collider(this.player, this.bombs, (p, bomb) => {
            bomb.explosion()
            this.gameover = true
        })
        this.physics.add.collider(this.player, this.projectiles, (p, projectile) => {
            projectile.body.destroy()

            projectile.anims.play('coin-explosion')
            this.time.delayedCall(500, () => {
                projectile.destroy()

            }, null, this); 

            if (this.player.anims.currentAnim.key !== 'player-kick') {
                this.gameover = true
            } 
        })

            // creatures/objects
        this.physics.add.collider(this.bombs, groundLayer)
        this.physics.add.collider(this.projectiles, groundLayer, (projectile, ground) => {
            projectile.destroy()
        })

        this.physics.add.collider(this.bee, groundLayer)
        this.physics.add.overlap(this.bee, this.bombs, (bee, bomb) => {
            bee.death()
            bomb.explosion()

            this.beeTrigger.destroy()
            this.player.canMove = true
        })

        this.physics.add.collider(this.honey, groundLayer)
        this.physics.add.overlap(this.honey, this.bombs, (bee, bomb) => {
            this.honey.death()
            bomb.explosion()

            this.honeyTrigger.destroy()
            this.player.canMove = true
        })

        this.physics.add.collider(this.frog, groundLayer)
        this.physics.add.overlap(this.frog, this.bombs, (frog, bomb) => {
            this.frog.death()
            bomb.explosion()

            this.frogTrigger.destroy()
            this.player.canMove = true

            gameWon = true
        })

        this.physics.add.collider(this.bombs, this.projectiles, (bomb, projectile) => {
            bomb.explosion()

            projectile.body.destroy()

            projectile.anims.play('coin-explosion')
            this.time.delayedCall(500, () => {
                projectile.destroy()

            }, null, this); 
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
            this.bee.attack()
            this.beeTrigger.destroy()

            this.player.canMove = true
        })

        this.physics.add.collider(this.player, this.honeyTrigger, () => {
            this.player.canMove = false
            this.honeyTrigger.destroy()
            
            this.honey.build()
        })

        this.physics.add.collider(this.player, this.frogTrigger, () => {
            this.player.canMove = false
            this.frogTrigger.destroy()

            this.scene.stop('uiScene')
            this.cameras.main.startFollow(this.frog)
            this.cameras.main.setZoom(2)
            this.cameras.main.setFollowOffset(0)

            this.frog.attack()
        })


        this.physics.world.drawDebug = false
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

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
            this.player.setAlpha(0)
            this.player.body.destroy()
            this.time.delayedCall(1750, () => {
                if(!lives) {
                    this.scene.start('gameoverScene')
                } else {
                    this.scene.restart()                   
                    lives -= 1
                }
            }, null, this); 
        } else if (gameWon) {
            this.time.delayedCall(1750, () => {
                this.scene.start('gameoverScene')

            }, null, this);
        }

        // check camera to lower
        if (this.player.x > this.honeyTrigger.x) {
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels - 300)
        } else {
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels - 800)
        }

    }
}