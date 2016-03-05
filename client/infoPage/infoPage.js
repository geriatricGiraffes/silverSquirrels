angular.module('hikexpert.info', ['hikexpert.services'])

.controller('InfoPageController', function($scope, Info) {
 $scope.trailInfo = {};
  //do i need this?
 //Get information on trail from API/post it
 $scope.getInfo = function() {
    // var data = Info.getInfo();
    console.log("inside controller");
    // console.log(data);
    Info.getInfo().then(function(data2) {
      if(data2){
        console.log("Sucessfully got data: " + data2);
      }
    }, function(error) {
        console.log("Couldn't get anything");
      }
    );
 };

 //$scope.getInfo();
});