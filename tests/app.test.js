const request = require('supertest');
const http = require('http');
const { app } = require('..');
const { getAllGames } = require('../controllers');

jest.mock('../controllers', () => {
  const originalModule = jest.requireActual('../controllers');

  return {
    ...originalModule,
    getAllGames: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done); // Use a different port for testing
});

afterAll((done) => {
  server.close(done);
});
describe('Controller function test', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears mocks before each test
  });

  it('should return all employees', () => {
    let mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    let result = getAllGames();

    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});
describe('Game API Endpoints', () => {
  it('should retrieve all games', async () => {
    const res = await request(app).get('/games');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: 'The Legend of Zelda: Breath of the Wild',
          genre: 'Adventure',
          platform: 'Nintendo Switch',
        },
        {
          gameId: 2,
          title: 'Red Dead Redemption 2',
          genre: 'Action',
          platform: 'PlayStation 4',
        },
        {
          gameId: 3,
          title: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platform: 'PC',
        },
      ],
    });
    expect(res.body.games.length).toBe(3);
  });

  it('should retrieve an game by ID', async () => {
    const res = await request(app).get('/games/details/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
    });
    expect(res.body.game.gameId).toBe(1);
  });
});
