import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/htttp_status";

export const auth=  (req: any, res: any, next: any) =>{
    const token = req.headers.access_token as string;

    if(!token) return res.status(HTTP_UNAUTHORIZED).send("unauthorized");

    try {
        const decodedUser= verify(token, process.env.JWT_SECRET!);
        req.user= decodedUser;
        return next();
    } catch (error) {
         res.status(HTTP_UNAUTHORIZED).send("unauthorized");
    }
    
    
}