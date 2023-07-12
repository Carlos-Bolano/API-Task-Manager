import mongoose from 'mongoose'

const URL = "mongodb+srv://carlos-bolano:3135582767Lamby.@cluster0.3zfelva.mongodb.net/"

export const ConectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log('---- db is conected ----')
    } catch (error) {
        console.log(error)
    }
} 