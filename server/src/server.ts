import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { sample_foods } from './data';

import foodRouter from './routes/food.route';
import userRouter from './routes/user.route';
import orderRouter from './routes/order.route';

import { auth } from './middlewares/auth.mid'
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:4200'
}));


app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders",auth, orderRouter);



const port = 5000;
app.listen(port, ()=>{
    console.log("server running on port " + port);
})
