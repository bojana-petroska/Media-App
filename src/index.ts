import express from 'express';
import configs from './configs/env.js';
import { connectDB } from './database/datasource.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server started!');
});

connectDB().then(() => {
  app.listen(configs.PORT, () => {
    console.log(`Server running on port http://localhost:${configs.PORT}`);
  });
});
