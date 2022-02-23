const { spawn, spawnSync } = require('child_process');

const devClient = spawnSync('yarn', ['dev:client']);
console.log(devClient.output.toString());

const devServer = spawnSync('yarn', ['dev:server']);
console.log(devServer.output.toString());

const server = spawn('yarn', ['serve']);
server.stdout.on('data', data => {
	console.log(data.toString());
});
server.stderr.on('data', data => {
	console.log(data.toString());
});
server.on('error', err => {
	console.error(err);
});

// server.kill();
