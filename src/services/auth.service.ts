import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { RefreshToken, User } from '@/models';

const generateAccessToken = async (data: any) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRE_TIME || '1h',
    });
    return token;
  } catch (error) {
    console.log(`Error in generate token + ${error}`);
    return null;
  }
};

const generateRefreshToken = async (data: any) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '2d',
    });
    return token;
  } catch (error) {
    console.log(`Error in generate token + ${error}`);
    return null;
  }
};

const authorizeInfoUser = async (user: any) => {
  const UserLogout = await RefreshToken.findOne({ user_id: user._id });
  const accessToken = await generateAccessToken({
    user: {
      userName: user.userName,
      userType: user.userType,
      mail: user.mail,
      _id: user.id,
    },
  });
  const refreshToken = await generateRefreshToken({
    user: {
      userName: user.userName,
      userType: user.userType,
      mail: user.mail,
      _id: user.id,
    },
  });

  //store refresh token to DB
  if (!UserLogout) {
    await new RefreshToken({
      user_id: user._id,
      token: refreshToken,
    }).save();
  }

  return { accessToken, refreshToken };
};

@Service()
class AuthService {
  public async checkEmail(data: any): Promise<any> {
    const { email } = data;
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Email already exists');
    }

    return 'Email right';
  }

  public async checkUserName(data: any): Promise<any> {
    const { userName } = data;

    const user = await User.findOne({ userName });
    if (user) {
      throw new HttpException(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'userName already exists');
    }

    return 'userName right';
  }

  public async signUp(data: any): Promise<any> {
    const { avatar, firstName, lastName, userType, userName, email, password, workspace } = data;

    const hashedPassword = await bcrypt.hash(password + '', 10);
    const user: any = await User.create({
      avatar,
      email,
      userName,
      userType,
      firstName,
      lastName,
      emailToken: crypto.randomBytes(64).toString('hex'),
      isVerified: false,
      password: hashedPassword,
      point: 0,
      workspace,
      follows: [],
      friends: [],
    });

    if (!user) {
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, 'User data is not valid');
    }

    const { accessToken, refreshToken } = await authorizeInfoUser(user);

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  public async signIn(data: any): Promise<any> {
    const { email, password } = data;
    const user: any = await User.findOne({ email });

    if (!user) {
      throw new HttpException(HTTP_STATUS.UNAUTHORIZED, 'Account not exist');
    }

    if (user && !user.password) {
      throw new HttpException(HTTP_STATUS.UNAUTHORIZED, 'Email is auth account');
    }

    const checkPass = await bcrypt.compare(password + '', user.password);

    if (!checkPass) {
      throw new HttpException(HTTP_STATUS.UNAUTHORIZED, 'Wrong password');
    }

    const { accessToken, refreshToken } = await authorizeInfoUser(user);

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  public async signInSocial(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async requestRefreshToken(data: any): Promise<any> {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, "you're not authenticated");
    }

    const refreshTokenFromDB = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!refreshTokenFromDB) {
      throw new HttpException(HTTP_STATUS.NOT_FOUND, 'Cannot find refresh token');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpException(HTTP_STATUS.UNAUTHORIZED, err);
      }
      if (refreshTokenFromDB.user_id.toString() !== decoded.user.id) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, 'User is not found');
      }
      const newAccessToken = generateAccessToken({
        user: decoded.user,
      });

      return {
        accessToken: newAccessToken,
      };
    });
  }

  public async signOut(id: string): Promise<any> {
    const result = await RefreshToken.deleteMany({
      user_id: id,
    });
    if (!result) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, `User with id ${id} has been logged out`);
    }

    return 'Logged out user';
  }
}

export default AuthService;
