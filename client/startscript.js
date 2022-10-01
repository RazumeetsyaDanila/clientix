// let cmd = require('node-cmd'); 
// cmd.run('npm start');
let exec = require('child_process').exec;
exec('npm start', {windowsHide: true});