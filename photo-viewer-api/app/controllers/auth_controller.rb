class AuthController < ApplicationController
MY_SECRET = ENV['my_secret']


def login
    @user = User.find_by(email: login_params[:email])
    if @user && @user.authenticate(login_params[:password])
        token = JWT.encode({user_id: @user.id}, MY_SECRET, 'HS256')
        render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    elsif @user && !@user.authenticate(login_params[:password])
        render json: ({'error':'Wrong password'})
    else  
        render json: ({'error':'Not exist'})
    end
end
def persist
    
    if request.headers['Authorization']
        
        encoded_token = request.headers['Authorization'].split(' ')[1]
        begin
            token = JWT.decode(encoded_token, MY_SECRET)
            user_id = token[0]['user_id']
            user = User.find(user_id)
            token = JWT.encode({user_id: user.id}, MY_SECRET, 'HS256')
       
            render json: { user: UserSerializer.new(user), jwt: token }, status: :accepted
        rescue JWT::DecodeError
             render json: ({'error':'test'})
        end
    else 
    render json: ({'error':'Not exist'})
    end
end

private

def login_params
    params.permit(:email, :password)
end

end