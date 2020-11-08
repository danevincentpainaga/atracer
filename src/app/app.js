angular
.module('pnhsApp', [
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.router.state.events',
  'ngSanitize',
  'ngTouch',
  'ngFileUpload',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('base', {
      url: '/',
      templateUrl: 'src/views/login.html',
      controller: 'loginCtrl',
      controllerAs: 'lg'
    })
    .state('/404-page-not-found', {
      url: '/404-page-not-found',
      templateUrl: 'src/views/404.html',
    })
    .state('feed', {
      url: '/feed',
      templateUrl: 'src/views/home.html',
    })
    .state('timeline', {
      url: '/timeline/:uname',
      resolve:{
        app: function($stateParams, $location){
          if (!$stateParams.uname) {
            $location.path('/');
          }
        }
      },
      views:{
        '':{
          templateUrl: 'src/views/timeline.html',
        },
        'timeline-view@timeline':{
          templateUrl: 'src/views/timeline-feed.html',
        }
      },
    })

  $urlRouterProvider.otherwise('404-page-not-found');
})
.run(['$transitions', '$rootScope', '$cookies', 'apiService',  function($transitions, $rootScope, $cookies, apiService){

    $transitions.onStart({}, function(transition) {
    
    var $state = transition.router.stateService;  
    
    if (!apiService.AuthenticatedUser()) {
        $state.go('base');
    }
  
  });

  $transitions.onStart({ to: 'base'}, function(transition) {
    
    if (apiService.AuthenticatedUser()) transition.router.stateService.go('feed');

  });

  $transitions.onSuccess({ entering: 'feed'}, function(transition) {
    var auth = $cookies.getObject('auth');
    $rootScope.loggedIn = true;
    $rootScope.token = auth.success.token;
    console.log(auth);
  });

  $transitions.onSuccess({ to: '/404-page-not-found' }, function(transition) {
    $rootScope.loggedIn = false;
  });

}]);

var EmojiConvertor = require('emoji-js');
require('../services/alertServices.js');
require('../controllers/mainCtrl.js');
require('../services/httpServices.js');
require('../controllers/filters.js');
require('../controllers/loginCtrl.js');
require('../controllers/newsfeedCtrl.js');
require('../controllers/emojiDirective.js');
require('../controllers/modalDirective.js');
require('../controllers/openModalDirective.js');
require('../controllers/postsCtrl.js');
require('../controllers/modalDirective.js');
require('../controllers/taggedUserListCtrl.js');
require('../controllers/tagFriendsSuggestionsDirective.js');
require('../controllers/feelingActivityCtrl.js');
require('../controllers/feelingActivityDirective.js');
