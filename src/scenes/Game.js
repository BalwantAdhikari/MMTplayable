import Phaser from '../lib/Phaser.js'

import Align from '../lib/util/align.js'

export default class Game extends Phaser.Scene{

    count = 0
    canSpin = true

    constructor()
    {
        super('game')
    }

    preload()
    {
    }

    create()
    {
        this.tickSound = this.sound.add('tickSound', {
            volume: 1
        })

        this.applaudeSound = this.sound.add('applaude', {
            volume: 0.2
        })
        this.background = this.add.image(this.scale.width/2, this.scale.height/2, 'background').setScale(1)
        this.wheelReflection = this.add.image(this.scale.width/2, this.scale.height/2, 'wheel-reflection')
        Align.scaleToGameW(this.wheelReflection, 1.5)
        this.logo = this.add.image(this.scale.width/2, this.scale.height/14, 'logo')
        Align.scaleToGameW(this.logo, 0.3)
        this.headerText = this.add.image(this.scale.width/2, this.scale.height/6, 'header-text')
        Align.scaleToGameW(this.headerText, 0.75)
        this.playButton = this.add.image(this.scale.width/2, this.scale.height - (this.scale.height/11), 'play-button')
        Align.scaleToGameW(this.playButton, 0.5)
        this.wheel = this.add.image(this.scale.width/2, this.scale.height/2, 'wheelCenter').setOrigin(0.5)
        Align.scaleToGameW(this.wheel, 0.9)
        this.wheelRing = this.add.image(this.scale.width/2, this.scale.height/2, 'wheelRing').setOrigin(0.5)
        Align.scaleToGameW(this.wheelRing, 0.9)
        this.endText = this.add.image(this.scale.width/2, this.scale.height/2, 'endText')
        Align.scaleToGameW(this.endText, 0.7)
        this.endText.setVisible(false)
        this.downloadButton = this.add.image(this.scale.width/2, this.scale.height - (this.scale.height/3), 'download-button')
        Align.scaleToGameW(this.downloadButton, 0.65)
        this.downloadButton.setVisible(false)
        this.endCoin = this.add.image(this.scale.width/2, this.scale.height/2, 'endCoin')
        Align.scaleToGameW(this.endCoin, 1)
        this.endCoin.setVisible(false)

        this.emitter0 = this.add.particles('spark0').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            active: false,
            lifespan: 1000,
            gravityY: 800
        });
    
        this.emitter1 = this.add.particles('spark1').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD',
            active: false,
            lifespan: 1000,
            gravityY: 800
        });

        this.coinEmitter = this.add.particles('coin1').createEmitter({
            x: this.scale.width/2,
            y: this.scale.height/2,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD',
            active: false,
            lifespan: 3000,
            gravityY: 400
        });

        var shape1 = new Phaser.Geom.Circle(0, 0, this.scale.width*0.84/2);
        this.emitter = this.add.particles('spark0').createEmitter({
            x: this.scale.width/2,
            y: this.scale.height/2,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            radial: true,
            delay: 10,
            // radial: true,
            angle: { min: 0, max: 360 },
            emitZone: { type: 'edge', source: shape1, quantity: 27, yoyo: false}
        });

        this.wheelRef1 = this.tweens.add({
            targets: this.wheelReflection,
            angle: 360,
            loop: -1,  
            duration: 2000,
        });

        this.stopper = this.add.image(this.scale.width/2, this.scale.height/2 - this.wheel.height * this.wheel.scale/2, 'stopper').setOrigin(0.5, 0.1)
        Align.scaleToGameW(this.stopper, 1)

        this.playButton.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            if(this.canSpin)
            {
                this.count = 0

                // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
                const degrees = 95;

                // now the wheel cannot spin because it's already spinning
                this.canSpin = false;
                
                this.tweens.add({
                    targets: this.wheel,
                    angle: 360 * 4 + degrees,
                    onUpdate: tween => {

                        this.count += 1
                        
                        if(this.count > 0 && this.count < 41)
                        {
                            if(this.count % 20 == 0)
                            {
                                this.tickSound.play()
                            }
                        }
                        else if(this.count < 150)
                        {
                            if(this.count % 3 == 0)
                            {
                                this.tickSound.play()
                            }
                        }

                    },
                    onComplete: tween => {

                            this.applaudeSound.play()

                            this.time.delayedCall(700, () => {
                                this.emitter.stop()
                            }, [], this)

                            this.time.delayedCall(1500, () => {
                                this.wheelRef1.stop()
                                this.wheel.setVisible(false)
                                this.wheelRing.setVisible(false)
                                this.stopper.setVisible(false)
                                this.headerText.setVisible(false)
                                this.playButton.setVisible(false)
                                this.endText.setVisible(true)
                                this.downloadButton.setVisible(true)
                                this.downloadButton.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                                    FbPlayableAd.onCTAClick()
                                }, this);

                                this.time.delayedCall(500, () => {
                                    this.emitter0.resume()
                                    this.emitter1.resume()

                                    for(let j=0; j<20; j++)
                                    {
                                        this.emitter0.setPosition(this.scale.width/2, this.scale.height/2);
                                        this.emitter1.setPosition(this.scale.width/2, this.scale.height/2);
                                        for(let i=0; i<20; i++)
                                        {
                                            this.emitter0.explode();
                                            this.emitter1.explode();
                                        }
                                    }   
                                }, [], this)

                            }, [], this)
                    },
                    duration: 3000,
                    ease: 'Cubic.Out'
                });

            }
        }, this);
        
        
    }

    update()
    {
    }

}