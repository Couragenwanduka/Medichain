import { saveDoctor,findDoctorByEmail ,findDoctorBySpecialization,findAllDoctors,findDoctorAndUpdate} from "../service/Doctors.service.js";
import {doctorValidation,LoginValidation} from '../config/joi.js';
import {comparePassword} from '../config/bcrypt.js'
import jwt from 'jsonwebtoken';

export const createDoctor = async (req, res) => {
    try {
        multipleUpload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({ message: "Error uploading image", error: error });
            }
            
            const images = [];
          
            for (const file of req.files) {
                const uploadImage = await cloudinary.uploader.upload(file.path);
                if (!uploadImage) {
                    return res.status(400).json({ message: "Image upload failed" });
                }
                images.push(uploadImage.secure_url);
            }

            const { firstName, lastName, email, password, age, gender, specialization, experience, bio} = req.body;
            const validation = doctorValidation(firstName, lastName, email, password, age, gender, specialization, experience, bio, images);

            if (validation.error) {
                return res.status(400).json({ message: "Error validating input", error: validation.error.details[0].message });
            }

            const existingDoctor = await findDoctorByEmail(email);

            if (existingDoctor) {
                return res.status(400).json({ message: "Doctor with this email already exists" });
            }

            const newDoctor = await saveDoctor(firstName, lastName, email, password, age, gender, specialization, experience, bio, images);

            res.status(200).json({ success: true, message: "Doctor created successfully", doctor: newDoctor });
        });
    } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
};

export const DoctorLogin = async (req, res) => {
    try {
        const { email, password, location } = req.body;
        const validation = LoginValidation({ email, password, location });

        if (validation.error) {
            return res.status(400).json({ message: "Error validating input", error: validation.error.details[0].message });
        }

        const doctor = await findDoctorByEmail(email);

        if (!doctor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, doctor.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const addLocation = await findDoctorAndUpdate(doctor._id, location);

        if (!addLocation) {
            return res.status(400).json({ message: "Unable to add location" });
        }

        const payload = {
            doctor,
            location
        };

        const token = jwt.sign(payload, process.env.jwt_key, { expiresIn: "12h" });

        const cookieOptions = {
            httpOnly: true,
            domain: '/',
        };

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({ message: 'Doctor successfully signed in', token, doctor });
    } catch (error) {
        console.error("Error during doctor login:", error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};


export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await findAllDoctors();
        res.status(200).json({ success: true, message: "Doctors fetched successfully", doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
}

export const getDoctorBySpecialization = async (req, res) => {
    try {
        const {specialization} = req.params;
        const doctor = await findDoctorBySpecialization(specialization);
        res.status(200).json({ success: true, message: "Doctor fetched successfully", doctor });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error });
    }
}