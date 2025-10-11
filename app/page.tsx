"use client";

import type React from "react";

import { useState } from "react";
import ClinicalTrialViewer from "@/components/clinical-trial-viewer";

export default function Home() {
  const [trialId, setTrialId] = useState("");
  const [showViewer, setShowViewer] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trialId.trim()) {
      setShowViewer(true);
    }
  };

  if (showViewer) {
    return (
      <ClinicalTrialViewer
        trialId={trialId}
        onBack={() => setShowViewer(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-">
          <div className="text-center mb-8">
            <div className="inline-flex items-center text-white justify-center w-16 h-16 bg-background rounded-full mb-4">
              <svg
                className="w-8 h-8 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-background">
              Clinical Trial Viewer
            </h1>
            <p>Enter a trial ID to view detailed information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="trialId"
                className="block text-sm font-medium text-background mb-2"
              >
                Trial ID (NCT Number)
              </label>
              <input
                type="text"
                id="trialId"
                value={trialId}
                onChange={(e) => setTrialId(e.target.value)}
                placeholder="e.g., NCT06077760"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-background focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-background hover:bg-red text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30"
            >
              View Trial Information
            </button>
          </form>
        </div>

        <p className="text-center text-color-crimson text-sm mt-6">
          Data sourced from ClinicalTrials.gov
        </p>
      </div>
    </div>
  );
}
