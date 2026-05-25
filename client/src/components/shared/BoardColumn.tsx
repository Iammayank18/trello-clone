import { useDroppable } from "@dnd-kit/react"
import type { Task } from "@/lib/api"
import { TaskItem } from "./TaskItem"

type Props = {
  label: string
  status: Task["status"]
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function BoardColumn({ label, status, tasks, onEdit, onDelete }: Props) {
  const { ref, isDropTarget } = useDroppable({ id: status })

  return (
    <div
      ref={ref}
      className={`flex-1 rounded-lg p-3 transition-colors ${
        isDropTarget ? "bg-primary/10 ring-2 ring-primary/30" : "bg-muted"
      }`}
    >
      <h2 className="mb-3 font-semibold">{label}</h2>
      <div className="flex min-h-20 flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 text-xs text-muted-foreground">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onClick={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
