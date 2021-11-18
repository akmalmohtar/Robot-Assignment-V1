const chalk = require('chalk');

const info = async message => { console.log(chalk.cyan(message));};
const success = async message => {console.log(chalk.black.bgGreen(message));};
const error = async message => {console.log(chalk.white.bgRed(message));};

module.exports = { info, success, error };