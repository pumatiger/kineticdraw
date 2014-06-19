'use strict';

angular.module('vxlbrd')
  .directive('board', ['Logger', 'UUID', 'Capturer', 'Distributor', '$timeout', function(Logger, UUID, Capturer, Distributor, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/voxelboard/boardDirective.tpl.html',
      replace: false,
      scope: { config: '=' },
      link: function(scope, element, attrs) {

        var kinetic = null;

        // initialize kinetic and start listening
        $timeout(function() {

          kinetic = scope.kinetic;

          kinetic.buildStage();
          kinetic.addLayer();

          var isMouseDown = false;
          var points = [];
          var actionID = null;

          kinetic.getStageContainer().addEventListener('mousedown', function() {
            isMouseDown = true;
            points = [];
            points.push(kinetic.stage.getPointerPosition().x);
            points.push(kinetic.stage.getPointerPosition().y);
            actionID = Capturer.startAction(points);

            // line = kinetic.line.new(points);
          });
          kinetic.getStageContainer().addEventListener('mousemove', function() {
            if (!isMouseDown) {
              return;
            }
            points.push(kinetic.stage.getPointerPosition().x);
            points.push(kinetic.stage.getPointerPosition().y);
            Capturer.feedAction(actionID, points);

            // kinetic.line.draw(line, points);
          });
          kinetic.getStageContainer().addEventListener('mouseup', function() {
            isMouseDown = false;
            Capturer.endAction(actionID);
          });
        });

        // register this board with Distributor
        Distributor.registerBoard(scope.boardCtrl);
      },
      controllerAs: 'boardCtrl',
      controller: ['$scope', '$element', function($scope, $element) {

        var objects = {};

        this.addLine = function(id, controlData) {
          objects[id] = $scope.kinetic.line.new(controlData.points);
          Logger.debug('boardDirective :: boardCtrl :: addLine :: objects', objects);
        };

        this.drawLine = function(id, controlData) {
          if (!objects[id]) {
            Logger.log('ERROR :: boardDirective :: boardCtrl :: drawLine :: no object with id ' + id + ' available');
            return;
          }
          $scope.kinetic.line.draw(objects[id], controlData.points);
        };
      }]
    };
  }]);
