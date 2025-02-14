module Api
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.order(created_at: :desc).includes(:user)
      render json: {success: true, tweets: @tweets.as_json(include: :user)}
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save
        render json: {success: true, tweet: @tweet.as_json(include: :user)}, status: :created
      else
        render json: {success: false, errors: @tweet.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      tweet = Tweet.find_by(id: params[:id])

      if tweet && (tweet.user == user) && tweet.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets
        render json: {success: true, tweets: @tweets}, status: :ok
      end
    end

    private

    def tweet_params
      params.permit(:message, :image)
    end
  end
end
