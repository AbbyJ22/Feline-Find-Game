class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
        this.load.image('mainbg', 'assets/mainbg.png');
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

       
        this.add.text(config.width / 2, config.height / 3, 'Feline Find Game', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Start', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        playButton.setInteractive();

       
        playButton.on('pointerover', () => {
            playButton.setScale(1.2); 
        });

        
        playButton.on('pointerout', () => {
            playButton.setScale(1); 
        });

        
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }

    update() {
        
        this.bg.tilePositionX += 1; 
    }
}



class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('fence', 'assets/fence.png');
        this.load.spritesheet('mcIdle', 'assets/sprites/mcIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        const bg = this.add.image(0, 0, 'fence').setOrigin(0);
        bg.setDisplaySize(1372, 453);

        this.anims.create({
        key: 'Idle',
        frames: this.anims.generateFrameNumbers('mcIdle', { start: 0, end: 2 }), 
        frameRate: 2, 
        repeat: -1 
    });

        this.mcIdle = this.add.sprite(300, 100, 'mcIdle'); 
        this.mcIdle.setScale(4);
        this.mcIdle.setOrigin(0.5, 0.5);


        this.mcIdle.anims.play('Idle');
    }
}


const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene],
    pixelArt: true,
};


const game = new Phaser.Game(config);
