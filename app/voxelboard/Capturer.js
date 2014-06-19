'use strict';

angular.module('vxlbrd')
  .factory('Capturer', ['Logger', 'UUID', 'Distributor', function(Logger, UUID, Distributor) {
    var activeTool = 'pen';
    return {
      startAction: function(points) {
        var id = UUID.new();
        Distributor.add(activeTool, id, {points: points});
        return id;
      },
      feedAction: function(id, points) {
        Distributor.render(activeTool, id, {points: points});
      },
      endAction: function() {

      },
      setTool: function(tool) {
        activeTool = tool;
      }
    };
  }]);
