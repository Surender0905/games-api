const express = require('express');
const cors = require('cors');
const { getAllGames, getGameById } = require('./controllers');

const app = express();
const port = 3010;
app.use(express.json());
app.use(cors());

// Routes
app.get('/games', (req, res) => {
  const games = getAllGames();

  res.json({ games });
});
app.get('/games/details/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = getGameById(gameId);

  if (game) {
    res.status(200).json({ game });
  } else {
    res.status(404).send('game not found');
  }
});
module.exports = {
  app,
  port,
};
