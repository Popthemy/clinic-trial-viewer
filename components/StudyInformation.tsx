"use client";
import React from "react";

interface ExternalAlinkProps {
  link: string;
  index: number;
  className: string;
  children?: React.ReactNode;
}

function ExternalAlink({
  link,
  index,
  className,
  children,
}: ExternalAlinkProps) {
  return (
    <a
      id={`link${index}`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
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

interface StudyInformationProps {
  studyUrl: string;
  className: string;
  children?: React.ReactNode;
}

export default function StudyInformation({
  studyUrl,
  className,
  children,
}: StudyInformationProps) {
  return (
    <div id="study-info" className={className}>
      <h3 className="font-semibold txt-green mb-3 text-center">{children}</h3>
      <div className="flex flex-wrap justify-center gap-3 ">
        {[
          { path: "#study-overview", name: "Study Plan" },
          {
            path: "#participation-criteria",
            name: "Participation Criteria",
          },
          {
            path: "#contact-and-locations",
            name: "Contacts and Locations",
          },
        ].map((obj, index) => (
          <ExternalAlink
            key={index}
            link={`${studyUrl}/${obj.path}`}
            index={index + 1}
            className="px-6 py-2 border-2 external-link font-medium rounded-lg transition-colors"
          >
            {obj.name}
          </ExternalAlink>
        ))}
      </div>
    </div>
  );
}
