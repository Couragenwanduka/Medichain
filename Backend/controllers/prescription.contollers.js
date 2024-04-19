import {savePrescription,findPrescriptionByPatientId,findPrescriptionByDoctorId } from '../service/prescription.service.js';
import {prescriptionValidate} from '../config/joi.js';

export const createPrescription=async(req,res)=>{
    try{
      const authHeader = req.headers.authorization
      const [bearer, token] = authHeader.split(' ');
      if(bearer!== 'Bearer' ||!token){
          return res.status(401).json({success:false,message:"Unauthorized"})
      }
      const verified = await verifyCookie(token);
      if(!verified){
          return res.status(401).json({success:false,message:"please login first"})
      }
      const {drugName,drugType,drugDosage,drugFrequency,drugDuration,patient}= req.body
      const doctor= verified.Doctors._id
      const vaild= prescriptionValidate(drugName,drugType,drugDosage,drugFrequency,drugDuration,doctor,patient)
      if(!vaild){
          return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});
      }
      const savedPrescription = await savePrescription(drugName,drugType,drugDosage,drugFrequency,drugDuration,doctor,patient);
      return res.status(200).json({message:"prescription saved successfully", savedPrescription});
    }catch(error){
        return res.status(400).json({message:"Error validating Input",error:error.details[0].message});
    }

}

export const getPrescriptionByPatientId=async(req,res)=>{
   try{
    const authHeader = req.headers.authorization
    const [bearer, token] = authHeader.split(' ');
    if(bearer!== 'Bearer' ||!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }
    const verified = await verifyCookie(token);
    if(!verified){
        return res.status(401).json({success:false,message:"please login first"})
    }
    const patient= verified.Patients._id
    const findPrescription = await findPrescriptionByPatientId(patient);
    return res.status(200).json({ success: true, message: "Prescription found successfully", prescription: findPrescription });
   }catch(error){
    return res.status(400).json({message:"Error validating Input",error:error.details[0].message});
   }
}

export const getPrescriptionByDoctorId=async(req,res)=>{
    try{
      const authHeader = req.headers.authorization
      const [bearer, token] = authHeader.split(' ');
      if(bearer!== 'Bearer' ||!token){
          return res.status(401).json({success:false,message:"Unauthorized"})
      }
      const verified = await verifyCookie(token);
      if(!verified){
          return res.status(401).json({success:false,message:"please login first"})
      }
      const doctor= verified.Doctors._id
      const findPrescription = await findPrescriptionByDoctorId(doctor);
      return res.status(200).json({ success: true, message: "Prescription found successfully", prescription: findPrescription });
     }catch(error){
         return res.status(400).json({message:"Error validating Input",error:error.details[0].message});
     }
}