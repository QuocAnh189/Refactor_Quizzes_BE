import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import GameController from '@/controllers/game.controller';
import { wrapRequestHandler } from '@/utils/handle';

class GameRoute implements Routes {
  public router = Router();
  public game = new GameController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/games':
     *  get:
     *     tags:
     *     - GAME
     *     summary: Get games
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.get('/', wrapRequestHandler(this.game.getGames));

    /**
     * @openapi
     * '/games/:id':
     *  get:
     *     tags:
     *     - GAME
     *     summary: Get game by id
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.get('/:id', wrapRequestHandler(this.game.getGame));

    /**
     * @openapi
     * '/games':
     *  post:
     *     tags:
     *     - GAME
     *     summary: Create game
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.post('/', wrapRequestHandler(this.game.createGame));

    /**
     * @openapi
     * '/games/:id':
     *  put:
     *     tags:
     *     - GAME
     *     summary: Update game
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.put('/:id', wrapRequestHandler(this.game.updateGame));

    /**
     * @openapi
     * '/games/:id/add-player':
     *  patch:
     *     tags:
     *     - GAME
     *     summary: Add player to game
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.patch('/:id/add-player', wrapRequestHandler(this.game.addPlayer));

    /**
     * @openapi
     * '/games/:id/remove-player':
     *  patch:
     *     tags:
     *     - GAME
     *     summary: Remove player from game
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.patch('/:id/remove-player', wrapRequestHandler(this.game.removePlayer));

    /**
     * @openapi
     * '/games/:id/add-player-result':
     *  patch:
     *     tags:
     *     - GAME
     *     summary: Add player result
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.patch('/:id/add-player-result', wrapRequestHandler(this.game.addPlayerResult));

    /**
     * @openapi
     * '/games/:id':
     *  delete:
     *     tags:
     *     - GAME
     *     summary: Delete game
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
     *
     */
    this.router.delete('/:id', wrapRequestHandler(this.game.deleteGame));
  }
}

export default GameRoute;
