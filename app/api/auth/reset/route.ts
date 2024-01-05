import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { prisma } from "@/prisma/client";
import { ResetSchema } from "@/validation";
import { z } from "zod";

export async function POST(req: Request) {
    // try {
        const body = await req.json();
    
        const validatedFields = ResetSchema.safeParse(body)
        if(!validatedFields.success) {
            return new Response('Invalid email!', { status: 409 })
        }
        const { email } = validatedFields.data;
    
        const existedUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!existedUser) {
            return new Response('Email not found.', { status: 404 })
        }

        const passwordResetToken = await generatePasswordResetToken(email);

        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token
        )
    
        return new Response('Reset email sent!')
//     } catch (error) {
//      // if something went wrong!
//         if(error instanceof z.ZodError) {
//          return new Response(error.message, {status: 422})
//         }
//      return new Response('Could not reset your password.', {status: 500})
//   }
}