import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import PlayerResultController from '@/controllers/player-result.controller';
import { wrapRequestHandler } from '@/utils/handle';

class PlayerResultRoute implements Routes {
  public router = Router();
  public playerResult = new PlayerResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/player-results':
     *  get:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get player result
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
    this.router.get('/', wrapRequestHandler(this.playerResult.getPlayerResults));

    /**
     * @openapi
     * '/player-results/:id':
     *  get:
     *     tags:
     *     - PLAYER RESULT
     *     summary: get player result by id
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
    this.router.get('/:id', wrapRequestHandler(this.playerResult.getPlayerResult));

    /**
     * @openapi
     * '/player-results/:id/answers':
     *  get:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.get('/:id/answers', wrapRequestHandler(this.playerResult.getAnswers));

    /**
     * @openapi
     * '/player-results/:id/answers/:answerId':
     *  get:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.get('/:id/answers/:answerId', wrapRequestHandler(this.playerResult.getAnswer));

    /**
     * @openapi
     * '/player-results':
     *  post:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Create player result
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
    this.router.post('/', wrapRequestHandler(this.playerResult.createPlayerResult));

    /**
     * @openapi
     * '/player-results/:id':
     *  patch:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.patch('/:id', wrapRequestHandler(this.playerResult.updatePlayerResult));

    /**
     * @openapi
     * '/player-results/:playerId/results/:gameId':
     *  patch:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.patch('/:playerId/results/:gameId', wrapRequestHandler(this.playerResult.addPlayerResult));

    /**
     * @openapi
     * '/player-results/:id/answers/:answerId':
     *  patch:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.patch('/:id/answers/:answerId', wrapRequestHandler(this.playerResult.updateAnswer));

    /**
     * @openapi
     * '/player-results/:id/asnwers':
     *  patch:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.patch('/:id/answers', wrapRequestHandler(this.playerResult.addAnswer));

    /**
     * @openapi
     * '/player-results/:id':
     *  delete:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.delete('/:id', wrapRequestHandler(this.playerResult.deletePlayerResult));

    /**
     * @openapi
     * '/player-results/:id/answers/:answerId':
     *  delete:
     *     tags:
     *     - PLAYER RESULT
     *     summary: Get grades
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
    this.router.delete('/:id/answers/:answerId', wrapRequestHandler(this.playerResult.deleteAnswer));
  }
}

export default PlayerResultRoute;
