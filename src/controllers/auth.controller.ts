import { Request, Response, NextFunction } from 'express';

//controller
import AuthService from '@/services/auth.service';
import { HTTP_STATUS } from '@/constants';

class AuthController {
  public auth = new AuthService();

  public checkEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.auth.checkEmail(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public checkUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.auth.checkUserName(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.auth.signUp(data);
      if (result) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });

        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.auth.signIn(data);

      if (result) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });

        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public signInSocial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.auth.signInSocial();

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public requestRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.auth.requestRefreshToken(data);

      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.auth.signOut(id);

      if (result) {
        res.cookie('refreshToken', '');
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
