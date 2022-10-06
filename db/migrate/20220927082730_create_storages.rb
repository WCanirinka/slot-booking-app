class CreateStorages < ActiveRecord::Migration[7.0]
  def create
    create_table :storages do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
