"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@/components/auth/SignInButton";
import { ProfileMenu } from "@/components/auth/ProfileMenu";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

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
        { name: "Pricing", href: "#Pricing" },
        { name: "FAQ", href: "#faq" }
    ];

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 bg-white/70 backdrop-blur-2xl border-b border-black/10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >

            <Link href="/" className="flex items-center gap-2 ml-0 md:ml-30 pr-1 md:pr-4">
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
                        className="px-4 py-2 text-md font-medium text-gray-600 rounded-full hover:bg-white/60 hover:text-black transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>


            <div className="flex items-center gap-2 md:gap-3 mr-0 md:mr-30">
                {isLoaded && user ? (
                    <div className="flex items-center gap-2">
                        <Button asChild variant="brutal" className="px-5 py-2 text-sm font-semibold cursor-pointer rounded-full">
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </Button>
                        <ProfileMenu className="mt-2" />
                    </div>
                ) : (
                    <SignInButton />
                )}
            </div>
        </motion.header>
    );
}
