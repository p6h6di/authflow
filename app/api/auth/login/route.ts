import { signIn } from "@/lib/auth";
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
        const {email, password} = validatedFields.data
        
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