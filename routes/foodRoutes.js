import express from "express"
import upload from "../middleware/upload.middleware.js";
import { addFood, getUserFoods } from "../controllers/food.controller.js";
import authMiddleware from "../middleware/auth.js";


const foodRoute=express.Router();

foodRoute.post('/upload', authMiddleware, upload.single("image"), addFood);
foodRoute.get('/my-foods', authMiddleware, getUserFoods);

export default foodRoute;