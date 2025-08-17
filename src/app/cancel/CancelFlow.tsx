'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import FoundJobStep from './steps/FoundJobStep';

type Step = 'found'|'reason'|'downsell'|'confirm';

export default function CancelFlow() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>('found');

  const handleFoundAnswer = (ans: 'found'|'searching') => {
    // TODO: persist quick answer if needed, then advance:
    setStep('reason'); // or branch depending on your flow
  };

  useEffect(() => { setOpen(true); }, []);

  return (
    <Modal open={open} onOpenChange={setOpen} title="Subscription Cancellation">
      {step === 'found' && <FoundJobStep onAnswer={handleFoundAnswer} />}
      {/* Later: {step==='reason' && <ReasonStep .../>} etc. */}
    </Modal>
  );
}
