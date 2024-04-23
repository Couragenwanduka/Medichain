import {saveAppointment ,findAppointmentByPatientId,findAppointmentByDoctorId,updateAppointmentByPatientId}from '../service/appointment.service.js'
import {appointmentValidate} from '../config/joi.js'
import {verifyCookie} from '../helper/verifycookies.js'


export const CreateAppointment = async (req, res) => {
    try {
        const { doctorid,location} = req.body;
        const doctor =doctorid
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const [bearer, token] = authHeader.split(' '); // Split by space character

        if (bearer !== 'Bearer' || !token) { // Check if bearer is 'Bearer' and token exists
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const verified = await verifyCookie(token);

        if (!verified) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const valid = appointmentValidate({ patient: verified.user._id, doctor});

        if (!valid) {
            return res.status(400).json({ message: "Error validating input", error: valid.error.details[0].message });
        }

        const findAppointment = await findAppointmentByPatientId(verified.user._id);
        if (findAppointment && findAppointment.time === time && findAppointment.date === date) {
            return res.status(400).json({ success: false, message: "Appointment time already booked" });
        }
         const patient =verified.user._id
        const savedAppointment = await saveAppointment( patient,doctor,location);

        return res.status(201).json({ success: true, message: "Appointment created successfully", appointment: savedAppointment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const FindAllAppointmentByPatientId = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const [bearer, token] = authHeader.split(' '); 
        if (bearer !== 'Bearer' || !token) { // Check if bearer is 'Bearer' and token exists
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const verified = await verifyCookie(token);
        if (!verified) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const findAppointment = await findAppointmentByPatientId(verified.user._id);
        return res.status(200).json({ success: true, message: "Appointment found successfully", appointment: findAppointment });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const FindAllAppointmentByDoctorId = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        const [bearer, token] = authHeader.split(' '); 
        if (bearer !== 'Bearer' || !token) { // Check if bearer is 'Bearer' and token exists
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const verified = await verifyCookie(token);
        if (!verified) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const findAppointment = await findAppointmentByDoctorId(verified.user._id);
        return res.status(200).json({ success: true, message: "Appointment found successfully", appointment: findAppointment });
    }catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

