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
          this.cats = []; // Initialize an empty array to store cats
        this.currentCatIndex = 0; // Track the current cat being shown
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

        this.load.spritesheet('oneIdle', 'assets/sprites/oneIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
                this.load.spritesheet('twoIdle', 'assets/sprites/twoIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
                        this.load.spritesheet('threeIdle', 'assets/sprites/threeIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('fourIdle', 'assets/sprites/fourIdle.png', {
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

          this.shuffleCats();

           this.currentCat = this.cats[this.currentCatIndex];
             this.showText(this.currentCat.dialogue);

        // Initialize background scroll speed
        this.bgScrollSpeed = 0;

        // Set up the background
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'fence').setOrigin(0);

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



         this.anims.create({
            key: 'One',
            frames: this.anims.generateFrameNumbers('oneIdle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
                  this.anims.create({
            key: 'Two',
            frames: this.anims.generateFrameNumbers('twoIdle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
                           this.anims.create({
            key: 'Three',
            frames: this.anims.generateFrameNumbers('threeIdle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
                                    this.anims.create({
            key: 'Four',
            frames: this.anims.generateFrameNumbers('fourIdle', { start: 0, end: 1 }),
            frameRate: 2,
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

// Shuffle the cats array to get random order
shuffleCats() {


this.cats = [
    {
        name: "Pearl",
        spriteKey: 'oneIdle',
        animationKey: 'One', 
        dialogue: {
            text: "Hi! I'm Pearl. Do you like climbing trees?", 
            options: [
                { 
                    label: "I love it!",
                    next: { 
                        text: "Really! Have you ever gotten stuck? Be honest.", 
                        options: [ 
                            {
                                label: "Yes, a few times.", 
                                next: {
                                    text: "Me too! I'll help you if you ever need it.",
                                    options: [ 
                                        { label: "Thank you!", action: () => this.startWalking(), next: null },
                                        { label: "Okay!", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            },
                            {
                                label: "No, I'm an expert climber!", 
                                next: {
                                    text: "Wow, impressive! Maybe you can teach me someday.",
                                    options: [
                                        { label: "Sure!", action: () => this.startWalking(), next: null },
                                        { label: "Maybe later.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "Not really.", 
                    next: {
                        text: "Oh, that's okay! It's not for everyone.",
                        options: [
                            { label: "Thanks for understanding.", action: () => this.startWalking(), next: null },
                            { label: "See you later!", action: () => this.startWalking(), next: null }
                        ]
                    }
                }
            ]
        }
    },
    {
        name: "Domino",
        spriteKey: 'twoIdle',
        animationKey: 'Two', 
        dialogue: {
            text: "Hey! I'm Domino. You ever gone fishing?", 
            options: [
                { 
                    label: "A few times, yeah!",
                    next: { 
                        text: "I'm the best at catching fish! You'd never beat me!", 
                        options: [ 
                            {
                                label: "Is that a challenge?", 
                                next: {
                                    text: "Maybe it is.",
                                    options: [ 
                                        { label: "I'll win!", action: () => this.startWalking(), next: null },
                                        { label: "It'll be a close match!", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            },
                            {
                                label: "Maybe not, but I still love fish!", 
                                next: {
                                    text: "Hey, why don't you have this one I caught earlier?",
                                    options: [
                                        { label: "Thank You!", action: () => this.startWalking(), next: null },
                                        { label: "I'll catch my own.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "No, I haven't", 
                    next: {
                        text: "Well, I'll have to teach you. Fishing is fun!",
                        options: [
                            { 
                                label: "Okay, I look forward to it!", 
                                next: { 
                                    text: "Why not take this one for the road?", 
                                    options: [ 
                                        { label: "Thanks!", action: () => this.startWalking(), next: null },
                                        { label: "No thanks.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "No thanks, I don't want to.", 
                    next: {
                        text: "Oh, okay. If you change your mind, come find me!",
                        options: [
                            { label: "Okay.", action: () => this.startWalking(), next: null },
                            { label: "I don't think I will, but okay.", action: () => this.startWalking(), next: null }
                        ]
                    }
                }
            ]
        }
    },
    {
        name: "Sunny",
        spriteKey: 'threeIdle',
        animationKey: 'Three', 
        dialogue: {
            text: "My name's Sunny. I love catnip. You ever tried it?", 
            options: [
                { 
                    label: "It's the best!",
                    next: { 
                        text: "My owners put some in the window for me!", 
                        options: [ 
                            {
                                label: "Lucky! I wish mine did.", 
                                next: {
                                    text: "Do you want some? I've got extra.",
                                    options: [ 
                                        { label: "Really? Thanks!", action: () => this.startWalking(), next: null },
                                        { label: "No thanks actually.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            },
                            {
                                label: "Are you bragging?", 
                                next: {
                                    text: "What, no. I was gonna offer you some, but I don't think I want to now.",
                                    options: [
                                        { label: "Oh okay.", action: () => this.startWalking(), next: null },
                                        { label: "I didn't want it anyway.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "No, never.", 
                    next: {
                        text: "You've got to! It smells amazing.",
                        options: [
                            { 
                                label: "Woah, wish I could get some.", 
                                next: { 
                                    text: "Here's some extra of mine!", 
                                    options: [ 
                                        { label: "Thanks!", action: () => this.startWalking(), next: null },
                                        { label: "I don't want yours.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "I don't want any.", 
                    next: {
                        text: "Well, okay then. Bye!",
                        options: [
                            { label: "Bye.", action: () => this.startWalking(), next: null },
                            { label: "See you later!", action: () => this.startWalking(), next: null }
                        ]
                    }
                }
            ]
        }
    },
    {
        name: "Storm",
        spriteKey: 'fourIdle',
        animationKey: 'Four', 
        dialogue: {
            text: "Storm is my name. I need more yarn!", 
            options: [
                { 
                    label: "Yarn?",
                    next: { 
                        text: "Yes! It's so fun to play with! I don't have enough.", 
                        options: [ 
                            {
                                label: "Um, okay", 
                                next: {
                                    text: "Here, take some! This is my favorite color",
                                    options: [ 
                                        { label: "Thank you.", action: () => this.startWalking(), next: null },
                                        { label: "Uh...no thanks", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            },
                            {
                                label: "I don't think you need any more.", 
                                next: {
                                    text: "What? You clearly don't understand how fun yarn can be. Want some?",
                                    options: [
                                        { label: "I don't like yarn. Bye", action: () => this.startWalking(), next: null },
                                        { label: "Umm, sure.", action: () => this.startWalking(), next: null }
                                    ]
                                }
                            }
                        ]
                    }
                },
                { 
                    label: "Why?", 
                    next: {
                        text: "It's so fun to play with. This is my favorite color, take some!",
                        options: [
                            { label: "Thank you!", action: () => this.startWalking(), next: null },
                            { label: "No thanks! Bye.", action: () => this.startWalking(), next: null }
                        ]
                    }
                }
            ]
        }
    }
];

  const randomCatIndex = Phaser.Math.Between(0, this.cats.length - 1);
    const selectedCat = this.cats[randomCatIndex];


    for (let i = this.cats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cats[i], this.cats[j]] = [this.cats[j], this.cats[i]]; // Swap elements
    }
}

// Show the dialogue for the next cat in the shuffled order
showNextCatDialogue() {
    if (this.currentCatIndex < this.cats.length) {
        const cat = this.cats[this.currentCatIndex];
        this.currentCatIndex++;

        // Create sprite for the cat
        const catSprite = this.add.sprite(360, 355, cat.spriteKey);
        catSprite.setScale(4);
        catSprite.setOrigin(0.5, 0.5);
        catSprite.anims.play(cat.animationKey);

        // Show cat's dialogue
        this.showText(cat.dialogue);
    }
}

// Function to show text and options
showText(dialogue) {
    const textBox = this.add.text(50, config.height / 1.5, dialogue.text, {
        fontFamily: 'CustomFont',
        fontSize: '20px',
        fill: '#FFFFFF',
    });

    // Show options as buttons
    dialogue.options.forEach((option, index) => {
        const optionButton = this.add.text(50, config.height / 1.5 + 40 + (index * 40), option.label, {
            fontFamily: 'CustomFont',
            fontSize: '20px',
            fill: '#00FFFF',
        }).setInteractive();

        optionButton.on('pointerdown', () => {
            if (option.next) {
                this.showText(option.next);
            }
            option.action && option.action();
            this.startWalking();
        });
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
    // If there's an existing cat sprite, destroy it before starting the walk
    if (this.catSprite) {
        this.catSprite.destroy();
    }

    // Play walking animation
    this.mcIdle.anims.play('Walk');

    // Scroll the background
    this.bgScrollSpeed = 2;

    // Stop the animation and scrolling after 3 seconds
    this.time.delayedCall(3000, () => {
        this.mcIdle.anims.play('Idle');
        this.bgScrollSpeed = 0;

        // Create the random cat only if it's not already showing
        const randomCat = this.cats[this.currentCatIndex];

        if (randomCat && randomCat.spriteKey && randomCat.animationKey) {
            // Create the sprite using the random cat's spriteKey
            const catSprite = this.add.sprite(390, 355, randomCat.spriteKey);
            catSprite.setScale(4);
            catSprite.setOrigin(0.5, 0.5);

            // Play the animation using the animationKey of the selected cat
            catSprite.anims.play(randomCat.animationKey);

            // Store the reference to the catSprite
            this.catSprite = catSprite;

            // Remove the cat after the dialogue
            this.time.delayedCall(5000, () => {
                if (this.catSprite) {
                    this.catSprite.destroy();
                }
            });

        } else {
            console.error("Selected cat is missing spriteKey or animationKey.");
        }

        // Show the cat's dialogue
        this.time.delayedCall(500, () => {
            const currentCat = this.cats[this.currentCatIndex];
            this.showText(currentCat.dialogue);
        });
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


