import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET;


const validateToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, secretKey , (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is not authorized");
                }
                req.userId = decoded.userId;
                next();
            });
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED);
                throw new Error("User is not authorized or token is missing");
            }
        }
        else{
            throw new Error("Token is missing!!!");
        }
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR ).json({data:null , message: "Error"})
    }
};

export default validateToken;