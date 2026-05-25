import { useDraggable } from "@dnd-kit/react"
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"
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

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  if (isToday(date)) return `Today at ${format(date, "h:mm a")}`
  if (isYesterday(date)) return `Yesterday at ${format(date, "h:mm a")}`
  if (formatDistanceToNow(date, { addSuffix: false }).includes("days"))
    return formatDistanceToNow(date, { addSuffix: true })
  return format(date, "MMM d, yyyy")
}

export function TaskItem({ task, onClick, onDelete }: TaskItemProps) {
  const isDone = task.status === "done"
  const { ref, isDragging } = useDraggable({ id: task._id, disabled: isDone })
  const wasEdited = task.updatedAt !== task.createdAt

  return (
    <Card
      ref={ref}
      className={`w-full transition-opacity ${
        isDone
          ? "cursor-default opacity-60"
          : `cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{task.name}</CardTitle>
        <CardAction>
          <Badge className={STATUS_BADGE[task.status]}>
            {task.status.split("-").join(" ").toUpperCase()}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="mb-3">{task.description}</CardDescription>
        <div className="flex items-center justify-between">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_BADGE[task.priority]}`}
          >
            {task.priority}
          </span>
          <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
            {task.createdAt && (
              <span title={format(new Date(task.createdAt), "PPpp")}>
                Created {formatDate(task.createdAt)}
              </span>
            )}
            {wasEdited && task.updatedAt && (
              <span title={format(new Date(task.updatedAt), "PPpp")}>
                Edited {formatDate(task.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      {!isDone && (
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
