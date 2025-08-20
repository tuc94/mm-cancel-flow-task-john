// src/app/cancel/_components/DownSellPage.tsx
'use client';

import { useMemo } from 'react';
import FlowShell from '@/app/cancel/_components/FlowShell';

type Props = {
  currentPeriodEnd: Date | string;   // Date or ISO string
  basePrice: number;
  discountAmount: number;            // e.g. 10 = $10 off
  imageSrc: string;
  onPrimary: () => void;             // called when CTA is clicked
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
};

export default function DownSellPage({
  currentPeriodEnd,
  basePrice,
  discountAmount,
  imageSrc,
  onPrimary,
  onBack,
  onClose,
  title = 'Subscription Cancellation',
}: Props) {
  const end = typeof currentPeriodEnd === 'string'
    ? new Date(currentPeriodEnd)
    : currentPeriodEnd;

  const discounted = useMemo(
    () => Math.max(0, basePrice - discountAmount),
    [basePrice, discountAmount]
  );

  const daysLeft = Math.max(0, Math.ceil((+end - Date.now()) / 86_400_000));
  const startDate = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <FlowShell
      step={2}
      totalSteps={3}
      imageSrc={imageSrc}
      onBack={onBack}
      onClose={onClose}
      title={title}
    >
      <h1 className="text-4xl font-semibold leading-tight text-gray-900">Great choice, mate!</h1>
      <p className="mt-3 text-3xl font-semibold leading-snug text-gray-900">
        You&apos;re still on the path to your dream role.{' '}
        <span className="text-[#8952fc]">Let’s make it happen together!</span>
      </p>

      <p className="mt-6 text-sm text-gray-700">
        You’ve got <span className="font-medium">{daysLeft} days</span> left on your current plan.
        <br />
        Starting from <span className="font-medium">{startDate}</span>, your monthly payment will be{' '}
        <span className="font-semibold">${discounted.toFixed(2)}</span>.
      </p>
      <p className="mt-2 text-xs italic text-gray-500">You can cancel anytime before then.</p>

      <hr className="my-6 border-gray-200" />

      <button
        type="button"
        onClick={onPrimary}
        className="w-full rounded-2xl bg-[#8952fc] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#7b40fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      >
        Land your dream role
      </button>
    </FlowShell>
  );
}
