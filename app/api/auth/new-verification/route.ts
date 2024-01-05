import { prisma } from "@/prisma/client"

export async function POST(req: Request) {
    const body = await req.json()

    const existingToken = await prisma.verificationToken.findUnique({
        where: {
            token: body
        }
    })
    if(!existingToken) {
        return new Response('Token does not exist!')
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired) {
        return new Response('Token has expired!')
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: existingToken.email
        }
    })
    if(!existingUser) {
        return new Response('Email does not exist.')
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return new Response(`You are logged in as ${existingUser.name}.`)
}