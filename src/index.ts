import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';

import { app, server } from './socket/socket';
import { API } from './constants/paths';
import { connectDB, HOST_NAME, NODE_ENV } from './configs';
import { defaultErrorHandler } from './middlewares';
import route from './routes';
import { logger } from './utils/logger';

connectDB()
  .then(connect => {
    logger.info(`Database connected:  ${connect.connection.host} ${connect.connection.name}`);
  })
  .catch(e => logger.error(e));

app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(route);
app.use(defaultErrorHandler);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quizzes App Specification',
      version: '1.0.0',
      description: 'Quizzes API Specification, website for quiz app model',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: API }],
  },
  apis: ['src/routes/*.ts', 'src/constant/schema/*.ts', 'src/dtos/*.ts'],
};

const specs = swaggerJSDoc(options);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV || 'development'} =======`);
  logger.info(`🚀 App listening on http://${HOST_NAME}:${PORT}${API}`);
  logger.info(`🚀 API Spec http://${HOST_NAME}:${PORT}/api-documentation`);
  logger.info(`=================================`);
});
