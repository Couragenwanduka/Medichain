import Appointment from '../model/appointment.js';

export const saveAppointment = async(patient,doctor,date,time)=>{
    try{
    const newAppointment = new Appointment({
        patient,
        doctor,
        date,
        time
    })
    const appointment = await newAppointment.save()
    return appointment
    }catch(error){
        throw new Error ('An error occurred while saving the appointment',error)
    }
}

export const findAppointmentByPatientId = async(patient)=>{
    try{
        const appointment = await Appointment.findOne({patient})
        return appointment
    }catch(error){
        throw new Error ('An error occurred while finding the appointment',error)
    }
}

export const findAppointmentByDoctorId = async(doctor)=>{
    try{
        const appointment = await Appointment.findOne({doctor})
        return appointment
    }catch(error){
        throw new Error ('An error occurred while finding the appointment',error)
    }
}

export const updateAppointmentByPatientId = async(patient,status)=>{
    try{
        const appointment = await Appointment.findOneAndUpdate(patient,{$set:{status}})
        return appointment
    }catch(error){
        throw new Error ('An error occurred while updating the appointment',error)
    }
}