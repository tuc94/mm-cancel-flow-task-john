'use client';
import Image from 'next/image';

export default function FoundJobStep({
  onAnswer, imageSrc = '/images/main.jpg',
}: { onAnswer: (a:'found'|'searching')=>void; imageSrc?: string }) {
  return (
    <>
      <div className="md:pr-2">
        <h1 className="text-4xl font-semibold leading-tight text-gray-900">
          Hey mate,<br/>Quick one before you go.
        </h1>
        <p className="mt-3 text-2xl italic font-semibold text-gray-900">
          Have you found a job yet?
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Whatever your answer, we just want to help you take the next step.
          With visa support, or by hearing how we can do better.
        </p>
        <hr className="my-4 border-gray-200"/>
        <div className="space-y-3">
          <button onClick={() => onAnswer('found')}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium
              text-gray-800 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-violet-300">
            Yes, I’ve found a job
          </button>
          <button onClick={() => onAnswer('searching')}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium
              text-gray-800 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-violet-300">
            Not yet – I’m still looking
          </button>
        </div>
      </div>
      <div className="md:pl-2">
        <div className="relative h-56 w-full overflow-hidden rounded-xl md:h-full">
          <Image src={imageSrc} alt="City skyline" fill className="object-cover" priority />
        </div>
      </div>
    </>
  );
}
