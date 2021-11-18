const command = require('./command.js');
const validator = require('./validator.js');
const util = require('./utils/utils.js');


function readInputCommand () {
  util.info('Enter your command starting with PLACE X,Y,F');
  util.info('where X, Y is the coordinates, and F is the bearing\n');
  
  let stdin = process.openStdin();
  let coordinate = [0, 0];
  let bearing = '';
  let step = 0;
  let splitCommand;
  let isValidInput;


  stdin.addListener('data', function(text) {
    let inputCommand = text.toString().trim().toUpperCase();

    let isValidInputCommand = validator.isValidCommand(step, inputCommand);

    if (isValidInputCommand) {
      if (/^PLACE/.test(inputCommand)) {

        [splitCommand, isValidInput] = command.computeCommand(inputCommand);
        if (isValidInput) {
          coordinate[0] = splitCommand[0];
          coordinate[1] = splitCommand[1];
          bearing = splitCommand[2];
        }
      } else {
        [coordinate, bearing] = command.computeCommand(inputCommand, coordinate, bearing);
      }

      step++;
    }
  });
}   

readInputCommand();
