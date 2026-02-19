"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Crown,
    ArrowUpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FileUpload from "./fileUpload";

export default function Sidebar() {
    const pathname = usePathname();

    const usedPDFs = 1;
    const maxPDFs = 5;

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

            <div className="border-t border-gray-200" />

            <nav className="flex flex-col gap-4 px-3 py-4">
                {/* Dashboard */}
                <Button variant="brutal" asChild className="w-full rounded-full gap-2">
                    <Link href="/dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </Button>

                {/* Upload PDF — uses FileUpload component */}
                <FileUpload />

                {/* Upgrade */}
                <Link
                    href="/dashboard/upgrade"
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${pathname === "/dashboard/upgrade"
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                        }`}
                >
                    <Crown className="h-[18px] w-[18px]" />
                    <span>Upgrade</span>
                    <span className="ml-auto rounded-md border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                        PRO
                    </span>
                </Link>
            </nav>

            <div className="flex-1" />

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

            <div className="px-4 pb-5">
                <Button variant="brutal" asChild className="w-full rounded-full gap-2">
                    <Link href="/dashboard/upgrade">
                        <ArrowUpCircle className="h-4 w-4" />
                        Upgrade Plan
                    </Link>
                </Button>
            </div>
        </aside>
    );
}