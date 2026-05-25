import { useEffect, useState } from "react"
import { DragDropProvider } from "@dnd-kit/react"
import type { DragEndEvent } from "@dnd-kit/react"
import CreateTaskModal from "./components/shared/CreateTaskModal"
import { BoardColumn } from "./components/shared/BoardColumn"
import EditTaskModal from "./components/shared/EditTaskModal"
import { getTasks, deleteTask as deleteTaskApi, updateTask } from "./lib/api"
import type { Task } from "./lib/api"

const COLUMNS: { label: string; status: Task["status"] }[] = [
  { label: "To Do", status: "todo" },
  { label: "In Progress", status: "in-progress" },
  { label: "Done", status: "done" },
]

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editTask, setEditTask] = useState<Task | null>(null)

  const refetchTasks = () => getTasks().then(setTasks)

  const deleteTask = async (id: string) => {
    await deleteTaskApi(id)
    setTasks((prev) => prev.filter((t) => t._id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return
    const taskId = event.operation.source?.id as string
    const newStatus = event.operation.target?.id as Task["status"]
    if (!taskId || !newStatus) return

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    )
    updateTask({ id: taskId, status: newStatus }).catch(refetchTasks)
  }

  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Board</h1>
          <CreateTaskModal onSuccess={refetchTasks} />
        </div>

        <div className="flex gap-4">
          {COLUMNS.map((col) => (
            <BoardColumn
              key={col.status}
              label={col.label}
              status={col.status}
              tasks={tasks.filter((t) => t.status === col.status)}
              onEdit={setEditTask}
              onDelete={deleteTask}
            />
          ))}
        </div>

        <EditTaskModal
          key={editTask?._id ?? "none"}
          open={editTask !== null}
          editData={editTask}
          setOpen={() => setEditTask(null)}
          onSuccess={refetchTasks}
        />
      </div>
    </DragDropProvider>
  )
}
