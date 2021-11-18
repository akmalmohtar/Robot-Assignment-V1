const logic = require('./logic.js');
const validator = require('./validator.js');
const util = require('./utils/utils.js');

/**
 * Controller to execute command (PLACE, MOVE, LEFT, RIGHT, REPORT)
 *
 * @param {string} command - The command input from user
 * @param {array} coordinate - The X and Y coordinates
 * @param {string} bearing - NORTH, SOUTH, WEST, EAST
 */
const computeCommand = (command, coordinate = null, bearing = null) => {
  switch (true) {
    case /^PLACE/.test(command): {
      let splitCommand = command.split(' ')[1].split(','); //[0,0,NORTH]
      let newBearing = splitCommand[2]; //NORTH

      let isValid = validator.isValidCoordinate(splitCommand) && validator.isValidBearing(newBearing);

      return [splitCommand, isValid];

    }
    case command === 'MOVE': {
      let tempCoordinate = coordinate;
      let computedCoordinate = logic.getNewCoordinate(tempCoordinate, bearing);
      let isValidCoordinate = validator.isValidCoordinate(computedCoordinate);
      if (isValidCoordinate) {
        coordinate = computedCoordinate;
      }
      break;
    }
    case command === 'LEFT': 
      bearing = logic.getNewBearing(bearing, command);
      break;
    case command === 'RIGHT':
      bearing = logic.getNewBearing(bearing, command);
      break;
    case command === 'REPORT': {
      let result = coordinate[0] + ',' + coordinate[1] + ',' + bearing;
      util.success(`\nOutput : ${result}\n`);
      util.info('You may resume with next command or exit program:\n');
    }
  }

  return [coordinate, bearing];
};

module.exports =  {computeCommand};
