class Level {
    // Enemies
    normalFish;
    jellyfish;

    //Map
    background;

    // Barrier
    barriers;

    // TakeableObjects
    coins;
    poisons;

    level_end_x = 3680;

    constructor(normalFish, jellyfish, background, barriers, coins, poisons) {
        this.normalFish = normalFish;
        this.jellyfish = jellyfish;
        this.background = background;
        this.barriers = barriers;
        this.coins = coins;
        this.poisons = poisons;
    }
}