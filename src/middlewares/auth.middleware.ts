import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { HTTP_STATUS } from '@/constants';
import { User } from '@/models';

const { TokenExpiredError } = jwt;

const checkEmail = asyncHandler(async (req, res) => {
  const { mail } = req.body;

  const user = await User.findOne({ mail });
  if (user) {
    res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    throw new Error('Email already exists');
  }

  try {
    res.status(HTTP_STATUS.OK).json({
      message: 'Email right!',
    });
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR);
    throw new Error(error);
  }
});

const checkUserName = asyncHandler(async (req, res) => {
  const { userName } = req.body;

  const user = await User.findOne({ userName });

  if (user) {
    res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    throw new Error('userName already exists');
  }

  try {
    res.status(HTTP_STATUS.OK).json({
      message: 'userName right!',
    });
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR);
    throw new Error(error);
  }
});

const verifyAccessToken = asyncHandler(async (req: any, res, next) => {
  let token;
  let authHeader: any = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    if (!token || token === 'null' || token === 'undefined') {
      res.status(HTTP_STATUS.UNAUTHORIZED);
      throw new Error('User is not authorized or token is missing');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          res.status(HTTP_STATUS.UNAUTHORIZED);
          throw new Error('Token expired');
        }
        res.status(HTTP_STATUS.UNAUTHORIZED);
        throw new Error('User is not authorized');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader: any = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          res.status(HTTP_STATUS.UNAUTHORIZED);
          throw new Error('Token expired');
        }
        res.status(401);
        throw new Error('User is not authorized');
      }

      const user = decoded.user;
      // console.log(user);
      //check admin role
      if (user.userType === 'Admin') {
        next();
      } else {
        res.status(403);
        throw new Error('You do not have permission to do that.');
      }
    });

    if (!token) {
      res.status(401);
      throw new Error('User is not authorized or token is missing');
    }
  }
});

const verifyUserAuthorization = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader: any = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          res.status(HTTP_STATUS.UNAUTHORIZED);
          throw new Error('Token expired');
        }
        res.status(HTTP_STATUS.UNAUTHORIZED);
        throw new Error('User is not authorized');
      }

      const user = decoded.user;
      //check admin role
      if (user._id === req.params.id || user.userType === 'Admin') {
        // req.user.checkMySelf = true;
        next();
      } else {
        res.status(403);
        throw new Error('You do not have permission to do that.');
      }
    });

    if (!token) {
      res.status(401);
      throw new Error('User is not authorized or token is missing');
    }
  }
});

const verifyUser = asyncHandler(async (req, res, next) => {
  const { mail } = req.method === 'GET' ? req.query : req.body;
  console.log(mail);
  if (!mail) {
    res.status(HTTP_STATUS.BAD_REQUEST);
    throw new Error('email Empty');
  }
  const existEmail = await User.findOne({ mail });
  if (!existEmail) {
    res.status(HTTP_STATUS.NOT_FOUND);
    throw new Error('Email does not exists');
  }
  next();
});

const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

export {
  checkEmail,
  checkUserName,
  verifyAccessToken,
  verifyAdmin,
  verifyUserAuthorization,
  localVariables,
  verifyUser,
};
