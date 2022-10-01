Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      jsonapi_resources :storages, only: :index do
        jsonapi_relationships
      end
      jsonapi_resources :slots
    end
  end
end
