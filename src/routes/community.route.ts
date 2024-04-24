import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import CommunityController from '@/controllers/community.controller';
import { wrapRequestHandler } from '@/utils/handle';

class CommunityRoute implements Routes {
  public router = Router();
  public community = new CommunityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/communites':
     *  get:
     *     tags:
     *     - COMMUNITY
     *     summary: Get communities
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
    this.router.get('/', wrapRequestHandler(this.community.getCommunities));

    /**
     * @openapi
     * '/communities/:id':
     *  get:
     *     tags:
     *     - COMMUNITY
     *     summary: Get community by id
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
    this.router.get('/:id', wrapRequestHandler(this.community.getCommunity));

    /**
     * @openapi
     * '/communites':
     *  post:
     *     tags:
     *     - COMMUNITY
     *     summary: Create communities
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
    this.router.post('/', wrapRequestHandler(this.community.createCommunity));

    /**
     * @openapi
     * '/communites/:id':
     *  put:
     *     tags:
     *     - COMMUNITY
     *     summary: Update communities
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
    this.router.put('/:id', wrapRequestHandler(this.community.updateCommunity));

    /**
     * @openapi
     * '/communites/:id/add-quiz/:quizId':
     *  patch:
     *     tags:
     *     - COMMUNITY
     *     summary: Add quiz to comuminty
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
    this.router.patch('/:id/add-quiz/:quizId', wrapRequestHandler(this.community.addQuizCommunity));

    /**
     * @openapi
     * '/communites/:id/delete-quiz/:quizId':
     *  patch:
     *     tags:
     *     - COMMUNITY
     *     summary: Delete quiz to comuminty
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
    this.router.patch('/:id/delete-quiz/:quizId', wrapRequestHandler(this.community.deleteQuizCommunity));

    /**
     * @openapi
     * '/communites/:id/add-message/:quizId':
     *  patch:
     *     tags:
     *     - COMMUNITY
     *     summary: Add quiz to comuminty
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
    this.router.patch('/add-message/:id', wrapRequestHandler(this.community.addMessageChatBox));

    /**
     * @openapi
     * '/communites/:id':
     *  delete:
     *     tags:
     *     - COMMUNITY
     *     summary: Delete community
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
    this.router.delete('/:id', wrapRequestHandler(this.community.deletedCommunity));
  }
}

export default CommunityRoute;
