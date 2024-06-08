import mongoose from "mongoose";
import { patientModel } from "../models/patient.model.js";

export const registerPatient = async(req, res, next)=>{
    try{
        const {name , phone} = req.body;
        let patient = await patientModel.findOne({name:name , phone : phone });
        if (patient){
            res.status(200).json({message: "Patient already registered before", patient_details: patient});
        }else{
            patient = new patientModel({name , phone});
            await patient.save();
            res.status(201).json({message: "Patient is registered now", patient_details: patient});
        };        
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error while registering the patient", error:err.message});
    }
    
};