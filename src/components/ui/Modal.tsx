"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useId, useState } from "react";

// ⬇️ bring in the next two steps (use the components I shared earlier)
import FoundYesJobPage from "@/app/cancel/found-job/page";
import DownsellKeepGoingStep from "@/app/cancel/downsell/page";

// --- Reusable Modal primitive (Radix + Tailwind) ---
export function Modal({
  open,
  onOpenChange,
  title = "Subscription Cancellation",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          aria-labelledby={titleId}
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl outline-none border border-black/5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
            <Dialog.Title
              id={titleId}
              className="text-sm font-medium text-gray-800"
            >
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 md:grid-cols-2">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// --- Gate: “Have you found a job yet?” ---
export function FoundJobStep({
  onAnswer,
  mainImageSrc = "/empire-state-compressed.jpg", // ✅ from /public
}: {
  onAnswer: (answer: "found" | "searching") => void;
  mainImageSrc?: string;
}) {
  return (
    <>
      <div className="md:pr-2">
        <h2 className="text-4xl leading-tight font-semibold tracking-tight text-gray-900">
          Hey mate,
          <br />
          Quick one before you go.
        </h2>
        <p className="mt-3 text-2xl italic font-semibold text-gray-900">
          Have you found a job yet?
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Whatever your answer, we just want to help you take the next step.
          With visa support, or by hearing how we can do better.
        </p>
        <hr className="my-4 border-gray-200" />
        <div className="space-y-3">
          <button
            onClick={() => onAnswer("found")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Yes, I’ve found a job
          </button>
          <button
            onClick={() => onAnswer("searching")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Not yet – I’m still looking
          </button>
        </div>
      </div>

      <div className="md:pl-2">
        <div className="relative h-56 w-full overflow-hidden rounded-xl md:h-full">
          <Image
            src={mainImageSrc}
            alt="New York skyline"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 480px, 100vw" // ✅ add sizes when using fill
          />
        </div>
      </div>
    </>
  );
}

// --- Example usage with simple step state ---
export default function CancelModalExample() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<"gate" | "foundYes" | "downsell">("gate");

  // demo values; swap with real subscription data
  const basePrice = 25;
  const discounted = Math.max(0, basePrice - 10); // Variant B example
  const currentPeriodEnd = new Date(
    Date.now() + 14 * 24 * 60 * 60 * 1000
  ).toISOString(); // +14 days

  return (
    <Modal open={open} onOpenChange={setOpen} title="Subscription Cancellation">
      {step === "gate" && (
        <FoundJobStep
          onAnswer={(answer) => {
            if (answer === "found") setStep("foundYes");
            else setStep("downsell"); // or route to your "searching" branch
          }}
          mainImageSrc="/empire-state-compressed.jpg"
        />
      )}

      {step === "foundYes" && (
        <FoundYesJobPage
          onBack={() => setStep("gate")}
          onContinue={() => setStep("downsell")}
          imageSrc="/empire-state-compressed.jpg"
        />
      )}

      {step === "downsell" && (
        <DownsellKeepGoingStep
          headerTitle="Subscription"
          imageSrc="/empire-state-compressed.jpg"
          currentPeriodEnd={currentPeriodEnd}
          discountStartDate={currentPeriodEnd}
          discountedMonthlyPrice={discounted}
          onPrimary={() => {
            console.log("Downsell accepted at", discounted);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </Modal>
  );
}
