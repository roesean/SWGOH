app.service("collectionService", function($http) {

  this.getCollection = function(username, cb) {
    $http.get("./collection/?username=" + username)
      .then(function(response) {
        console.log(response.data.results);
        cb(response.data.results)
      },
      function(error) {
        var _collection = []
        cb(_collection)
        console.log(error);
      })
  }

})
