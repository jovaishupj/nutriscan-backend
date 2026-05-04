import mongoose from "mongoose";

const foodCacheSchema = mongoose.Schema({
  imageHash: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  analysis: {
    type: Object,
    required: true,
  },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
 
}, {timestamps: true});
const foodCacheModel=mongoose.model.foodCacheModel||mongoose.model('foodCacheModel',foodCacheSchema);

export default foodCacheModel