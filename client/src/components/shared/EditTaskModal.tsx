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
} from "../ui/sheet"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { updateTask } from "@/lib/api"
import type { Task } from "@/lib/api"
import { taskSchema, type TaskFormData } from "@/lib/taskSchema"

type Props = {
  open: boolean
  editData: Task | null
  setOpen: (open: boolean) => void
  onSuccess: () => void
}

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring"

const EditTaskModal = ({ editData, open, setOpen, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      name: editData?.name ?? "",
      description: editData?.description ?? "",
      priority: editData?.priority ?? "medium",
      status: editData?.status ?? "todo",
    },
  })

  const onSubmit = async (data: TaskFormData) => {
    if (!editData) return
    await updateTask({ id: editData._id, ...data })
    setOpen(false)
    onSuccess()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>Update the task details and save.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-1.5">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" {...register("description")} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="edit-priority">Priority</Label>
              <select
                id="edit-priority"
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
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
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

export default EditTaskModal
