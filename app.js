import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./database/db.js";  
import cookieParser from "cookie-parser"; 
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3001", // Next.js frontend URL
    credentials: true, // Allow cookies to be sent
  }));
app.use(errorMiddleware);



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.listen(process.env.PORT, async () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    await connectDB();
});

export default app;