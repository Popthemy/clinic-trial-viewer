import React from "react";

interface ErrorTypeProps {
  errorType?: string | null;
  errorMessage?: string | null;
  children: React.ReactNode;
}

export default function ErrorType({
  errorType,
  errorMessage,
  children,
}: ErrorTypeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {errorType || "Error"}
        </h2>
        <p className="text-foreground mb-6">
          {errorMessage || "Failed to load trial data"}
        </p>
        {children}
      </div>
    </div>
  );
}
