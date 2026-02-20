"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <ClerkSignInButton mode="redirect" forceRedirectUrl="/sign-in">
      <Button variant="brutal-dark" className="px-5 py-5 text-base font-semibold cursor-pointer">
        Sign In
      </Button>
    </ClerkSignInButton>
  );
}
