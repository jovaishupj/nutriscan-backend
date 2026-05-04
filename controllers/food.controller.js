import analyzeFoodImage from "../services/ai.service.js";
import path from "path";
import generateHashImage from "../utils/hash.js";
import foodCacheModel from "../models/food.model.js";

const addFood = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const imgPath = path.join(process.cwd(), "uploads", req.file.filename);
    const imageHash = generateHashImage(imgPath);
    //check cached value
    
    const cachedData = await foodCacheModel.findOne({ imageHash });
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        image: `${req.protocol}://${req.get("host")}/images/${
          cachedData.image
        }`,
        analysis: cachedData.analysis,
      });
    } else {
      const result = await analyzeFoodImage(imgPath);
      const dataToCache = new foodCacheModel({
        imageHash,
        image: req.file.filename,
        analysis: result,
        user: req.userId
      });
      await dataToCache.save();

      return res.json({
        success: true,
        cached: false,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        analysis: result,
      });
    }
  } catch (err) {
    next(err);
  }
};
const getUserFoods = async (req, res, next) => {
  try {
    let foods = await foodCacheModel
      .find({ user: req.userId })
     .populate("user", "name email")
      .limit(20)
      .sort({ createdAt: -1 }).lean();

   foods=foods.map((food)=>({
    ...food,
     image:`${req.protocol}://${req.get("host")}/images/${food.image}`
   }));
    return res.json({ success: true, data: foods });
  } catch (err) {
    next(err);
  }
};

export { addFood, getUserFoods };
