'use strict';
app.service("userService", function($http, localStorageService) {

  // Current User
  if(localStorageService.get('userData') == undefined) {
    this.currenetUser = null;
    console.log(this.currentUser);
  }
  else {
    this.currentUser = localStorageService.get('userData').username;
    console.log(this.currentUser);
  }

  this.setCurrentUser = function(user) {
    localStorageService.set('userData', { username: user })
    this.currentUser = user
  }

  this.getCurrentUser = function() {
    return this.currentUser
  }

  this.removeCurrentUser = function() {
    localStorageService.remove('userData')
  }

  //HTTP REQUESTS
  this.getProfile = function(user) {
    return $http.get('./profile/?username=' + user)
  }

})
