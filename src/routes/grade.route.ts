import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import GradeController from '@/controllers/grade.controller';
import { wrapRequestHandler } from '@/utils/handle';

class GradeRoute implements Routes {
  public router = Router();
  public grade = new GradeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/grades':
     *  get:
     *     tags:
     *     - GAME
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
    this.router.get('/', wrapRequestHandler(this.grade.getGrades));

    /**
     * @openapi
     * '/grades/:id':
     *  get:
     *     tags:
     *     - GRADE
     *     summary: Get grade by id
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
    this.router.get('/:id', wrapRequestHandler(this.grade.getGrade));

    /**
     * @openapi
     * '/grades/name/:name':
     *  get:
     *     tags:
     *     - GRADE
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
    this.router.get('/name/:name', wrapRequestHandler(this.grade.getGradeByName));

    /**
     * @openapi
     * '/grades':
     *  post:
     *     tags:
     *     - GRADE
     *     summary: Create grade
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
    this.router.post('/', wrapRequestHandler(this.grade.createGrade));

    /**
     * @openapi
     * '/grades':
     *  get:
     *     tags:
     *     - GRADE
     *     summary: Update grade
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
    this.router.patch('/:id', wrapRequestHandler(this.grade.updateGrade));

    /**
     * @openapi
     * '/grades/:id':
     *  delete:
     *     tags:
     *     - GRADE
     *     summary: Delete grade
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
    this.router.delete('/:id', wrapRequestHandler(this.grade.deleteGrade));
  }
}

export default GradeRoute;
