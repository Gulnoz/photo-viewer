class PhotosController < ApplicationController
before_action :photo_params, only: [:create]
before_action :find_photo, only: [:show, :photo_by_size]

def index
    @photos = Photo.all_cached
    if params[:filter] && params[:filter]!='false'
        photo_by_dimensions
    elsif params[:page] && params[:filter]='false'
    @pages = (@photos.count.to_f/10.0).ceil
    render json: {data: @photos.paginate(page: params[:page], per_page: 10).as_json(only: [:id,:url]), pages: @pages} 
    else               
    render json: @photos
    end
end

def show 
     if @photo && params.try(:has_key?, :grayscale)
        @photo[:url] = @photo[:url]+'?grayscale' 
        render json: @photo
    else 
        render json: @photo
     end   
end
def photo_by_size 
     if @photo && params.try(:has_key?, :width) && params.try(:has_key?, :height)
       image_url = @photo[:url].split("/")
       image_url[-2] = params[:width]
       image_url[-1] = params[:height]
       @photo[:url] = image_url.join("/") 
        if params.try(:has_key?, :grayscale)
            @photo[:url] = @photo[:url]+'?grayscale' 
        end
        render json: @photo
     else 
        render json: @photo
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

def get_dimensions
    @dimensionsArr = Photo.select(:dimensions).group(:dimensions)
    render json: {data: @dimensionsArr}
end

def photo_by_dimensions
    @photos = Photo.where(dimensions: params[:filter])
    @pages = (@photos.count.to_f/10.0).ceil
    if params[:page]
      render json: {data: @photos.paginate(page: params[:page], per_page: 10).as_json(only: [:id,:url]), pages: @pages} 
    else
      render json: @photos
    end
end
end

private

def find_photo
    begin
    @photo = Photo.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json:{ error: "Photo with {:id => #{params[:id]}} not found!"}
    end 
end
def photo_params
    params.permit(:url, :dimensions)
end

