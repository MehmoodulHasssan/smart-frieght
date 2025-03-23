import dotenv from 'dotenv';
dotenv.config();

import Redis from 'ioredis';

console.log('env', process.env);

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env;

const redisClient = new Redis({
  password: REDIS_PASSWORD,
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT as string),
});

export default redisClient;
