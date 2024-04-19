import Prescription from "../model/prescription";

export const savePrescription = async (drugName,drugType,drugDosage,drugFrequency,drugDuration,doctor,patient) => {
   try{
    const newPrescription = new Prescription({
        drugName,
        drugType,
        drugDosage,
        drugFrequency,
        drugDuration,
        doctor,
        patient,
        date: new Date(),
    });
    const savedPrescription = await newPrescription.save();
    return savedPrescription;
   }catch(error){
     throw new Error ('An error occurred while saving the prescription',error)
   }
}

export const findPrescriptionByPatientId = async (patient) => {
    try{
        const prescription = await Prescription.find({patient});
        return prescription;
    }catch(error){
        throw new Error ('An error occurred while finding the prescription',error)
    }
}

export const findPrescriptionByDoctorId = async (doctor) => {
    try{
        const prescription = await Prescription.find({doctor});
        return prescription;
    }catch(error){
        throw new Error ('An error occurred while finding the prescription',error)
    }
}
