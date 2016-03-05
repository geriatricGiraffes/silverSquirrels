angular.module('hikexpert.info', ['hikexpert.services'])

.controller('InfoPageController', function($scope, Info) {
 $scope.trailInfo = {};

 //Get information on trail from API/post it
 $scope.getInfo = function() {
    // var data = Info.getInfo();
    // console.log("hello");
    // console.log(data);
    Info.getInfo().then(function(data) {
      if(data){
        console.log("Sucessfully got data: " + data);
      }
    }, function(error) {
        console.log("Couldn't get anything");
      }
    );
 };

 //$scope.getInfo();
});