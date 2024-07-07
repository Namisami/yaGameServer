import * as dotenv from 'dotenv';
import { createServer } from 'http';

const app = createServer((req, res) => {
  res.end('Hello!')
})

dotenv.config();

console.log(process.env.NODE_ENV)