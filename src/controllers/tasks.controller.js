import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).populate('user')
    res.json(tasks)
}
export const createTask = async (req, res) => {
    const { title, description, date, category,state } = req.body
    
    const newTask = new Task({ 
        title, 
        description, 
        date,
        category,
        state, 
        user: req.user.id })

    const taskSaved = await newTask.save()
    res.json(taskSaved)
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user')
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const taskDelete = await Task.findByIdAndDelete(req.params.id)
    if (!taskDelete) return res.status(404).json({ message: 'Tarea no encontrada' })
    return res.sendStatus(204)
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
    res.json({ message: 'Tarea actulizada' })
}