import {saveMessage, findMessageByPatientId,findMessageByDoctorId ,deleteMessageById,updateMessageById} from '../service/message.service.js';
import {messageValidate,updateMessageValidation} from '../config/joi.js';
import {verifyCookie} from '../helper/verifycookies.js';

export const CreateMessageByPatients = async (req, res) => {
    try{
   const {message,doctorid}= req.body
   const authHeader = req.headers.authorization
   const [bearer, token] = authHeader.split(' ');
   if(bearer!== 'Bearer' ||!token){
       return res.status(401).json({success:false,message:"Unauthorized"})
   }
   const verified = await verifyCookie(token);
   if(!verified){
       return res.status(401).json({success:false,message:"please login first"})
   }
   
   const patient= verified.user._id
    const vaild= messageValidate({message,patient,doctorid});
    if(!vaild){
        return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});
    }
    const savedMessage = await saveMessage(message,patient,doctorid); 
    return res.status(200).json({message:"message successfully sent", savedMessage});
    }catch(error){
     console.log(error);
     return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}
export const createMessageByDoctors= async(req,res)=>{
    try{
        const {message,patient}= req.body
        const authHeader = req.headers.authorization
        const [bearer, token] = authHeader.split(' ');
        if(bearer!== 'Bearer' ||!token){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }
        const verified = await verifyCookie(token);
        if(!verified){
            return res.status(401).json({success:false,message:"please login first"})
        }
        const doctor= verified.Doctors._id
         const vaild= messageValidate({message,patient,doctor});
         if(!vaild){
             return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});
         }
         const savedMessage = await saveMessage(message,patient,doctor);
         return res.status(200).json({message:"message successfully sent", savedMessage});
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const getMessageByPatientId = async (req, res) => {
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
        const patient= verified.user._id
        const findMessage = await findMessageByPatientId(patient);
        return res.status(200).json({message:"message fetched successfully", findMessage});
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const getMessageByDoctorId = async (req, res) => {
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
        const doctor= verified.Doctors._id
        const findMessage = await findMessageByDoctorId(doctor);
        return res.status(200).json({message:"message fetched successfully", findMessage});
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const deleteMessageByid = async (req, res) => {
    try{
        const _id= req.params._id
        const deletedMessage = await deleteMessageById(_id);
        return res.status(200).json({message:"message deleted successfully", deletedMessage});
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const updateMessageByid = async (req, res) => {
    try{
        const _id= req.params._id
        const {newMessage} =req.body; 
        const vaild=updateMessageValidation(newMessage)
        if(!vaild){
            return res.status(400).json({message:"Error validating Input",error:vaild.error.details[0].message});
        }
        const updatedMessage = await updateMessageById(_id,newMessage);
        return res.status(200).json({message:"message updated successfully", updatedMessage});
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}