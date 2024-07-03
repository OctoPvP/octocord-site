"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {
  return (
    <Button onClick={async () => {
      await signOut();
      window.location.href = "/";
    }}>
      Sign Out
      <FaSignOutAlt className="ml-2" />
    </Button>
  );
}
export default SignOutButton;