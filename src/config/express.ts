import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import type { CorsOptions } from 'cors';

import config from '@/config';
import swaggerSpec from './swagger';

const app = express();

// CORS Middleware
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};
app.use(cors(corsOptions));

// Enable URL-encoded request body parsing with extended mode
app.use(express.urlencoded({ extended: true }));

// Enable JSON request body parsing
app.use(express.json());

// Enable Cookie header parser
app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, //start when larger than 1KB
  }),
);

// Enhance security HTTP header
app.use(helmet());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
