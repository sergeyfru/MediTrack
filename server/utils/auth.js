import jwt from "jsonwebtoken";

const {
  ACCESS_SECRET,
  EMAIL_VERIFY_SECRET,
  EMAIL_VERIFY_TOKEN_EXPIRY,
  REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
} = process.env;

export const generateAccessToken = (user) => {
  const AccessToken = jwt.sign(user, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  return AccessToken;
};

export const generateRefreshToken = (user) => {
  const RefreshToken = jwt.sign({ user_id: user.user_id }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return RefreshToken;
};

export const generateEmailVerifyToken = (user) => {
  const EmailVerifyToken = jwt.sign(user, EMAIL_VERIFY_SECRET, {
    expiresIn: EMAIL_VERIFY_TOKEN_EXPIRY,
  });
  return EmailVerifyToken;
};

export const verifyAccessToken = (AccessToken) => {
  try {
    return jwt.verify(AccessToken, ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};
export const verifyRefreshToken = (RefreshToken) => {
  try {
    return jwt.verify(RefreshToken, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};
export const verifyEmailVerifyToken = (EmailVerifyToken) => {
  try {
    return jwt.verify(EmailVerifyToken, EMAIL_VERIFY_SECRET);
  } catch (error) {
    return null;
  }
};
