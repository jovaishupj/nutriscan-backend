import { connectDB } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

app.get("/", (req, res) => {
  res.send("NutriScan API is running");
});
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running in port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Issue starting server");
  }
};
startServer();
