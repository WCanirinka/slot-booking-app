class Slot < ApplicationRecord
  belongs_to :storage
  validates :start_time, :end_time, presence: true
  validate :validate_slot_uniqueness
  validate :validate_time_period
  validate :validate_end_time

  private

  def validate_slot_uniqueness
    scoped_slots = storage.slots.where(
      start_time: start_time.all_day,
      end_time: end_time.all_day
    )

    scoped_slots.select(:start_time, :end_time).each do |slot|
      if slot.start_time == start_time || slot.end_time == end_time ||
        start_time.betwen?(slot.start_time, slot.end_time) ||
        end_time.betwen?(slot.start_time, slot.end_time) ||
        slot.start_time.betwen?(start_time, end_time) ||
        slot.end_time.betwen?(start_time, end_time)
        errors.add(:storage, 'time already booked')
      end
    end
  end

  def validate_time_period
    return unless ((end_time - start_time) / 1.minute).to_i % 15 != 0
      errors.add(:base, 'must be 15 minutes difference')
    end
  end

  def validate_end_time
    if start_time >= end_time
      errors.add(:end_time, 'must be after start time')
    end
  end
end

