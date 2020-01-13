# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.delete_all
# Comment.delete_all

Message.create([
    {content: "This is a message from the console", creator: "User1"},
    {content: "This is another message", creator: "User2"},
    {content: "And another message", creator: "User3"},
    {content: "You guessed it, yet another message", creator: "User4"},
    {content: "MESSAGE!", creator: "User5"}
])

Comment.create([
    {content: "This is a comment from the console", creator: "User6", message_id: 1},
    {content: "This is another comment from the console", creator: "User7", message_id: 2},
])
