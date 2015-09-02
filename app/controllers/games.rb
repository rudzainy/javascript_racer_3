# Redirect to new user registration page
get '/pre_race' do
	@player1 = ""
  @player2 = ""
  erb :pre_race
end

# Proses new user registration
post '/pre_race' do

  @player1 = params[:player1]
  @player2 = params[:player2]

  if Player.check_existing(@player1) == false or Player.check_existing(@player2) == false
    @flag = "Please check the name spelling of Player 1 / Player 2!"
    erb :pre_race
  elsif @player1 == @player2
    @flag = "Player 1 and Player 2 cannot be the same person!"
    erb :pre_race
  else
  	@game = Game.create(done: false)

  	@player1 = Player.find_by nickname: @player1
  	@player2 = Player.find_by nickname: @player2

  	@race = PlayerGame.create(player1_id: @player1.id, player2_id: @player2.id, game_id: @game.id)
    erb :race
  end
end

patch '/games/:id/result' do
  game = Game.find(params[:id])
  race = PlayerGame.find_by(game_id: game.id)
  race.update(winner: params[:winner], duration: params[:duration])
  game.update(done: true)
end

get '/games/:id' do
  @game = Game.find(params[:id])
  @race = PlayerGame.find_by(game_id: @game.id)
  erb :result
end

get '/history' do

  @race = PlayerGame.all
  erb :history
end
