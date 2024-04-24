import { Request, Response, NextFunction } from 'express';

//controller
import PlayerResultService from '@/services/player-result.service';
import { HTTP_STATUS } from '@/constants';

class PlayerResultController {
  public playerResult = new PlayerResultService();

  public createPlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.playerResult.createPlayerResult(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getPlayerResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.playerResult.getPlayerResults();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getPlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.playerResult.getPlayerResult(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deletePlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.playerResult.deletePlayerResult(id);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updatePlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.playerResult.updatePlayerResult(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public addAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await this.playerResult.addAnswer(id, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getAnswers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playerResultId } = req.params;

      const result = await this.playerResult.getAnswers(playerResultId);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public getAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playerResultId, answerId } = req.params;

      const result = await this.playerResult.getAnswer(playerResultId, answerId);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playerResultId, answerId } = req.params;

      const result = await this.playerResult.deleteAnswer(playerResultId, answerId);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playerResultId, answerId } = req.params;
      const data = req.body;
      const result = await this.playerResult.updateAnswer(playerResultId, answerId, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public addPlayerResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playerId, answerId } = req.params;
      const data = req.body;
      const result = await this.playerResult.addPlayerResult(playerId, answerId, data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PlayerResultController;
