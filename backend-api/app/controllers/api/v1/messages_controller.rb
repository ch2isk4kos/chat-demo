class Api::V1::MessagesController < ApplicationController

    before_action :find_message, only: [:show, :destroy]

    def index
        @messages = Message.all
        render json: @messages, status: 200
    end

    def show
        render json: @message, status: 200
    end

    def create
        @message = Message.create(message_params)
        render json: @message, status: 200
    end

    def destroy
        @message.destroy
        # render json: {messageId: @message.id}
    end

    private

    def find_message
        @message = Message.find(params[:id])
    end

    def message_params
        params.require(:message).permit(:content, :creator, comments: [:id, :content, :creator, :message_id])
    end

end
