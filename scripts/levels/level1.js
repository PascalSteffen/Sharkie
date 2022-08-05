let level1;

function initLevel() {


    level1 = new Level(

        [   // normalFish
            new normalFish('green', 745, 300, 545, 725),
            new normalFish('orange', 745, 90, 545, 725),
            new normalFish('green', 1100, 200, 800, 1200),
            new normalFish('rosa', 1200, 350, 1050, 1250),
            new normalFish('rosa', 1200, 100, 1050, 1250),
            new normalFish('green', 1950, 225, 1750, 2050),
            new normalFish('orange', 1950, 75, 1750, 2025),
            new normalFish('rosa', 1950, 375, 1800, 2000),
            new normalFish('rosa', 3200, 50, 3100, 3300),
            new normalFish('orange', 3200, 350, 3100, 3300)
        ],

        [   // Jellyfish
            new JellyFish('lila', 1450, 300, 0, 400),
            new JellyFish('yellow', 2100, 300, 100, 350),
            new JellyFish('lila', 2400, 300, 100, 350),
            new JellyFish('yellow', 2700, 300, 100, 350),
            new JellyFish('lila', 3000, 300, 0, 400)
        ],

        [], // Background (generate in a forloop in the world-class.)

        [   // Barrier
            new Barriers('img/3. Background/Barrier/barrier-Bottom.png', 'bottom', 350, 270),
            new Barriers('img/3. Background/Barrier/barrier-Bottom.png', 'bottom', 2000, 270),
            new Barriers('img/3. Background/Barrier/barrier-Top.png', 'top', 350, 0),
            new Barriers('img/3. Background/Barrier/barrier-Top.png', 'top', 2000, 0),
        ],

        [   // Coins
            new Coins(550, 250),
            new Coins(600, 200),
            new Coins(650, 150),
            new Coins(700, 200),
            new Coins(750, 250),

            new Coins(1300, 150),
            new Coins(1300, 300),

            new Coins(1650, 150),
            new Coins(1650, 300),
            new Coins(2250, 200),
            new Coins(2550, 200),
            new Coins(3300, 400)
        ],

        [
            // Poisons
            new poisons(650, 200),
            new poisons(1300, 220),
            new poisons(1675, 220),
            new poisons(1675, 370),
            new poisons(2950, 400),
        ]
    );
}