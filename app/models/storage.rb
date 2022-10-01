class Storage < ApplicationRecord
  has_many :slots, dependent: :destroy
end
