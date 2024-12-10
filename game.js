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
        this.bg.tilePositionX += 1; // Moving the background
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

        // Fix: WebFont loader is added correctly
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            custom: {
                families: ['TextFont'], // Font name as defined in your CSS
            },
        });

        // Initialize background scroll speed
        this.bgScrollSpeed = 0;

        // Set up the background
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'fence').setOrigin(0);
        this.bg.setDisplaySize(1372, 453); // Fix: Access bg via this

        // Create animations
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNumbers('mcIdle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'Walk',
            frames: this.anims.generateFrameNumbers('mcwalk', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        // Main character sprite
        this.mcIdle = this.add.sprite(328.5, 355, 'mcIdle');
        this.mcIdle.setScale(4);
        this.mcIdle.setOrigin(0.5, 0.5);
        this.mcIdle.anims.play('Idle');

        // Display text with a delay
        this.time.delayedCall(1000, () => {
            const startingDialogue = {
                text: "Hello there! You must be new in the neighborhood, right?",
                options: [
                    { label: "Yes, just moved in!",
                        next: {
                            text: "In that case, you should go meet the other cats!",
                            options: [
                                { label: "Let's go!", action: () => this.startWalking(), next: null },
                                { label: "I guess...", action: () => this.startWalking(), next: null }
                            ]
                        }
                    },
                    {
                        label: "I'm just passing through.",
                        next: {
                            text: "Oh, a traveler? You should meet the other cats!",
                            options: [
                                { label: "Let's go!", action: () => this.startWalking(), next: null },
                                { label: "Sure!", action: () => this.startWalking(), next: null }
                            ]
                        }
                    },
                ],
            };
            this.showText(startingDialogue);
        });
    }

    showText(dialogue) {
        const { text, options } = dialogue;

        const textbox = this.add.graphics();
        const borderColor = 0x3E2A47; // Dark border color
        const borderThickness = 3;    // Thickness of the border
        const fillColor = 0xE5AA70;   // Fill color

        const boxX = 20;
        const boxY = 20;
        const boxWidth = 400;
        const boxHeight = 100;

        textbox.fillStyle(fillColor, 1);
        textbox.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Draw the border
        textbox.lineStyle(borderThickness, borderColor, 1);
        textbox.strokeRect(boxX, boxY, boxWidth, boxHeight);

        // Add text to the textbox
        const textStyle = {
            fontFamily: 'TextFont',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
        };
        const mainText = this.add.text(boxX + 10, boxY + 10, text, textStyle);

        const optionBoxes = [];
        const optionTexts = [];

        // Add option buttons
        options.forEach((option, index) => {
            const optionBoxWidth = 400;
            const optionBoxHeight = 30;
            const optionX = 20;
            const optionY = 140 + index * (optionBoxHeight + 10);

            const optionBox = this.add.graphics();
            optionBox.fillStyle(fillColor, 1);
            optionBox.fillRect(optionX, optionY, optionBoxWidth, optionBoxHeight);
            optionBox.lineStyle(borderThickness, borderColor, 1);
            optionBox.strokeRect(optionX, optionY, optionBoxWidth, optionBoxHeight);

            const optionText = this.add.text(optionX + 10, optionY + 5, option.label, {
                fontFamily: 'TextFont',
                fontSize: '16px',
                color: '#000000',
            }).setInteractive();

            optionText.on('pointerover', () => {
                optionText.setStyle({ color: '#D3D3D3' });
            });

            optionText.on('pointerout', () => {
                optionText.setStyle({ color: '#000000' });
            });

            optionText.on('pointerdown', () => {
                // Remove current dialogue elements
                mainText.destroy();
                optionBoxes.forEach(box => box.clear());
                optionTexts.forEach(text => text.destroy());

                if (option.action) {
                    option.action(); // Trigger the action
                }

                if (option.next) {
                    this.showText(option.next); // Show the next dialogue
                }
            });

            optionBoxes.push(optionBox);
            optionTexts.push(optionText);
        });
    }

    startWalking() {
        // Play walking animation
        this.mcIdle.anims.play('Walk');

        // Scroll the background
        this.bgScrollSpeed = 2;

        // Stop the animation and scrolling after 3 seconds
        this.time.delayedCall(3000, () => {
            this.mcIdle.anims.play('Idle');
            this.bgScrollSpeed = 0;
        });
    }

    update() {
        if (this.bgScrollSpeed) {
            this.bg.tilePositionX += this.bgScrollSpeed;
        }
    }
}


const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene],
    pixelArt: true,
     render: {
        antialias: false,
        pixelArt: true,
    },
};

const game = new Phaser.Game(config);


