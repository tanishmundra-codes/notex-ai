"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Brain, Zap } from "lucide-react";

interface AnimatedTextCycleProps {
    words: string[];
    interval?: number;
    className?: string;
}

function AnimatedTextCycle({ words, interval = 3000, className = "" }: AnimatedTextCycleProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [interval, words.length]);

    const containerVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
        exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <span className="relative inline-block w-[4ch] text-left">
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={currentIndex}
                    className={`absolute left-0 top-0 inline-block font-black ${className}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {words[currentIndex]}
                </motion.span>
            </AnimatePresence>
            <span className="opacity-0">{words[0]}</span> {/* Spacer */}
        </span>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: delay } },
    };

    return (
        <motion.div
            className="group relative"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-[#1D1D1D] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] dark:hover:shadow-[4px_4px_0px_0px_#fff]">
                <div className="relative z-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border-2 border-black dark:border-white bg-gray-50 dark:bg-[#1D1D1D] text-black dark:text-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
                        {icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-black dark:text-white">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function About() {
    const features = [
        {
            icon: <CheckCircle2 className="h-6 w-6" />,
            title: "Clear Notes, Zero Confusion",
            description: "Upload any PDF and instantly get simplified, easy-to-understand notes. Complex topics are transformed into structured summaries that actually make sense.",
        },
        {
            icon: <Brain className="h-6 w-6" />,
            title: "AI Chat That Understands Your Notes",
            description: "Ask questions directly from your documents and receive accurate, contextual answers. Your personal AI study partner.",
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Learn Faster, Study Smarter",
            description: "Save hours of reading with focused summaries and quick explanations. Understand more in less time, without feeling overwhelmed.",
        },

    ];

    const animatedWords = ["faster", "better", "easier"];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <section className="relative overflow-hidden pt-20 lg:pt-32 pb-20 lg:pb-32 bg-white dark:bg-[#1D1D1D]">
            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    className="mb-16 text-center md:mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-5xl lg:text-6xl flex flex-wrap justify-center gap-x-2 md:gap-x-4">
                        <span>Learn</span>

                        {/* Changed min-w for mobile and used text-center to fix alignment */}
                        <span className="relative min-w-[100px] md:min-w-[150px] text-center md:text-left">
                            <AnimatedTextCycle
                                words={animatedWords}
                                interval={3000}
                                className="text-black dark:text-white italic font-normal"
                            />
                        </span>

                        <span>with NotexAi</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-center text-lg text-gray-500 dark:text-gray-400 leading-relaxed md:text-xl">
                        Turn documents and notes into clear understanding. NotexAI helps students read less, understand faster, and get answers instantly.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}