import express from 'express';
import configs from './config/env.js';
import { AppDataSource } from './config/database.js';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(router);

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection', err);
  }
};

connectDB().then(() => {
  app.listen(configs.PORT, () => {
    console.log(`Server running on port http://localhost:${configs.PORT}`);
  });
});
