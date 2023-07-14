import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
}
export const createTask = async (req, res) => {
    const { title, description, date, category } = req.body

    const newTask = new Task({ title, description, date, category, user: req.user.id }) 

    const taskSaved = await newTask.save()
    res.json(taskSaved)
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const taskDelete = await Task.findByIdAndDelete(req.params.id)
    if (!taskDelete) return res.status(404).json({ message: 'Task not found' })
    res.json({ message: 'Task deleted' })
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json({ message: 'Task updated' })
}