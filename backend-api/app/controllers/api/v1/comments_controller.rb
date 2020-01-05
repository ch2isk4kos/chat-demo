class Api::V1::CommentsController < ApplicationController

    before_action :find_comment, only: [:show, :destroy]

    def index
        comments = Comment.all
        render json: @comments, status: 200
    end

    def show
        render json: @comment
    end

    def create
        # byebug
        comment = Comment.create(comment_params)
        render json: @comment, status: 200
    end

    private

    def find_comment
        comment = Comment.find(params[:id])
    end

    def comment_params
        params.require(:comment).permit(:content, :creator, :message_id)
    end

end
