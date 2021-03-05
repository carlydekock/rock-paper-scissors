'use strict';

const io = require('socket.io-client');
const gameURL = 'http://localhost:3000/game';

const socket = io.connect(gameURL);

//random response generator
const responses = ['rock', 'paper', 'scissors'];
function shoot() {
  return responses[Math.floor(Math.random()*responses.length)];
}

socket.on('gamestart', (payload) => {
  payload.choice = shoot();
  payload.player = 'playerTwo';
  console.log(`${payload.player} chose ${payload.choice}`);

  socket.emit('shoot', payload);
});

