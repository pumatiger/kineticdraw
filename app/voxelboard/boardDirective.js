'use strict';

angular.module('vxlbrd')
  .directive('board', ['Logger', '$timeout', function(Logger, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/voxelboard/boardDirective.tpl.html',
      replace: false,
      scope: { config: '=' },
      link: function(scope, element, attrs) {

        var kinetic = null;

        // initialize kinetic
        $timeout(function() {

          kinetic = scope.kinetic;

          kinetic.buildStage();
          kinetic.addLayer();

          var line = null;
          var isMouseDown = false;
          var points = [];

          // start listening for mouseevents

          kinetic.getStageContainer().addEventListener('mousedown', function() {
            isMouseDown = true;
            points = [];
            points.push(kinetic.stage.getPointerPosition().x);
            points.push(kinetic.stage.getPointerPosition().y);
            line = kinetic.line.new(points);
          });
          kinetic.getStageContainer().addEventListener('mouseup', function() {
            isMouseDown = false;
          });
          kinetic.getStageContainer().addEventListener('mousemove', function() {
            if (!isMouseDown) {
              return;
            }
            points.push(kinetic.stage.getPointerPosition().x);
            points.push(kinetic.stage.getPointerPosition().y);
            kinetic.line.draw(line, points);
          });

        });
      },
      controllerAs: 'boardCtrl',
      controller: ['$scope', '$element', function($scope, $element) {

      }]
    };
  }]);
