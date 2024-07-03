"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react"
import { FaArrowRight } from "react-icons/fa";

type SignInButtonProps = {
  session: Session | null;
  className?: string;
  main?: boolean;
}
const SignInButton = ({ session, className, main }: SignInButtonProps) => {
  return (
    <Button className={cn("w-fit", className)} onClick={async () => {
      if (session?.user) {
        window.location.href = "/dashboard";
      } else {
        await signIn("discord")
      }
    }}>
      {session?.user ? "Dashboard" : "Sign in"}
      {main && (
        <FaArrowRight className="ml-2" />
      )}
    </Button>
  );
}
export default SignInButton;