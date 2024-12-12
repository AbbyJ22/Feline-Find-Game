function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
        this.load.image('mainbg', 'assets/mainbg.png');
        this.load.audio('menuMusic', 'assets/music/menu.mp3');
    }

    create() {

this.menuMusic = this.sound.add('menuMusic', {
        volume: 0.5, 
        loop: true 
    });

    this.menuMusic.play();
     
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

this.score = parseInt(getCookie('score')) || 0;


      
        this.add.text(config.width / 2, config.height / 3, 'Feline Find', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true);

       
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Continue', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true);

            const newGameButton = this.add.text(config.width / 2, config.height / 2 + 50, 'New Game', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true);

        newGameButton.setInteractive();
        playButton.setInteractive();


  newGameButton.on('pointerover', () => {
            newGameButton.setScale(1.2);
        });

        newGameButton.on('pointerout', () => {
            newGameButton.setScale(1);
        });

        newGameButton.on('pointerdown', () => {
            this.menuMusic.stop();
            deleteCookie('score');
            this.scene.start('GameScene', { isNewGame: true });
        });

        playButton.on('pointerover', () => {
            playButton.setScale(1.2);
        });

        playButton.on('pointerout', () => {
            playButton.setScale(1);
        });

      playButton.on('pointerdown', () => {
        this.menuMusic.stop();
    const savedScore = parseInt(getCookie('score')) || 0;
    this.score = savedScore; 
    this.scene.start('GameScene', { isNewGame: false });
});
    }

    update() {
        this.bg.tilePositionX += 1; 
    }
}

class GameScene extends Phaser.Scene {
    cats = [];
    currentCatIndex = 0;
    shownCats = [];
    inventory = [];

    constructor() {
        super({ key: 'GameScene' });
    }

getItemImageKey(itemName) {
    switch (itemName) {
        case "Yarn": return 'yarnImage';
        case "Fish": return 'fishImage';
        case "Branch": return 'branchImage';
        case "Catnip": return 'catnipImage';
        default: return null;
    }
}

