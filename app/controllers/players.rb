# Redirect to new user registration page
get '/register' do
  erb :register
end

# Proses new user registration
post '/register' do

  @name = params[:name]
  @nickname = params[:nickname]

  if Player.check_existing(@nickname) == true
    @flag = "#{@nickname} has been registered to another account!"
    erb :register
  else
    @user = Player.create(name: @name, nickname: @nickname)
    @flag = "New player successfully created!"
    erb :index
  end
end