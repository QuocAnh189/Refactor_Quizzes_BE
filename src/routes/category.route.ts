import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import CategoryController from '@/controllers/category.controller';
import { wrapRequestHandler } from '@/utils/handle';

class CategoryRoute implements Routes {
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/categories':
     *  get:
     *     tags:
     *     - CATEGORY
     *     summary: Get categories
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
    this.router.get('/', wrapRequestHandler(this.category.getCategories));

    /**
     * @openapi
     * '/categories/:id':
     *  get:
     *     tags:
     *     - CATEGORY
     *     summary: Get category by id
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
    this.router.get('/:id', wrapRequestHandler(this.category.getCategory));

    /**
     * @openapi
     * '/categories/name/:name':
     *  get:
     *     tags:
     *     - CATEGORY
     *     summary: Get category by name
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
    this.router.get('/name/:name', wrapRequestHandler(this.category.getCategoryByName));

    /**
     * @openapi
     * '/categories':
     *  post:
     *     tags:
     *     - CATEGORY
     *     summary: Create a category
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
    this.router.post('/', wrapRequestHandler(this.category.createCategory));

    /**
     * @openapi
     * '/categories/:id':
     *  put:
     *     tags:
     *     - CATEGORY
     *     summary: Update a category
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
    this.router.put('/:id', wrapRequestHandler(this.category.updateCategory));

    /**
     * @openapi
     * '/categories/:id':
     *  delete:
     *     tags:
     *     - CATEGORY
     *     summary: Delete a category
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
    this.router.delete('/:id', wrapRequestHandler(this.category.deleteCategory));
  }
}

export default CategoryRoute;
