import { useDraggable } from "@dnd-kit/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Task } from "@/lib/api"
import { Badge } from "../ui/badge"

type TaskItemProps = {
  task: Task
  onClick: (task: Task) => void
  onDelete: (id: string) => void
}

const PRIORITY_BADGE: Record<Task["priority"], string> = {
  low: "bg-green-100 text-green-700 border border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  high: "bg-red-100 text-red-700 border border-red-200",
}

const STATUS_BADGE: Record<Task["status"], string> = {
  todo: "bg-slate-100 text-slate-700 border border-slate-200",
  "in-progress": "bg-yellow-100 text-yellow-700 border border-yellow-200",
  done: "bg-green-100 text-green-700 border border-green-200",
}

export function TaskItem({ task, onClick, onDelete }: TaskItemProps) {
  const { ref, isDragging } = useDraggable({ id: task._id ,disabled:task.status==="done"})

  return (
    <Card
      ref={ref}
      className={`w-full cursor-grab transition-opacity active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{task.name}</CardTitle>
        <CardAction>
          <Badge className={STATUS_BADGE[task.status]}>
            {task?.status?.split("-").join(" ").toUpperCase()}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="mb-2">{task.description}</CardDescription>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_BADGE[task.priority]}`}
        >
          {task.priority}
        </span>
      </CardContent>
      {task.status !== "done" && (
        <CardFooter className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onClick(task)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
