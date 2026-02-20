"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    delay?: number;
}

function FAQItem({ question, answer, isOpen, onToggle, delay = 0 }: FAQItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: delay },
        },
    };

    const contentVariants: Variants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
        exit: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    };

    return (
        <motion.div
            className="bg-white dark:bg-[#1D1D1D] rounded-lg border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
            >
                <h3 className="text-lg font-bold text-black dark:text-white font-sans">
                    {question}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="content"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <div className="border-t-2 border-black/5 dark:border-white/10 px-6 pb-6 pt-2">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const faqData = [
    {
        question: "How do I access the notes and study materials?",
        answer: "Simply sign up for a free account and browse our comprehensive collection of notes. Premium users get access to additional features like topper notes, practice quizzes, and interactive flashcards.",
    },
    {
        question: "Are the notes updated regularly?",
        answer: "Yes, our content team regularly updates notes to match current curriculum standards and exam patterns.",
    },
    {
        question: "Can I download the notes for offline study?",
        answer: "No, currently, notes are available for online viewing to ensure you always have the latest version.",
    },
    {
        question: "How accurate are the practice quizzes?",
        answer: "Our practice quizzes are carefully crafted by subject matter experts and are regularly updated to reflect current exam patterns.",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export function FAQ() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
        );
    };

    return (
        <section className="relative py-20 lg:py-32 bg-white dark:bg-[#1D1D1D]">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="mb-16 text-center md:mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-extrabold tracking-tighter text-black dark:text-white md:text-5xl lg:text-6xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mx-auto max-w-3xl text-center text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                        Everything you need to know about NotexAi.
                    </p>
                </motion.div>

                <motion.div
                    className="mx-auto max-w-3xl space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openItems.includes(index)}
                            onToggle={() => toggleItem(index)}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}