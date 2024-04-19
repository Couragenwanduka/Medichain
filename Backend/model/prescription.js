import mongoose from 'mongoose';

const drugSchema =new mongoose.Schema({
    drugName: {
        type: String,
        required: true
    },
    drugType: {
        type: String,
        required: true
    },
    drugDosage: {
        type: String,
        required: true
    },
    drugFrequency: {
        type: String,
        required: true
    },
    drugDuration: {
        type: String,
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Prescription = mongoose.model('Prescription', drugSchema);

export default Prescription;