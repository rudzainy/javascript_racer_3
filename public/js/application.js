$(document).ready(function() {

	// Hides restart and result button at the beginning of race
	$("#restart").hide();
	$("#result").hide();

	// Initialize players
	var player1 = new Player($("#player1_strip").data("id"), 1);
  var player2 = new Player($("#player2_strip").data("id"), 2);

  // Initialize game
  var game = new Game(player1, player2, $(".game-container").data("game-id"));

  // Flow of game
  $(document).on('keyup', function(event) {
    game.onKeyUp(event);
  });

  // Restart the game
		$('button#restart').click(function() {
	    location.reload();
	  });

});

// Player Class
function Player(playerId, playerNumber){

	this.id = playerId;
	this.number = playerNumber;
	// this.keyCode = keyCode;
	this.position = 0;
}

// Game Class
function Game(player1, player2, gameId) {

	this.player1 = player1;
	this.player2 = player2;
	this.id = gameId;
	
	var startTime;
	var endTime;

	// Determine which key is pressed; Q op P
	this.onKeyUp = function(keyCode) {
		if (keyCode.which === 81) {
			// Q moves player 1
			playerMove(player1); 
			hasWon(player1, this.id);
		}else if (keyCode.which === 80) {
			// P moves player 2
			playerMove(player2); 
			hasWon(player2, this.id);
		}
	}

	// Moves player
	function playerMove(player) {
		$('tr#player' + player.number + '_strip >td.player' + player.number).removeClass().next().addClass('player' + player.number)
		player.position ++;
	};

	// Check if one of the players has reach the finish line
	function hasWon(player, gameId) {
		if (player.position === 10){
			var winnerId = player.id;
			var duration = calcDuration();
			$.ajax({
				type: "PATCH",
				url: "/games/" + gameId + "/result",
				data: {winner: winnerId, duration: duration}
			}).success(function(){
				alert('Player ' + player.number + ' wins!');
			});
			$("#restart").show();
			$("#result").show();
			$("#startCountdown").hide();
		}

	};

	// Calculate race duration
	function calcDuration() {
	  endTime = new Date().getTime();
	  return (endTime-startTime)/1000;
	};

	// Countdown timer
	$('#startCountdown').click(function() { 
		var counter = 6;

		setInterval(function() {
		  counter--;
		  if (counter > 0) {
		    span = document.getElementById("countdown");
		    span.innerHTML = counter;
		  } else if (counter == 0) {
		  	span = document.getElementById("countdown");
		    span.innerHTML = ("Start!");
		    startTime = new Date().getTime();
		  }
		}, 1000);
	});
}	