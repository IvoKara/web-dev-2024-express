// src/app.ts
import express from 'express';
import { userRouter } from './user/user.route';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
