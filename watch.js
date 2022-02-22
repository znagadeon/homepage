const { spawn, spawnSync } = require('child_process');

console.log('Build client');
spawnSync('yarn', ['dev:client']);
console.log('Build server');
spawnSync('yarn', ['dev:server']);

console.log('Build done');

// const server = spawn('yarn', ['serve']);
// server.kill();

spawn('yarn', ['serve']);
