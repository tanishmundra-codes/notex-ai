"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function ProfileMenu({ className = "" }: { className?: string }) {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!user) return null;

    const handleLogout = async () => {
        await signOut(() => router.push("/"));
        setOpen(false);
    };

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
                <img
                    src={user.imageUrl}
                    alt={user.fullName || "Profile"}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-200 object-cover hover:ring-2 hover:ring-zinc-300 transition-all"
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                        <div className="px-3.5 py-2.5 border-b border-zinc-100">
                            <p className="text-sm font-semibold text-zinc-800 truncate">
                                {user.fullName}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Log out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
