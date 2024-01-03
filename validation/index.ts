import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Minimum 8 chracters is required'
    })
})

export type LoginValidation = z.infer<typeof LoginSchema>
export type RegisterValidation = z.infer<typeof RegisterSchema>