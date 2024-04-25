import { HTTP_STATUS } from '@/constants';
import { HttpException } from '@/exceptions/httpException';
import { Service } from 'typedi';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import cloudinary from '@/configs/cloudinary.config';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Quizes',
    link: 'https://mailgen.js/',
  },
});

@Service()
class ProviderService {
  public async deleteImage(public_id: string): Promise<any> {
    try {
      const res = await cloudinary.uploader.destroy(public_id);
      if (!res) {
        throw new HttpException(HTTP_STATUS.NOT_FOUND, `No public_id with id: ${public_id}`);
      }
      return res;
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async registerMail(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async VerifyEmail(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async generateOTP(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async generateOTPMail(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async verifyOTP(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async verifyOTPMail(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }

  public async createResetSession(): Promise<any> {
    try {
    } catch (error) {
      throw new HttpException(HTTP_STATUS.SERVER_ERROR, error.message);
    }
  }
}

export default ProviderService;
