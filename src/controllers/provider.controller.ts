import { Request, Response, NextFunction } from 'express';

//controller
import ProviderService from '@/services/provider.service';
import { HTTP_STATUS } from '@/constants';

class ProviderController {
  public provider = new ProviderService();

  public deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { public_id } = req.body;
      const result = await this.provider.deleteImage(public_id);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public registerMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public VerifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public generateOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public generateOTPMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public verifyOTPMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public createResetSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export default ProviderController;
