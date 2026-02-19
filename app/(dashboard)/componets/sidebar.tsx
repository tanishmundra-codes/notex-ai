"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Upload,
    Crown,
    ArrowUpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress"


const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Upload PDF",
        href: "/dashboard/upload",
        icon: Upload,
        highlight: true,
    },
    {
        name: "Upgrade",
        href: "/dashboard/upgrade",
        icon: Crown,
        badge: "PRO",
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const usedPDFs = 1;
    const maxPDFs = 5;
    const progressPercent = (usedPDFs / maxPDFs) * 100;

    return (
        <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white">
            <div className="px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                        N
                    </div>
                    <span className="text-lg font-bold tracking-tight text-black">
                        NotexAI
                    </span>
                </Link>
            </div>

            {/* Divider */}
            <div className=" border-t border-gray-200" />

            {/* Navigation */}
            <nav className="flex flex-col gap-4 px-3 py-5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                ${item.highlight
                                    ? "justify-center rounded-full border border-black bg-black text-white hover:bg-gray-800"
                                    : isActive
                                        ? "bg-gray-100 text-black"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                }`}
                        >
                            <Icon className={`h-[18px] w-[18px] ${item.highlight ? "text-white" : ""}`} />
                            <span>{item.name}</span>
                            {item.badge && (
                                <span className="ml-auto rounded-md border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Storage Section */}
            <div className="mx-4 mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-black">Storage</span>
                    <span className="text-sm font-semibold text-black">
                        {usedPDFs}/{maxPDFs} PDFs
                    </span>
                </div>
                <Progress value={33} className="mb-2 h-2" />
                <p className="text-xs text-gray-500">
                    {maxPDFs - usedPDFs} uploads remaining on free plan
                </p>
            </div>

            {/* Upgrade Button */}
            <div className="px-4 pb-5">
                <Link
                    href="/dashboard/upgrade"
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white"
                >
                    <ArrowUpCircle className="h-4 w-4" />
                    Upgrade Plan
                </Link>
            </div>
        </aside>
    );
}