import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { createTask } from "@/lib/api"
import { taskSchema, type TaskFormData } from "@/lib/taskSchema"

type Props = {
  onSuccess: () => void
}

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring"

const CreateTaskModal = ({ onSuccess }: Props) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "medium",
      status: "todo",
    },
  })

  const onSubmit = async (data: TaskFormData) => {
    await createTask(data)
    reset()
    setOpen(false)
    onSuccess()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>
          <SheetDescription>Fill in the details and save.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-1.5">
              <Label htmlFor="create-name">Name</Label>
              <Input
                id="create-name"
                placeholder="Task name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="create-description">Description</Label>
              <Textarea
                id="create-description"
                placeholder="Task description"
                {...register("description")}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="create-priority">Priority</Label>
              <select
                id="create-priority"
                className={selectClass}
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-xs text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="create-status">Status</Label>
              <select
                id="create-status"
                className={selectClass}
                {...register("status")}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save"}
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateTaskModal
