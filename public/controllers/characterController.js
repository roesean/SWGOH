app.controller("characterController", function($scope, $state, $stateParams, homeService, collectionService) {

  $scope.collection = []
  $scope.currentUser = homeService.getCurrentUser()

  collectionService.getCollection($scope.currentUser, function(collection) {
    $scope.collection = collection
  })

  $scope.percent = function(min, max) {
    return Math.round((min / max) * 100)
  }

})
