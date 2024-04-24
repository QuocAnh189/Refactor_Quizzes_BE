import { Request, Response, NextFunction } from 'express';

//controller
import CommunityService from '@/services/community.service';
import { HTTP_STATUS } from '@/constants';

class CommunityController {
  public community = new CommunityService();

  public getCommunities = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.community.getCommunities();
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getCommunity = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.community.getCommunity(id);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.community.createCommunity(data);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.community.updateCommunity(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deletedCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.community.deletedCommunity(id);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public addQuizCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, quizId } = req.params;
      const resutl = await this.community.addQuizCommunity(id, quizId);

      if (resutl) {
        res.status(HTTP_STATUS.OK).json(resutl);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteQuizCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, quizId } = req.params;
      const resutl = await this.community.deleteQuizCommunity(id, quizId);

      if (resutl) {
        res.status(HTTP_STATUS.OK).json(resutl);
      }
    } catch (error) {
      next(error);
    }
  };

  public addMessageChatBox = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.community.addMessageChatBox(id, data);

      if (result) {
        res.status(HTTP_STATUS.Ok).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CommunityController;
