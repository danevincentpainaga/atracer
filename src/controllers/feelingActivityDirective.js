var EmojiConvertor = require('emoji-js');
angular.module('pnhsApp').directive('feelingActivityDirective', ['$sce', '$timeout', function($sce, $timeout){

  function link(scope, elem, attrs){

    scope.$watch('status', function(newval, oldval){
      if (newval) {

        $('.feeling_activity_wrapper').animate({'position': 'absolute', 'right': 0 + 'px'}, 40);
        let w = $('.emoji_activity_wrapper');

        scope.getWindowDimensions = function () {
            return {
              'h': w.height(),
            };
        };
        
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
          $timeout(function() {
            $('.wrapper').css({ 'height': (newValue.h) + 70 + 'px'}); 
            scope.$apply(scope.getWindowDimensions);
          }, 40);
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });

      }else{
        $('.wrapper').css({ 'height': 'auto'});
        $('.feeling_activity_wrapper').animate({'position': 'absolute', 'right': -550 + 'px'}, 40);
      }

    }, true);

    let emoji = new EmojiConvertor();
    emoji.img_set = 'facebook';
    emoji.img_sets.facebook.path = 'node_modules/emoji-datasource-facebook/img/facebook/64/';

    scope.emoji_colons = [
      { feeling: ":smile: Happy" },
      { feeling: ":face_with_thermometer: Sick" },
      { feeling: ":angry: Angry" },
      { feeling: ":sunglasses: Cool" },
      { feeling: ":disappointed: Disappointed" },
      { feeling: ":tired_face: Tired" },
      { feeling: ":heart_eyes: Loved" },
      { feeling: ":heart_eyes: Loved" },
      { feeling: ":sweat: Exhausted" },
      { feeling: ":weary: Worried" },
      { feeling: ":flushed: Surprised" },
    ];
  }

  return{
    restrict:'E',
    templateUrl:'src/views/feeling_activity_directive.html',
    controller: 'feelingActivityCtrl',
    controllerAs: 'fc',
    scope:{
      status: '='
    },
    link: link
  }

}]);