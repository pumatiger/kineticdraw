'use strict';

angular.module('vxlbrd')
  .factory('Distributor', ['Logger', function(Logger) {

    var board = null;

    return {
      registerBoard: function(boardCtrl) {
        board = boardCtrl;
      },
      add: function(tool, id, controlData) {
        Logger.debug('Distributor :: add', tool, id, controlData);
        if (!board) {
          Logger.log('Distributor :: add :: no board registered!');
          return;
        }
        switch (tool) {
          case 'pen':
            board.addLine(id, controlData);
            break;
          default:
            Logger.log('Distributor :: add :: undefined tool!', tool);
        }
      },
      render: function(tool, id, controlData) {
        // Logger.debug('Distributor :: render', tool, id, controlData);
        if (!board) {
          Logger.log('Distributor :: render :: no board registered!');
          return;
        }
        switch (tool) {
          case 'pen':
            board.drawLine(id, controlData);
            break;
          default:
            Logger.log('Distributor :: render :: undefined tool!', tool);
        }
      }
    };
  }]);
