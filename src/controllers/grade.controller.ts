import { Request, Response, NextFunction } from 'express';

//controller
import GradeService from '@/services/grade.service';
import { HTTP_STATUS } from '@/constants';

class GradeController {
  public grade = new GradeService();

  public getGrades = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.grade.getGrades();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.grade.getGrade(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getGradeByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const result = await this.grade.getGradeByName(name);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public createGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.grade.createGrade(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.grade.updateGrade(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.grade.deleteGrade(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default GradeController;
