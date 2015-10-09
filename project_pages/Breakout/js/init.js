var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'gameDiv');

game.state.add("Load", load);
game.state.add("MainMenu", MainMenu);
game.state.add("MainGame", MainGame);
game.state.start("Load");