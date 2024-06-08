import DoctorModel from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res, next)=>{
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log(req.body);
        const doctor = new DoctorModel({ username, password : hashedPassword });
        await doctor.save();
        if(doctor){
            res.status(201).json({ message:"Doctor account created successfully", _id: doctor._id, username: doctor.username });
        }else {
            res.status(400);
            throw new Error('Invalid doctor data');
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
};

export const authDoctor = async(req, res, next)=>{
    try{
        const {username , password } = req.body;
        const doctor = await DoctorModel.findOne({username});
        if(!doctor){
            res.status(400).json({message: "Invalid Credentials!!"});
        }else{
        const hashedPassword = doctor.password;
        const confirmPassword = await bcrypt.compare(password, hashedPassword);
        if (doctor && confirmPassword){
            const token = jwt.sign({id : doctor._id}, process.env.JWT_SECRET,{
                expiresIn : '2h'
            })
            res
            .cookie("jwtToken",token,{ maxAge : 1 * 60 * 60 * 1000 , httpOnly : true})
            .status(201).json({message:"Confirmed the doctor login", _id: doctor._id, username: doctor.username, token });
        }else{
            res.status(400).json({message: "Incorrect password"});
        }
    }
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
};

export const authDoctorregegedfg = async(req, res, next)=>{
    try{
        
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
};