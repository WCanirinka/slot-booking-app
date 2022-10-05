module Api::V1
  class ApiController < JSONAPI::ResourceController
    include JSONAPI::ActsAsResourceController
  end
end
