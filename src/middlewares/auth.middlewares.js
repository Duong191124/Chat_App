const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Lấy token từ header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Giải mã token, sử dụng SECRET bạn dùng lúc tạo token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Thay bằng biến môi trường thực tế

    // Gắn thông tin user vào request để dùng ở controller
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
