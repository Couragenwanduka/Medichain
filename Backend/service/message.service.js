import Messages from '../model/message.js';

export const saveMessage = async (message,patient,doctor) => {
    try {
        const newMessage = new Messages({
            message,
            patient,
            doctor,
            time: new Date(),
        
        });
       const savedMessage = await newMessage.save();
        return savedMessage;
    } catch (error) {
        throw new Error("Error occured while saving message", error.message);
    }
}

export const findMessageByPatientId = async (patient) => {
    try {
        const message = await Messages.find({patient});
        return message;
    } catch (error) {
        throw new Error("Error occured while finding message", error.message);
    }
}

export const findMessageByDoctorId = async (doctor) => {
    try {
        const message = await Messages.find({doctor});
        return message;
    } catch (error) {
        throw new Error("Error occured while finding message", error.message);
    }
}
export const deleteMessageById = async (_id) => {
    try {
        const message = await Messages.delete({_id});
        return message;
    } catch (error) {
        throw new Error("Error occured while deleting message", error.message);
    }
}

export const updateMessageById = async (_id, newMessage) => {
    try {
        const updatedMessage = await Messages.findByIdAndUpdate(_id, { message: newMessage }, { new: true });
        return updatedMessage;
    } catch (error) {
        throw new Error("Error occurred while updating message: " + error.message);
    }
}
