import { Router } from 'express';

//interface
import { Routes } from '@/interfaces';

//controller
import ProviderController from '@/controllers/provider.controller';
import { wrapRequestHandler } from '@/utils/handle';

class ProviderRoute implements Routes {
  public router = Router();
  public provider = new ProviderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.patch('/delete-image', wrapRequestHandler(this.provider.deleteImage));
  }
}

export default ProviderRoute;
