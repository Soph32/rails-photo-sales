class AlbumsController < ApplicationController  
  def index
  end

  def request_albums()
    response = HTTParty.get("https://jsonplaceholder.typicode.com/albums", headers: { "Accept" => "application/json" })
    render json: response.body
  end

  def request_album()
    response = HTTParty.get("https://jsonplaceholder.typicode.com/albums/#{params[:id]}", headers: { "Accept" => "application/json" })
    render json: response.body
  end

  def request_photos()
    response = HTTParty.get("https://jsonplaceholder.typicode.com/photos?albumId=#{params[:id]}", headers: { "Accept" => "application/json" })
    render json: response.body
  end
end
