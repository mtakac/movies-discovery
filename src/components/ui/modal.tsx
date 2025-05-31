"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">{children}</div>
    </div>
  );
}
