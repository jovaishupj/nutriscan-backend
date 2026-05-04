const errorHandler = (err, req, res, next) => {
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size should be less than 2MB",
      });
    }
   
  }
   if (err.message === "Only images are allowed") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  console.error(err);
  return res.status(500).send("Something broke!");
};
export default errorHandler;
