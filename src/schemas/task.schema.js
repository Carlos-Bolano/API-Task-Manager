import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Titulo es requerido'
    }).min(1, { message: 'Titulo debe ser por lo menos de un caracter' }),
    description: z.string({
        required_error: 'Descripcion es requerida'
    }).min(1, { message: 'Descripcion debe ser por lo menos de un caracter' }),
    date: z.string().datetime({ message: "Invalid datetime string! Must be UTC."}).optional(),
    state: z.boolean().optional()

})