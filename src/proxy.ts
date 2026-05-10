import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export const proxy = auth(function proxy(req) {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
