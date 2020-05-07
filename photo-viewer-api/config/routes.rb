Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :photos, only: [:index, :create]
  resources :users
  # get '/photos/filter',  to: 'photos#photoByDimensions'
  get '/photos/dimensions',  to: 'photos#getDimensions'
  get '/photos/:id',  to: 'photos#show'
  
  # get '/photos/:id?grayscale',  to: 'photos#photoGrayscale'
  post '/login', to: 'auth#login'
  get '/auth', to: 'auth#persist'

end
