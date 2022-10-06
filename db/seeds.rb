5.times do |number|
  Storage.create! name: "Storage - (#{number})"
end

[{ "start": "2022-02-01T20:00:00.000Z", "end": "2022-02-01T22:30:00.000Z" },
{ "start": "2022-01-31T23:00:00.000Z", "end": "2022-02-01T06:00:00.000Z" },
{ "start": "2022-02-01T10:15:00.000Z", "end": "2022-02-01T10:45:00.000Z" },
{ "start": "2022-02-01T13:55:00.000Z", "end": "2022-02-01T14:30:00.000Z" },
{ "start": "2022-02-02T10:00:00.000Z", "end": "2022-02-02T20:00:00.000Z" },
{ "start": "2022-02-01T09:00:00.000Z", "end": "2022-02-01T10:00:00.000Z" },
{ "start": "2022-02-01T11:30:00.000Z", "end": "2022-02-01T13:00:00.000Z" },
{ "start": "2022-02-01T13:00:00.000Z", "end": "2022-02-01T13:10:00.000Z" }].each do |slot_time|
  Slot.create! slot_time[:start].to_time, end_time: slot_time[:end].to_time, storage: Storage.first
end