Rails.application.routes.draw do
  devise_for :users
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only: %i[create destroy]
    end
  end
  get '*path', to: 'pages#index', via: :all
end