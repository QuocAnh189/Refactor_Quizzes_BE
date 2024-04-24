import { Service } from 'typedi';
import bcrypt from 'bcrypt';

//constant
import { HTTP_STATUS } from '@/constants';

//exception
import { HttpException } from '@/exceptions/httpException';
import { User } from '@/models';
import mongoose, { mongo } from 'mongoose';

@Service()
class QuizService {
  public async getUser(id: string): Promise<any> {
    try {
      const user = await User.findById(id);
      if (user === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `user not found`);
      }

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      return userWithoutPassword;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async getUsers(): Promise<any> {
    try {
      const users = await User.find();
      if (users === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `users not found`);
      }

      return users;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createUser(data: any): Promise<any> {
    const {
      avatar,
      bio,
      emailToken,
      userType,
      userName,
      firstName,
      lastName,
      mail,
      password,
      point,
      follows,
      friends,
      workspace,
    } = data;
    try {
      const existsEmail = await User.findOne({ mail });
      if (existsEmail) {
        throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Email already exists');
      }

      const existsUser = await User.findOne({ mail });
      if (existsUser) {
        throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Username already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password ? password : '1', salt);
      const user = new User({
        avatar,
        bio,
        emailToken,
        userType,
        userName,
        firstName,
        lastName,
        mail,
        password: hashedPassword,
        point,
        follows,
        friends,
        workspace,
      });

      const newUser = await user.save();
      return newUser;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async updateUser(id: string, data: any): Promise<any> {
    const { firstName, lastName, userName, avatar, mail, userType, workspace } = data;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${id}`);
      }
      if (userName.length < 5 || userName.length > 15) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `User Name is not format`);
      }

      if (firstName.length > 4) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `First Name is not format`);
      }

      if (lastName.length > 4) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `Last Name is not format`);
      }

      const findUserId = await User.findById(id);
      // const newUpdate = { ...findUserId.update, profile: new Date() };

      const user = new User({
        _id: id,
        firstName,
        lastName,
        userName,
        avatar,
        mail,
        workspace,
        userType,
        // update: newUpdate,
      });

      const updatedUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async changePassword(id: string, data: any): Promise<any> {
    try {
      const { oldPassword, newPassword } = data;
      const user = await User.findById(id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'Old password is not correct');
      }

      const hashedPassword = await bcrypt.hash(newPassword + '', 10);

      await User.findByIdAndUpdate(id, { password: hashedPassword });

      return 'Change password successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async deleteUser(id: string): Promise<any> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id) || !User.findById(id)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${id}`);
      }
      await User.findByIdAndRemove(id);

      return 'User deleted successfully';
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async unFriend(myId: string, friendId: string): Promise<any> {
    try {
      if (!mongoose.Types.ObjectId.isValid(myId) || !User.findById(myId)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${myId}`);
      }

      if (!mongoose.Types.ObjectId.isValid(friendId) || !User.findById(friendId)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${friendId}`);
      }

      const user = await User.findById(myId);
      const friend = await User.findById(friendId);

      // user.follows = user.follows.filter(item => item !== friend.userName);
      await user.save();

      return user;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async addFriend(myId: string, friendId: string): Promise<any> {
    try {
      if (!mongoose.Types.ObjectId.isValid(myId) || !User.findById(myId)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${myId}`);
      }

      if (!mongoose.Types.ObjectId.isValid(friendId) || !User.findById(friendId)) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No user with id: ${friendId}`);
      }

      const users = await User.find();
      if (users === null) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `users not found`);
      }

      const user = await User.findById(myId);
      const friend = await User.findById(friendId);
      // user.follows.push(friend.userName);
      await user.save();

      return user;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default QuizService;
