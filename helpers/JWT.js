const jwt = require('jsonwebtoken');

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_ACCESS_SECRET, 
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN } // e.g., '1d'
  );
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN } // e.g., '2d'
  );
};

// Extract and verify JWT from headers
const getPayload = (req) => {
  const token = req.headers["authorization"]?.replace('Bearer ', '');
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Middleware to authenticate using the access token
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


// Refresh Token Route Handler
const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if(decoded){
      // Generate a new access token
      const newAccessToken = generateAccessToken(decoded);
      // Send the new access token to the client
      return res.status(200).json({ accessToken: newAccessToken });
    }

  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// Export functions
module.exports = {
  authenticateJWT,
  getPayload,
  generateAccessToken,
  generateRefreshToken,
  RefreshToken
};
