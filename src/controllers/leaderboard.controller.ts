import { Request, Response, NextFunction } from 'express';

//controller
import LeaderBoardService from '@/services/leaderboard.service';
import { HTTP_STATUS } from '@/constants';

class LeaderBoardController {
  public leaderBoard = new LeaderBoardService();

  public getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.leaderBoard.getHistory();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getLeaderBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.leaderBoard.getLeaderBoards();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public createLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.leaderBoard.createLeaderBoard(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.leaderBoard.deleteLeaderBoard(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.leaderBoard.getLeaderBoard(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.leaderBoard.updateLeaderBoard(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public addPlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.leaderBoard.addPlayerResult(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateCurrentLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.leaderBoard.updateCurrentLeaderBoard(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderBoardController;
