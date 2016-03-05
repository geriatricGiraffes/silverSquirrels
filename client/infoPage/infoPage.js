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
    console.log(info);
    Info.getInfo(info).then(function(data) {
      if(data){
        console.log("Sucessfully got data: " + data);
      }
    }, function(error) {
        console.log("Couldn't get anything");
      }
    );
 };

 $scope.getInfo();
});