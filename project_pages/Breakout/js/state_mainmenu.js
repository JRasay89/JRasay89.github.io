var gameTitle_;
var startButton_;
var startButtonLabel_;

var MainMenu = {
	preload: function() {
		
	},
	
	create: function() {
		//Set the color of the background
		game.stage.backgroundColor = '#4682B4';
		//Set the title of the game
		gameTitle_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 'carrier_command','BREAKOUT', 48);
		gameTitle_.anchor.setTo(0.5, 0.5);
		//Create the start button
		startButton_ = game.add.button(SCREEN_WIDTH/2, SCREEN_HEIGHT - 100, "button", this.startGame, this, "blue_button02.png", "blue_button02.png", "blue_button03.png");
		startButton_.anchor.setTo(0.5, 0.5);
		//The label of the start button
		startButtonLabel_ = game.add.bitmapText(startButton_.x, startButton_.y, 'carrier_command','Start Game', 12);
		startButtonLabel_.anchor.setTo(0.5, 0.5);
	},
	
	startGame: function() {
		game.state.start("MainGame");
	}
}