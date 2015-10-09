var load = {
	preload: function() {
		//Load blue and red paddle
		game.load.image("paddle_0", "assets/sprites/paddleBlue.png"); //Blue
		game.load.image("paddle_1", "assets/sprites/paddleRed.png"); //Red
		//Load blue and grey ball
		game.load.image("ball_0", "assets/sprites/ballBlue.png"); //Blue
		game.load.image("ball_1", "assets/sprites/ballGrey.png"); //Grey
		//Load blue, green, grey, purple, red, and yellow bricks
		game.load.image("element_rectangle_0", "assets/sprites/element_blue_rectangle.png");
		game.load.image("element_rectangle_1", "assets/sprites/element_green_rectangle.png");
		game.load.image("element_rectangle_2", "assets/sprites/element_grey_rectangle.png");
		game.load.image("element_rectangle_3", "assets/sprites/element_purple_rectangle.png");
		game.load.image("element_rectangle_4", "assets/sprites/element_red_rectangle.png");
		game.load.image("element_rectangle_5", "assets/sprites/element_yellow_rectangle.png");
		game.load.image("panel", "assets/sprites/space.png");
		game.load.bitmapFont("carrier_command", "assets/fonts/carrier_command.png", "assets/fonts/carrier_command.xml");
		game.load.atlasXML("button", "assets/sprites/blueSheet.png", "assets/sprites/blueSheet.xml");	
		// Load sound
        game.load.audio("bricksBreak", "assets/sounds/ping_pong_8bit_beeep.ogg");
		game.load.audio("ballLost", "assets/sounds/ping_pong_8bit_peeeeeep.ogg"); 
		game.load.audio("paddleHit", "assets/sounds/ping_pong_8bit_plop.ogg"); 
	},
	
	create: function() {
		game.state.start("MainMenu");
	}

}