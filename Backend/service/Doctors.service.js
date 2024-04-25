import Doctors from '../model/doctor.js';
import { hashPassword } from '../config/bcrypt.js';
import {increaseDistance} from '../helper/range.js';
import {getAddressInfo} from '../helper/openStreetMap.js'
export const saveDoctor = async(firstName,lastName,email,password,age,gender,specialization,experience,bio,images) =>{
    try{

  const hashedPassword = await hashPassword(password)      
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
  })
  const savedDoctor = await newDoctor.save();
  return savedDoctor
    }catch(error){
        console.log(error,"save failed");
        // throw new Error ("Error occured while saving saving Doctor hmm ",error.message);
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

export const findDoctorBySpecialization= async(decoded,specialization) =>{
    try{
        const latitude = decoded.latitude;
        const longitude = decoded.longitude;
        // Increase the distance by 30km from the current latitude and longitude
        const range = increaseDistance(latitude, longitude, 300);
        const { newLatitude,  newLongitude } = range;
        // Find doctors within the range defined by the original and new latitude and longitude
        const doctors = await Doctors.find({
            latitude: { $gte: Math.min(latitude, newLatitude), $lte: Math.max(latitude, newLatitude) },
            longitude: { $gte: Math.min(longitude, newLongitude), $lte: Math.max(longitude, newLongitude) }
        }).exec();
        
        const doctorArrays = [];
        
        // Iterate through each doctor object
        for (const doctor of doctors) {
            // Get address information for the doctor's latitude and longitude
            const address = await getAddressInfo(doctor.latitude, doctor.longitude);
            if(doctor.specialization === specialization){
                doctorArrays.push(address, doctor);
            }else{
                continue;
            }   
        }
        return doctorArrays;
    }catch(error){
        throw new Error ("Error occured while finding doctor by specialization ",error.message);
    }
}
export const findAllDoctors = async (decoded) => {
    try {
        const latitude = decoded.latitude;
        const longitude = decoded.longitude;

        // Increase the distance by 30km from the current latitude and longitude
        const range = increaseDistance(latitude, longitude, 30);
        const { newLatitude,  newLongitude } = range;

        // Find doctors within the range defined by the original and new latitude and longitude
        const doctors = await Doctors.find({
            latitude: { $gte: Math.min(latitude, newLatitude), $lte: Math.max(latitude, newLatitude) },
            longitude: { $gte: Math.min(longitude, newLongitude), $lte: Math.max(longitude, newLongitude) }
        }).exec();
        
        const doctorArrays = [];
        
        // Iterate through each doctor object
        for (const doctor of doctors) {
            // Get address information for the doctor's latitude and longitude
            const address = await getAddressInfo(doctor.latitude, doctor.longitude);
            doctorArrays.push([address, doctor]);
        }

        return doctorArrays;
    } catch (error) {
        throw new Error("Error occurred while finding all doctors: " + error.message);
    }
}


export const findDoctorAndUpdate = async (_id, longitude, latitude) => {
    try {
        const doctor = await Doctors.findOneAndUpdate(
            { _id: _id }, 
            { $set: { longitude: longitude, latitude: latitude } }, 
            { new: true } 
        );
        return doctor;
    } catch (error) {
        throw new Error("Error occurred while updating doctor: " + error.message);
    }
}
export const findDoctorById=async(_id)=>{
    try{
        const doctor = await Doctors.findOne({_id});
        return doctor
    }catch(error){
        throw new Error ("Error occured while finding doctor by id ",error.message);
    }
}