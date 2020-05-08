Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :photos, only: [:index, :create]
  resources :users
  
  get '/photos/dimensions',  to: 'photos#get_dimensions'
  get '/photos/:id',  to: 'photos#show'
  get '/photos/:id/:width/:height',  to: 'photos#photo_by_size'
  post '/login', to: 'auth#login'
  get '/auth', to: 'auth#persist'

end
