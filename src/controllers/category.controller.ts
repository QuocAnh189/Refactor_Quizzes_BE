import { Request, Response, NextFunction } from 'express';

//controller
import CategoryService from '@/services/category.service';
import { HTTP_STATUS } from '@/constants';

class CategoryController {
  public category = new CategoryService();

  public getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.category.getCategories();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.category.getCategories();
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getCategoryByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;

      const result = await this.category.getCategoryByName(name);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.category.createCategory(data);

      if (result) {
        res.status(HTTP_STATUS.CREATED).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.category.updateCategory(id, data);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.category.deleteCategory(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
