import Doctors from '../model/doctor.js';
import { hashPassword } from '../config/bcrypt.js';
export const saveDoctor = async(firstName,lastName,email,password,age,gender,specialization,experience,bio,images,location) =>{
    try{
  const hashedPassword = hashPassword(password)      
  const newDoctor = new Doctors({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    age,
    gender,
    specialization,
    experience,
    bio,
    image:images,
    location
  })
  const savedDoctor = await newDoctor.save();
  return savedDoctor
    }catch(error){
        throw new Error ("Error occured while saving saving Doctor ",error.message);
    }
}

export const findDoctorByEmail = async(email) =>{
    try{
        const doctor = await Doctors.findOne({email});
        return doctor
    }catch(error){
        throw new Error ("Error occured while finding doctor by email ",error.message);
    }
}

export const findDoctorBySpecialization= async(specialization) =>{
    try{
        const doctor = await Doctors.findOne({specialization});
        return doctor
    }catch(error){
        throw new Error ("Error occured while finding doctor by specialization ",error.message);
    }
}
export const findAllDoctors = async() =>{
    try{
        const doctors = await Doctors.find();
        return doctors
    }catch(error){
        throw new Error ("Error occured while finding all doctors ",error.message);
    }
}
export const findDoctorAndUpdate = async(_id,location) =>{
    try{
        const doctor = await Doctors.findOneAndUpdate(_id,{location},{new:true});
        return doctor
    }catch(error){
        throw new Error ("Error occured while updating doctor ",error.message);
    }
}