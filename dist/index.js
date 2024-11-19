import express from 'express';
import configs from './configs/env.js';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server started!');
});
app.listen(configs.PORT, () => {
    console.log(`Server running on port ${configs.PORT}`);
});
