
/**
 * LEFT-RIGHT rotation
 *
 * @param {string} currentBearing - The current bearing of the toy robot
 * @param {string} command - The command that is being keyed in by user
 */
const getNewBearing = (currentBearing, command) => {
  const bearings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let currentBearingIndex = bearings.indexOf(currentBearing);

  switch (command) {
    case 'LEFT':
      currentBearingIndex--;
      break;
    case 'RIGHT':
      currentBearingIndex++;
      break;
  }

  if (currentBearingIndex < 0) return 'WEST';
  if (currentBearingIndex > 3) return 'NORTH';

  return bearings[currentBearingIndex];
};

/**
 * MOVE Command
 *
 * @param {array} currentCoordinate - The current X & Y coordinate of the toy robot
 * @param {string} currentBearing - The current bearing that the robot is facing
 */
const getNewCoordinate = (currentCoordinate, currentBearing) => {

  switch (currentBearing) {
    case 'NORTH':
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) + 1).toString());
      return currentCoordinate;
    case 'SOUTH':
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) - 1).toString());
      return currentCoordinate;
    case 'WEST':
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) - 1).toString());
      return currentCoordinate;
    case 'EAST':
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) + 1).toString());
      return currentCoordinate;
    default: 
      console.error('Error in getting new coordinate');
  }
};


module.exports = {getNewBearing, getNewCoordinate };
