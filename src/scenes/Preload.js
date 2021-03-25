import Phaser from '../lib/Phaser.js'

export default class Preload extends Phaser.Scene{

    constructor()
    {
        super('preload')
    }

    preload()
    {
        this.width = this.scale.width
        this.height = this.scale.height
        this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(this.scale.width/4, this.scale.height/2, this.scale.width/2, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(this.scale.width/4 + 15, this.scale.height/2 + 5, this.scale.width/2 - 30, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		var loadingText = this.add.text(this.scale.width/4 , this.scale.height/2 + 60,"Loading: ", { fontSize: '32px', fill: '#FFF' });

        this.load.image('background', 'assets/Background.png')
        this.load.image('logo', 'assets/Logo.png')
        this.load.image('wheel-reflection', 'assets/Wheel_Reflection.png')
        this.load.image('header-text', 'assets/first-frame.png')
        this.load.image('play-button', 'assets/Play_Button.png')
        this.load.image('wheel', 'assets/wheel.png')
        this.load.image('stopper', 'assets/Wheel_Stoper.png')
        this.load.image('endText', 'assets/end-text2.png')
        this.load.image('download-button', 'assets/download_button.png')
        this.load.audio('tickSound', 'assets/ding.mp3')
        this.load.audio('applaude', 'assets/applaude.mp3')
        this.load.image('spark0', 'assets/blue.png')
        this.load.image('spark1', 'assets/red.png')
        this.load.image('wheelRing', 'assets/ring.png')
        this.load.image('wheelCenter', 'assets/wheel.png')

        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText, width:this.width, height:this.height});
		this.load.on('complete', this.complete, {scene:this.scene});

	}

	updateBar(percentage) {
		this.newGraphics.clear();
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.width/4 + 15, this.height/2 + 5, percentage*(this.width/2 - 30), 40));
                
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(0) + "%");
        console.log("P:" + percentage);
	}

	complete() {
		console.log("COMPLETE!");
        this.scene.start('game')
	}
    

    create()
    {
       
    }

}