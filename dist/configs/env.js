import dotenv from 'dotenv';
dotenv.config();
const configs = {
    PORT: process.env.PORT || 5000,
};
export default configs;
