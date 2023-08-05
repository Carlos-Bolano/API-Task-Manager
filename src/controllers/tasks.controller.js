import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate('user')
        res.json(tasks)
    } catch (error) {
        console.log(error)
    }
}
export const createTask = async (req, res) => {
    try {
        const { title, description, date, category, state } = req.body

        const newTask = new Task({
            title,
            description,
            date,
            category,
            state,
            user: req.user.id
        })

        const taskSaved = await newTask.save()
        res.json(taskSaved)
    } catch (error) {
        console.log(error)
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
        res.json(task)
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskDelete = await Task.findByIdAndDelete(req.params.id)
        if (!taskDelete) return res.status(404).json({ message: 'Tarea no encontrada' })
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
        res.json({ message: 'Tarea actulizada' })
    } catch (error) {
        console.log(error)
    }
}