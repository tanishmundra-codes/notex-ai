"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export function SignInButton() {
  return (
    <ClerkSignInButton mode="redirect" forceRedirectUrl="/sign-in">
      <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 cursor-pointer">
        Sign In
      </button>
    </ClerkSignInButton>
  );
}
