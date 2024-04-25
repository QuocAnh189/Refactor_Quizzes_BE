import { Request, Response, NextFunction } from 'express';

//controller
import QuizService from '@/services/quiz.service';
import { HTTP_STATUS } from '@/constants';
import { subtle } from 'crypto';

class QuizController {
  public quiz = new QuizService();

  public getQuizById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.quiz.getQuizById(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getQuizzesDiscoverPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getTeacherQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getQuizzesPublics = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getQuizzesBySearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getDraftQuizById = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public createDraftQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.quiz.createQuiz(data);

      if (result) {
        res.status(HTTP_STATUS.CREATED).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public importQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.quiz.updateQuiz(id, data);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public likeQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public commentQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export default QuizController;
