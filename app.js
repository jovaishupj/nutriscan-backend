import express, { urlencoded } from 'express'
import cors from 'cors'
import foodRoute from './routes/foodRoutes.js';
import errorHandler from './middleware/error.middleware.js';
import userRouter from './routes/userRoutes.js';

const app=express();
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors({
  origin: "*"
}));
app.use('/images',express.static("uploads"));
app.use('/api/food',foodRoute);
app.use('/api/user',userRouter);
app.use(errorHandler);

export default app;