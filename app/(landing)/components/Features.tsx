
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, FileJson, Sparkles, Download, ArrowRight, Code, Search, Layers } from "lucide-react";

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
      className="group relative h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative h-full rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-[#1D1D1D] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] dark:hover:shadow-[4px_4px_0px_0px_#fff]">
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border-2 border-black dark:border-white bg-gray-50 dark:bg-[#1D1D1D] text-black dark:text-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
            {icon}
          </div>
          <h3 className="mb-3 text-xl font-bold text-black dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow font-medium">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const features = [
  {
    title: "PDF to Markdown",
    description: "Upload any PDF and get perfectly structured Markdown notes. Headings, lists, and formatting are automatically organized for easy reading and editing.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Chat with PDF",
    description: "Ask questions directly from your document and get contextual answers instantly. Explore ideas, clarify concepts, or locate key information without searching manually.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    title: "Smart Summaries",
    description: "Skip the noise. Get concise summaries highlighting the most important ideas, insights, and takeaways from your document.",
    icon: <Sparkles className="w-6 h-6" />,
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Features() {
  return (
    <section className="relative overflow-hidden py-24 bg-white dark:bg-[#1D1D1D]" id="features">

      <motion.div
        initial={{ opacity: 0, rotate: -20, x: -50 }}
        whileInView={{ opacity: 0.4, rotate: -20, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 -left-10 hidden lg:block select-none pointer-events-none"
      >
        <Code className="w-32 h-32 text-zinc-100 dark:text-zinc-800" strokeWidth={1} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 20, x: 50 }}
        whileInView={{ opacity: 0.4, rotate: 20, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-40 -right-10 hidden lg:block select-none pointer-events-none"
      >
        <Layers className="w-40 h-40 text-zinc-100 dark:text-zinc-800" strokeWidth={1} />
      </motion.div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="mb-16 text-center md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-5xl lg:text-6xl">
            Your PDFs, converted to <span className="underline decoration-4 decoration-black/20 dark:decoration-white/20">knowledge</span>.
          </h2>
          <p className="mx-auto max-w-3xl text-center text-lg text-gray-500 dark:text-gray-400 leading-relaxed md:text-xl">
            Stop reading endlessly. Turn every document into structured notes, instant answers, and actionable understanding.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
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