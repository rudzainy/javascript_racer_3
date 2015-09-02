class Player < ActiveRecord::Base
  # Remember to create a migration!
  has_many :races
  has_many :games, through: :races

  validates :name, :presence => true
  validates :nickname, :presence => true
  validates :nickname, uniqueness: true

  def self.check_existing(nickname)
    temp = self.find_by nickname: nickname

    if temp == nil
      false
    else
      true
    end
  end
end