 addItemToInventory(itemName) {
    if (!this.inventory) {
        this.inventory = [];
    }

    if (this.inventory.includes(itemName)) {
        console.log(`Item "${itemName}" already in inventory.`);
        return; 
    }

    if (this.inventory.length >= 4) {
        console.log("Inventory is full. Cannot add more items.");
        return;
    }

    this.inventory.push(itemName);
    this.score = this.inventory.length;
    this.scoreText.setText(`Items: ${this.score}/4`);
    setCookie('score', this.score, 7);

    console.log(`Item "${itemName}" added. Current inventory: ${this.inventory}`);

    const message = `You obtained: ${itemName}`;
    this.showItemFeedback(message, itemName);
}

showItemFeedback(message, itemName) {
    const itemImageKey = this.getItemImageKey(itemName);

    if (itemImageKey) {
        const text = this.add.text(
            this.scale.width / 2, 
            this.scale.height / 2 + 50,
            message, 
            { font: '15px TextFont', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5);

        const image = this.add.image(
            this.scale.width / 2, 
            this.scale.height / 2 - 20, 
            itemImageKey
        ).setScale(3);

        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: [text, image],
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    text.destroy(); 
                    image.destroy(); 
                }
            });
        });
    }
}


    preload() {
        this.load.image('fence', 'assets/fence.png');
         this.load.audio('forestMusic', 'assets/music/forest.mp3');
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

            this.load.image('yarnImage', 'assets/sprites/yarn.png');
            this.load.image('fishImage', 'assets/sprites/fish.png');
            this.load.image('branchImage', 'assets/sprites/branch.png');
            this.load.image('catnipImage', 'assets/sprites/catnip.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create(data) {

  this.forestMusic = this.sound.add('forestMusic', {
        volume: 0.5, 
        loop: true  
    });

    this.forestMusic.play(); 

        WebFont.load({
        custom: {
            families: ['TextFont'], 
        },
        active: () => {
            const savedScore = parseInt(getCookie('score')) || 0;
            this.score = savedScore;

            this.scoreText = this.add.text(500, 25, `Items: ${this.score}/4`, { font: '18px TextFont', fill: '#000000' });
            this.scoreText.setDepth(10);
            this.scoreText.setScale(1);
        }
    });


         if (data.isNewGame) {
            this.resetGame();
              this.shownCats = [];
               this.inventory = [];
        } else {
            this.loadProgress();
             this.shownCats = [];

        }

          this.shuffleCats();

           this.currentCat = this.cats[this.currentCatIndex];
             this.showText(this.currentCat.dialogue);

          this.bgScrollSpeed = 0;

    
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'fence').setOrigin(0);

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

        this.mcIdle = this.add.sprite(328.5, 355, 'mcIdle');
        this.mcIdle.setScale(4);
        this.mcIdle.setOrigin(0.5, 0.5);
        this.mcIdle.anims.play('Idle');

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
                                    { label: "Thank you!", action: () => { this.addItemToInventory('Branch', 'branchImage'); this.startWalking(); }, next: null },
                                    { label: "I don't need help.", action: () => this.startWalking(), next: null }
                                ]
                            }
                        },
                        {
                            label: "No, I'm an expert climber!",
                            next: {
                                text: "Wow, impressive! Maybe you can teach me someday.",
                                options: [
                                    { label: "Sure!", action: () => { this.addItemToInventory('Branch', 'branchImage'); this.startWalking(); }, next: null },
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
                                            { label: "Thank You!", action: () => { this.addItemToInventory('Fish', 'fishImage'); this.startWalking(); }, next: null },
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
                                            { label: "Thanks!", action: () => { this.addItemToInventory('Fish', 'fishImage'); this.startWalking(); }, next: null },
                                            { label: "No thanks.", action: () => this.startWalking(), next: null }
                                        ]
                                    }
                                },
                                { 
                                    label: "No thanks", 
                                    next: {
                                        text: "Okay, I'll be here if you change your mind.!",
                                        options: [
                                            { label: "Okay.", action: () => this.startWalking(), next: null },
                                            { label: "I don't think I will, but okay.", action: () => this.startWalking(), next: null }
                                        ]
                                    }
                                }
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
                                            { label: "Really? Thanks!", action: () => { this.addItemToInventory('Catnip', 'catnipImage'); this.startWalking(); }, next: null },
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
                                            { label: "Thanks!", action: () => { this.addItemToInventory('Catnip', 'catnipImage'); this.startWalking(); }, next: null },
                                            { label: "I don't want yours.", action: () => this.startWalking(), next: null }
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
                                            { label: "Thank you.", action: () => { this.addItemToInventory('Yarn', 'yarnImage'); this.startWalking(); }, next: null },
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
                                            { label: "Umm, sure.", action: () => { this.addItemToInventory('Yarn', 'yarnImage'); this.startWalking(); }, next: null }
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
                                { label: "Thank you!", action: () => { this.addItemToInventory('Yarn', 'yarnImage'); this.startWalking(); }, next: null },
                                { label: "No thanks! Bye.", action: () => this.startWalking(), next: null }
                            ]
                        }
                    }
                ]
            }
        }
    ];

    for (let i = this.cats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cats[i], this.cats[j]] = [this.cats[j], this.cats[i]]; 
    }
}

