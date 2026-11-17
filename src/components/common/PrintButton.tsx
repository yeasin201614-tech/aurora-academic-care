"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print text-navy-800 hover:text-brandBlue-600 font-semibold flex items-center gap-1 text-xs"
    >
      <Printer className="w-4 h-4" /> <span>{label}</span>
    </button>
  );
}
