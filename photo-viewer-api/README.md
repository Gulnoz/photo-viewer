# PHOTO VIEWER API

## Prerequisites: 
Ruby, Rails, Postgresql

* Ruby version
ruby ~> 2.6.6

* System dependencies
rails ~> 6.0, pg, active_model_serializers, will_paginate, bcrypt, jwt, dotenv-rails

* Configuration
bash code `bundle install`

* Database creation
bash code `rails db:create && db:migrate`

* Database initialization
bash code `rails db:seed`

* Services (cache get photos, search photos by dimensions, photo size manipulation, user auth)

### Get photos: http://localhost:3000/photos

### Get photos by page: http://localhost:3000/photos?page=2

### Filter by dimensions and paging: http://localhost:3000/photos/filter?dimensions=:widthx:height&page=2

### Get photo grayscale version: http://localhost:3000/photos?:id/grayscale

### Photo size manipulation: http://localhost:3000/photos?:id/:width/:height

### Photo size manipulation grayscale version: http://localhost:3000/photos?:id/:width/:height?grayscale


## Deployment instructions
clone Repo
1. Open the directory with cloned repo
2. Run in bash `cd photo-viewer-api`
3. To install all gems `Bundle install`
4. To create db `rails db:create && db:migrate`
5. To seed db `rails db:seed`
6. Run the server `rails s` -> [http://localhost:3000]

