angular.module('hikexpert.info', ['hikexpert.services'])

.controller('InfoPageController', function($scope, Info, InfoStorage) {
 $scope.trailInfo = {};

 $scope.getInfofromServer = function() {
    // Get Data stored in InfoStorage
    var info = InfoStorage.getData();

    // Go to server to get info from API using factory
    Info.getInfo(info).then(function(data) {
      if(data){
        console.log("Sucessfully got data: " + data);
        $scope.trailInfo.trailName = data.name;
        $scope.trailInfo.description = data.description;
        $scope.trailInfo.directions = data.directions;
      }
    }, function(error) {
        console.log("Couldn't get anything");
      }
    );
 };

 // Call getInfo to populate information on page 
 $scope.getInfofromServer();
});