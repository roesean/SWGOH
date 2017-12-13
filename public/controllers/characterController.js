app.controller("characterController", function($scope, $state, $stateParams, homeService, collectionService) {

  var charIndex = null;
  var dragStart = null
  $scope.collection = []

  $scope.offense1 = []
  $scope.offense2 = []
  $scope.offense3 = []
  $scope.offense4 = []

  $scope.defense1 = []
  $scope.defense2 = []
  $scope.defense3 = []
  $scope.defense4 = []

  $scope.offenseOneGP = function() {
    var gp = 0;
    console.log($scope.offense1);
    for (var i = 0; i < $scope.offense1.length; i++) {
      gp += $scope.offense1[i].galacticPower
    }
    return gp
  }

  $scope.offenseTwoGP = function() {
    var gp = 0;
    for (var i = 0; i < $scope.offense2.length; i++) {
      gp += $scope.offense2[i].galacticPower
    }
    return gp
  }

  $scope.offenseThreeGP = function() {
    var gp = 0;
    for (var i = 0; i < $scope.offense3.length; i++) {
      gp += $scope.offense3[i].galacticPower
    }
    return gp
  }

  $scope.offenseFourGP = function() {
    var gp = 0;
    for (var i = 0; i < $scope.offense4.length; i++) {
      gp += $scope.offense4[i].galacticPower
    }
    return gp
  }

  $scope.currentUser = homeService.getCurrentUser()

  collectionService.getCollection($scope.currentUser, function(collection) {
    $scope.collection = collection
  })

  $scope.percent = function(min, max) {
    return Math.round((min / max) * 100)
  }

  $scope.onDragStart = function(event, data) {

    if(event.target.dataset.ngRepeat.includes("collection")) {
      charIndex = $scope.collection.indexOf(data)
      dragStart = "collection"
    }

    if(event.target.dataset.ngRepeat.includes("offense1")) {
      charIndex = $scope.offense1.indexOf(data)
      dragStart = "offense1"
    }

    if(event.target.dataset.ngRepeat.includes("offense2")) {
      charIndex = $scope.offense2.indexOf(data)
      dragStart = "offense2"
    }

    if(event.target.dataset.ngRepeat.includes("offense3")) {
      charIndex = $scope.offense3.indexOf(data)
      dragStart = "offense3"
    }

    if(event.target.dataset.ngRepeat.includes("offense4")) {
      charIndex = $scope.offense4.indexOf(data)
      dragStart = "offense4"
    }

    if(event.target.dataset.ngRepeat.includes("defense1")) {
      charIndex = $scope.defense1.indexOf(data)
      dragStart = "defense1"
    }

    if(event.target.dataset.ngRepeat.includes("defense2")) {
      charIndex = $scope.defense2.indexOf(data)
      dragStart = "defense2"
    }

    if(event.target.dataset.ngRepeat.includes("defense3")) {
      charIndex = $scope.defense3.indexOf(data)
      dragStart = "defense3"
    }

    if(event.target.dataset.ngRepeat.includes("defense4")) {
      charIndex = $scope.defense4.indexOf(data)
      dragStart = "defense4"
    }
  }

  $scope.onDragEnd = function(event, data) {
    console.log("DRAG END");
  }

  $scope.onDragEnter = function(event, data) {
    console.log("DRAG ENTER");
  }

  $scope.onDragOver = function(event, data) {
    console.log("DRAG OVER");
  }

  $scope.onDragLeave = function(event, data) {
    console.log("DRAG LEAVE");
  }

  $scope.dropAccept = function(event, data) {

    if(event.target.dataset.dropzone == "offense1") {
      if($scope.offense1.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "offense2") {
      if($scope.offense2.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "offense3") {
      if($scope.offense3.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "offense4") {
      if($scope.offense4.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "defense1") {
      if($scope.defense1.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "defense2") {
      if($scope.defense2.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "defense3") {
      if($scope.defense3.length == 5) {
        return false;
      }
      return true
    }

    if(event.target.dataset.dropzone == "defense4") {
      if($scope.defense4.length == 5) {
        return false;
      }
      return true
    }

  }

  $scope.onDrop = function(event, data) {

    if(event.target.dataset.dropzone == "collection") {
      $scope.collection.push(data)

          if(dragStart == "collection") {
            $scope.collection.splice(charIndex, 1)
          }

          if(dragStart == "offense1") {
            $scope.offense1.splice(charIndex, 1)
          }

          if(dragStart == "offense2") {
            $scope.offense2.splice(charIndex, 1)
          }

          if(dragStart == "offense3") {
            $scope.offense3.splice(charIndex, 1)
          }

          if(dragStart == "offense4") {
            $scope.offense4.splice(charIndex, 1)
          }

          if(dragStart == "defense1") {
            $scope.defense1.splice(charIndex, 1)
          }

          if(dragStart == "defense2") {
            $scope.defense2.splice(charIndex, 1)
          }

          if(dragStart == "defense3") {
            $scope.defense3.splice(charIndex, 1)
          }

          if(dragStart == "defense4") {
            $scope.defense4.splice(charIndex, 1)
          }
    }

    if(event.target.dataset.dropzone == "offense1") {
      $scope.offense1.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "offense2") {
      $scope.offense2.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "offense3") {
      $scope.offense3.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "offense4") {
      $scope.offense4.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "defense1") {
      $scope.defense1.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "defense2") {
      $scope.defense2.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "defense3") {
      $scope.defense3.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

    if(event.target.dataset.dropzone == "defense4") {
      $scope.defense4.push(data)

      if(dragStart == "collection") {
        $scope.collection.splice(charIndex, 1)
      }

      if(dragStart == "offense1") {
        $scope.offense1.splice(charIndex, 1)
      }

      if(dragStart == "offense2") {
        $scope.offense2.splice(charIndex, 1)
      }

      if(dragStart == "offense3") {
        $scope.offense3.splice(charIndex, 1)
      }

      if(dragStart == "offense4") {
        $scope.offense4.splice(charIndex, 1)
      }

      if(dragStart == "defense1") {
        $scope.defense1.splice(charIndex, 1)
      }

      if(dragStart == "defense2") {
        $scope.defense2.splice(charIndex, 1)
      }

      if(dragStart == "defense3") {
        $scope.defense3.splice(charIndex, 1)
      }

      if(dragStart == "defense4") {
        $scope.defense4.splice(charIndex, 1)
      }
    }

  }

})
