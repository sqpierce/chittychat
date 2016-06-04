// comment this out when debugging
var console = {};
console.log = function(){};

angular.module('chittyChat', [])
.controller('MainCtrl', [
'$scope','$http',
function($scope, $http){
  $scope.app_title = 'Chitty Chitty Chat Chat!';
  $scope.current_user = null;
  $scope.current_topic = null;
  $scope.current_conversation = null;

  // helper methods used in fetchMessages below
  // determine if message is part of topic
  is_topic = function(message){
      if($scope.current_topic){
          return message.topic_id == $scope.current_topic;
      }
      return false;
  }

  // determine if message is part of conversation
  is_conversation = function(message){
      if($scope.current_conversation){
          // shouldn't matter who is recipent and who is sender, so we'll compare the sorted list of ids
          var current_users = _.sortBy([$scope.current_user, $scope.current_conversation], function(id){ return parseInt(id) });
          var message_users = _.sortBy([message.sender_id, message.recipient_id], function(id){ return parseInt(id) });
          return _.isEqual(current_users, message_users);
      }
      return false;
  }

  $scope.fetchMessages = function(){
      console.log("fetching messages");
    $http.get('/messages').success(
      function(data){
        console.log(data);
        $scope.messages = _.filter(data,
            function(val){
                // need to be logged in and either relevant by topic or conversation
                return (
                    ($scope.current_user && (is_topic(val) || is_conversation(val)))
                );
            });
      }
    );
  }

  $scope.fetchTopics = function(){
      console.log("fetching topics");
      $http.get('/topics').success(
          function(data){
              console.log(data);
              $scope.topics = data;
          }
      );
  }

  $scope.fetchUsers = function(){
      console.log("fetching users");
      $http.get('/users').success(
          function(data){
              console.log(data);
              $scope.users = data;
              $scope.current_user_name = get_name_from_list_by_id($scope.users, $scope.current_user);
          }
      );
  }

  $scope.fetchAll = function(){
      console.log("fetching data");
      $scope.fetchUsers();
      if($scope.current_user){
          $scope.fetchTopics();
          $scope.fetchMessages();
      }
  }

  // when current user is updated, re-fetch and re-render users
  $scope.$watch(function() {
     return $scope.current_user;
   }, function(newValue, oldValue) {
       $scope.fetchAll();
   }, true);

   // when current topic is updated, set name, too
   $scope.$watchGroup(
       [function() { return $scope.current_topic; },
           function(){ return $scope.topics }],
      function(newValue, oldValue) {
        $scope.current_topic_name = get_name_from_list_by_id($scope.topics, $scope.current_topic);
        console.log("current toptic name: "+$scope.current_topic_name);
    }, true);

    // when current conversation is updated, set name, too
    $scope.$watchGroup(
        [function() { return $scope.current_conversation; },
            function(){ return $scope.users }],
            function(newValue, oldValue) {
         $scope.current_conversation_name = get_name_from_list_by_id($scope.users, $scope.current_conversation);
         console.log("current conversation name: "+$scope.current_conversation_name);
     }, true);

 $scope.login_or_create = function(username){
      var id = get_id_from_list_by_name($scope.users, username);
      if(id){
          console.log("logging in as "+username);
          $scope.current_user = id;
      }
      else{
          $http.post('/users', { user: { name: username } } ).success(
              function(data){
                  console.log(data);
                  $scope.current_user = data.id;
              }
          );
      }
  }

  $scope.logout = function(){
    $scope.current_user = null;
  }

  $scope.set_current_conversation = function(user_id){
      console.log("setting current conversation "+user_id);
      $scope.current_topic = null;
      $scope.current_conversation = user_id;
      $scope.fetchMessages();
  }

  $scope.set_topic = function(topic_id){
      console.log("setting current topic "+topic_id);
      $scope.current_conversation = null;
      $scope.current_topic = topic_id;
      $scope.fetchMessages();
  }

  $scope.create_topic = function(topic_name){
      var id = get_id_from_list_by_name($scope.topics, topic_name);
      if(id){
          $scope.set_topic(id);
      }
      else{
          var topic = { name: topic_name };
          console.log(topic);
          $http.post('/topics', { topic: topic } ).success(
              function(data){
                  console.log(data);
                  $scope.fetchTopics();
                  $scope.set_topic(data.id);
              }
          );
      }
  }

  $scope.create_message = function(message){
      var sender_id = $scope.current_user;
      var recipient_id = null;
      var topic_id = null;
      if($scope.current_topic){
          topic_id = $scope.current_topic;
      }
      else{
          recipient_id = $scope.current_conversation;
      }
      var message = { text: message, sender_id: sender_id, recipient_id: recipient_id, topic_id: topic_id };
      console.log(message);
      $http.post('/messages', { message: message } ).success(
          function(data){
              console.log(data);
              $scope.fetchMessages();
          }
      );
  }

  get_name_from_list_by_id = function(list, id){
     var obj = _.find(list, function(val){ return val.id == id; });
     console.log(obj);
     if(obj){
         return obj.name;
     }
  }

 get_id_from_list_by_name = function(list, name){
      var obj = _.find(list, function(val){ return val.name == name; });
      if(obj){
          return obj.id;
      }
  }

}]);
