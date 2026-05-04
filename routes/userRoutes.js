import express from "express";
import { registrUser, LoginUser } from "../controllers/userController.js"

const userRouter=express.Router();

userRouter.post('/register', registrUser);
userRouter.post('/login', LoginUser);

export default userRouter;