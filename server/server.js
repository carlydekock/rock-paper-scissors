'use strict';

const socketio = require('socket.io');
const io = socketio(3000);
const game = io.of('/game');

const playerChoices = {};
let choices = [];

io.on('connection', (socket) => {
  console.log('new connection' + socket.id);
});

game.on('connection', (gameSocket) => {
  console.log('new game connection', gameSocket.id);

  gameSocket.on('startgame', (payload) => {
    console.log('GAME EVENT:', payload);

    gameSocket.broadcast.emit('startgame', payload);
  });

  gameSocket.on('rock', payload => {
    gameSocket.broadcast.emit('rock', payload);
  });

  gameSocket.on('paper', payload => {
    gameSocket.broadcast.emit('paper', payload);
  });

  gameSocket.on('scissors', payload => {
    gameSocket.broadcast.emit('scissors', payload);
    gameSocket.emit('scissors', payload);
  });

  gameSocket.on('shoot', payload => {
    gameSocket.broadcast.emit('gamestart', payload);
    gameSocket.emit('gamestart', payload);
  });

  gameSocket.on('bam', (payload) => {
    choices.push(payload.choice);
    playerChoices[payload.player] = payload.choice;
    console.log('player choices', playerChoices);
    // console.log('this is response from player', payload);
    if(choices.length > 1){
      if(findWinner(playerChoices) === 'players tied') {
        console.log('TIE GAME, PLAY AGAIN');
        gameSocket.emit('startgame', payload);
        gameSocket.broadcast.emit('startgame', payload);
      } else {
        payload.winner = findWinner(playerChoices);
        gameSocket.emit('gameover', payload);
        gameSocket.broadcast.emit('gameover', payload);
        console.log('THE WINNER IS', findWinner(playerChoices));
      }
      choices = [];
    }
  });
});

function findWinner(hash) {
  //if rock and paper
  // console.log('hash', hash);
  // console.log('hash at 0', hash[1]);
  if(hash['playerOne'] === 'rock' && hash['playerTwo']=== 'paper'){
    return 'playerTwo';
  } else if(hash['playerOne'] === 'rock' && hash['playerTwo']=== 'scissors'){
    return 'playerOne';
  } else if(hash['playerOne'] === 'paper' && hash['playerTwo']=== 'rock'){
    return 'playerOne';
  } else if(hash['playerOne'] === 'paper' && hash['playerTwo']=== 'scissors'){
    return 'playerTwo';
  } else if(hash['playerOne'] === 'scissors' && hash['playerTwo']=== 'rock'){
    return 'playerTwo';
  } else if(hash['playerOne'] === 'scissors' && hash['playerTwo']=== 'paper'){
    return 'playerOne';
  } else {
    return 'players tied';
  }
}

