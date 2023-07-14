import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }).min(1, { message: 'title must be at least 1 character long' }),
    description: z.string({
        required_error: 'Description is required'
    }).min(1, { message: 'description must be at least 1 character long' }),
    date: z.string().datetime().optional(),
    state: z.boolean().optional()

})