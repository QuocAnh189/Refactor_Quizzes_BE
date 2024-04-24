import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import 'reflect-metadata';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    // methods: ['GET', 'POST'],
  },
});

let game = null;
let gameIdCurrent = null;
let pinGames = [];
// let leaderBoard = null;
let leaderBoardGame = [];
let players = [];

const addPlayer = (userName, playerId, avatar, socketId) => {
  !players.some(player => player.socketId === socketId) && players.push({ userName, playerId, avatar, socketId });
};

const getPlayer = socketId => {
  return players.find(player => player.socketId === socketId);
};

io.on('connection', socket => {
  console.log('User with id ' + socket.id + ' connected');

  socket.on('disconnect', reason => {
    console.log('Socket ' + socket.id + ' was disconnected');
    console.log(reason);
  });

  socket.on('init-game', (newGame, newLeaderBoard) => {
    game = JSON.parse(JSON.stringify(newGame));
    pinGames.push(game.pin);

    newLeaderBoard = JSON.parse(JSON.stringify(newLeaderBoard));
    leaderBoardGame.push(newLeaderBoard);

    socket.join(game.pin);
  });

  socket.on('add-player', (user, socketId, pin, cb) => {
    if (pinGames.includes(pin)) {
      leaderBoardGame.map(leaderBoard => {
        if (leaderBoard.pin === pin) {
          gameIdCurrent = leaderBoard.game;
        }
      });
      addPlayer(user.userName, user._id, user.avatar, socketId);
      cb('correct', user._id, gameIdCurrent);

      socket.join(pin);

      const player = getPlayer(socketId);
      io.to(pin).emit('player-added', player, pin);
    } else {
      cb('wrong', gameIdCurrent);
    }
  });

  socket.on('host-leave-room', (pin, cb) => {
    cb();

    pinGames = pinGames.filter(item => item !== pin);
    leaderBoardGame = leaderBoardGame.filter(item => item.pin !== pin);

    socket.to(pin).emit('host-leave', pin);
    socket.leave(pin);
  });

  socket.on('student-leave-room', (pin, cb) => {
    cb();

    let player = getPlayer(socket.id);

    socket.to(pin).emit('student-leave', player, pin);
    socket.leave(pin);
  });

  socket.on('start-game', leaderBoardId => {
    socket.to(game?.pin).emit('host-start-game', leaderBoardId);
  });

  socket.on('countdown-preview', (gamePin, cb) => {
    cb();

    socket.to(gamePin).emit('host-countdown-preview', gamePin);
  });

  socket.on('start-question-timer', (gamePin, questionIndex, cb) => {
    cb();
    socket.to(gamePin).emit('host-start-question-timer', questionIndex);
  });

  socket.on('start-question-result', (gamePin, questionIndex, cb) => {
    cb();
    socket.to(gamePin).emit('host-start-question-result', questionIndex);
  });

  socket.on('send-answer-to-host', (leaderBoardId, pinGame, questionIndex, result) => {
    socket.to(pinGame).emit('get-answer-from-player', leaderBoardId, pinGame, questionIndex, result);
  });

  socket.on('send-other-result', (pinGame, resultPlayer) => {
    socket.to(pinGame).emit('host-send-other-result', resultPlayer);
  });

  socket.on('show-leaderBoard', (gamePin, questionIndex, cb) => {
    cb();
    socket.to(gamePin).emit('host-show-leaderBoard', questionIndex);
  });

  socket.on('end-game', (pinGame, cb) => {
    cb();
    socket.to(pinGame).emit('host-end-game');
    socket.leave(pinGame);
  });

  socket.on('host-end-game', (pinGame, cb) => {
    cb();
    socket.to(pinGame).emit('host-end-game');
    socket.leave(pinGame);
  });

  socket.on('player-end-game', (pinGame, cb) => {
    cb();
    socket.to(pinGame).emit('player-end-game');
    socket.leave(pinGame);
  });
});

export { app, io, server };
