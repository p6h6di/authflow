import { LoginSchema } from "@/validation";

/**
 * * Logic for login route
 */
export async function POST(req: Request) {
    const body = await req.json();
    const {email, password} = LoginSchema.parse(body)
    console.log(email)
    return new Response('OK')
}