import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },


},{timestamps:true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    this.password=await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password, this.password);
};

const userModel=mongoose.model('User',userSchema);

export default userModel;
