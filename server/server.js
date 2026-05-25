import express from 'express'
import cors from 'cors'
import './db/db.js'
import { createTask, deleteTask, getAllTask, updateTask } from './services/index.js';

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hey working')
})

app.get('/tasks', async (req, res) => {
    try {
        const result = await getAllTask()
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
})

app.post('/task/create', async (req, res) => {
    const { name, priority, status, description } = req.body
    if (!name || !priority) {
        return res.status(400).json({ error: 'name and priority are required' })
    }
    try {
        const result = await createTask({ name, priority, status, description })
        res.status(201).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' })
    }
})

app.put('/task/update', async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ error: 'id is required' })
    }
    try {
        const result = await updateTask(req.body)
        if (!result) return res.status(404).json({ error: 'Task not found' })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' })
    }
})

app.delete('/task/delete/:id', async (req, res) => {
    try {
        const result = await deleteTask(req.params.id)
        if (!result) return res.status(404).json({ error: 'Task not found' })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' })
    }
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})
