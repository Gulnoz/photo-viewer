# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

CSV.foreach(Rails.root.join('lib/BmA8B0tY.csv')) do |el|
dims = "#{el[0].split('/')[5]}x#{el[0].split('/')[6]}"

Photo.create(url: el[0], dimensions: dims)
end
