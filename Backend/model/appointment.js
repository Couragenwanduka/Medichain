import mongoose from 'mongoose';

const appointmentSchema= new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'shifted','cancelled'],
        default: 'active'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;