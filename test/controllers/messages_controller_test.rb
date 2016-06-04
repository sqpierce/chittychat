require 'test_helper'

class MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @message = messages(:one)
  end

  test "should get index" do
    get messages_url
    assert_response :success
  end

  test "should create message" do
    assert_difference('Message.count') do
      post messages_url, params: { message: { recipient_id: @message.recipient_id, sender_id: @message.sender_id, text: @message.text, topic_id: @message.topic_id } }
    end

    assert_response 201
  end

  test "should show message" do
    get message_url(@message)
    assert_response :success
  end

  test "should update message" do
    patch message_url(@message), params: { message: { recipient_id: @message.recipient_id, sender_id: @message.sender_id, text: @message.text, topic_id: @message.topic_id } }
    assert_response 200
  end

  test "should destroy message" do
    assert_difference('Message.count', -1) do
      delete message_url(@message)
    end

    assert_response 204
  end
end
