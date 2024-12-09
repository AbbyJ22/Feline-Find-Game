const config = {
    type: Phaser.AUTO,
    width: 657, // Visible canvas width
    height: 526, // Visible canvas height
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
};

const game = new Phaser.Game(config);
let bg;

function preload() {
    // Load assets
    this.load.image('fence', 'assets/fence.png');
}

function create() {
    // Add the background image (position it at 0, 0 relative to world coordinates)
    bg = this.add.image(0, 0, 'fence').setOrigin(0);

    // Scale the background to a larger size
    const displayWidth = 1372;
    const displayHeight = 453;
    bg.setDisplaySize(displayWidth, displayHeight);
}

function update() {
    // Add game logic here if needed
    console.log("Update loop running...");
}
