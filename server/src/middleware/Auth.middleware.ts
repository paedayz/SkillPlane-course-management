import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode'

export default async (req: Request, res: Response, next: NextFunction, expectRole:string) => {
    if(!expectRole) return next()

    let token: string
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split("Bearer ")[1];
      } else {
        console.error("No token found");
        return res.status(403).json({ error: "Unauthorized" });
      }
    
    let decoded: {username: string, role: string, exp: number} = await jwt_decode(token)
    if(decoded.exp < Date.now()) {
      return res.status(403).json({ error: "Access Token Expired" });
    }
    if(expectRole === 'admin' && decoded.role === 'admin') next()
    else if (expectRole === 'user' && (decoded.role === 'user' || decoded.role === 'admin')) next()
    else return res.status(403).json({ error: "No permission" });
}