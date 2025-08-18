"use client";
import { useRouter } from "next/navigation";
import FlowShell from "@/app/cancel/_components/FlowShell";

export default function ConfirmPage() {
  const router = useRouter();
  return (
    <FlowShell
      step={3}
      totalSteps={3}
      onBack={() => router.back()}
      onClose={() => router.back()}
    >
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">All set!</h1>
      <p className="text-sm text-gray-700">Your choice has been saved.</p>
      <hr className="my-6 border-gray-200" />
      <button
        onClick={() => router.push("/profile")}
        className="w-full rounded-xl border px-4 py-3 text-sm hover:bg-gray-50"
      >
        Return to profile
      </button>
    </FlowShell>
  );
}
