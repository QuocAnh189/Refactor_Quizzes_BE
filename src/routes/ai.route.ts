import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import AiController from '@/controllers/ai.controller';

class AiRoute implements Routes {
  public router = Router();
  public Ai = new AiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default AiRoute;
