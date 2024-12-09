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
    // Add the background image
    const bg = this.add.image(0, 0, 'fence');

    // Set the display size of the background image (scaling to 1000x1000)
    const displayWidth = 307;
    const displayHeight = 101;
    bg.setDisplaySize(displayWidth, displayHeight);

    // Update the Phaser game canvas size to match the scaled image size
    this.game.scale.resize(displayWidth, displayHeight);

    // Center the background image on the resized canvas
    bg.setPosition(displayWidth / 2, displayHeight / 2);

    console.log("Canvas resized");
}
