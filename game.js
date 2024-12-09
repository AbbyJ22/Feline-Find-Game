const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    },
    pixelArt: true,
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('fence', 'assets/fence.png');
}

function create() {

    const bg = this.add.image(0, 0, 'fence');

  
    const displayWidth = 686;
    const displayHeight = 226;
    bg.setDisplaySize(displayWidth, displayHeight);


    this.game.scale.resize(displayWidth, displayHeight);


    bg.setPosition(displayWidth / 2, displayHeight / 2);

    console.log("Canvas resized");
}
