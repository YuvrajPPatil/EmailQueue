import { Request, Response } from "express";
import emailQueue,{EmailJobData} from "../queue/email.queue";
import { error } from "node:console";

export const sendMail=async(req:Request,res:Response)=>{
    const {to,subject, message}=req.body;

    if(!to || !subject || !message)
    {
        return res.status(400).json({message:"Missing required fileds"});
    }

    const jobData: EmailJobData={
            to,
            subject,
            html:`<p>${message}</p>`,
    };

    await emailQueue.add("send-mail",jobData);
    return res.status(200).json({message:"Email queue suceesully"});
};
