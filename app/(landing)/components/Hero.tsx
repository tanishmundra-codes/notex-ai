"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { Star, Zap, Brain, ShieldCheck } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
};

const badges = [
    { label: "Lightning Fast", icon: Zap },
    { label: "AI Powered", icon: Brain },
    { label: "Secure & Private", icon: ShieldCheck },
];

function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center px-6 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <motion.div
                className="absolute left-4 md:right-auto md:left-16 lg:left-28 top-1/3 -translate-y-1/2 hidden md:block pointer-events-none"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" as const }}
            >
                <Image src="/hat.png" alt="Hat" width={220} height={220} className="w-40 lg:w-60 drop-shadow-lg" />
            </motion.div>

            <motion.div
                className="absolute right-4 md:right-16 lg:right-28 top-[45%] -translate-y-1/2 hidden md:block pointer-events-none"
                initial={{ opacity: 0, x: 40, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: 12 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" as const }}
            >
                <Image src="/idea.png" alt="Idea" width={220} height={220} className="w-28 lg:w-50 drop-shadow-lg" />
            </motion.div>

            <motion.a
                href="https://github.com/tanishmundra-codes/notex-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-semibold text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-200"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        clipRule="evenodd"
                    />
                </svg>
                Star on GitHub
                <Star className="h-4 w-4" />
            </motion.a>

            <motion.h1
                className="max-w-3xl text-center text-5xl font-black leading-tight tracking-tight text-black md:text-7xl"
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                Your smart workspace for every{" "}
                <span className="relative inline-block">
                    document.
                    <span className="absolute left-0 -bottom-1 h-3 w-full -z-10 bg-black/10 rounded-sm" />
                </span>
            </motion.h1>

            <motion.p
                className="mt-6 max-w-lg text-center text-base text-gray-500 md:text-lg"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                Think, write, and question. NotexAI turns your notes into answers.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-6"
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <Button
                    asChild
                    variant="brutal-dark"
                    className="px-4 py-3 text-sm sm:px-8 sm:py-6 sm:text-base font-bold cursor-pointer rounded-md"
                >
                    <Link href="/dashboard">Get Started</Link>
                </Button>

                <Button
                    asChild
                    variant="brutal"
                    className="px-4 py-3 text-sm sm:px-8 sm:py-6 sm:text-base font-bold cursor-pointer"
                >
                    <Link href="#features">View Demo →</Link>
                </Button>
            </motion.div>

            <motion.div
                className="mt-6 flex items-center gap-3"
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <AvatarGroup className="grayscale">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </AvatarGroup>
                <span className="text-sm font-medium text-gray-500">Trusted by 1000+ students</span>
            </motion.div>
        </section>
    );
}

export default Hero;