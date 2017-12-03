app.service("homeService", function($state) {

  var currentUser = null

  this.setCurrentUser = function(user) {
    currentUser = user.toLowerCase()
    $state.go("characters")
  }

  this.getCurrentUser = function(user) {
    console.log("returning current user");
    return currentUser
  }

})
