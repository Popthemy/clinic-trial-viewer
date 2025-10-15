"use client";
import React from "react";

interface ExternalAlinkProps {
  link: string;
  className: string;
  children?: React.ReactNode;
}

export default function ExternalAlink({
  link,
  className,
  children,
}: ExternalAlinkProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      // className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
    >
      {children}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
