'use strict';
app.controller("homeController", function($scope, $state, $stateParams, userService) {

  var headerImages = [
    {
      L: 'url(../assets/1-L.png)',
      C: 'url(../assets/1-C.png)',
      R: 'url(../assets/1-R.png)'
    },
    {
      L: 'url(../assets/2-L.png)',
      C: 'url(../assets/2-C.png)',
      R: 'url(../assets/2-R.png)'
    }
  ]

  $scope.headerImage = headerImages[Math.round(Math.random() * 1)]

  var getProfile = function(user) {
    userService.getProfile(user)
      .then(function(response) {
        console.log(response);
        $scope.currentUserStats = response.data
      },
      function(error) {
        console.log(error);
      })
  }

  if(userService.getCurrentUser() == null) {
    $scope.currentUser = "";
    $scope.showProfile = false
  }
  else {
    $scope.currentUser = userService.getCurrentUser();
    getProfile($scope.currentUser)
    $scope.showProfile = true
  }

  $scope.setCurrentUser = function() {
    userService.setCurrentUser($scope.currentUser)
    getProfile($scope.currentUser)
    $scope.showProfile = true
  }



})
