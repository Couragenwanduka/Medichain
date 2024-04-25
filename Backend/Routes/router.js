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
  deleteMessageByid,
  updateMessageByid
} from '../controllers/messages.contoller.js';

import {
  CreateAppointment,
  FindAllAppointmentByPatientId,
  FindAllAppointmentByDoctorId,
  updateAppointmentStatus
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

router.delete('/medichain/delete-message-by-id/:messageId', deleteMessageByid);
router.patch('/medichain/update-message-by-id/:messageId', updateMessageByid);

router.post('/medichain/create-appointment', CreateAppointment);
router.get('/medichain/find-all-appointment-by-patient-id', FindAllAppointmentByPatientId);
router.get('/medichain/find-all-appointment-by-doctor-id', FindAllAppointmentByDoctorId);
router.patch('/medichain/update-appointment-by-patient-id/:id',updateAppointmentStatus)

router.post('/medichain/create-prescription', createPrescription);
router.get('/medichain/get-prescription-by-patient-id', getPrescriptionByPatientId);
router.get('/medichain/get-prescription-by-doctors-id', getPrescriptionByDoctorId);

export default router;
