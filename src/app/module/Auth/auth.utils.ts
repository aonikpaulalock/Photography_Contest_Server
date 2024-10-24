import jwt, { JwtPayload } from "jsonwebtoken"

//! Create Token
export const createToken = (
  secretPayload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(
    secretPayload,
    secret,
    { expiresIn }
  )
}

//! Verify token
export const verifyToken = (
  token: string,
  secret: string
) => {
  return jwt.verify(token, secret);
}
