"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      className="h-9 px-4 print:hidden"
      onClick={() => window.print()}
    >
      {label}
    </Button>
  );
}
