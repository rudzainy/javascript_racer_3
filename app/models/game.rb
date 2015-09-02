class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :races
  has_many :players, through: :races
end
