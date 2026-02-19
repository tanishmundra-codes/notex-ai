"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@/components/auth/SignInButton";
import { ProfileMenu } from "@/components/auth/ProfileMenu";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Method", href: "#method" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 md:p-6 pointer-events-none">
      <motion.header
        className={`pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 rounded-full border transition-all duration-300 ${scrolled
          ? "bg-white/70 backdrop-blur-xl border-black/10 shadow-lg shadow-black/5 w-auto"
          : "bg-white/50 backdrop-blur-sm border-transparent w-full max-w-5xl"
          }`}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >

        <Link href="/" className="flex items-center gap-2 pr-1 md:pr-4">
          <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
            N
          </div>
          <span className="font-bold text-base md:text-lg tracking-tight text-black block">
            Notex AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-100 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>


        <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-4">
          {isLoaded && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="rounded-full bg-black px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 active:scale-95 md:px-5 md:py-2.5 md:text-sm"
              >
                Dashboard
              </Link>
              <ProfileMenu />
            </div>
          ) : (
            <div className="[&_button]:rounded-full [&_button]:px-3 [&_button]:md:px-5 [&_button]:py-2 [&_button]:md:py-2.5 [&_button]:text-xs [&_button]:md:text-sm [&_button]:font-semibold [&_button]:bg-black [&_button]:text-white [&_button]:hover:scale-105 [&_button]:transition-transform">
              <SignInButton />
            </div>
          )}
        </div>
      </motion.header>
    </div>
  );
}
