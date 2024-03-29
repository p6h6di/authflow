import { prisma } from '@/prisma/client';
import {v4 as uuidv4} from 'uuid'

export const generateVerificationToken = async (email: string) => {
    // generating token
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // if token exists, then delete it
    const existingToken = await prisma.verificationToken.findFirst({
        where: {
            email
        }
    })
    if(existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // generate new token
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string )  => {
    // generating token
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // if token exists, then delete it
    const existingResetToken = await prisma.passwordResetToken.findFirst({
        where: {
            email
        }
    })
    if(existingResetToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingResetToken.id
            }
        })
    }

    // generate new token
    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
}