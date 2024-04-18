import Doctors from '../model/doctor.js';
import { hashPassword } from '../config/bcrypt.js';
import {increaseDistance} from '../helper/range.js';
import {getAddressInfo} from '../helper/openStreetMap.js'
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
export const findAllDoctors = async (decoded) => {
    try {
        const latitude = decoded.Doctors.latitude;
        const longitude = decoded.Doctors.longitude;

        // Increase the distance by 30km from the current latitude and longitude
        const range = increaseDistance(latitude, longitude, 30);
        const { latitude: newLatitude, longitude: newLongitude } = range;

        // Find doctors within the range defined by the original and new latitude and longitude
        const doctors = await Doctors.find({
            latitude: { $gte: Math.min(latitude, newLatitude), $lte: Math.max(latitude, newLatitude) },
            longitude: { $gte: Math.min(longitude, newLongitude), $lte: Math.max(longitude, newLongitude) }
        }).exec();
        
        const doctorArrays = [];
        
        // Iterate through each doctor object
        doctors.forEach(doctor => {
            // Get address information for the doctor's latitude and longitude
            const address = getAddressInfo(doctor.latitude, doctor.longitude);
            
            // Push an array containing the address and the doctor object to the doctorArrays
            doctorArrays.push([address, doctor]);
        });

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