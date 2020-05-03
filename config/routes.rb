Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :photos
  resources :users
  get '/photo/filter',  to: 'photos#photoByDimensions'
  # get '/photo/:id?grayscale',  to: 'photos#photoGrayscale'
  # post '/login', to: 'auth#login'
  # get '/auth', to: 'auth#persist'

end
