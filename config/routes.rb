Rails.application.routes.draw do
  root 'static#index'
  resources :messages
  resources :topics
  resources :users
  mount ActionCable.server => '/cable'
end
