app.controller("homeController", function($scope, $state, $stateParams, homeService) {

  $scope.userName = ""

  $scope.setCurrentUser = function() {
    homeService.setCurrentUser($scope.userName)
  }
  
})
