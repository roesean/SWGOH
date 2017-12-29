app.controller("homeController", function($scope, $state, $stateParams, userService) {

  if(userService.getCurrentUser() == null) {
    $scope.currentUser = "";
    console.log($scope.currentUser);
  }
  else {
    $scope.currentUser = userService.getCurrentUser();
    console.log($scope.currentUser);
  }

  $scope.setCurrentUser = function() {
    userService.setCurrentUser($scope.currentUser)
    $state.go("app.territoryWars")
  }

})
