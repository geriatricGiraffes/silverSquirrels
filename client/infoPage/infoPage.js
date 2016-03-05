angular.module('hikexpert.info', ['hikexpert.services'])

.controller('InfoPageController', function($scope, Info, InfoStorage) {
 $scope.trailInfo = {};
  //do i need this?
 //Get information on trail from API/post it
 $scope.getInfo = function() {
    // var data = Info.getInfo();
    console.log("inside controller");
    // console.log(data);
    var info = InfoStorage.getData();
    console.log("This is the info for server: ");
    console.log(typeof info);
    console.log(Object.keys(info));
    Info.getInfo(info).then(function(data) {
      if(data){
        console.log("Sucessfully got data: " + data);
        console.log(data.name + " " + data.directions + " " + data.description);
        $scope.trailInfo.trailName = data.name;
        $scope.trailInfo.description = data.description;
        $scope.trailInfo.directions = data.directions;
      }
    }, function(error) {
        console.log("Couldn't get anything");
      }
    );
 };
 $scope.getInfo();
});