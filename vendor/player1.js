'use strict';

const io = require('socket.io-client');
const gameURL = 'http://localhost:3000/game';
const socket = io.connect(gameURL);

const player = 'playerOne';
const responses = ['rock', 'paper', 'scissors'];

function shoot() {
  return responses[Math.floor(Math.random()*responses.length)];
}


socket.on('rock', (payload) => {
  setTimeout(() => {
    console.log('PAPER');
    socket.emit('paper', payload);
  }, 1500);
});

socket.on('scissors', (payload) => {
  setTimeout(() => {
    console.log('SHOOT!');
    socket.emit('shoot', payload);
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
    if(payload.winner === player) {
      console.log('I won!!');
    } else {
      console.log('Congrats on the win 	(ノಠ益ಠ)ノ彡┻━┻');
    }
  }, 1000);
});


setTimeout(() => {
  socket.emit('startgame', {
    event: 'startgame',
    winner: '',
    // messageId: faker.random.uuid(),
  });
}, 5000);
