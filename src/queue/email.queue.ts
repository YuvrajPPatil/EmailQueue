import { Queue } from "bullmq";
import redisConnection from "../config/redis";

export interface EmailJobData{
    to:string;
    subject:string;
    html:string;
}

const emailQueue= new Queue<EmailJobData>("email-queue",{
    connection:redisConnection,
    defaultJobOptions:{
        attempts:2,
        backoff:{type:"exponential",delay:2000},
        removeOnComplete:true,
        removeOnFail:false,
    }
});
export default emailQueue;