import jwt from "jsonwebtoken";

export const auth = async (req, res, next)=>{
    const { jwtToken } = req.cookies;
    jwt.verify( jwtToken , process.env.JWT_SECRET ,(err, data)=>{
        if(err){
            res.status(400).send("unauthorized! login to continue!");
        }else{
            req.id = data.id;
            next();
        }
    });
}