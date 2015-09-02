$(document).ready(function() {

	var player1 = 0;
	var player2 = 0;
	var startTime;
	var endTime;

	$("#restart").hide();
	$("#result").hide();

	// Moves player 1
	var player1Move = function() {
		$('tr#player1_strip >td.player1').removeClass().next().addClass('player1')
		player1 ++;
	};

	// Moves player 2
	var player2Move = function() {
		$('tr#player2_strip >td.player2').removeClass().next().addClass('player2')
		player2 ++;
	};

	// Determine which key is pressed; Q op P
	$(document).keyup(function(keyCode) {
		if (keyCode.which === 81) {
			// Q moves player 1
			player1Move(); 
		}else if (keyCode.which === 80) {
			// P moves player 2
			player2Move(); 
		}
		hasWon();
		
	});

	// Check if one of the players has reach the finish line
	var hasWon = function() {

		var gameId = $(".game-container").data("game-id");

		if (player1 === 10){
			var winnerId = $("#player1_strip").data("id");
			var duration = calcDuration();
			$.ajax({
				type: "PATCH",
				url: "/games/" + gameId + "/result",
				data: {winner: winnerId, duration: duration}
			}).success(function(){
				alert('Player 1 wins!');
			});
			$("#restart").show();
			$("#result").show();
			$("#startCountdown").hide();
		}else if (player2 === 10) {
			var winnerId = $("#player2_strip").data("id");
			var duration = calcDuration();
			$.ajax({
				type: "PATCH",
				url: "/games/" + gameId + "/result",
				data: {duration: duration, winner: winnerId}
			}).success(function(){
				alert('Player 2 wins!');
			});
			$("#restart").show();
			$("#result").show();
			$("#startCountdown").hide();
		}

	};

	// Restart the game

		$('button#restart').click(function() {
	    location.reload();
	  });


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

	// Calculate race duration

	function calcDuration() {
	  endTime = new Date().getTime();
	  return (endTime-startTime)/1000;
	};

});
