class PhotosController < ApplicationController
before_action :photo_params, only: [:create]
before_action :find_photo, only: [:show]

def index
    @photos = Photo.all_cached
    if params[:filter] && params[:filter]!='false'
        photoByDimensions
    elsif params[:page] && params[:filter]='false'
    render json: {data: @photos.paginate(page: params[:page], per_page: 10).as_json(only: [:id,:url]), pages: Photo.max_pages} 
    else               
    render json: @photos
    end
end

def show 
    begin
    if @photo && params.try(:has_key?, :grayscale)
       @photo[:url] = @photo[:url]+'?grayscale' 
       render json: @photo
    elsif @photo && !params.try(:has_key?, :grayscale)
       render json: @photo
    end
    rescue ActiveRecord::RecordNotFound => e
       render json:{ error: "Photo with {:id => #{params[:id]}} not found!"}
    end
end

def create
    @photo = Photo.create!(photo_params)
    if @photo
    render json: @photo
    else
    render json: {error: 'Adding new photo failed'}
    end
end

def getDimensions
    @dimensionsArr = Photo.select(:dimensions).group(:dimensions)
    render json: {data: @dimensionsArr}
end

def photoByDimensions
    @photos = Photo.where(dimensions: params[:filter])
    if params[:page]
      render json: {data: @photos.paginate(page: params[:page], per_page: 10).as_json(only: [:id,:url]), pages: Photo.max_pages} 
    else
      render json: @photos
    end
end
end

private

def find_photo
    @photo = Photo.find(params[:id])
end
def photo_params
    params.permit(:url, :dimensions)
end

