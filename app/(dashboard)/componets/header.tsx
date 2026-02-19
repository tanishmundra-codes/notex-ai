"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { ProfileMenu } from "@/components/auth/ProfileMenu";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-2">
      <div>
        <h1 className="text-lg font-bold text-black">Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your documents</p>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="text-right">
            <p className="text-sm font-semibold text-black">
              {user.firstName || user.fullName}
            </p>
            <p className="text-xs text-gray-500">Free plan</p>
          </div>
        )}
        <ProfileMenu />
      </div>
    </header>
  );
}