const logic = require('./logic.js');
const validator = require('./validator.js');

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
      let splitCommand = command.split(' ')[1].split(',');
      let newX = splitCommand[0];
      let newY = splitCommand[1]; 
      let newBearing = splitCommand[2];

      let isValid = validator.isValidCoordinate(splitCommand) && validator.isValidBearing(newBearing);

      return [parseInt(newX), parseInt(newY), newBearing, isValid];

    }
    case command === 'MOVE': {
      let tempCoordinate = coordinate.slice(0);
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
      console.log(`\nOutput : ${result}\n`);
      console.log('You may resume with next command or exit program:\n');
    }
  }

  return [coordinate, bearing];
};

module.exports =  {computeCommand};
