"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import FlowShell from "@/app/cancel/_components/FlowShell";

export default function DownSellPage() {
  const router = useRouter();

  // Demo values – wire these to real data when ready
  const CURRENT_END = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // +14 days
  const BASE_PRICE = 25; // $25/mo
  const DISCOUNT_PCT = 0.5; // 50% off → $12.50

  const discounted = useMemo(
    () => Math.max(0, BASE_PRICE * (1 - DISCOUNT_PCT)),
    [BASE_PRICE]
  );
  const daysLeft = Math.max(
    0,
    Math.ceil((+CURRENT_END - Date.now()) / 86_400_000)
  );
  const startDate = CURRENT_END.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <FlowShell
      step={1}
      totalSteps={3}
      imageSrc="/empire-state-compressed.jpg"
      onBack={() => router.back()}
      onClose={() => router.back()}
      title="Subscription"
    >
      {/* content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
        {/* LEFT: copy */}
        <div className="pt-4">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
            Great choice, mate!
          </h1>

          <p className="mt-4 text-3xl sm:text-[32px] font-semibold leading-snug text-gray-900">
            You&apos;re still on the path to your dream role.{` `}
            <span className="text-[#8952fc]">
              Let’s make it happen together!
            </span>
          </p>

          <p className="mt-6 text-[15px] leading-6 text-gray-700">
            You’ve got <span className="font-medium">{daysLeft} days</span> left
            on your current plan.
            <br />
            Starting from <span className="font-medium">{startDate}</span>, your
            monthly payment will be{` `}
            <span className="font-semibold">${discounted.toFixed(2)}</span>.
          </p>

          <p className="mt-3 text-xs italic text-gray-500">
            You can cancel anytime before then.
          </p>

          <hr className="my-6 border-gray-200" />

          <button
            type="button"
            onClick={() => router.push("/cancel/confirm")}
            className="w-full rounded-2xl bg-[#8952fc] px-4 py-3 text-sm font-semibold text-white shadow-sm
                       hover:bg-[#7b40fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            Land your dream role
          </button>
        </div>
      </div>
    </FlowShell>
  );
}
