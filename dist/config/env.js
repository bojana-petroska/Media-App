import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.prod'
    : process.env.NODE_ENV === 'test'
        ? '.env.test'
        : '.env';
dotenv.config({ path: envFile });
const configs = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || 'postgres',
    PORT: process.env.PORT || 5004,
    database: {
        POSTGRES_HOST: process.env.POSTGRES_HOST || 'postgres',
        POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
        POSTGRES_USER: process.env.POSTGRES_USER || 'news_admin',
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'news_admin',
        POSTGRES_DB: process.env.POSTGRES_DB || 'news_app_db',
    },
    auth: {
        JWT_SECRET: process.env.JWT_SECRET ||
            'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273',
    },
};
export default configs;
