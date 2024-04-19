import express from 'express';
import {
  CreatePatient,
  Login
} from '../controllers/Patient.controller.js';

import {
  createDoctor,
  DoctorLogin,
  getAllDoctors,
  getDoctorBySpecialization
} from '../controllers/Doctor.controller.js';

import {
  CreateMessageByPatients,
  createMessageByDoctors,
  getMessageByPatientId,
  getMessageByDoctorId,
  deleteMessageById,
  updateMessageById
} from '../controllers/messages.contoller.js';

import {
  CreateAppointment,
  FindAllAppointmentByPatientId,
  FindAllAppointmentByDoctorId
} from '../controllers/appointment.controller.js';

import {
  createPrescription,
  getPrescriptionByPatientId,
  getPrescriptionByDoctorId
} from '../controllers/prescription.contollers.js';

const router = express.Router();

router.post('/medichain/patient-signup', CreatePatient);
router.post('/medichain/patient-login', Login);

router.post('/medichain/doctor-signup', createDoctor);
router.post('/medichain/doctor-login', DoctorLogin);

router.get('/medichain/all-doctors', getAllDoctors);
router.get('/medichain/doctor-by-specialization/:specialization', getDoctorBySpecialization);

router.post('/medichain/create-message-patients', CreateMessageByPatients);
router.post('/medichain/create-message-doctors', createMessageByDoctors);

router.get('/medichain/get-message-by-patient-id', getMessageByPatientId);
router.get('/medichain/get-message-by-doctor-id', getMessageByDoctorId);

router.delete('/medichain/delete-message-by-id/:messageId', deleteMessageById);
router.patch('/medichain/update-message-by-id/:messageId', updateMessageById);

router.post('/medichain/create-appointment', CreateAppointment);
router.get('/medichain/find-all-appointment-by-patient-id', FindAllAppointmentByPatientId);
router.get('/medichain/find-all-appointment-by-doctor-id', FindAllAppointmentByDoctorId);

router.post('/medichain/create-prescription', createPrescription);
router.get('/medichain/get-prescription-by-patient-id', getPrescriptionByPatientId);
router.get('/medichain/get-prescription-by-doctors-id', getPrescriptionByDoctorId);

export default router;
