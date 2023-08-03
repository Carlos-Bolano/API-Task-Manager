import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'nombre de usuario es requerido'
    }),
    ocupation: z.string({
        required_error: 'ocupacion es requerido'
    }),
    email: z.string({
        required_error: 'email es requerido'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'contraseña es requerida'
    }).min(6, ' contraseña debe tener al menos 6 caracteres')
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'email es requerido'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'contraseña es requerida'
    }).min(6, 'contraseña debe tener al menos 6 caracteres')
})