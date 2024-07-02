"use client";

import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react"

type SignInButtonProps = {
  session: Session | null
}
const SignInButton = ({ session }: SignInButtonProps) => {
  return (
    <Button onClick={async () => {
      if (session?.user) {
        window.location.href = "/dashboard";
      } else {
        await signIn("discord")
      }
    }}>
      {session?.user ? "Dashboard" : "Sign in"}
    </Button>
  );
}
export default SignInButton;