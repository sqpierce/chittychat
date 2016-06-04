# README

## Chitty Chitty Chat Chat!

### ActionCable-based chat app (first pass)

#### Dependencies

This app was built using Rails 5.0.0.rc1 and Ruby 2.3.1.

Postgres and Redis are required to be running on localhost on the default ports.

Angular and Underscore are pulled in via CDN.

#### Set Up

To set up, clone repo, then:

```
$ cd chittychat
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed # this is technically optional
$ rails s # and visit http://localhost:3000/
```

#### Usage

In the login field, you can type any name and a user will be created (if it doesn't exist), or if you use an existing name from the database ("Caratacus Potts", for example, if you seeded the database), you will use the app as that user (no authentication).

Once logged in, you may click on an existing topic or user (for direct messages), or create a new topic.

Once a topic or direct message channel has been selected, you can type messages and they will be added to the relevant conversation.

If logged in as two users (in separate browsers, or Incognito window), messages typed by one user will be reflected in the other user's browser (assuming both are viewing the same topic or direct message channel). The mechanism for this is ActionCable (hence Redis dependency), but at this time it simply alerts the subscribed clients that there's been a change and all data is re-fetched (we put the 'M' in 'MVP').

#### TODO

* Don't re-fetch data with each update.
* Don't fetch all messages and filter client-side.
* Ability to delete topics, users, messages?
* ActionCable to pass new data only for appending as appropriate.
* TESTS!
