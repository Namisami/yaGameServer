import * as dotenv from 'dotenv';
import * as http from 'http';

dotenv.config();

const PORT = process.env.PORT;

console.log(PORT);

const app = http.createServer((req: http.IncomingMessage, res) => {
  res.end('Hello!')
})

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
})
