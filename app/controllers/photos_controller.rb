class PhotosController < ApplicationController
before_action :photo_params, only: [:create]

def index
    @photos = Photo.all
    render json: @photos.paginate(page: params[:page], per_page: 10)
end
def create
    @photo = Photo.create!(photo_params)
    render json: @photo
end

def photoByDimension
    @photos = Photo.where(dimentions: params[:dimentions])
    render json: @photos
end


end

private

def photo_params
    params.permit(:url, :dimentions)
end

