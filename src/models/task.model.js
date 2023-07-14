import mongoose from 'mongoose'

const taskSchemal = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        default: 'Task'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Task', taskSchemal)