//The high score, current score, and lives
var highScore_;
var highScoreText_;
var currentScore_;
var currentScoreText_;
var lives_;
var livesText_;

//The paddle, bricks, and ball reference
var paddle_;
var bricks_;
var ball_;

//Check if ball is released from the paddle
var isBallReleased;

//Keyboard up, left, down, and right keys
var cursors_;

var paddleHitSound_;
var bricksBreakSound_;
var ballLostSound_;

//Game Over Or Cleared all bricks
var panel_;
//The title for the panel
var gameOverTitle_;
var clearedTitle_;
//The score title 
var clearedCurrentScoreTitle_;
var clearedCurrentScoreText_;
var finalScoreTitle_;
var finalScoreText_;
//The buttons
var playAgainButton_;
var playAgainLabel_;
var continueButton_;
var continueLabel_;
var quitButton_;
var quitLabel_;

var MainGame = {
		preload: function() {
			
		},
		
		create: function() {

			this.initGame();
			

		},
		
		update: function() {
			if (cursors_.left.isDown)
			{
				paddle_.body.x -= 10;
				if (paddle_.body.x < 0) {
					paddle_.body.x = 0;
				}
			}
			else if (cursors_.right.isDown)
			{
				paddle_.body.x += 10;
				if ((paddle_.body.x + paddle_.body.width) > SCREEN_WIDTH) {
					paddle_.body.x = SCREEN_WIDTH - paddle_.body.width;
				}
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !isBallReleased) {
				ball_.body.velocity.y = -450;
				isBallReleased = true;
			}
			
			//Center the ball on the paddle if it hasn't been released
			if (!isBallReleased) {
				ball_.body.x = (paddle_.body.x + paddle_.body.width/2) - ball_.body.width/2;
			}
			
			game.physics.arcade.collide(paddle_, ball_, this.ballBounceOnPaddle, null, this);
			game.physics.arcade.collide(ball_, bricks_, this.breakBrick, null, this);
			
		},
		
		render: function() {
			//game.debug.body(paddle_);
			//game.debug.body(ball_);
		},
		
		/*
		 * Initialize the game
		 * Create the ball, paddle, bricks, and also the text for high score, current score and number of lives.
		 */
		initGame: function() {
			//Set the background color of the game
			game.stage.backgroundColor = '#4682B4';
			
			//Activate the arcade physics system
			game.physics.startSystem(Phaser.Physics.Arcade);
			//Turn off collision for the bottom of the world
			game.physics.arcade.checkCollision.down = false;
			
			cursors_ = game.input.keyboard.createCursorKeys();
			
			//Create text for high score, current score, and lives
			highScore_ = this.getHighScore();
			highScoreText_ = game.add.bitmapText(5, SCREEN_HEIGHT - 30, 'carrier_command','High Score: ' + highScore_, 8);	
			currentScore_ = 0;
			currentScoreText_ = game.add.bitmapText(5, SCREEN_HEIGHT - 15, 'carrier_command','Current Score: ' + currentScore_, 8);
			lives_ = 2;
			livesText_ = game.add.bitmapText(SCREEN_WIDTH - 100, SCREEN_HEIGHT - 25, 'carrier_command','Lives: ' + lives_, 8);

			//Create paddle
			var paddleColor = Math.floor(Math.random() * 2); //Randomize color of paddle
			paddle_ = game.add.sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT - 50, "paddle_"+paddleColor);
			paddle_.scale.setTo(.75, .75);
			paddle_.name = "Paddle";
			game.physics.arcade.enable(paddle_);
			paddle_.anchor.setTo(0.5, 0.5);
			paddle_.body.collideWorldBounds = true;
			paddle_.body.immovable = true;
			
			//Create ball		
			var ballColor = Math.floor(Math.random() * 2); //Randomize color of ball
			ball_ = game.add.sprite(paddle_.x, paddle_.y - paddle_.height, "ball_"+ballColor);
			ball_.name = "Ball";
			ball_.scale.setTo(.75, .75);
			ball_.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(ball_);
			ball_.body.bounce.set(1);
			ball_.body.collideWorldBounds = true;
			ball_.checkWorldBounds = true;
			ball_.events.onOutOfBounds.add(this.ballOut, this);
			isBallReleased = false;
			
			//Create the bricks
			bricks_ = game.add.group();
			bricks_.enableBody = true;
			var brick;
			for (var y = 0; y < 6; y++) {
				for (var x = 0; x < 10; x++) {
					brick = bricks_.create(80 + (x * (64)), 50 + (y * (32 + 12)), "element_rectangle_"+y);
					brick.scale.setTo(.75, .75);
					brick.body.immovable = true;
				}
			}
			
			//Create the sounds
			paddleHitSound_ = this.game.add.audio("paddleHit");
			bricksBreakSound_ = this.game.add.audio("bricksBreak");
			ballLostSound_ = this.game.add.audio("ballLost");
		},
		
		/*
		 * Determine the balls velocity based on where it hits the paddle.
		 * @param paddle - reference to the paddle.
		 * @param ball - reference to the ball.
		 */
		ballBounceOnPaddle: function(paddle, ball) {
			//If ball perfectly hits the middle of the paddle
			//Set the balls velocity at a random number of 0 to 7*20
			if ((paddle.body.x + (paddle.body.width/2)) == (ball.body.x + (ball.body.width/2))) {
				console.log("Middle");
				ball.body.velocity.x = 7 * Math.random() * 20;
			}
			//If the ball hits the left side of the paddle
			//Set the velocity to -7 * the difference between the position of the paddles left body and the ball
			else if ((paddle.body.x + (paddle.body.width/2)) > (ball.body.x + (ball.body.width/2))) {
				var velocity = (paddle.body.x + (paddle.body.width/2)) - (ball.body.x + (ball.body.width/2));
				//console.log("Velocity: " + velocity);
				ball.body.velocity.x = (-7 * velocity);
			}
			//Else the ball hits the right side of the paddle
			//Set the velocity to 7 * the difference between the position of the paddles right body and the ball
			else {
				var velocity = (ball.body.x + (ball.body.width/2)) - (paddle.body.x + (paddle.body.width/2));
				//console.log("Velocity: " + velocity);
				ball.body.velocity.x = (7 * velocity);
			}
			
			//Play paddle hit sound
			paddleHitSound_.play();
		},
		
		/*
		 * Kill the bricks when it is hit by the ball.
		 */
		breakBrick: function(ball, brick) {
			//Kill the brick that was hit
			brick.kill();
			//Updates player's score
			this.updateScore();
			
			//Play bricks break sound
			bricksBreakSound_.play();
			
			//Check if there are any bricks left to break
			//Show cleared panel if none are left
			if (bricks_.countLiving() == 0) {
				this.bricksCleared();
			}
		},
		
		/*
		 * Get the high score from local storage if supported
		 */
		getHighScore: function() {
			//Check if local storage is supported
			if (typeof(Storage) !== "undefined") {
				//If no high score is saved set to 0, else get the high score
				if (localStorage.getItem("highScore") === null) {
					return 0;
				}
				else {
					return parseInt(localStorage.getItem("highScore"));
				}
			}
			//Else set the high score to 0
			else {
				return 0;
			}
		},
		/*
		 * Save high score in local storage, if its supported.
		 */
		saveHighScore: function() {
			//If local storage is supported, save the high score.
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("highScore", highScore_.toString());
			}
		},
		
		/*
		 * Updates the score when a brick is hit.
		 */
		updateScore: function() {
			currentScore_ += 10;
			currentScoreText_.setText("Current Score: " + currentScore_);
			
			if (currentScore_ > highScore_) {
				highScore_ = currentScore_;
				highScoreText_.setText("High Score: " + highScore_);
			}
		},
		
		/*
		 * When the ball goes out of bounds, reduce the player's lives count by 1.
		 */
		ballOut: function() {
			lives_ -= 1;
			livesText_.setText("Lives: " + lives_);
			ballLostSound_.play();
			if (lives_ == 0) {
				this.gameOver();
			}
			else
			{
				this.resetBall();				
			}

		},
		
		/*
		 * Paused the game and show cleared panel when all bricks are cleared.
		 */
		bricksCleared: function() {
			ball_.body.velocity.setTo(0, 0);
			game.physics.arcade.isPaused = true;
			this.showClearedPanel();
		},
		/*
		 * Paused the game and show game over panel when all lives are lost.
		 */
		gameOver: function() {
			ball_.body.velocity.setTo(0, 0);
			game.physics.arcade.isPaused = true;
			this.showGameOverPanel();
		},
		/*
		 * Show Cleared Panel
		 */
		showClearedPanel: function() {
			panel_ = game.add.sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, "panel");
			panel_.anchor.setTo(0.5, 0.5);
			panel_.scale.setTo(6,6);
			
			clearedTitle_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 - 100, "carrier_command","Bricks Cleared!", 14);
			clearedTitle_.anchor.setTo(0.5, 0.5);
			clearedCurrentScoreTitle_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 - 50, "carrier_command","Current Score: ", 10);
			clearedCurrentScoreTitle_.anchor.setTo(0.5, 0.5);
			clearedCurrentScoreText_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 - 25, "carrier_command", " " + currentScore_, 10);
			clearedCurrentScoreText_.anchor.setTo(0.5, 0.5);
			
			continueButton_ = game.add.button(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 + 50, "button", this.continueGame, this, "blue_button02.png", "blue_button02.png", "blue_button03.png");
			continueButton_.anchor.setTo(0.5, 0.5);
			continueButton_.scale.setTo(.75, .75);
			continueLabel_= game.add.bitmapText(continueButton_.x, continueButton_.y, "carrier_command","Continue", 10);
			continueLabel_.anchor.setTo(0.5, 0.5);
			
			quitButton_ = game.add.button(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 + 100, "button", this.quitGame, this, "blue_button02.png", "blue_button02.png", "blue_button03.png");
			quitButton_.anchor.setTo(0.5, 0.5);
			quitButton_.scale.setTo(.75, .75);
			quitLabel_ = game.add.bitmapText(quitButton_.x, quitButton_.y, "carrier_command","QUIT", 10);
			quitLabel_.anchor.setTo(0.5, 0.5);
		},
		/*
		 * Close the cleared panel
		 */
		closeClearedPanel: function() {
			panel_.destroy();
			clearedTitle_.destroy();
			clearedCurrentScoreTitle_.destroy();
			clearedCurrentScoreText_.destroy();
			continueButton_.destroy();
			continueLabel_.destroy();
			quitButton_.destroy();
			quitLabel_.destroy();
		},
		/*
		 * Show the game over panel.
		 */
		showGameOverPanel: function() {
			panel_ = game.add.sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, "panel");
			panel_.anchor.setTo(0.5, 0.5);
			panel_.scale.setTo(6,6);
			
			gameOverTitle_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 - 100, "carrier_command","GAME OVER", 20);
			gameOverTitle_.anchor.setTo(0.5, 0.5);
			
			finalScoreTitle_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 - 50, "carrier_command","Your Score ", 14);
			finalScoreTitle_.anchor.setTo(0.5, 0.5);
			finalScoreText_ = game.add.bitmapText(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, "carrier_command", "" + currentScore_ , 14);
			finalScoreText_.anchor.setTo(0.5, 0.5);
			
			playAgainButton_ = game.add.button(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 + 50, "button", this.playAgain, this, "blue_button02.png", "blue_button02.png", "blue_button03.png");
			playAgainButton_.anchor.setTo(0.5, 0.5);
			playAgainButton_.scale.setTo(.75, .75);
			playAgainLabel_ = game.add.bitmapText(playAgainButton_.x, playAgainButton_.y, "carrier_command","PLAY AGAIN", 10);
			playAgainLabel_.anchor.setTo(0.5, 0.5);
			
			quitButton_ = game.add.button(SCREEN_WIDTH/2, SCREEN_HEIGHT/2 + 100, "button", this.quitGame, this, "blue_button02.png", "blue_button02.png", "blue_button03.png");
			quitButton_.anchor.setTo(0.5, 0.5);
			quitButton_.scale.setTo(.75, .75);
			quitLabel_ = game.add.bitmapText(quitButton_.x, quitButton_.y, "carrier_command","QUIT", 10);
			quitLabel_.anchor.setTo(0.5, 0.5);
		},
		/*
		 * Close the game over panel.
		 */
		closeGameOverPanel: function() {
			panel_.destroy();
			gameOverTitle_.destroy();
			finalScoreTitle_.destroy();
			finalScoreText_.destroy();
			playAgainButton_.destroy();
			playAgainLabel_.destroy();
			quitButton_.destroy();
			quitLabel_.destroy();			
		},
		
		/*
		 * Continue playing the game when all bricks are cleared.
		 * Player lives and current score does not reset.
		*/
		continueGame: function() {
			game.physics.arcade.isPaused = false;			
			bricks_.callAll('revive');
			this.resetPaddle();
			this.resetBall();
			this.closeClearedPanel();
		},
		/*
		 * Play new game if player lose all lives.
		 * Reset paddle, ball, bricks, lives and current score.
		 */
		playAgain: function() {
			game.physics.arcade.isPaused = false;
			bricks_.callAll('revive');
			this.resetPaddle();
			this.resetBall();
			this.resetText();
			this.closeGameOverPanel();
		},
		
		/*
		 * Resets the position of the paddle on the middle of the screen.
		 */
		resetPaddle: function() {
			paddle_.reset(SCREEN_WIDTH/2, SCREEN_HEIGHT - 50);
		},
		
		/*
		 * Resets the position of the ball on the middle top of the paddle.
		 */
		resetBall: function() {
			ball_.reset(paddle_.x, paddle_.y - paddle_.height);
			isBallReleased = false;
		},
		
		/*
		 * Resets lives count and current score text.
		 */
		resetText: function() {
			lives_ = 2;
			livesText_.setText("Lives: " + lives_);
			currentScore_ = 0;
			currentScoreText_.setText("Current Score: " + currentScore_);
		},
		
		/*
		 * Quit the game and go back to the main menu screen.
		 */
		quitGame: function() {
			game.physics.arcade.isPaused = false;
			this.saveHighScore();
			game.state.start("MainMenu");
		}
		
}