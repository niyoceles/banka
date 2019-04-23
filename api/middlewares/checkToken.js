import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const token = req.headers['access-token'] || req.body['access-token'] || null;

  if (!token) {
    return res.status(401).json({
      error: 'Please, Authentication is required!',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        error: 'Failed to authenticate token',
      });
    }
    req.decodedToken = decoded || null;
    next();
    return true;
  });
  return true;
};

export default checkToken;
