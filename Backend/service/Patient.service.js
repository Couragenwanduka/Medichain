import Patients from '../model/Patient.js';
import { hashPassword } from '../config/bcrypt.js';

export const savePatient= async(firstName,lastName,email,password,age,gender)=>{
   try{
    const hashedPassword= await hashPassword(password)
     const newPatient = new Patients({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        age,
        gender})
     const savedPatient= await newPatient.save()
     return savedPatient
   }catch(error){
    throw new Error ('An error occurred while saving the patient',error)
   }
}
export const findPatientByEmail=async(email)=>{
    try{
      const patient = await Patients.findOne({email})
      return patient
    }catch(error){
        throw new Error ('An error occurred while finding the patient by email',error)
    }
}