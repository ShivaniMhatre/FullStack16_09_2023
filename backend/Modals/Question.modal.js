import mongoose,{Schema} from "mongoose";

const questionSchema= new Schema({
    question:{
        type:String,
        required:true
    },
    ans1:{
        type:String,
        required:true
    },
    ans2:{
        type:String,
        required:true
    },
    ans3:{
        type:String,
        required:true
    },
    ans4:{
        type:String,
        required:true
    },
    finalans:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

export default mongoose.model('question',questionSchema)