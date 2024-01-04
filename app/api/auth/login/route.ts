import { signIn } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { prisma } from "@/prisma/client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/validation";
import { AuthError } from "next-auth";
import { z } from "zod";

/**
 * * Logic for login route
 */
export async function POST(req: Request) {       
        const body = await req.json();

        const validatedFields = LoginSchema.safeParse(body)
        if(!validatedFields.success) {
            return new Response('Every field is required.')
        }
        const {email, password} = validatedFields.data;


        const existingUser = await prisma.user.findUnique({
          where: {
            email
          }
        })
        if(!existingUser || !existingUser.email || !existingUser.password) {
          return new Response('Email does not exist.')
        }

        if(!existingUser.emailVerified) {
          const verificationToken = await generateVerificationToken(existingUser.email)

          await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
          )
          return new Response('Confirmation email sent to your account!')
        }
        try {
            await signIn("credentials", {
              email,
              password,
              redirectTo: DEFAULT_LOGIN_REDIRECT,
            })

          } catch (error) {
            if (error instanceof AuthError) {
              switch (error.type) {
                case "CredentialsSignin":
                  return { error: "Invalid credentials!" }
                default:
                  return { error: "Something went wrong!" }
              }
            }
        
            throw error;
          }  
}