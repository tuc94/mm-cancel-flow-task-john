'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useId } from 'react';
import FlowShell from '@/app/cancel/_components/FlowShell';

type YesNo = 'yes' | 'no';
type Range4 = '0' | '1-5' | '6-20' | '20+';
type RangeInterview = '0' | '1-2' | '3-5' | '5+';

export default function FoundYesJobPage() {
  const router = useRouter();

  const [foundWithMM, setFoundWithMM] = useState<YesNo | null>(null);
  const [appliedViaMM, setAppliedViaMM] = useState<Range4 | null>(null);
  const [emailedDirectly, setEmailedDirectly] = useState<Range4 | null>(null);
  const [interviewed, setInterviewed] = useState<RangeInterview | null>(null);

  const isValid = useMemo(
    () => !!(foundWithMM && appliedViaMM && emailedDirectly && interviewed),
    [foundWithMM, appliedViaMM, emailedDirectly, interviewed]
  );

  const handleContinue = () => {
    if (!isValid) return;
    // TODO: persist if needed, then go to next screen
    // e.g. supabase update here…
    router.push('/cancel/downsell');
  };

  return (
    <FlowShell
      step={1}
      totalSteps={3}
      imageSrc="/empire-state-compressed.jpg"
      onBack={() => router.back()}
      onClose={() => router.back()}
      title="Subscription Cancellation"
    >
      <h1 className="mb-4 text-4xl font-semibold leading-tight text-gray-900">
        Congrats on the new role! <span aria-hidden>🎉</span>
      </h1>

      <div className="mt-2 space-y-6">
        <FieldGroup
          label="Did you find this job with MigrateMate?*"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={foundWithMM ?? undefined}
          onChange={(v) => setFoundWithMM(v as YesNo)}
          columns={2}
        />

        <FieldGroup
          label={<>How many roles did you <span className="underline">apply</span> for through Migrate Mate?*</>}
          options={[
            { value: '0', label: '0' },
            { value: '1-5', label: '1 – 5' },
            { value: '6-20', label: '6 – 20' },
            { value: '20+', label: '20+' },
          ]}
          value={appliedViaMM ?? undefined}
          onChange={(v) => setAppliedViaMM(v as Range4)}
          columns={4}
        />

        <FieldGroup
          label={<>How many companies did you <span className="underline">email</span> directly?*</>}
          options={[
            { value: '0', label: '0' },
            { value: '1-5', label: '1–5' },
            { value: '6-20', label: '6–20' },
            { value: '20+', label: '20+' },
          ]}
          value={emailedDirectly ?? undefined}
          onChange={(v) => setEmailedDirectly(v as Range4)}
          columns={4}
        />

        <FieldGroup
          label={<>How many different companies did you <span className="underline">interview</span> with?*</>}
          options={[
            { value: '0', label: '0' },
            { value: '1-2', label: '1–2' },
            { value: '3-5', label: '3–5' },
            { value: '5+', label: '5+' },
          ]}
          value={interviewed ?? undefined}
          onChange={(v) => setInterviewed(v as RangeInterview)}
          columns={4}
        />

        <hr className="border-gray-200" />

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition
            ${isValid
              ? 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'}
          `}
        >
          Continue
        </button>
      </div>
    </FlowShell>
  );
}

/* ----------------- segmented control helper ----------------- */
function FieldGroup({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: {
  label: React.ReactNode;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
}) {
  const groupId = useId();
  const gridCols =
    columns === 4 ? 'grid-cols-4' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div>
      <label htmlFor={groupId} className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <div id={groupId} role="radiogroup" className={`grid gap-3 ${gridCols}`}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition
                border
                ${selected
                  ? 'border-gray-900 bg-white text-gray-900 shadow-sm'
                  : 'border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-50'}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
