import * as yup from 'yup'

export const taskSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().optional().default(''),
  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .required('Priority is required'),
  status: yup
    .mixed<'todo' | 'in-progress' | 'done'>()
    .oneOf(['todo', 'in-progress', 'done'], 'Invalid status')
    .required('Status is required'),
})

export type TaskFormData = yup.InferType<typeof taskSchema>
