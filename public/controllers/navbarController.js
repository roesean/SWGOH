'use strict';
app.controller("navbarController", function($scope, $state, $stateParams, localStorageService) {

  if(localStorageService.get('userData') == undefined) {
    console.log($scope.currentUser);
  }
  else {
    $scope.currentUser = localStorageService.get('userData').username;
    console.log($scope.currentUser);
  }

  $scope.setCurrentUser = function() {
    console.log($scope.currentUser);
    localStorageService.set('userData', { username: $scope.currentUser })
  }

})
