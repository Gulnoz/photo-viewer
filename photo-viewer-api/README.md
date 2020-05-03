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
* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)
http://localhost:3000/photos
http://localhost:3000/photos?page=2
http://localhost:3000/photos/filter?dimensions=300x200&page=2

## Deployment instructions
clone Repo
1. Open the directory with cloned repo
2. Run in bash `cd photo-viewer-api`
3. To install all gems `Bundle install`
4. To create db `rails db:create && db:migrate`
5. To seed db `rails db:seed`
6. Run the server `rails s` -> [http://localhost:3000]

