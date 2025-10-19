"use client";

import React, { useEffect, useState, useRef } from "react";

import { QRCodeSVG } from "qrcode.react";
import Loading from "./Loading";
import MedicalIcon from "./MedicalIcon";
import StudyInformation from "./StudyInformation";
import ErrorType from "./ErrorType";
import defaultMedicalIcon from "../public/default-medical-icon.jpg";
import { pdfExporter } from "@/public/services/utils";
import { defaultStudyData } from "@/public/services/mockData";

/**
 * NCT04615182 

NCT04117295 

NCT06174103 
NCT05666453 

NCT03853551
NCT05136820
 */

interface handleFetchArgs {
  api_url: string;
  text: string | undefined;
}

const handleFetch = async ({ api_url, text }: handleFetchArgs) => {
  try {
    if (!text) throw new Error("No text provided for fetch");
    console.log("handleFetch response:", api_url, text);

    const res = await fetch(api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error in fetch:", error);
    throw error;
  }
};

interface ClinicalTrialData {
  title: string;
  condition: string;
  allocation: string;
  interventionModel: string;
  assignment: string;
  armGroups: Array<{
    label: string;
    description: string;
  }>;
  primaryOutcome: Array<{
    measure: string;
    timeframe: string;
  }>;
  studyUrl: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

interface ClinicalTrialViewerProps {
  trialId: string;
  onBack: () => void;
}

export default function ClinicalTrialViewer({
  trialId,
  onBack,
}: ClinicalTrialViewerProps) {
  const [data, setData] = useState<ClinicalTrialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchTrialData();
  }, [trialId]);

  const fetchTrialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from ClinicalTrials.gov API
      const response = await fetch(
        `https://clinicaltrials.gov/api/v2/studies/${trialId}`
      );
      console.log("Fetching trial data from:", response);
      if (!response.ok) {
        throw new Error("Trial not found");
      }

      const result = await response.json();

      // const result = defaultStudyData;
      const study = result.protocolSection;
      const extractedData: ClinicalTrialData = {
        title:
          study.identificationModule?.officialTitle ||
          study.identificationModule?.briefTitle ||
          "No title available",
        condition: study.conditionsModule?.conditions?.[0] || "Not specified",
        allocation:
          study.designModule?.designInfo?.allocation || "Not specified",
        interventionModel:
          study.designModule?.designInfo?.interventionModel || "Not specified",
        assignment:
          study.designModule?.designInfo?.primaryPurpose || "Not specified",
        armGroups:
          study.armsInterventionsModule?.armGroups
            ?.slice(0, 3)
            .map((group: any) => ({
              label: group.label || "Not specified",
              description: group.description || "No description available",
            })) || [],
        primaryOutcome:
          study.outcomesModule?.primaryOutcomes
            ?.slice(0, study.outcomesModule?.primaryOutcomes.length)
            .map((outcome: any) => ({
              measure: outcome?.measure || "Not specified",
              timeframe: outcome?.timeFrame || "Not specified",
            })) || [],
        studyUrl: `https://clinicaltrials.gov/study/${trialId}`,
        contactInfo: {
          name:
            study.contactsLocationsModule?.centralContacts?.[0]?.name ||
            "Not available",
          phone:
            study.contactsLocationsModule?.centralContacts?.[0]?.phone ||
            "Not available",
          email:
            study.contactsLocationsModule?.centralContacts?.[0]?.email ||
            "Not available",
        },
      };

      setData(extractedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch trial data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data || !data.condition)
      return console.log("No condition to summarize");
    // fetchSummary();
  }, [data?.condition]);

  const fetchSummary = async () => {
    if (!data?.condition) return;

    const res = await handleFetch({
      api_url: "api/summarize",
      text: data?.condition,
    });

    if (!res || !res.summary) return;
  };

  useEffect(() => {
    fetchImage();
  }, [data?.condition]);

  const fetchImage = async () => {
    if (!data) return console.log("no data or image url");

    const result = await handleFetch({
      api_url: "/api/image-gen",
      text: data?.condition,
    });

    console.log("fetchimage: ", result);
    if (result.imageUrl) {
      console.log("Setting condition image src:");
      setImageUrl(result.imageUrl);
      return;
    }
  };

  const handleDownload = async () => {
    if (!contentRef.current || !trialId) return;
    try {
      pdfExporter(contentRef.current, trialId);
    } catch (err) {
      console.error("Failed to download:", err);
    }
  };

  if (loading) {
    return (
      <Loading>
        <p className="text-foreground">Loading trial information...</p>
      </Loading>
    );
  }

  if (error || !data) {
    return (
      <ErrorType errorMessage={error} errorType={"Error"}>
        <button
          onClick={onBack}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </ErrorType>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6 text-primary">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-primary/60 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 font-medium py-2 px-4 rounded-lg border-border border-2 hover:bg-primary hover:text-foreground transition-colors shadow-lg shadow-primary/2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>

        {/* Main Content - Downloadable Section */}
        <div
          ref={contentRef}
          className="rounded-2xl shadow-xl p-8 border border-slate-200"
        >
          {/* Title Section */}
          <div className="card-title border-b-2 border-slate-200">
            <div className="flex justify-start items-left gap-6 mr-4">
              <div className="w-32 shrink-0 aspect-square relative border-2 border-border rounded-full bg-white overflow-hidden flex justify-center items-center">
                <MedicalIcon
                  condition={data.condition}
                  src={imageUrl}
                  alt={data.title}
                  size={20}
                />
              </div>
              <h1 className="text-2xl flex-1 text-center font-bold  text-center leading-relaxed">
                Patients With {data.condition}
              </h1>
            </div>
            <div>
              <p className="text-center mt-2 text-lg">
                {data.title} <br /> ({trialId}){" "}
              </p>
            </div>
          </div>

          {/* Allocation Info */}
          <div className="txt-blue mb-6 p-4 rounded-lg ">
            <p className="text-center">
              <span className="font-semibold">
                {data.allocation + " " + data.interventionModel + " ASSIGNMENT"}
              </span>
            </p>
          </div>

          {/* Arm Groups */}
          {data.armGroups.length > 0 && (
            <div className="flex flex-cols-2 gap-4 mb-6">
              {data.armGroups.map((group, index) => (
                <div
                  key={index}
                  className="card-arms-group text-foreground p-4 rounded-lg border border-blue-200"
                >
                  <p className="text-sm mt-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <div className="w-[70%]">
              {/* Primary Outcome */}
              <div className="mb-6 p-4 rounded-lg border border-2 border-border text-card">
                <h3 className="font-semibold mb-2">Primary Outcome Measure</h3>
                <div className="mb-4">
                  <ul>
                    {data.primaryOutcome.map((outcome, index) => (
                      <li
                        className="list-disc list-inside mt-2 leading-relaxed"
                        key={index}
                      >
                        {outcome.measure + ` ${outcome.timeframe}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Study Information Section */}
              <StudyInformation
                studyUrl={data.studyUrl}
                className="mb-6 p-4 mt-2 rounded-lg border border-slate-200"
              >
                Study Information from clinicaltrials.gov
              </StudyInformation>
            </div>

            {/* Qr code  */}
            <div className="w-[30%] text-destructive mb-6 rounded-lg border border-white">
              <div className="text-center flex flex-col items-center pt-5">
                <QRCodeSVG value={data.studyUrl} size={120} level="H" />
                <p className="text-center mt-2 text-xs leading-relaxed pt-6">
                  FOR ADDITIONAL INFORMATION SCAN THE QR CODE <br />
                  To find out how to participate in this trial, please visit
                  clinicals.gov
                  <br />({trialId})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
