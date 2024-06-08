import reportModel from "../models/report.model.js";
import { patientModel } from "../models/patient.model.js";

export const createReport = async(req, res, next)=>{
    try{
        const { status } = req.body;
        const doctorId = req.id;
        const patientId = req.params.id;
        const patient = await patientModel.findById({_id: patientId});
        if(!patient){
            res.status(400).json({message:"Error while creating the report", message:"The patientId provided is wrong"});
        }else{
            const report = new reportModel({doctor : doctorId , patient : patientId, status : status});
            await report.save();
            res.status(201).json({message: "Report created", report: report});
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error while creating the report", error: err.message});
    }
};

export const getAllReport = async (req, res, next)=>{
    try{
        const patientId = req.params.id;
        const patient = await patientModel.findById({_id: patientId});
        const reports = await reportModel.find({patient : patientId}).sort('date');
        console.log(patient.name);
        if(!patient){
            res.status(400).json({message:"The patient id mentioned is wrong"});
        }
        if(reports.length==0){
            res.status(200).json({message:`The patient ${patient.name} has no reports generated`});
        }else{
            res.status(200).json({message:`There are ${reports.length} reports for the patient ${patient.name} are`, report: reports})
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error while fetching the report", error: err.message});
    }
};

export const getReportsByStatus = async (req, res, next)=>{
    try{
        const status = req.params.status;
        const report = await reportModel.find({status});
        if(report.length==0){
            res.status(200).json({message:`There are no patients with report status as ${status} `});
        }else{
            res.status(200).json({message:`There are ${report.length} reports with the status ${status} `, report: report})
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Error while fetching the report", error: err.message});
    }
};