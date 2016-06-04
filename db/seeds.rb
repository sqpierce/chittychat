# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(name: 'Caratacus Potts')
user2 = User.create(name: 'Truly Scrumptious')
user3 = User.create(name: 'Grandpa')

topic1 = Topic.create(name: 'Cars')
topic2 = Topic.create(name: 'Vulgaria')

message1 = Message.create(sender: user1, topic: topic1, text: 'Here in my car.')
message2 = Message.create(sender: user2, topic: topic1, text: 'Yes, you are.')
message3 = Message.create(sender: user1, topic: topic1, text: 'And you are not.')
message4 = Message.create(sender: user3, topic: topic2, text: 'Nasty smelly things, motorcars!')
message5 = Message.create(sender: user1, recipient: user2, text: 'Grandpa is mad.')
message6 = Message.create(sender: user2, recipient: user1, text: 'Indeed.')
