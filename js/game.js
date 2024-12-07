document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        // Initialize the PixelJS engine
        var game = new PixelJS.Engine();
        game.init({
            container: 'game_container',
            width: 800,
            height: 600
        });

        // Create background layer and grass entity
        var backgroundLayer = game.createLayer('background');
        var grass = backgroundLayer.createEntity();
        backgroundLayer.static = true;
        grass.pos = { x: 0, y: 0 };
        grass.asset = new PixelJS.Tile();
        grass.asset.prepare({
            name: 'grass.png', // Make sure 'grass.png' is in the correct folder (assets)
            size: { 
                width: 800, 
                height: 600 
            }
        });
        
        // Preload images and sounds
        game.assets.addImage('grass', 'assets/grass.png');
        game.assets.addImage('char', 'assets/char.png');
        game.assets.addImage('coin', 'assets/coin.png');
        game.assets.load(function () {
            // When all assets are loaded, start the game
            startGame();
        });

        // Function to initialize and start the game
        function startGame() {
            var score = 0;

            // Create player layer and player entity
            var playerLayer = game.createLayer('players');
            var player = new PixelJS.Player();
            player.addToLayer(playerLayer);
            player.pos = { x: 200, y: 300 };
            player.size = { width: 32, height: 32 };
            player.velocity = { x: 100, y: 100 };
            player.asset = new PixelJS.AnimatedSprite();
            player.asset.prepare({ 
                name: 'char.png', 
                frames: 3, 
                rows: 4,
                speed: 100,
                defaultFrame: 1
            });

            // Create item layer and coin entity
            var itemLayer = game.createLayer('items');
            var coin = itemLayer.createEntity();
            coin.pos = { x: 400, y: 150 };
            coin.size = { width: 12, height: 16 };
            coin.asset = new PixelJS.AnimatedSprite();
            coin.asset.prepare({
                name: 'coin.png',
                frames: 8,
                rows: 1,
                speed: 80,
                defaultFrame: 0
            });

            // Sound for collecting the coin
            var collectSound = game.createSound('collect');
            collectSound.prepare({ name: 'coin.mp3' });

            // Score layer to display score
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

            // Collision detection and coin collection
            player.onCollide(function (entity) {
                if (entity === coin) {
                    collectSound.play();

                    // Move the coin to a random position
                    coin.pos = {
                        x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
                        y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
                    };

                    // Update the score
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

            // Register collision entities
            playerLayer.registerCollidable(player);
            itemLayer.registerCollidable(coin);

            // Game loop
            game.loadAndRun(function (elapsedTime, dt) {
                // Game logic can go here
            });
        }
    }
};

}