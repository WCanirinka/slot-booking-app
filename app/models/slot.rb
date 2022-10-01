class Slot < ApplicationRecord
  belongs_to :storage
  validates :start_time, :end_time, presence: true
  validate :validate_slot_uniqueness
  validate :validate_time_duration
  validate :validate_end_time
end
