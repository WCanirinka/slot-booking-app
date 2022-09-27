class CreateStorages < ActiveRecord::Migration[7.0]
  def change
    create_table :storages do |t|

      t.timestamps
    end
  end
end
