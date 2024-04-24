import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import ProviderController from '@/controllers/provider.controller';

class ProviderRoute implements Routes {
  public router = Router();
  public Provider = new ProviderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default ProviderRoute;
