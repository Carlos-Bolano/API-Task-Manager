import express from "express";
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth.routes.js'
import tasksRouter from './routes/tasks.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRouter)
app.use("/api", tasksRouter)


export default app;
