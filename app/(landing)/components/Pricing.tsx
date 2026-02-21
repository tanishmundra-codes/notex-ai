"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PlanFeature {
    text: string;
    highlighted?: boolean;
}

interface PricingPlan {
    badge: string;
    price: string;
    originalPrice: string;
    name: string;
    tagline: string;
    validity: string;
    buttonLabel?: string;
    features: PlanFeature[];
    isPopular?: boolean;
}

const plans: PricingPlan[] = [
    {
        badge: "Free Plan",
        price: "₹0/-",
        originalPrice: "Free Forever",
        name: "Free Plan",
        tagline: "Perfect for getting started",
        validity: "Lifetime Access (Free Forever)",
        buttonLabel: "Start Free",
        features: [
            { text: "5 Active PDF Slots" },
            { text: "Standard File Upload Support" },
            { text: "Full AI Q&A Support", highlighted: true },
            { text: "Access to PDF Viewer & Text Editor" },
            { text: "Smart Summaries & Notes" },
        ],
    },
    {
        badge: "Pro Plan",
        price: "₹299/-",
        originalPrice: "One-time payment",
        name: "Pro Plan",
        tagline: "Unlimited learning, no limits",
        validity: "Lifetime Access (One-time payment)",
        buttonLabel: "Buy Now",
        features: [
            { text: "Unlimited PDF Uploads", highlighted: true },
            { text: "Full AI Q&A Support", highlighted: true },
            { text: "Faster Processing" },
            { text: "Access to PDF Viewer & Text Editor" },
            { text: "Priority Experience" },
        ],
    },
];

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
    return (
        <motion.div
            className="relative flex flex-col rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-200 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        >
            {/* Badge */}
            <div className="absolute top-4 right-4">
                <span className="rounded-full border-2 border-black px-3 py-1 text-xs font-bold bg-white">
                    {plan.badge}
                </span>
            </div>

            {/* Price */}
            <div className="mb-1">
                <span className="text-4xl font-black text-black">{plan.price}</span>
            </div>


            {/* Plan name */}
            <h3 className="text-lg font-extrabold text-black">{plan.name}</h3>

            {/* Tagline */}
            <p className="mb-1 text-sm font-medium text-gray-500">{plan.tagline}</p>

            {/* Divider */}
            <div className="mb-5 border-t border-gray-200" />

            {/* Features */}
            <ul className="mb-8 flex flex-col gap-2 flex-1">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
                        <span className={feature.highlighted ? "text-black font-semibold" : "text-gray-600"}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Link
                href="/dashboard"
                className="mt-auto block w-full rounded-xl border-2 border-black py-3 text-center text-sm font-bold text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-200"
            >
                {plan.buttonLabel || "Buy Now"}
            </Link>
        </motion.div>
    );
}

export default function Pricing() {
    return (
        <section id="Pricing" className="relative bg-white py-20 lg:py-32 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-14 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-4xl font-black tracking-tight text-black md:text-5xl lg:text-6xl">
                        Why Study the Hard Way?
                    </h2>
                    <p className="mt-3 text-base text-gray-400">
                        Unlock the perfect guide to your preparation journey.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={plan.name} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}