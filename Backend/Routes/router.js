import express from 'express';
import{CreatePatient,Login} from '../controllers/Patient.controller.js'
import {createDoctor,DoctorLogin,getAllDoctors,getDoctorBySpecialization} from '../controllers/Doctor.controller.js'
const router= express.Router();

router.post('/medichain/patient-signup',CreatePatient);

router.post('/medichain/patient-login',Login);

router.post('/medichain/doctor-signup',createDoctor);

router.post('/medichain/doctor-login',DoctorLogin);

router.get('/medichain/all-doctors',getAllDoctors);

router.get('/medichain/doctor-by-specialization/:specialization',getDoctorBySpecialization);


export default router;