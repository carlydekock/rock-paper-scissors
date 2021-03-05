'use strict';

const io = require('socket.io-client');
const gameURL = 'http://localhost:3000/game';
const player = 'playerTwo';
const socket = io.connect(gameURL);

//random response generator
const responses = ['rock', 'paper', 'scissors'];
function shoot() {
  return responses[Math.floor(Math.random() * responses.length)];
}

socket.on('startgame', (payload) => {
  setTimeout(() => {
    console.log('ROCK');
    socket.emit('rock', payload);
  }, 1500);
});

socket.on('paper', (payload) => {
  setTimeout(() => {
    console.log('SCISSORS');
    socket.emit('scissors', payload);
  }, 1500);
});

socket.on('scissors', () => {
  setTimeout(() => {
    console.log('SHOOT!');
    // socket.emit('shoot', payload);
  }, 1500);
});

socket.on('gamestart', (payload) => {
  payload.choice = shoot();
  payload.player = player;
  setTimeout(() => {
    console.log(`I chose ${payload.choice}`);
    socket.emit('bam', payload);
  }, 500);
});

socket.on('gameover', (payload) => {
  setTimeout(() => {
    if (payload.winner === player) {
      console.log('I won!!');
    } else {
      console.log('Congrats on the win (ノಠ益ಠ)ノ彡┻━┻');
    }
  }, 1000);
});
