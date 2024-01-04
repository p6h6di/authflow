import NextAuth from "next-auth"
// import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { prisma } from "@/prisma/client"
import { UserRole } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }

      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({token}) {
      // console.log({token})
      if(!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub
        }
      })
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
})