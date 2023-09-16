import QuestionModal from "../Modals/Question.modal.js";
import jwt from 'jsonwebtoken'

export const Add_question=async(req,res)=>{
    try{
        const {question,ans1,ans2,ans3,ans4,finalans}=req.body.questionData;
        const{token}=req.body
        if(!question||!ans1||!ans2||!ans3||!ans4||!finalans||!token) return res.json({success:false,message:"All Fields Are Required"})

        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
            return res.json({
                success:false,
                message:"Inavlid Token"
            })
        }

        const userId=decodeToken?.userId

        const newQues= new QuestionModal({
            question,
            ans1,
            ans2,
            ans3,
            ans4,
            finalans,
            userId:userId
        })

        await newQues.save();

        return res.json({
            success:true,
            message:"Question Added Successfully"
        })

    }catch(error){
        return res.json({
            success:false,
            message:error
        })
    }
}

export const All_question=async(req,res)=>{
    try{
        const allquestion=await QuestionModal.find({})
        if(allquestion){
            return res.json({
                success:true,
                message:"All Question Is Fetched",
                allquestion:allquestion
            })
        }
        else{
            return res.json({
                success:false,
                message:"No Quetion Is Found"
            })
        }
    }catch(error){
        return res.json({
            success:false,
            message:error
        })
    }
}