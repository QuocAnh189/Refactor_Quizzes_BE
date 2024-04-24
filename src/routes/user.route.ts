import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import UserController from '@/controllers/user.controller';
import { wrapRequestHandler } from '@/utils/handle';

class UserRoute implements Routes {
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/users':
     *  get:
     *     tags:
     *     - USER
     *     summary: Get users
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
    this.router.get('/', wrapRequestHandler(this.user.getUsers));

    /**
     * @openapi
     * '/users/:id':
     *  get:
     *     tags:
     *     - USER
     *     summary: Get user by id
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
    this.router.get('/:id', wrapRequestHandler(this.user.getUser));

    /**
     * @openapi
     * '/users/change-password':
     *  post:
     *     tags:
     *     - USER
     *     summary: Chage Password
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
    this.router.post('/change-password', wrapRequestHandler(this.user.changePassword));

    /**
     * @openapi
     * '/user/:id':
     *  put:
     *     tags:
     *     - USER
     *     summary: Update user
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
    this.router.put('/:id', wrapRequestHandler(this.user.updateUser));

    /**
     * @openapi
     * '/users/:myId/add-friend/:friendId':
     *  put:
     *     tags:
     *     - USER
     *     summary: Add friend
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
    this.router.put('/:myId/add-friend/:friendId', wrapRequestHandler(this.user.addFriend));

    /**
     * @openapi
     * '/users/:myId/delete-friend/:friendId':
     *  put:
     *     tags:
     *     - USER
     *     summary: Delete friend
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
    this.router.put('/:myId/un-friend/:friendId', wrapRequestHandler(this.user.unFriend));

    /**
     * @openapi
     * '/users':
     *  post:
     *     tags:
     *     - USER
     *     summary: Create user
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
    this.router.post('/', wrapRequestHandler(this.user.createUser));

    /**
     * @openapi
     * '/users':
     *  delete:
     *     tags:
     *     - USER
     *     summary: Delete user
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
    this.router.delete('/:id', wrapRequestHandler(this.user.deleteUser));
  }
}

export default UserRoute;
