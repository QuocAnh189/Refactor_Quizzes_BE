import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import AuthController from '@/controllers/auth.controller';
import { wrapRequestHandler } from '@/utils/handle';

import { checkEmail, checkUserName } from '@/middlewares';

class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/auths/check-email':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/check-email', wrapRequestHandler(this.auth.checkEmail));

    /**
     * @openapi
     * '/auths/check-username':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/check-username', wrapRequestHandler(this.auth.checkUserName));

    /**
     * @openapi
     * '/auths/sign-up':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/sign-up', wrapRequestHandler(this.auth.signUp));

    /**
     * @openapi
     * '/auths/sign-in-social':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/sign-in-social', wrapRequestHandler(this.auth.signInSocial));

    /**
     * @openapi
     * '/auths/sign-in':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/sign-in', wrapRequestHandler(this.auth.signIn));

    /**
     * @openapi
     * '/auths/refresh-token':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/refresh-token', wrapRequestHandler(this.auth.requestRefreshToken));

    /**
     * @openapi
     * '/auths/signout/:id':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Register a user
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
    this.router.post('/sign-out/:id', wrapRequestHandler(this.auth.signOut));
  }
}

export default AuthRoute;
