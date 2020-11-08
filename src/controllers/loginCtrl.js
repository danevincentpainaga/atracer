'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the pnhs_alumni
 */ 

var app = angular.module('pnhsApp');
app.controller('loginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var lg = this;

  lg.buttonMessage = 'LOGIN';
  lg.loginBtn = false;

  lg.login =function(){
    if(!lg.email || !lg.password){
      console.log('unAuthenticated');
    }else{
      lg.buttonMessage = 'Signing In...';
      lg.loginBtn = true;
      
      var credentials = {
        email: lg.email,
        password: lg.password
      }

      console.log(credentials);
      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          $location.path('/feed'); 
          lg.buttonMessage = 'LOGIN';
          lg.loginBtn = false;
      }, function(err){
          console.log(err);
          lg.buttonMessage = 'LOGIN';
          lg.loginBtn = false;
      });
    }
  }

}]);
