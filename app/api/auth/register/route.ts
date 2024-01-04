import { prisma } from "@/prisma/client";
import { RegisterSchema } from "@/validation";
import bcrypt from 'bcryptjs'
import { z } from 'zod';

/**
 * * Logic for Register route
 */
export async function POST(req: Request) {
    try {
    // access the body
    const body = await req.json();

    // validation
    const { name, email, password } = RegisterSchema.parse(body)
    
    // hashing the pwd
    const hashedPassword = await bcrypt.hash(password, 10)

    // check if email is already taken
    const existingEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if(existingEmail) {
        return new Response('Email is already taken.', {status: 409})
    }

    // create user in the db
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO: Sending verification token email

    // sending response
    return new Response('User created!')
        
    } catch (error) {
        // if something went wrong!
        if(error instanceof z.ZodError) {
            return new Response(error.message, {status: 422})
        }
        return new Response('Could not create an account', {status: 500})
    }
}