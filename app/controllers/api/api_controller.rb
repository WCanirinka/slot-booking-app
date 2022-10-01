module Api
  class ApiController < ApplicationController::API
    include JSONAPI::ActsAsResourceController
  end
end
