import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import QuestionController from '@/controllers/question.controller';
import { wrapRequestHandler } from '@/utils/handle';

class QuestionRoute implements Routes {
  public router = Router();
  public question = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/questions':
     *  get:
     *     tags:
     *     - QUESTION
     *     summary: Get questions
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
    this.router.get('/', wrapRequestHandler(this.question.getAllQuestion));

    /**
     * @openapi
     * '/questions/:id':
     *  get:
     *     tags:
     *     - QUESTION
     *     summary: Get question by id
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
    this.router.get('/:id', wrapRequestHandler(this.question.getQuestion));

    /**
     * @openapi
     * '/questions':
     *  post:
     *     tags:
     *     - QUESTION
     *     summary: Create question
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
    this.router.post('/', wrapRequestHandler(this.question.createQuestion));

    /**
     * @openapi
     * '/questions/:id':
     *  patch:
     *     tags:
     *     - QUESTION
     *     summary: Update question
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
    this.router.patch('/:id', wrapRequestHandler(this.question.updateQuestion));

    /**
     * @openapi
     * '/questions/:id':
     *  delete:
     *     tags:
     *     - QUESTION
     *     summary: Delete question
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
    this.router.delete('/:id', wrapRequestHandler(this.question.deleteQuestion));
  }
}

export default QuestionRoute;
