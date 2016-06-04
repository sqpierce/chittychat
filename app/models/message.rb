class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :topic, optional: true
  belongs_to :recipient, class_name: 'User', optional: true
end
