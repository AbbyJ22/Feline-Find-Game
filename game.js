const config = {
    type: Phaser.AUTO,
    width: 657, // Canvas width
    height: 453, // Canvas height
    parent: 'game-container',
    scene: [StartMenuScene, GameScene], // Add both scenes here
    pixelArt: true,
};

const game = new Phaser.Game(config);

// Start Menu Scene
class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
        // Load assets for the start menu, if any
    }

    create() {
        // Add a title
        this.add.text(config.width / 2, config.height / 3, 'My Game', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#fff',
        }).setOrigin(0.5);

        // Add a "Play" button
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Play', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#0f0',
        }).setOrigin(0.5);

        // Make the button interactive
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Start the game scene when clicked
        });
    }
}

// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load assets for the game
        this.load.image('fence', 'assets/fence.png');
    }

    create() {
        // Add the background image
        const bg = this.add.image(0, 0, 'fence').setOrigin(0);

        // Scale the background to fit the game world
        const displayWidth = 1372;
        const displayHeight = 453;
        bg.setDisplaySize(displayWidth, displayHeight);
    }

    update() {
        // Add game logic here if needed
    }
}
