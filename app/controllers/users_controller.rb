class UsersController < ApplicationController
  def index
  end

  def user
  end

  def request_user()
    response = HTTParty.get("https://jsonplaceholder.typicode.com/users/#{params[:id]}", headers: { "Accept" => "application/json" })
    render json: response.body
  end
end
