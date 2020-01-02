class CommentSerializer < ActiveModel::Serializer
    attributes :id, :content, :creator, :message_id
    belongs_to :message
end
