'use strict';

angular.module('vxlbrd')
  .directive('kinetic', ['Logger', function(Logger) {
    return {
      restrict: 'A',
      replace: false,
      scope: { config: '=', name: '@name' },
      link: function(scope, element, attrs) {
        // make kineticCtrl accessible to surrounding environment
        if (scope.name) {
          scope.$parent[scope.name] = scope.kineticCtrl;
        }
      },
      controllerAs: 'kineticCtrl',
      controller: ['$scope', '$element', function($scope, $element) {

        var config = $scope.config;

        var activeLayer = null;

        this.buildStage = function() {
          this.stage = new Kinetic.Stage({
            container: config.id,
            width: config.width,
            height: config.height
          });
        };

        this.addLayer = function() {
          this.layers = this.layers || [];
          this.layers.push(new Kinetic.Layer());
          this.stage.add(_.last(this.layers));
          activeLayer = _.last(this.layers);
        };

        this.line = {
          new: function(points) {
            var line = new Kinetic.Line({
              points: points,
              stroke: 'green',
              strokeWidth: 5,
              lineCap: 'round',
              lineJoin: 'round'
            });
            activeLayer.add(line);

            return line;
          },
          draw: _.bind(function(line, points) {
            line.setPoints(points);
            this.stage.draw();
          }, this)
        };

        this.getStageContainer = function() {
          return this.stage.container();
        };
      }]
    };
  }]);
