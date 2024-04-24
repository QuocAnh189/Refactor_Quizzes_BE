import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import LeaderboardController from '@/controllers/leaderboard.controller';
import { wrapRequestHandler } from '@/utils/handle';

class LeaderboardRoute implements Routes {
  public router = Router();
  public leaderboard = new LeaderboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/leaderboards':
     *  get:
     *     tags:
     *     - LEADERBOARD
     *     summary: Get leaderboards
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
    this.router.get('/', wrapRequestHandler(this.leaderboard.getLeaderBoards));

    /**
     * @openapi
     * '/leaderboards/:id':
     *  get:
     *     tags:
     *     - LEADERBOARD
     *     summary: Get leaderboard by id
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
    this.router.get('/:id', wrapRequestHandler(this.leaderboard.getLeaderBoard));

    /**
     * @openapi
     * '/leaderboards/history/;Id':
     *  get:
     *     tags:
     *     - LEADERBOARD
     *     summary: Get leaderboards history by id
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
    this.router.get('/history/:id', wrapRequestHandler(this.leaderboard.getHistory));

    /**
     * @openapi
     * '/leaderboards':
     *  post:
     *     tags:
     *     - LEADERBOARD
     *     summary: Create leaderboard
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
    this.router.post('/', wrapRequestHandler(this.leaderboard.createLeaderBoard));

    /**
     * @openapi
     * '/leaderboards/:id':
     *  patch:
     *     tags:
     *     - LEADERBOARD
     *     summary: Update leaderboard
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
    this.router.patch('/:id', wrapRequestHandler(this.leaderboard.updateLeaderBoard));

    /**
     * @openapi
     * '/leaderboards/:id':
     *  delete:
     *     tags:
     *     - LEADERBOARD
     *     summary: Delete leaderboard
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
    this.router.delete('/:id', wrapRequestHandler(this.leaderboard.deleteLeaderBoard));

    /**
     * @openapi
     * '/leaderboards/:id/add-player-result':
     *  patch:
     *     tags:
     *     - LEADERBOARD
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
    this.router.patch('/:id/add-player-result', wrapRequestHandler(this.leaderboard.addPlayerResult));

    /**
     * @openapi
     * '/leaderboards/:id/current-leaderBoard':
     *  patch:
     *     tags:
     *     - LEADERBOARD
     *     summary: Update current leaderboard
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
    this.router.patch('/:id/current-leaderBoard', wrapRequestHandler(this.leaderboard.updateCurrentLeaderBoard));
  }
}

export default LeaderboardRoute;
