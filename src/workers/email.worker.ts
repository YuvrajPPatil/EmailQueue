import "dotenv/config";
import { Worker } from "bullmq";
import redisConnection from "../config/redis";
import transporter from "../config/mailer";
import { EmailJobData } from "../queue/email.queue";

const worker=new Worker<EmailJobData>("email-queue",async (job)=>{
    const {to,subject,html}=job.data;

    await transporter.sendMail({
        from:`"Blog APP" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });
},
{connection:redisConnection}
);

worker.on("completed", job=>{
    console.log(`Email sent to:${job.id}`);
});

worker.on("failed",(job,err)=>{
    console.log(`Email job Failed: ${job?.id}`, err);
});