class Games < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.boolean :done
  		t.timestamps null: false
  	end
  end
end
