'use client';
import { useRouter } from 'next/navigation';
import FlowShell from '@/app/cancel/_components/FlowShell';
// reuse your FieldGroup/segmented UI from before (or inline)

export default function FoundJobPage() {
  const router = useRouter();

  return (
    <FlowShell
      step={1}
      totalSteps={3}
      imageSrc="/empire-state-compressed.jpg"
      onBack={() => router.back()}
      onClose={() => router.back()}
    >
      {/* 👇 Inject just the left-side body for this step */}
      <h1 className="mb-2 text-4xl font-semibold leading-tight text-gray-900">
        Congrats on the new role! <span aria-hidden>🎉</span>
      </h1>
      {/* …your FieldGroups & Continue button… */}
      {/* on Continue: router.push('/cancel/downsell') or whatever’s next */}
    </FlowShell>
  );
}
