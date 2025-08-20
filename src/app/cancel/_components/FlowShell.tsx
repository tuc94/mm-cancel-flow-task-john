'use client';
import Image from 'next/image';

export default function FlowShell({
  title = 'Subscription Cancellation',
  step,
  totalSteps,
  imageSrc = '/empire-state-compressed.jpg',
  onBack,
  onClose,
  children,
}: {
  title?: string;
  step?: number;
  totalSteps?: number;
  imageSrc?: string;
  onBack?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    // span BOTH columns of the modal body grid
    <div className="w-full lg:col-span-2">
      {/* no outer card/padding — let the modal provide that */}
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-3 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="text-sm font-medium text-gray-900">{title}</div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          {step && totalSteps ? (
            <>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${i + 1 <= step ? 'bg-gray-900' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <span>Step {step} of {totalSteps}</span>
            </>
          ) : (
            <span />
          )}
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body: left content + right image — fills modal */}
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8 xl:p-10">
        <div className="lg:pr-2">{children}</div>
        <div className="lg:pl-2">
          <div className="relative h-60 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80 lg:h-[520px] xl:h-[580px]">
            <Image
              src={imageSrc}
              alt="Context image"
              fill
              priority
              className="object-cover"
              sizes="(min-width:1024px) 640px, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