showNextCatDialogue() {
    if (this.currentCatIndex < this.cats.length) {
        const cat = this.cats[this.currentCatIndex];
        this.currentCatIndex++;


        const catSprite = this.add.sprite(360, 355, cat.spriteKey);
        catSprite.setScale(4);
        catSprite.setOrigin(0.5, 0.5);
        catSprite.anims.play(cat.animationKey);


        this.showText(cat.dialogue);
    }
}
showText(dialogue) {
    const textBox = this.add.text(50, config.height / 1.5, dialogue.text, {
        fontFamily: 'CustomFont',
        fontSize: '20px',
        fill: '#FFFFFF',
    });

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
        const borderColor = 0x3E2A47; 
        const borderThickness = 3;  
        const fillColor = 0xE5AA70; 

        const boxX = 20;
        const boxY = 20;
        const boxWidth = 400;
        const boxHeight = 100;

        textbox.fillStyle(fillColor, 1);
        textbox.fillRect(boxX, boxY, boxWidth, boxHeight);
        textbox.lineStyle(borderThickness, borderColor, 1);
        textbox.strokeRect(boxX, boxY, boxWidth, boxHeight);

        const textStyle = {
            fontFamily: 'TextFont',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
        };
        const mainText = this.add.text(boxX + 10, boxY + 10, text, textStyle);

        const optionBoxes = [];
        const optionTexts = [];

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
                mainText.destroy();
                optionBoxes.forEach(box => box.clear());
                optionTexts.forEach(text => text.destroy());

                if (option.action) {
                    option.action();
                }

                if (option.next) {
                    this.showText(option.next); 
                }
            });

            optionBoxes.push(optionBox);
            optionTexts.push(optionText);
        });
    }
startWalking() {
    if (this.catSprite) {
        this.catSprite.destroy();
    }

    this.mcIdle.anims.play('Walk');
    this.bgScrollSpeed = 2;

    this.time.delayedCall(3000, () => {
        this.mcIdle.anims.play('Idle');
        this.bgScrollSpeed = 0;

if (this.shownCats.length >= this.cats.length) {
    console.log("All cats have been shown.");
       
    this.time.delayedCall(1000, () => {
         this.forestMusic.stop();
        this.scene.start('GameOverScene');
    });

    return;  
}

        let randomCatIndex;
        do {
            randomCatIndex = Phaser.Math.Between(0, this.cats.length - 1);
        } while (this.shownCats.includes(randomCatIndex)); 

        const randomCat = this.cats[randomCatIndex];

        if (randomCat && randomCat.spriteKey && randomCat.animationKey) {
            const catSprite = this.add.sprite(425, 355, randomCat.spriteKey);
            catSprite.setScale(4);
            catSprite.setOrigin(0.5, 0.5);
            catSprite.anims.play(randomCat.animationKey);

            this.catSprite = catSprite;

            this.time.delayedCall(500, () => {
                this.showText(randomCat.dialogue);
            });

            this.shownCats.push(randomCatIndex);
        } else {
            console.error("Selected cat is missing spriteKey or animationKey.");
        }
    });
}

 resetGame() {
     this.score = 0; 
        this.currentLevel = 1; 
        deleteCookie('score');
    }

 loadProgress() {
    const savedScore = parseInt(getCookie('score')) || 0;
    this.score = savedScore;
    if (this.scoreText) {
        this.scoreText.setText(`Items: ${this.score}/4`);
    }
}

update() {
    if (this.bg && this.bg.tilePositionX !== undefined) {
        this.bg.tilePositionX += this.bgScrollSpeed;
    }
}
}


class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('mainbg', 'assets/mainbg.png');
 this.load.audio('menuMusic', 'assets/music/menu.mp3');
    }

    create() {

this.menuMusic = this.sound.add('menuMusic', {
        volume: 0.5,
        loop: true  
    });
    
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

        this.add.text(config.width / 2, config.height / 3, 'The End!', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true);

        const savedScore = parseInt(getCookie('score')) || 0; 
        this.add.text(config.width / 2, config.height / 2 + 50, `Your Score: ${savedScore}`, {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#ffffff',
        })
        .setOrigin(0.5)
        .setShadow(2, 2, '#000000', 0, true, true);

        const restartButton = this.add.text(config.width / 2, config.height / 2 + 100, 'Main Menu', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true);

        restartButton.setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setScale(1.2);
        });

        restartButton.on('pointerout', () => {
            restartButton.setScale(1);
        });

        restartButton.on('pointerdown', () => {
             this.menuMusic.stop();
            this.scene.start('StartMenuScene');
        });
    }

    update() {
        this.bg.tilePositionX += 1; 
    }
}


const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene, GameOverScene],
    pixelArt: true,
     render: {
        antialias: false,
        pixelArt: true,
    },
};

const game = new Phaser.Game(config);

game.events.once('pointerdown', () => {
    game.sound.context.resume();
});
