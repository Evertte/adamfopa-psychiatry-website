"use client";

import { Mail } from "lucide-react";

type EmailLinkProps = {
  email: string;
  label?: string;
};

export default function EmailLink({ email, label = "Email" }: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-100 hover-lift hover-glow-invert transition"
    >
      <Mail className="h-4 w-4" />
      {label} {email}
    </a>
  );
}
