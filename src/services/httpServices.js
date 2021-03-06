var app = angular.module('pnhsApp');
app.factory('apiService', ['$http', '$cookies', '$rootScope', '$q', function($http, $cookies, $rootScope, $q){
	 
  var baseUrl = "http://localhost:8000/";

  return{
    validateLogin: function(credData){
      return $http({
        method:'POST',
        url: baseUrl+'api/login',
        data: credData,
        headers: {
          Accept: "application/json",   
        }
      });
    },
    AuthenticatedUser: function(){
      var status = $cookies.get('auth');
        if(status){
          return true;
        }else{
          return false;
        }
    },
    uploadProfilePic: function(formData){
      return $http({
        method:'POST',
        url: baseUrl+'api/uploadProfilePic',
        data: formData,
        headers: {
          "Content-Type": undefined,
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    savePostDescriptionOnly: function(post_description){
      return $http({
        method:'POST',
        url: baseUrl+'api/savePostDescriptionOnly',
        data: post_description,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    savePostFilesOnly: function(post_files){
      return $http({
        method:'POST',
        url: baseUrl+'api/savePostFilesOnly',
        data: post_files,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    savePostDescriptionWithFiles: function(post){
      return $http({
        method:'POST',
        url: baseUrl+'api/savePostDescriptionWithFiles',
        data: post,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getSearchFriends: function(keyword){
      return $http({
        method:'POST',
        url: baseUrl+'api/getSearchConnections',
        data: keyword,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getPost: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getPost',
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

	}
}]);