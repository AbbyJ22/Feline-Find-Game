// Make sure the config object is defined before using it.
const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene],  // Array of scene classes
    pixelArt: true,
};

class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
        this.load.image('mainbg', 'assets/mainbg.png');
    }

    create() {
        // Background
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

        // Title text
        this.add.text(config.width / 2, config.height / 3, 'Feline Find', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        // Play button
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Start', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        playButton.setInteractive();

        // Play button interactions
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
        this.bg.tilePositionX += 1;  // Moving the background
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
        this.load.spritesheet('mcwalk', 'assets/sprites/mcwalk.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        // Background
        const bg = this.add.image(0, 0, 'fence').setOrigin(0);
        bg.setDisplaySize(1372, 453);

        // Create animations
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNumbers('mcIdle', { start: 0, end: 2 }), 
            frameRate: 2, 
            repeat: -1 
        });
        this.anims.create({
            key: 'Walk',
            frames: this.anims.generateFrameNumbers('mcwalk', { start: 0, end: 4 }), 
            frameRate: 4, 
            repeat: -1 
        });

        // Main character sprite
        this.mcIdle = this.add.sprite(328.5, 350, 'mcIdle'); 
        this.mcIdle.setScale(4);
        this.mcIdle.setOrigin(0.5, 0.5);
        this.mcIdle.anims.play('Idle');

        // Display text with a delay
        this.time.delayedCall(1000, () => {
            this.showText("Hello there! You must be new in the neighborhood, right?", [
                { label: "Yes, just moved in!", action: () => console.log("New...") },
                { label: "I'm just passing through.", action: () => console.log("Passing...") }
            ]);
        });
    }

    showText(text, options) {
        // Create a textbox background
        const textbox = this.add.graphics();
        textbox.fillStyle(0xE5AA70, 1);  // Brown color for the textbox
        textbox.fillRect(50, 280, 557, 100);  // x, y, width, height

        const textStyle = {
            fontFamily: 'TextFont',
            fontSize: '18px',
            color: '#FFFFFF', // White text
            wordWrap: { width: 530, useAdvancedWrap: true }, // Wrap text inside the box
        };
        this.add.text(70, 290, text, textStyle);

        // Add option buttons
        options.forEach((option, index) => {
            const optionBox = this.add.graphics();
            optionBox.fillStyle(0xE5AA70, 1);
            optionBox.fillRect(70, 400 + index * 40, 500, 30); // x, y, width, height

            // Option text (clickable)
            const optionText = this.add.text(80, 405 + index * 40, option.label, {
                fontFamily: 'TextFont',
                fontSize: '16px',
                color: '#FFFFFF', // White text
            }).setInteractive();

            // Hover interactions
            optionText.on('pointerover', () => {
                optionText.setStyle({ color: '#D3D3D3' }); // Change color on hover
            });

            optionText.on('pointerout', () => {
                optionText.setStyle({ color: '#FFFFFF' }); // Reset color on hover out
            });

            // Option click interaction
            optionText.on('pointerdown', () => {
                option.action();
                optionText.setAlpha(0); // Optionally hide the text after click
                optionBox.clear(); // Clear the option box (background)
            });
        });
    }
}

// Now initialize the Phaser game
const game = new Phaser.Game(config);

