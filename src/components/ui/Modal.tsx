"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { useId } from "react";

export function Modal({
  open,
  onOpenChange,
  title = "Subscription Cancellation",
  description,
  children,
  size = "2xl",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "lg" | "xl" | "2xl" | "full";
}) {
  const titleId = useId();
  const descId = useId();

  const sizeClass =
    size === "full"
      ? "max-w-[96vw]"
      : size === "2xl"
      ? "max-w-[1400px]"
      : size === "xl"
      ? "max-w-[1200px]"
      : "max-w-[1040px]";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/45 backdrop-blur-[2px]
          data-[state=open]:animate-[overlayShow_160ms_ease-out]
          data-[state=closed]:animate-[overlayHide_120ms_ease-in]"
        />
        <Dialog.Content
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          className={`fixed left-1/2 top-1/2 z-50 w-[96vw] sm:w-[94vw] ${sizeClass}
            -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white shadow-2xl outline-none
            data-[state=open]:animate-[contentShow_180ms_cubic-bezier(0.16,1,0.3,1)]
            data-[state=closed]:animate-[contentHide_130ms_cubic-bezier(0.16,1,0.3,1)]`}
        >
          {/* IMPORTANT: keep these two as real Radix elements, no `asChild` */}
          <Dialog.Title id={titleId}>_debug title_</Dialog.Title>

          {description && (
            <Dialog.Description id={descId}>
              <VisuallyHidden>{description}</VisuallyHidden>
            </Dialog.Description>
          )}

          {/* Visible header / body */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10
                          bg-white/80 px-5 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 sm:px-6 lg:px-8"
          >
            <div className="text-sm font-medium text-gray-800">{title}</div>
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

          <div className="max-h=[80vh] overflow-y-auto">
            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8 xl:p-10">
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
