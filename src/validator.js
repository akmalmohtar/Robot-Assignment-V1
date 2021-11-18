const util = require('./utils/utils.js');

const isValidCommand = (step, command) => {
  let isValid = true;
  // Validate user input
  if (isInvalidFirstCommand(step, command)) {
    util.info('The first command should be "PLACE <x-coordinate>,<y-coordinate>,<bearing>"');
    isValid = false;
  } else if (isInvalidKeyword(command)) {
    util.error('Please enter a valid command: PLACE, MOVE, LEFT, RIGHT, REPORT');
    isValid = false;
  }
  
  return isValid;
};

//Validate first command where it should only accept PLACE
const isInvalidFirstCommand = (step, command) => {
  let firstCommand = command.split(' ')[0];
  let isValidFirstCommand = firstCommand === 'PLACE' ? false : true;
  return step === 0 && isValidFirstCommand;

};
  
//Validate list of command entered by user, should only received below commands. 
const isInvalidKeyword = command => {
  return /^PLACE|MOVE|LEFT|RIGHT|REPORT/.test(command) === false;
};

  
const isValidCoordinate = coordinate => {
  const testX = parseInt(coordinate[0]) >= 0 && parseInt(coordinate[0]) < 5;
  const testY = parseInt(coordinate[1]) >= 0 && parseInt(coordinate[1]) < 5;
  if (!testX || !testY) {
    util.error(`OUT OF BOUND: Robot cannot be placed in this position [${coordinate[0]},${coordinate[1]}]`);
  }
  return testX && testY;
};
  
const isValidBearing = bearing => {
  const result = ['NORTH', 'SOUTH', 'EAST', 'WEST'].indexOf(bearing) !== -1;
  if (!result) {
    util.info(`Please key in one of the valid bearings: NORTH, SOUTH, EAST, WEST`);
  }
  return result;
};

  
module.exports = { isInvalidFirstCommand, isInvalidKeyword, isValidCommand, isValidCoordinate, isValidBearing};