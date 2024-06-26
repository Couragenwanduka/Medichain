import bcrypt from 'bcryptjs'

export const hashPassword=async(password)=>{
   try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
   }catch(error){
        throw new Error ('Error generating hash for password' + error.message)
   }
}

export const comparePassword=async(password, user)=>{
    try{
        const result = await bcrypt.compare(password, user.password)
        return result
    }catch(error){
        throw new Error ('Error comparing password' + error.message)
    }
}