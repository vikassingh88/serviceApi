const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'tS0u1K656W03C2FQ');
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = authenticateToken;
