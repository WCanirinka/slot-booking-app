class Api::V1::StorageResource < ::JSONAPI::Resource
  attributes :name
  has_many :slots, acts_as_set: true, exclude_links: :default
end
