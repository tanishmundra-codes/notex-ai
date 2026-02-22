"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { ProfileMenu } from "@/components/auth/ProfileMenu";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useUser();
  const isUpgraded = useQuery(
    api.user.getUserUpgradeStatus,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  return (
    <header className="relative flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6 md:py-4 flex-shrink-0">
      <div className="md:hidden flex items-center">
        <button
          onClick={onMenuClick}
          className="p-1 -ml-1 text-black hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="hidden md:block">
        <h1 className="text-lg font-bold text-black">Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your documents</p>
      </div>


      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
        <h1 className="text-lg font-bold text-black">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {user && (
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-black">
              {user.firstName || user.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {isUpgraded ? "Unlimited Plan" : "Free Plan"}
            </p>
          </div>
        )}
        <div className="mt-[3px] md:mt-0">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}