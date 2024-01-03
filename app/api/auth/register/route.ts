import { RegisterSchema } from "@/validation";

/**
 * * Logic for Register route
 */
export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password } = RegisterSchema.parse(body)
    console.log(email)
    return new Response('OK')
}