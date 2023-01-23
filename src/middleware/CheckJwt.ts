import { Request, Response, NextFunction } from "express";

const secret = "your_secret_key";

function checkJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  /*Just mocking behaviour*/
  req.body.userId = token;

  next();
}

export default checkJWT;
