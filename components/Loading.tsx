import React from "react";

interface LoadingProps {
  children: React.ReactNode;
}

export default function Loading({ children }: LoadingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mb-4"></div>
        {children}
      </div>
    </div>
  );
}
