import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{type : String,
        required: true
    },
    phone : {
        type : String,
        required: true,
    }
});

export const patientModel = mongoose.model('patient', patientSchema); 