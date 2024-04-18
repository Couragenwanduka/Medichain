import mongoose from 'mongoose';

const messageSchema =new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
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
        type: Number,
        required: true
    }
})

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;