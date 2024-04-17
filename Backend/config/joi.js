import joi from  'joi';

const PatientSchema=joi.object({
  firstName:joi.string().required(),
  lastName:joi.string().required(),
  email:joi.string().required().email(),
  password:joi.string().required().max(15).min(5),
  age:joi.number().required(),
  gender:joi.string().required(),
  
})
const doctorsSchema=joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email:joi.string().required().email(),
    password:joi.string().required().max(15).min(5),
    age:joi.number().required(),
    gender:joi.string().required(),
    specialization:joi.string().required(),
    experience:joi.string().required(),
    bio:joi.string().required().max(50).min(10),
    images:joi.string().required(),
})

const appointmentSchema=joi.object({
    patient:joi.string().required(),
    doctor:joi.string().required(),
    date:joi.string().required(),
    time:joi.string().required(),
})

export const appointmentValidate=(patient,doctor,date,time)=>{
    try{
    const result= appointmentSchema.validate(patient,doctor,date,time)
    return result
    }catch(error){
        return error
    }
}
const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
    location:joi.string().required()
})

export const doctorValidation=(firstName,lastName,email,password,age,gender,specialization,experience,bio,images)=>{
     try{
     const result= doctorsSchema.validate(firstName,lastName,email,password,age,gender,specialization,experience,bio,images)
     return result
     }catch(error){
         return error
     }
}
export const LoginValidation=(email, password,location) =>{
    try{
    const result= loginSchema.validate(email,password,location)
    return result
    }catch(error){
        return error
    }
}

export const patientValidate=(firstName,lastName,email,password,age,gender)=>{
    try{
    const result= PatientSchema.validate(firstName,lastName,email,password,age,gender)
    return result
    }catch(error){
        return error
    }
}