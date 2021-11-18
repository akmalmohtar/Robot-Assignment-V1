const validator = require('../validator.js');
const command = require('../command.js');


test('1. Test for PLACE command as the first command', () => {
  let step = 0;
  let validCommand = 'PLACE 1,2,N';
  let invalidCommand = 'MOVE';
    
  expect(validator.isInvalidFirstCommand(step, validCommand)).toBeFalsy();
  expect(validator.isInvalidFirstCommand(step, invalidCommand)).toBeTruthy();
});

test('2. Test for valid and invalid commands (PLACE, MOVE, LEFT, RIGHT, REPORT', () => {
  let validCommands = ['PLACE 1,2,N', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
  let invalidCommands = ['PALACE', 'GG', 'HHH'];
  
  validCommands.map(validCommand => {
    expect(validator.isInvalidKeyword(validCommand)).toBeFalsy();
  });
  
  invalidCommands.map(invalidCommand => {
    expect(validator.isInvalidKeyword(invalidCommand)).toBeTruthy();
  });
});

test('3. MOVE should move the robot one unit forward on the a given bearing', () => {
  let commandInput = 'MOVE';
  let initialCoordinate = [2, 2];
  let initialBearing = 'EAST';
  let expectedCoordinate = [3, 2];
  let expectedDirection = 'EAST';
  
  let result = command.computeCommand(commandInput, initialCoordinate, initialBearing);
  let newCoordinate = result[0];
  let newBearing = result[1];
  
  expect(newCoordinate).toEqual(expectedCoordinate);
  expect(newBearing).toEqual(expectedDirection);
});
  
test('4. LEFT should rotate the robot to the left side of a given bearing', () => {
  let commandInput = 'LEFT';
  let initialCoordinate = [2, 2];
  let initialBearing = 'WEST';
  let expectedDirection = 'SOUTH';
  
  let result = command.computeCommand(commandInput, initialCoordinate, initialBearing);
  let newBearing = result[1];
  
  expect(newBearing).toEqual(expectedDirection);
});
  
test('5. RIGHT should rotate the robot to the right side of the given bearing', () => {
  let commandInput = 'RIGHT';
  let initialCoordinate = [2, 2];
  let initialBearing = 'WEST';
  let expectedDirection = 'NORTH';
  
  let result = command.computeCommand(commandInput, initialCoordinate, initialBearing);
  let newBearing = result[1];
  
  expect(newBearing).toEqual(expectedDirection);
});
  
test('6. REPORT should be returning the correct output', () => {
  let commandInput= 'REPORT';
  let coordinate = [2,2];
  let bearing = 'NORTH';
  let expectedOutput = [coordinate, bearing];
  let output = command.computeCommand(commandInput, coordinate, bearing);
  expect(output).toEqual(expectedOutput);
});