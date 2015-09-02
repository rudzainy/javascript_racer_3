class Players < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string :name
  		t.string :nickname
  	end

  add_index(:players, :nickname, unique: true)
  end
end
