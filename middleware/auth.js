import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, Message: "UnAuthorized user" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;
    req.body = req.body || {};
    req.body.userId = tokenDecode.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ success: false, Message: "Error Occured" });
  }
};

export default authMiddleware;
