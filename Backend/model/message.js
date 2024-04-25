
import mongoose from 'mongoose';

const messageSchema =new mongoose.Schema({
    message: [{
        type: String,
        required: true
    }],
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    },
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    sender:{
       type:String,
       required:true
    },
    time: {
        type: String,
        required: true
    }
})

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;