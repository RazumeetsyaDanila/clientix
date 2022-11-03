// let cmd = require('node-cmd'); 
// cmd.run('npm start');
// let exec = require('child_process').exec;
// exec('npm start', {windowsHide: true});

let exec = require('child_process').exec;
// exec('serve build -l tcp://clientix.local:322', {windowsHide: true});
exec('serve -s build -p 322', {windowsHide: true});