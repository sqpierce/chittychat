App.messages = App.cable.subscriptions.create('MessagesChannel', {
  connected: function(){
      console.log('messages channel connected');
  },

  received: function(data) {
    console.log('msg received');
    scope=angular.element(document.querySelector("body")).scope();
    scope.fetchAll();
    // eventually we'll want to pass individual data items
    // and append as appropriate for messages, topics, users (separate channels?)
    //scope.messages.push(data);
    return true;
  }
});
