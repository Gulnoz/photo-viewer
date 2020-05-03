class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :url, :dimensions 
end
