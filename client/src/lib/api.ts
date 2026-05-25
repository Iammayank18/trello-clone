import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export type Task = {
  _id: string
  name: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  createdAt: string
  updatedAt: string
}

export type CreateTaskInput = {
  name: string
  description?: string
  priority: Task["priority"]
  status: Task["status"]
}

export type UpdateTaskInput = {
  id: string
  name?: string
  description?: string
  priority?: Task["priority"]
  status?: Task["status"]
}

export async function getTasks(): Promise<Task[]> {
  const res = await axios.get(`${BASE_URL}/tasks`)
  return res.data.data
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const res = await axios.post(`${BASE_URL}/task/create`, data)
  return res.data.data
}

export async function updateTask({
  id,
  ...updates
}: UpdateTaskInput): Promise<Task> {
  const res = await axios.put(`${BASE_URL}/task/update`, { ...updates, id })
  return res.data.data
}

export async function deleteTask(id: string): Promise<void> {
  await axios.delete(`${BASE_URL}/task/delete/${id}`)
}
