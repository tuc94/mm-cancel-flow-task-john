'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import FlowShell from '@/app/cancel/_components/FlowShell';

const CURRENT_END = new Date(Date.now() + 14*24*60*60*1000); // demo
const BASE_PRICE = 25;

export default function DownsellPage() {
  const router = useRouter();
  const discounted = useMemo(() => Math.max(0, BASE_PRICE - 10), []);

  const daysLeft = Math.max(0, Math.ceil((+CURRENT_END - Date.now()) / 86400000));
  const startDate = CURRENT_END.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <FlowShell
      step={2}
      totalSteps={3}
      imageSrc="/empire-state-compressed.jpg"
      onBack={() => router.back()}
      onClose={() => router.back()}
      title="Subscription"
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
        onClick={() => router.push('/cancel/confirm')}
        className="w-full rounded-2xl bg-[#8952fc] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#7b40fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      >
        Land your dream role
      </button>
    </FlowShell>
  );
}
