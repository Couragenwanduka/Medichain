import Appointment from '../model/appointment.js';
import {findDoctorById} from '../service/Doctors.service.js'

export const saveAppointment = async (patient, doctor,location) => {
    try {
        // Calculate the start time for the new appointment
        const today = new Date();
        const startTime = new Date(today);
        startTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

        // Calculate the end time for the new appointment
        const endTime = new Date(today);
        endTime.setHours(16, 0, 0, 0); // End at 4:00 PM

        // Find existing appointments for today
        const existingAppointments = await Appointment.find({ doctor, date: today });

        // Iterate over existing appointments to find the next available time slot
        let nextAvailableTime = new Date(startTime);
        for (const appointment of existingAppointments) {
            const appointmentTime = new Date(appointment.time);
            if (appointmentTime >= nextAvailableTime) {
                // Move to the next hour
                nextAvailableTime.setHours(nextAvailableTime.getHours() + 1);
            }
        }

        // Check if the day is full
        if (nextAvailableTime >= endTime) {
            // Day is full, schedule appointment for the next day
            const nextDay = new Date(today);
            nextDay.setDate(nextDay.getDate() + 1);
            nextDay.setHours(10, 0, 0, 0); // Start at 10:00 AM
            return saveAppointment(patient, doctor, nextDay); // Recursive call for the next day
        }
        // Save the appointment with the calculated time
        const newAppointment = new Appointment({
            patient,
            doctor,
            date: today, // Use today's date
            time: nextAvailableTime, // Use the calculated time
            location, // Assuming location is static or provided elsewhere
        });
        const appointment = await newAppointment.save();
        return appointment;
    } catch (error) {
        throw new Error('An error occurred while saving the appointment', error);
    }
};


export const findAppointmentByPatientId = async(patient)=>{
    try{
        const appointment = await Appointment.findOne({patient})
        const Doctor= await findDoctorById(appointment.doctor);
        const response=[appointment,Doctor]
        return response  
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