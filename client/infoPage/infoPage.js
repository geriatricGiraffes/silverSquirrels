angular.module('hikexpert.info', ['hikexpert.services'])

.controller('InfoPageController', function($scope, Info) {
 $scope.trailInfo = {};

 //Get information on trail from API/post it
 $scope.getInfoFromAPI = function() {
    var data = Info.getinfo();
    console.log(data);
 };
});