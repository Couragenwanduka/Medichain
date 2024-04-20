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
    email:joi.string().required(),
    password:joi.string().required().max(15).min(5),
    age:joi.string().required(),
    gender:joi.string().required(),
    specialization:joi.string().required(),
    experience:joi.string().required(),
    bio:joi.string().required(),
})

const appointmentSchema=joi.object({
    patient:joi.string().required(),
    doctor:joi.string().required(),
    date:joi.string().required(),
    time:joi.string().required(),
})

const prescriptionSchema=joi.object({
    drugName:joi.string().required(),
    drugType:joi.string().required(),
    drugDosage:joi.string().required(),
    drugFrequency:joi.string().required(),
    drugDuration:joi.string().required(),
    doctor:joi.string().required(),
    patient:joi.string().required(),
})

export const prescriptionValidate=(drugName,drugType,drugDosage,drugFrequency,drugDuration,doctor,patient)=>{
    try{
        const result= prescriptionSchema.validate(drugName,drugType,drugDosage,drugFrequency,drugDuration,doctor,patient)
        return result
    }catch(error){
        return error
    }

}
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
    longitude:joi.number().required(), 
    latitude:joi.number().required(),
})

const messageSchema=joi.object({
    message:joi.string().required().min(10).max(80),
    patient:joi.string().required(),
    doctor:joi.string().required()
});

const updatedMessageSchema=joi.object({
    message:joi.string().required(),
});
export const updateMessageValidation=(newMessage)=>{
  try{
    const result= updatedMessageSchema.validate(newMessage)
    return result
  }catch(error){
    return error
}
}
export const messageValidate=(message,patient,doctor)=>{
    try{
    const result= messageSchema.validate(message,patient,doctor)
    return result
    }catch(error){
        return error
    }
}

export const doctorValidation=(firstName,lastName,email,password,age,gender,specialization,experience,bio)=>{
     try{
     const result= doctorsSchema.validate({firstName,lastName,email,password,age,gender,specialization,experience,bio})
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