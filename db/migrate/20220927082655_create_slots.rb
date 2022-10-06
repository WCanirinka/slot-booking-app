class CreateSlots < ActiveRecord::Migration[7.0]
  def create
    create_table :slots do |t|
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.belongs_to :storage, null: false, foreign_key: true

      t.timestamps
    end
  end
end