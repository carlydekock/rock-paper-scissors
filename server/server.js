'use strict';

const socketio = require('socket.io');

const io = socketio(3000);

const game = io.of('/game');

//global variables
//equal to null, one or two
//template event string
//global variable is set after gamestart occurs
//player one and two
const playerChoices = {
  'playerOne': null,
  'playerTwo': null,
};

let array = [];

io.on('connection', (socket) => {
  console.log('new connection' + socket.id);
});

game.on('connection', (gameSocket) => {
  console.log('new game connection', gameSocket.id);

  gameSocket.on('startgame', (payload) => {
    console.log('GAME EVENT:', payload);

    gameSocket.emit('gamestart', payload);
    gameSocket.broadcast.emit('gamestart', payload);
  });

  gameSocket.on('shoot', (payload) => {
    array.push(payload.player);
    //conditional logic of who wins
    //both clients are sending a shoot event
    //what player has sent me a message?
    playerChoices[payload.player] = payload.choice;
    console.log('player choices', playerChoices);
    // console.log('this is response from player', payload);
    if(array.length > 1){
      console.log('this is winner', findWinner(playerChoices));
      gameSocket.emit('shoot');
      array = [];
    }
    //emit shoot
  });

  // gameSocket.on('shoottwo', (payload) => {

  // });
});

function findWinner(hash) {
  //if rock and paper
  console.log('hash', hash);
  console.log('hash at 0', hash['playerOne'].key);
  if(hash['playerOne'] === 'rock' && hash['playerTwo']=== 'paper'){
    return hash['playerTwo'];
  } else if(hash['playerOne'] === 'rock' && hash['playerTwo']=== 'scissors'){
    return hash['playerOne'];
  } else if(hash['playerOne'] === 'paper' && hash['playerTwo']=== 'rock'){
    return hash['playerOne'];
  } else if(hash['playerOne'] === 'paper' && hash['playerTwo']=== 'scissors'){
    return hash['playerTwo'];
  } else if(hash['playerOne'] === 'scissors' && hash['playerTwo']=== 'rock'){
    return hash['playerTwo'];
  } else if(hash['playerOne'] === 'scissors' && hash['playerTwo']=== 'paper'){
    return hash['playerOne'];
  } else {
    return 'players tied';
  }
}

