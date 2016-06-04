class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :text, null: false
      t.integer :sender_id, null: false
      t.integer :topic_id, null: true
      t.integer :recipient_id, null: true

      t.timestamps
    end
  end
end
