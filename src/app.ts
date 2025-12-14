import express from "express";
import emailRoutes from "./routes/email.routes";

const app=express();

app.use(express.json());


app.get("/api/email/test", (req, res) => {
  res.send("API is working");
});

app.use("/api/email",emailRoutes);

export default app;