"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface PlanFeature {
  text: string;
  highlighted?: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  buttonLabel: string;
  isCurrent?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    isCurrent: true,
    buttonLabel: "Current Plan",
    features: [
      { text: "5 Active PDF Slots" },
      { text: "Standard File Upload Support" },
      { text: "Full AI Q&A Support", highlighted: true },
      { text: "Access to PDF Viewer & Text Editor" },
      { text: "Smart Summaries & Notes" },
    ],
  },
  {
    name: "Unlimited",
    price: "₹299",
    period: "/One Time",
    buttonLabel: "Get Started",
    features: [
      { text: "Unlimited PDF Uploads", highlighted: true },
      { text: "Full AI Q&A Support", highlighted: true },
      { text: "Faster Processing" },
      { text: "Access to PDF Viewer & Text Editor" },
      { text: "Priority Experience" },
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    if (plan.isCurrent) return;

    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-200 cursor-pointer"
    >
      {/* Plan name */}
      <h3 className="text-center text-lg font-extrabold text-black mb-4">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-4xl font-black text-black">
          {plan.price}
        </span>
        <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
      </div>

      {/* Divider */}
      <div className="mb-5 border-t border-gray-200" />

      {/* Features */}
      <ul className="mb-8 flex flex-col gap-3 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
            <span className={feature.highlighted ? "text-black font-semibold" : "text-gray-600"}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={handleCheckout}
        disabled={plan.isCurrent || loading}
        className={`mt-auto w-full rounded-xl border-2 border-black py-3 text-center text-sm font-bold transition-all duration-200 flex justify-center items-center ${plan.isCurrent
          ? "text-gray-400 border-gray-300 cursor-default shadow-none hover:translate-x-0 hover:translate-y-0"
          : "text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer"
          }`}
      >
        {loading ? (
          <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          plan.buttonLabel
        )}
      </button>
    </div>
  );
}

export default function UpgradePage() {
  const { user } = useUser();
  const isUpgraded = useQuery(
    api.user.getUserUpgradeStatus,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  return (
    <div className="flex-1 p-8 md:p-12 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-black tracking-tight">
          Plans
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your plan to upload multiple PDFs to take notes
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {plans.map((plan) => {
          // Dynamic override based on DB status
          const isPlanCurrent = isUpgraded ? plan.name === "Unlimited" : plan.name === "Free";
          const dynamicPlan = {
            ...plan,
            isCurrent: isPlanCurrent,
            buttonLabel: isPlanCurrent ? "Current Plan" : plan.buttonLabel
          };

          return <PlanCard key={plan.name} plan={dynamicPlan} />;
        })}
      </div>
    </div>
  );
}