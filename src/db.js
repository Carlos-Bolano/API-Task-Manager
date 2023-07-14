import mongoose from 'mongoose'
import {DB_URL} from './config.js'

export const ConectDB = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log('---- db is conected ----')
    } catch (error) {
        console.log(error)
    }
} 