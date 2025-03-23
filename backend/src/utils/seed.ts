// import dotenv from 'dotenv';
// dotenv.config();
// import redisClient from '../redis.config';

// (async () => {
//   try {
//     await redisClient.set('new', '70');
//     console.log('Data appended successfully!');

//     // Retrieve value to verify
//     const value = await redisClient.get('foo');
//     console.log('Stored Value:', value);

//     // Gracefully close RedisredisClient connection
//     await redisClient.quit();
//   } catch (error) {
//     console.error('Redis Error:', error);
//   } finally {
//     process.exit(0);
//   }
// })();
