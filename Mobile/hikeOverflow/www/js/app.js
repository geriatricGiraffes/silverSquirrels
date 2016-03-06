angular.module('hikexpert', [
  'hikexpert.home',
  'hikexpert.auth',
  'ngRoute',
  'hikexpert.services',
  'hikexpert.info',
  'leaflet-directive',
  'ionic',
  'ngCordova'
])
.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/', {
      authenticate: true,
      templateUrl: 'js/homePage/homepage.html',
      controller: 'HomePageController'
    })
    .when('/signin', {
      templateUrl: 'js/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/user', {
      authenticate: true,
      templateUrl: 'js/user/user.html',
      controller: 'HomePageController'
    })
    .when('/signup', {
      templateUrl: 'js/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/info', {
      templateUrl: 'js/infoPage/infoPage.html',
      controller: 'InfoPageController'
    })
    .when('/aboutTeam', {
      templateUrl: 'js/about/aboutTeam.html'
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
    $httpProvider.interceptors.push(function(){
      return {
        request: function(request) {
          // Transform ALL $http calls to that requests that go to '/'
          // instead go to a different origin, in this case localhost:3000
          if (request.url.charAt(0) === '/'){
            request.url = 'http://localhost:8100' + request.url;
          }
          return request;
        }
      };
    });
})

.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.hikexpert');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
