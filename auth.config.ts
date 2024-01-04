// This file trigger the middleware

import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from "./validation"
import { prisma } from "./prisma/client"
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // validating the data
        const validatedFields = LoginSchema.safeParse(credentials);

        // getting the data
        if(validatedFields.success) {
          const {email, password} = validatedFields.data;

          // check if user is connected to the existed email or not
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          })
          // not allowing the user and the social provider
          if(!user || !user.password) return null;

          // matching the passwords
          const passwordMatch = await bcrypt.compare(password, user.password)

          if(passwordMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig