document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        window.onload = function () {
            var game = new PixelJS.Engine();
            
            game.init({
                container: 'game_container',
                width: 800,
                height: 600
            });

            // Wait until the PixelJS engine is fully loaded
            game.loadAndRun(function () {
                console.log("PixelJS engine and assets are ready!");

                // Now you can access `game.assets`
                if (game.assets) {
                    // Preload assets
                    game.assets.addImage('grass', 'assets/grass.png');
                    game.assets.addImage('char', 'assets/char.png');
                    game.assets.addImage('coin', 'assets/coin.png');
                    game.assets.createSound('collect', 'assets/coin.mp3');

                    // Initialize and start the game
                    startGame();
                } else {
                    console.error("Error: game.assets is still not initialized.");
                }
            });
        };
    }
};

function startGame() {
    var score = 0;

    // Background layer and grass entity
    var backgroundLayer = game.createLayer('background');
    var grass = backgroundLayer.createEntity();
    backgroundLayer.static = true;
    grass.pos = { x: 0, y: 0 };
    grass.asset = new PixelJS.Tile();
    grass.asset.prepare({
        name: 'grass', // Use the asset name
        size: { width: 800, height: 600 }
    });

    // Player layer and player entity
    var playerLayer = game.createLayer('players');
    var player = new PixelJS.Player();
    player.addToLayer(playerLayer);
    player.pos = { x: 200, y: 300 };
    player.size = { width: 32, height: 32 };
    player.velocity = { x: 100, y: 100 };
    player.asset = new PixelJS.AnimatedSprite();
    player.asset.prepare({
        name: 'char', // Use the asset name
        frames: 3,
        rows: 4,
        speed: 100,
        defaultFrame: 1
    });

    // Item layer and coin entity
    var itemLayer = game.createLayer('items');
    var coin = itemLayer.createEntity();
    coin.pos = { x: 400, y: 150 };
    coin.size = { width: 12, height: 16 };
    coin.asset = new PixelJS.AnimatedSprite();
    coin.asset.prepare({
        name: 'coin', // Use the asset name
        frames: 8,
        rows: 1,
        speed: 80,
        defaultFrame: 0
    });

    // Sound for collecting the coin
    var collectSound = game.createSound('collect');
    collectSound.prepare({ name: 'coin.mp3' });

    // Score layer to display the score
    var scoreLayer = game.createLayer("score");
    scoreLayer.static = true;
    scoreLayer.drawText(
        'Coins: ' + score,
        50,
        50,
        '14pt "Trebuchet MS", Helvetica, sans-serif',
        '#FFFFFF',
        'left'
    );

    // Collision detection and score updates
    player.onCollide(function (entity) {
        if (entity === coin) {
            collectSound.play(); // Play sound when player collects coin
            coin.pos = {
                x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
                y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
            };
            score += 1;
            scoreLayer.redraw = true;
            scoreLayer.drawText(
                'Coins: ' + score,
                50,
                50,
                '14pt "Trebuchet MS", Helvetica, sans-serif',
                '#FFFFFF',
                'left'
            );
        }
    });

    // Register entities for collision
    playerLayer.registerCollidable(player);
    itemLayer.registerCollidable(coin);

    // Start the game loop
    game.run(function (elapsedTime, dt) {
        // Game logic can go here if needed
    });
}
