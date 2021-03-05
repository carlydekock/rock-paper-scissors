'use strict';

const io = require('socket.io-client');
const gameURL = 'http://localhost:3000/game';

const socket = io.connect(gameURL);

//random response generator
const responses = ['rock', 'paper', 'scissors'];
// const shoot = responses[Math.floor(Math.random()*responses.length)];
function shoot() {
  return responses[Math.floor(Math.random()*responses.length)];
}
// console.log(shoot);

//ask to start game
//goes to server
//server emits real start and both respond with answers
setInterval(() => {
  socket.emit('startgame', {
    event: 'startgame',
    // messageId: faker.random.uuid(),
  });
}, 10000);

socket.on('gamestart', (payload) => {
  payload.choice = shoot();
  payload.player = 'playerOne';
  console.log(`${payload.player} chose ${payload.choice}`);

  socket.emit('shoot', payload);
});


// socket.on('shoot', (payload) => {


// });

//adding another event - player win/round over, results of round





//game master emits start to game


//if rock and paper
//if rock and scissors
//if rock and rock
//if paper and scissors
//if paper and paper
//if scissors and scissors
