import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export const SignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export type LoginValidation = z.infer<typeof LoginSchema>
export type SignupValidation = z.infer<typeof SignupSchema>