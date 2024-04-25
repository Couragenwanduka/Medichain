import {savePatient,findPatientByEmail} from '../service/Patient.service.js';
import {patientValidate,LoginValidation} from '../config/joi.js';
import {comparePassword} from '../config/bcrypt.js'
import {verifyCookie} from '../helper/verifycookies.js';
import jwt from 'jsonwebtoken';
import Patients from '../model/Patient.js';

export const CreatePatient=async(req,res)=>{
    try{
     const {firstName,lastName,email,password,age,gender}= req.body;
     const vaild= patientValidate({firstName,lastName,email,password,age,gender});
     if(vaild.error){
        return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});}
    const exisitingUser= await findPatientByEmail(email);
    if(exisitingUser){
        return res.status(400).json({message:"User Already Exists"});}
    const savedPatient = savePatient(firstName,lastName,email,password,age,gender);     
    return res.status(200).json({message:"user successfully Created", savedPatient});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const Login=async(req,res)=>{
     try{
       const {formData,longitude , latitude} = req.body;
       const {email,password} = formData;
       const vaild= LoginValidation({email,password,longitude , latitude});
       if(vaild.error){
           return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});}
       const user= await findPatientByEmail(email);
       if(!user){
           return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch= comparePassword(password,user)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});}
           const cookieOptions = {
            httpOnly: true,
            domain: '/', 
        };
        const payload={user:user,longitude , latitude}
        const token = jwt.sign(payload,process.env.jwt_key,{expiresIn:'12h'})
        res.cookie=('token',token,cookieOptions)
        return res.status(200).json({message:'user successfully signed in',token,user})
     }catch(error){
         res.status(500).json({message:error.message});
     }
}


export const patientDetails = async(req, res) =>{
try{
    const authHeader = req.headers.authorization
    const [bearer, token] = authHeader.split(' ');
    if(bearer!== 'Bearer' ||!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }
    const verified = await verifyCookie(token);
    if(!verified){
        return res.status(401).json({success:false,message:"please login first"})
    }
    res.status(200).json({success:true,message:"user successfully gotten",Patient:verified });
}catch(error){
    res.status(500).json({message:error.message});
}
}
