import { Request, Response, NextFunction } from 'express';

//controller
import AiService from '@/services/ai.service';

class AiController {
  public Ai = new AiService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export default AiController;
