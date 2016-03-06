angular.module('hikexpert.services', ['ionic'])

.factory('Home', function($http){
   var baseUrl = 'http://localhost:8100';
  var getCoords = function(userInfo){
    return $http({
      method: 'POST',
      url: 'api/coords',
      data: userInfo
    }).then(function(resp){
      return resp.data;
    });
  };

  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/getUser'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  // Puts trails in hasDone or wantToDo arrays, based on the url endpoint used
  var trailPost = function (trailName, url) {
    var trailObj = {
      trailName : trailName
    };
    return $http({
      method: 'POST',
      url : url,
      data : trailObj
    });
  };

  return {
    trailPost : trailPost,
    getUser : getUser,
    getCoords : getCoords
  };
})

.factory('Auth', function($http, $location, $window) {
    var baseUrl = 'http://localhost:8100';
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.hikexpert');
  };

  var signout = function() {
    $window.localStorage.removeItem('com.hikexpert');
    $location.path('/signin');
  };

  return {
    signin : signin,
    signup : signup,
    isAuth : isAuth,
    signout : signout
  };
})

.factory('Info', function($http) {
  var getInfo = function(info) {
    return $http({
      method: 'POST',
      url: 'api/trailinfo',
      data: info
    })

    .then(function(res) {
      return res.data;
    });
  };

  return {
    getInfo: getInfo
  };
})

.factory('InfoStorage', function(){
    // Going to package info for server in object
    var packagedInfo = {};

    return {
      setData: function(info) {
        packagedInfo['lat'] = info[0];
        packagedInfo['lng'] = info[1];
        packagedInfo['name'] = info[2]
      },
      getData: function() {
        return packagedInfo;
      }
    }
});

