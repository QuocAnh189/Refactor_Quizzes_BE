import { Request, Response, NextFunction } from 'express';

//controller
import UserService from '@/services/user.service';
import { HTTP_STATUS } from '@/constants';

class UserController {
  public user = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = this.user.getUser(id);
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = this.user.getUsers();
      if (users) {
        res.status(HTTP_STATUS.OK).json(users);
      }
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const user = await this.user.createUser(data);
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await this.user.updateUser(id, data);
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.user.changePassword(id, data);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.user.deleteUser(id);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public unFriend = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myId, friendId } = req.params;
      const result = await this.user.unFriend(myId, friendId);
      if (result) {
        res.status(HTTP_STATUS.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  public addFriend = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myId, friendId } = req.params;
      const user = await this.user.addFriend(myId, friendId);
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
