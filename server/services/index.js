import TASK from "../db/db.js"

export const getAllTask = async () => {
    const res = await TASK.find({})
    return res
}

export const createTask = async (data) => {
    const res = await TASK.create(data)
    return res
}

export const updateTask = async (data) => {
    const { id, ...updates } = data
    const res = await TASK.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    return res
}

export const deleteTask = async (id) => {
    const res = await TASK.findByIdAndDelete(id)
    return res
}