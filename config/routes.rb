Rails.application.routes.draw do
  get 'albums/index'
  get 'albums/request_albums'
  get 'albums/request_album/:id', to: 'albums#request_album'
  get 'albums/request_photos/:id', to: 'albums#request_photos'

  get 'users/index'
  get 'users/request_user/:id', to: 'users#request_user'

  get 'albums/:id', to: 'albums#album'
  get 'url2', to: 'users#user'

  root 'albums#index'
end
