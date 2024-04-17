import mongoose from 'mongoose';

const PatientsSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    birthDay:{
        type:String,
    }
})

const Patients= mongoose.model('Patients',PatientsSchema);

export default Patients;
