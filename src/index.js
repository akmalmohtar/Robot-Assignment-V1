const command = require('./command.js');
const validator = require('./validator.js');

/**
 * Read Input from user 
 */

function readInputCommand () {
  console.log('You can begin typing your command with PLACE X,Y,F');

  let stdin = process.openStdin();
  let coordinate = [0, 0];
  let bearing = '';
  let step = 0;


  stdin.addListener('data', function(text) {
    let inputCommand = text.toString().trim().toUpperCase();

    let isValidInputCommand = validator.isValidCommand(step, inputCommand);

    if (isValidInputCommand) {
      if (validator.isCommandTypeOf('PLACE', inputCommand)) {
        let newX;
        let newY;
        let newBearing;
        let isValidInput;
        [newX, newY, newBearing, isValidInput] = command.computeCommand(inputCommand);

        if (isValidInput) {
          coordinate[0] = newX;
          coordinate[1] = newY;
          bearing = newBearing;
        }
      } else {
        [coordinate, bearing] = command.computeCommand(inputCommand, coordinate, bearing);
      }

      if (isValidInputCommand) {
        step++;
      }
    }
  });
}   

readInputCommand();
