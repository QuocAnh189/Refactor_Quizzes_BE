import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import QuizController from '@/controllers/quiz.controller';
import { wrapRequestHandler } from '@/utils/handle';

class QuizRoute implements Routes {
  public router = Router();
  public quiz = new QuizController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/quizzes':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes
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
    this.router.get('/', wrapRequestHandler(this.quiz.getQuizzes));

    /**
     * @openapi
     * '/quizzes':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes public
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
    this.router.get('/public', wrapRequestHandler(this.quiz.getQuizzesPublics));

    /**
     * @openapi
     * '/quizzes/search':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes by search
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
    this.router.get('/search', wrapRequestHandler(this.quiz.getQuizzesBySearch));

    /**
     * @openapi
     * '/quizzes/discover':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes by discover
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
    this.router.get('/discover', wrapRequestHandler(this.quiz.getQuizzesDiscoverPage));

    /**
     * @openapi
     * '/quizzes/:id':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quiz by id
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
    this.router.get('/:id', wrapRequestHandler(this.quiz.getQuizById));

    /**
     * @openapi
     * '/quizzes/draft/:id':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quiz draft by id
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
    this.router.get('/draft/:id', wrapRequestHandler(this.quiz.getDraftQuizById));

    /**
     * @openapi
     * '/quizzes':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes
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
    this.router.get('/teacher/:teacherId', wrapRequestHandler(this.quiz.getTeacherQuizzes));

    /**
     * @openapi
     * '/quizzes':
     *  get:
     *     tags:
     *     - QUIZ
     *     summary: Get quizzes
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
    this.router.post('/', wrapRequestHandler(this.quiz.createQuiz));

    /**
     * @openapi
     * '/quizzes/draft':
     *  post:
     *     tags:
     *     - QUIZ
     *     summary: Create quiz draft
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
    this.router.post('/draft', wrapRequestHandler(this.quiz.createDraftQuiz));

    /**
     * @openapi
     * '/quizzes/import':
     *  post:
     *     tags:
     *     - QUIZ
     *     summary: Import quiz
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
    this.router.post('/import', wrapRequestHandler(this.quiz.importQuiz));

    /**
     * @openapi
     * '/quizzes/:id':
     *  put:
     *     tags:
     *     - QUIZ
     *     summary: Update quizzes
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
    this.router.patch('/:id', wrapRequestHandler(this.quiz.updateQuiz));

    /**
     * @openapi
     * '/quizzes/like':
     *  put:
     *     tags:
     *     - QUIZ
     *     summary: Like quiz
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
    this.router.put('/:id/like', wrapRequestHandler(this.quiz.likeQuiz));

    /**
     * @openapi
     * '/quizzes/comment':
     *  post:
     *     tags:
     *     - QUIZ
     *     summary: Comment quiz
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
    this.router.post('/:id/comment', wrapRequestHandler(this.quiz.commentQuiz));

    /**
     * @openapi
     * '/quizzes/:id':
     *  delete:
     *     tags:
     *     - QUIZ
     *     summary: Delete quiz
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
    this.router.delete('/:id', wrapRequestHandler(this.quiz.deleteQuiz));

    // this.router.get('/:quizId/questions/:questionId',wrapRequestHandler(this.quiz.));
    // this.router.get('/:quizId/questions',wrapRequestHandler(this.quiz) getQuestions);
    // this.router.post('/:quizId/questions',wrapRequestHandler(this.quiz) addQuestion);
    // this.router.put('/:quizId/questions/:questionId',wrapRequestHandler(this.quiz) updateQuestion);
    // this.router.delete('/:quizId/questions/:questionId',wrapRequestHandler(this.quiz) deleteQuestion);
  }
}

export default QuizRoute;
