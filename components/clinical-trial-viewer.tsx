"use client";

import React, { useEffect, useState, useRef } from "react";

import { QRCodeSVG } from "qrcode.react";

import { jsPDF } from "jspdf";
import MedicalIcon from "./MedicalIcon";
import StudyInformation from "./StudyInformation";
import defaultMedicalIcon from "../public/default-medical-icon.jpg";
import { pdfExporter } from "@/public/services/utils";
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
      /*const response = await fetch(
        `https://clinicaltrials.gov/api/v2/studies/${trialId}`
      );
      console.log("Fetching trial data from:", response);
      if (!response.ok) {
        throw new Error("Trial not found");
      }

      const result = await response.json();
 */

      const result = {
        protocolSection: {
          identificationModule: {
            nctId: "NCT06189391",
            orgStudyIdInfo: {
              id: "1045-001",
            },
            secondaryIdInfos: [
              {
                id: "MK-1045-001",
                type: "OTHER",
                domain: "MSD",
              },
              {
                id: "CN201-101",
                type: "OTHER",
                domain: "Curon Biopharmaceutical Co., LTD",
              },
            ],
            organization: {
              fullName: "MSD R&D (China) Co., Ltd.",
              class: "INDUSTRY",
            },
            briefTitle:
              "A Study to Evaluate MK-1045 (CN201) in Participants With Relapsed or Refractory B-Cell Non-Hodgkin Lymphoma (MK-1045-001/CN201-101)",
            officialTitle:
              "An Open-Label, Dose Escalation Phase 1a Study to Evaluate the Safety, Tolerability, Pharmacokinetics, and Preliminary Efficacy of MK-1045 (CN201) in Patients With Relapsed or Refractory B-Cell Non-Hodgkin Lymphoma",
          },
          statusModule: {
            statusVerifiedDate: "2025-09",
            overallStatus: "RECRUITING",
            expandedAccessInfo: {
              hasExpandedAccess: false,
            },
            startDateStruct: {
              date: "2021-03-16",
              type: "ACTUAL",
            },
            primaryCompletionDateStruct: {
              date: "2027-03-31",
              type: "ESTIMATED",
            },
            completionDateStruct: {
              date: "2027-09-30",
              type: "ESTIMATED",
            },
            studyFirstSubmitDate: "2023-08-30",
            studyFirstSubmitQcDate: "2023-12-19",
            studyFirstPostDateStruct: {
              date: "2024-01-03",
              type: "ACTUAL",
            },
            lastUpdateSubmitDate: "2025-09-15",
            lastUpdatePostDateStruct: {
              date: "2025-09-16",
              type: "ESTIMATED",
            },
          },
          sponsorCollaboratorsModule: {
            responsibleParty: {
              type: "SPONSOR",
            },
            leadSponsor: {
              name: "MSD R&D (China) Co., Ltd.",
              class: "INDUSTRY",
            },
          },
          oversightModule: {
            oversightHasDmc: false,
            isFdaRegulatedDrug: false,
            isFdaRegulatedDevice: false,
          },
          descriptionModule: {
            briefSummary:
              "Researchers are looking for new ways to treat people with relapsed or refractory B-Cell Non-Hodgkin Lymphoma (B-NHL). B-cells are a type of white blood cells that make antibodies and help fight infections. Non-Hodgkin Lymphoma is a type of cancer in the lymphatic system causing enlarged lymph nodes and/or organs in belly or chest. Relapsed means a disease or condition comes back after treatment Refractory means a disease does not respond to treatment or stops responding to a treatment.\n\nMK-1045, the study medicine, is designed to treat relapsed or refractory B-NHL. MK-1045 is an immunotherapy, which is a treatment that helps the immune system fight cancer.\n\nThis is the first study in which MK-1045 will be given to people. The goal of this study is to learn about:\n\n* The safety of MK-1045 and how well people tolerate it.\n* The highest dose of MK-1484 that is well tolerated.\n* How well MK-1045 works to treat relapsed or refractory B-NHL.",
          },
          conditionsModule: {
            conditions: ["Relapsed or Refractory B-Cell Non-Hodgkin Lymphoma"],
          },
          designModule: {
            studyType: "INTERVENTIONAL",
            phases: ["PHASE1"],
            designInfo: {
              allocation: "NON_RANDOMIZED",
              interventionModel: "SEQUENTIAL",
              primaryPurpose: "TREATMENT",
              maskingInfo: {
                masking: "NONE",
              },
            },
            enrollmentInfo: {
              count: 100,
              type: "ESTIMATED",
            },
          },
          armsInterventionsModule: {
            armGroups: [
              {
                label: "MK-1045 Fixed Dose",
                type: "EXPERIMENTAL",
                description:
                  "Participants will receive MK-1045 via intravenous (IV) infusion on Day 1 of each week for 3 consecutive weeks followed by one week off of each four-week cycle for up to 12 months until discontinuation or death.",
                interventionNames: ["Drug: MK-1045"],
              },
              {
                label: "MK-1045 Step-up Dose",
                type: "EXPERIMENTAL",
                description:
                  "Participants will receive MK-1045 via an IV infusion in a step-up dose with priming once a week (Q1W) for a 3-week cycle for up to 12 months until discontinuation or death.",
                interventionNames: ["Drug: MK-1045"],
              },
            ],
            interventions: [
              {
                type: "DRUG",
                name: "MK-1045",
                description: "IV infusion",
                armGroupLabels: ["MK-1045 Fixed Dose", "MK-1045 Step-up Dose"],
                otherNames: ["CN201"],
              },
            ],
          },
          outcomesModule: {
            primaryOutcomes: [
              {
                measure:
                  "Number of Participants who Experience a Dose-limiting Toxicity (DLT)",
                description:
                  "DLT are any of the following drug related (DR) investigator-assessed adverse events: Grade 4 neutropenia that does not recover to Grade ≤ 2 after more than 5 days of supportive care including granulocyte colony-stimulating factor (G-CSF), or ≥ Grade 3 febrile neutropenia; Grade 4 platelet (PLT) decreased, or Grade 3 PLT decreased with bleeding; Grade 4 anemia. Grade 4 non-hematologic toxicity; Grade 3 non-hematologic toxicity that does not recover to Grade ≤ 2 within 3 days after best supportive care (excluding simple laboratory abnormalities without clinical significance as assessed by the investigator). Participants with ≥ Grade 3 tumor lysis syndrome who recover to ≤ Grade 2 within 14 days after optimal supportive therapy will be excluded from the definition of DLT. A DLT was also any other toxic reactions requiring permanent discontinuation of the study intervention.",
                timeFrame: "Up to ~28 Days",
              },
              {
                measure:
                  "Number of Participants who Experience an Adverse Event (AE)",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the investigational drug, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. The number of participants who experience an AE will be reported.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience a Serious Adverse Events (SAE)",
                description:
                  "An SAE refers to an untoward medical occurrence such as death, life-threatening event, permanent or serious disability or loss of function, need for hospitalization or prolongation of hospitalization after the participant receives the intervention, and congenital abnormalities or birth defects. The number of participants who experience a SAE will be reported.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience a Drug-related Adverse Event (DRAE)",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the investigational drug, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. A DRAE is defined as an AE definitely related, probably related, or possibly related to the study intervention. The number of participants who have experienced a DRAE will be reported.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience an AE of Grade 3 or higher",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the study intervention, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. AEs are graded on a scale from 1-5 with 1=Mild, 2=Moderate, 3=Severe or medically significant but not immediately life-threatening, 4= Life threatening consequences, and 5=Death due to AE. The number of participants who experience an AE of grade 3 or above will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience an AE for Each Severity Grade from 1-5",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the study intervention, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. AEs are graded on a scale from 1-5 with 1=Mild, 2=Moderate, 3=Severe or medically significant but not immediately life-threatening, 4= Life threatening consequences, and 5=Death due to AE. The number of participants who experience an AE in each category of AEs from 1-5 will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience a SAE or Serious Drug-related AE",
                description:
                  "An SAE refers to an untoward medical occurrence such as death, life-threatening event, permanent or serious disability or loss of function, need for hospitalization or prolongation of hospitalization after the participant receives the study intervention, and congenital abnormalities or birth defects. A drug related SAE is defined as an SAE definitely related, probably related, or possibly related to the study intervention. The number of participants who experience a SAE or a serious drug-related AE will be reported.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Experience a Dose Modification Due to an AE or DRAE",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the study intervention, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. A drug related AE includes AEs definitely related, probably related, and possibly related to the study intervention. The number of participants who experience a dose modification due to an AE or DRAE will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure:
                  "Number of Participants who Withdraw from the Study due to an AE or DRAE",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the study intervention, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. A drug related AE includes AEs definitely related, probably related, and possibly related to the study intervention. The number of participants who discontinue the study due to an AE will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure: "Number of Participants who Died due to an AE or DRAE",
                description:
                  "An AE is defined as any untoward medical event that occurs after a participant receives the study intervention, which may be manifested as symptoms, signs, diseases, or laboratory abnormalities, but may not necessarily have a causal relationship with the study intervention. A drug related AE includes AEs definitely related, probably related, and possibly related to the study intervention. The number of participants who died due to an AE or DRAE will be presented.",
                timeFrame: "Up to ~15 months",
              },
            ],
            secondaryOutcomes: [
              {
                measure:
                  "Mean Change in Serum MK-1045 Concentration After Administration",
                description:
                  "Blood samples will be collected to determine the mean change from baseline in serum concentration of MK-1045.",
                timeFrame: "Baseline and up to 12 months",
              },
              {
                measure:
                  "Area Under the Concentration-time Curve (AUC) of MK-1045",
                description:
                  "Blood samples will be collected to determine the AUC of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Area Under the Concentration-time Curve from Time 0 to 168 Hours Post Dose (AUC0-168) of MK-1045",
                description:
                  "Blood samples will be collected to determine the AUC0-168 of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 168 hours",
              },
              {
                measure:
                  "Area Under the Concentration-time Curve from Time 0 to Last Quantifiable Concentration Post Dose (AUC0-last) of MK-1045",
                description:
                  "Blood samples will be collected to determine the AUC0-last of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 168 hours",
              },
              {
                measure: "Maximum Concentration (Cmax) of MK-1045",
                description:
                  "Blood samples will be collected to determine the Cmax of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure: "Time to Maximum Concentration (Tmax) of MK-1045",
                description:
                  "Blood samples will be collected to determine the Tmax of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure: "Terminal Elimination Half-life (T1/2) of MK-1045",
                description:
                  "Blood samples will be collected to determine the t1/2 of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure: "Clearance (CL) of MK-1045",
                description:
                  "Blood samples will be collected to determine the CL of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Concentration at the End of Dosing Interval (Ctrough) of MK-1045",
                description:
                  "Blood samples will be collected to determine the Ctrough of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Area Under the Concentration-time Curve from Time 0 to the Dosing Interval (168 Hours) at Steady State (AUC0-tau) of MK-1045",
                description:
                  "Blood samples will be collected to determine the AUC0-tau of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 168 hours",
              },
              {
                measure:
                  "Accumulatio Ratio Based on Cmax (RAC-Cmax) of MK-1045",
                description:
                  "Blood samples will be collected to determine the RAC\\_Cmax of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Accumulation Ratio Based on AUC0-tau (RAC_AUC0-tau) of MK-1045",
                description:
                  "Blood samples will be collected to determine the RAC-AUC0-tau of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure: "Steady State Clearance (CLss) of MK-1045",
                description:
                  "Blood samples will be collected to determine the CLss of MK-1045 in plasma.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Steady State Apparent Volume of Distribution (Vss) of MK-1045",
                description:
                  "Blood samples will be collected to determine the Vss of MK-1045.",
                timeFrame:
                  "Pre-dose and at designated time points post-dose up to 12 months",
              },
              {
                measure:
                  "Mean Number of B Cells in Peripheral Blood After Administration of MK-1045",
                description:
                  "Blood samples will be collected to determine the mean number of B cells in peripheral blood after treatment with MK-1045.",
                timeFrame: "Baseline and up to 12 months",
              },
              {
                measure:
                  "Mean Number of T cells in Peripheral Blood After Administration of MK-1045",
                description:
                  "Blood samples will be collected to determine the mean number of T cells in peripheral blood after treatment with MK-1045.",
                timeFrame: "Baseline and up to 12 months",
              },
              {
                measure:
                  "Mean Level of T Cell Activation After Administration with MK-1045",
                description:
                  "Blood samples will be collected to determine the mean T cell activation after treatment with MK-1045.",
                timeFrame: "Baseline and up to 12 months",
              },
              {
                measure:
                  "Mean Level of T Cell Proliferation After Administration of MK-1045",
                description:
                  "Blood samples will be collected to determine the mean level of T cell proliferation after treatment with MK-1045.",
                timeFrame: "Baseline and up to 12 months",
              },
              {
                measure:
                  "Mean Level of Cytokines in Peripheral Blood After Administration of MK-1045",
                description:
                  "Blood samples will be collected to determine the mean level of cytokines after treatment with MK-1045.",
                timeFrame: "Baseline up to 12 months",
              },
              {
                measure:
                  "Percentage of Participants who Develop Anti-drug Antibodies (ADA) to MK-1045",
                description:
                  "Blood samples will be collected to determine the percentage of participants with ADAs to MK-1045 after treatment with MK-1045.",
                timeFrame: "Baseline and up to 15 months",
              },
              {
                measure: "Objective Response Rate (ORR)",
                description:
                  "ORR is defined as the percentage of the participants who had complete response (CR) or partial response (PR) and will be evaluated using computed tomography (CT) and positron emission tomography (PET)-CT. Response will be assessed based on the International Working Group Criteria: Lugano Classification (Cheson et al, Journal of Clinical Oncology, 2014). CR is complete metabolic (no/minimal fluorodeoxyglucose \\[FDG\\] uptake) and radiologic response (target lesions regress to ≤5 cm in longest transverse diameter of a lesion) and no new lesions. PR is partial metabolic (moderate/high FDG uptake) and radiologic response (≥50% decrease in sum of product diameters for multiple lesions of up to 6 target measurable nodes and extranodal sites, no increase in lesions, and spleen regressed by \\>50% in length beyond normal). The percentage of participants who experience CR or PR will be presented.",
                timeFrame: "Up to 15 months",
              },
              {
                measure: "Duration of Response (DOR)",
                description:
                  "For participants who demonstrate a CR or PR, DOR is defined as the time from the first documented evidence of CR or PR until disease progression or death due to any cause, whichever occurs first. Participants will be evaluated using CT and metabolic imaging (FDG-PET). CR is complete metabolic (no/minimal FDG uptake) and radiologic response (target lesions regress to ≤1.5 cm in longest transverse diameter of a lesion) and no new lesions. PR is partial metabolic (moderate/high FDG uptake) and radiologic response (≥50% decrease in sum of product diameters for multiple lesions of up to 6 target measurable nodes and extranodal sites, no increase in lesions, and spleen regressed by \\>50% in length beyond normal). DOR will be presented among participants who demonstrated CR or PR.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure: "Complete Response Rate (CRR)",
                description:
                  "CRR is defined as the percentage of the participants who had complete response (CR) and will be evaluated using computed tomography (CT) and positron emission tomography (PET)-CT. Response will be assessed based on the International Working Group Criteria: Lugano Classification (Cheson et al, Journal of Clinical Oncology, 2014). CR is complete metabolic (no/minimal fluorodeoxyglucose \\[FDG\\] uptake) and radiologic response (target lesions regress to ≤5 cm in longest transverse diameter of a lesion) and no new lesions. The percentage of participants who experience a CR will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure: "Duration of Complete Response (DCR)",
                description:
                  "For participants who demonstrate a CR, DCR is defined as the time from the first documented evidence of CR until disease progression or death due to any cause, whichever occurs first. Participants will be evaluated using CT and metabolic imaging (FDG-PET). CR is complete metabolic (no/minimal FDG uptake) and radiologic response (target lesions regress to ≤1.5 cm in longest transverse diameter of a lesion) and no new lesions. DCR for participants with CR will be presented.",
                timeFrame: "Up to ~15 months",
              },
              {
                measure: "Progression Free Survival (PFS)",
                description:
                  "PFS is defined as the time from first dose to the first documented progressive disease (PD) or death due to any cause, whichever occurs first. PD per Lugano criteria is defined as new or increased adenopathy, splenic volume increase, new or larger non-measured lesions, recurrent previously resolved lesions, new extranodal lesion \\>1 cm in any axis, a new node \\>1.5 cm in any axis. PFS will be presented.",
                timeFrame: "Up to ~15 months",
              },
            ],
          },
          eligibilityModule: {
            eligibilityCriteria:
              "Inclusion/Exclusion Criteria:\n\nInclusion Criteria\n\nInclusion Criteria include, but are not limited to:\n\n* Has relapsed or refractory B-cell Non-Hodgkin's lymphoma (B-NHL) with disease history meeting the following World Health Organization (WHO) diagnostic subtypes of B-NHL that are CD19-positive in pathologic Immunohistochemistry test: diffuse large B-cell lymphoma (DLBCL), follicular lymphoma (FL) (Grade I to III), marginal zone lymphoma, lymphoplasmacytic lymphoma, mantle cell lymphoma, small lymphocytic lymphoma, and transformed large B-cell lymphoma (During the dose-escalation phase, participants other than those treated with Chimeric antigen receptor T-cell (CAR-T) who cannot provide proof of pathologic immunohistochemistry CD19 positivity but have previous proof of CD20 positivity may be considered for enrollment after discussion with the sponsor)\n\n  * Relapse is defined as the occurrence of progressive disease (PD) after complete response (CR) or partial response (PR) has been achieved after adequate treatment. Note: For DLBCL participants, relapse must occur after participants undergoing at least two lines of therapy; for other participants, they must undergo at least one line of therapy.\n  * Refractory is defined as a situation that there is no standard of care available or that it is not applicable to use standard of care at this stage, including: Participants who are unresponsive to standard of care (e.g., monotherapy or combination therapy containing anti-CD20 monoclonal antibody) and whose best response to standard therapy is PD or stable disease (SD); Participants who are not eligible for autologous hematopoietic stem cell transplantation (ASCT) and have relapsed PD after receiving ASCT; Participants who have failed on chimeric antigen receptor T cell (CAR-T) immunotherapy, but the first dose of the study intervention must be at least 3 months after discontinuation of CAR-T therapy, and CD19 positive expression is still present in tumor tissue.\n* Has at least one evaluable tumor lesion per the Lugano 2014 criteria, i.e., a lymph node lesion \\> 15 mm in long diameter or an extranodal lesion \\> 10 mm in long diameter according to computed tomography (CT) cross-sectional imaging or magnetic resonance imaging (MRI)\n* Has an Eastern Cooperative Oncology Group (ECOG) performance score of ≤ 2 and an estimated survival time of more than 3 months\n* Has essentially normal: bone marrow function; coagulation function; liver function; kidney function; lung function; and heart function\n\nExclusion Criteria\n\nExclusion Criteria include, but are not limited to:\n\n* Has any other non-Hodgkin lymphoma (NHL) not listed in inclusion criteria\n* Has been treated with anti-CD3/CD19 bispecific antibody (BsAb) prior to first dose of study intervention\n* Has received chemotherapy, endocrine therapy, radiotherapy (palliative radiotherapy 2 weeks prior to the first administration of the investigational drug), or biologic therapy, and small molecule targeted agents within 2 weeks prior to the first administration of the investigational drug or within 5 half-lives of the drug, whichever is shorter\n* Has received anti-CD20 antibody or anti-CD19 antibody within 4 weeks prior to first use of the investigational drug\n* Has received anti-tumor immunotherapy or other unlisted clinical study intervention within 4 weeks prior to the first dose of study intervention, or within 5 half-lives of the drug, whichever is shorter\n* Has undergone any major organ surgery (excluding aspiration biopsy) or significant trauma within 4 weeks prior to the first dose of study intervention or those requiring elective surgeries during the study\n* Has received systemic corticosteroids (prednisone \\>10 mg/day or equivalent) or other immunosuppressive agents within 14 days prior to the first dose of the study intervention, excluding the following agents: topical, ocular, intra-articular, intranasal, and inhaled corticosteroids, and short-term, prophylactic use of corticosteroids (e.g. to prevent radio contrast agent induced allergic reactions)\n* Has used immunomodulatory agents, including but not limited to thymosin, interleukin-2 (IL-2), interferon (IFN) and anti-tumor Chinese patent drugs or Chinese herbal medicines within 14 days prior to the first dose of study intervention\n* Has had a live attenuated vaccines within 4 weeks prior to the first dose of study intervention\n* Has a central nervous system (CNS) infiltration\n* Has previous or concomitant CNS diseases, including epilepsy, hemorrhagic/ischemic stroke, severe brain injury, dementia, Parkinson's disease, cerebellar disorder, organic cerebellar syndrome, or mental diseases\n* Has prior or concomitant malignancies (except cured basal cell or squamous cell carcinoma of the skin, carcinoma in situ of the cervix, prostatic intraepithelial neoplasia, and other tumors that have been clinically cured for 5 years as assessed by the investigator)\n* Has uncontrolled active infections currently requiring systemic anti-infective therapy within 3 days prior to first dose\n* Has active hepatitis B and/or hepatitis C. Participants who are positive for antibodies to hepatitis C virus (HCV). Participants who are hepatitis B surface antigen (HBsAg) positive are not allowed to enroll in the dose-escalation period; however, those who were hepatitis B surface antigen (HBsAg)-positive but hepatitis B Virus deoxyribonucleic acid (HBV DNA)-negative and adherent to entecavir antiviral therapy and who agreed to regular monthly monitoring of HBV DNA are allowed to enroll in the dose-expansion period\n* Has a history of immunodeficiency, including testing positive for human immunodeficiency virus (HIV) antibody\n* Has a history of serious cardiovascular and cerebrovascular disease, including but not limited to: severe cardiac rhythm or conduction abnormalities; acute coronary syndrome, congestive heart failure, stroke, or other Grade 3 or higher cardiovascular and cerebrovascular events within 6 months prior to the first dose; ≥ Class II cardiac function as per New York Heart Association (NYHA) functional class or LVEF \\< 50%; or clinically uncontrollable hypertension\n* Has previous or current interstitial lung disease\n* Has acute graft-versus-host disease (GVHD) or active chronic GVHD at present\n* Has active or history of autoimmune diseases (e.g., systemic lupus erythematosus, rheumatoid arthritis, inflammatory bowel disease, autoimmune thyroid disease, vasculitis, psoriasis, etc.) that may relapse, or participants who are at risks (e.g., organ transplant requiring immunosuppressive therapy). Participants with the following diseases are allowed to be further screened for enrollment: hypothyroidism managed with hormone replacement therapy only, and skin diseases not requiring systemic treatment (such as vitiligo, psoriasis, or alopecia).\n* Has received immunotherapy with known Grade 3 or higher immune-related adverse events (irAEs)\n* Has non-hematologic adverse reactions from prior anti-tumor therapy have not recovered to Grade ≤ 1 as assessed by National Cancer Institute NCI Common Terminology Criteria for Adverse Events (NCI-CTCAE) Version 5.0 (excluding toxicities such as alopecia that are assessed by the investigator to have no safety risk)",
            healthyVolunteers: false,
            sex: "ALL",
            minimumAge: "18 Years",
            maximumAge: "75 Years",
            stdAges: ["ADULT", "OLDER_ADULT"],
          },
          contactsLocationsModule: {
            centralContacts: [
              {
                name: "Toll Free Number",
                role: "CONTACT",
                phone: "1-888-577-8839",
                email: "Trialsites@msd.com",
              },
            ],
            overallOfficials: [
              {
                name: "Medical Director",
                affiliation: "Merck Sharp and Dohme LLC",
                role: "STUDY_DIRECTOR",
              },
            ],
            locations: [
              {
                facility:
                  "Fifth Medical Center of PLA General Hospital ( Site 0005)",
                status: "RECRUITING",
                city: "Beijing",
                state: "Beijing Municipality",
                zip: "100071",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "+861066947114",
                  },
                ],
                geoPoint: {
                  lat: 39.9075,
                  lon: 116.39723,
                },
              },
              {
                facility: "Beijing Cancer hospital ( Site 0001)",
                status: "RECRUITING",
                city: "Beijing",
                state: "Beijing Municipality",
                zip: "100142",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "01088196116",
                  },
                ],
                geoPoint: {
                  lat: 39.9075,
                  lon: 116.39723,
                },
              },
              {
                facility:
                  "The First Affiliated Hospital of Xiamen University ( Site 0011)",
                status: "RECRUITING",
                city: "Xiameng",
                state: "Fujian",
                zip: "361000",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "0592 2139866",
                  },
                ],
              },
              {
                facility: "Sun Yat-Sen University Cancer Center ( Site 0003)",
                status: "RECRUITING",
                city: "Guangzhou",
                state: "Guangdong",
                zip: "510060",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "020 87343349",
                  },
                ],
                geoPoint: {
                  lat: 23.11667,
                  lon: 113.25,
                },
              },
              {
                facility:
                  "The Fourth Hospital of Hebei Medical University. ( Site 0004)",
                status: "RECRUITING",
                city: "Shijiazhuang",
                state: "Hebei",
                zip: "050035",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "031186296322",
                  },
                ],
                geoPoint: {
                  lat: 38.04139,
                  lon: 114.47861,
                },
              },
              {
                facility: "Henan Cancer Hospital ( Site 0009)",
                status: "RECRUITING",
                city: "Zhengzhou",
                state: "Henan",
                zip: "450000",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "400-0371-818",
                  },
                ],
                geoPoint: {
                  lat: 34.75778,
                  lon: 113.64861,
                },
              },
              {
                facility:
                  "The First Affiliated Hospital of Zhengzhou University ( Site 0006)",
                status: "RECRUITING",
                city: "Zhengzhou",
                state: "Henan",
                zip: "451161",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "0371-67966266",
                  },
                ],
                geoPoint: {
                  lat: 34.75778,
                  lon: 113.64861,
                },
              },
              {
                facility: "Jiangxi Cancer Hospital ( Site 0007)",
                status: "RECRUITING",
                city: "Nanchang",
                state: "Jiangxi",
                zip: "330029",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "079188317256",
                  },
                ],
                geoPoint: {
                  lat: 28.68396,
                  lon: 115.85306,
                },
              },
              {
                facility: "Shandong Cancer Hospital ( Site 0008)",
                status: "ACTIVE_NOT_RECRUITING",
                city: "Jinan",
                state: "Shandong",
                zip: "250117",
                country: "China",
                geoPoint: {
                  lat: 36.66833,
                  lon: 116.99722,
                },
              },
              {
                facility: "Shanghai East Hospital ( Site 0002)",
                status: "RECRUITING",
                city: "Shanghai",
                state: "Shanghai Municipality",
                zip: "200120",
                country: "China",
                contacts: [
                  {
                    name: "Study Coordinator",
                    role: "CONTACT",
                    phone: "02138804518",
                  },
                ],
                geoPoint: {
                  lat: 31.22222,
                  lon: 121.45806,
                },
              },
              {
                facility:
                  "Tianjin Medical University Cancer Institute and Hospital ( Site 0010)",
                status: "ACTIVE_NOT_RECRUITING",
                city: "Tianjinc",
                state: "Tianjin Municipality",
                zip: "300060",
                country: "China",
              },
            ],
          },
          referencesModule: {
            seeAlsoLinks: [
              {
                label: "Merck Clinical Trials Information",
                url: "http://www.merckclinicaltrials.com",
              },
            ],
          },
          ipdSharingStatementModule: {
            ipdSharing: "YES",
            description:
              "https://trialstransparency.msdclinicaltrials.com/pdf/ProcedureAccessClinicalTrialData.pdf",
            url: "https://externaldatasharing-msd.com/",
          },
        },
        derivedSection: {
          miscInfoModule: {
            versionHolder: "2025-10-08",
          },
          conditionBrowseModule: {
            meshes: [
              {
                id: "D012008",
                term: "Recurrence",
              },
              {
                id: "D016393",
                term: "Lymphoma, B-Cell",
              },
            ],
            ancestors: [
              {
                id: "D020969",
                term: "Disease Attributes",
              },
              {
                id: "D010335",
                term: "Pathologic Processes",
              },
              {
                id: "D013568",
                term: "Pathological Conditions, Signs and Symptoms",
              },
              {
                id: "D008228",
                term: "Lymphoma, Non-Hodgkin",
              },
              {
                id: "D008223",
                term: "Lymphoma",
              },
              {
                id: "D009370",
                term: "Neoplasms by Histologic Type",
              },
              {
                id: "D009369",
                term: "Neoplasms",
              },
              {
                id: "D008232",
                term: "Lymphoproliferative Disorders",
              },
              {
                id: "D008206",
                term: "Lymphatic Diseases",
              },
              {
                id: "D006425",
                term: "Hemic and Lymphatic Diseases",
              },
              {
                id: "D007160",
                term: "Immunoproliferative Disorders",
              },
              {
                id: "D007154",
                term: "Immune System Diseases",
              },
            ],
          },
        },
        hasResults: false,
      };

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
    // fetchImage();
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
      <div className="min-h-screen bg-gradient-to-br from-background to-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mb-4"></div>
          <p className="text-foreground">Loading trial information...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
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
          <h2 className="text-2xl font-bold text-foreground mb-2">Error</h2>
          <p className="text-foreground mb-6">
            {error || "Failed to load trial data"}
          </p>
          <button
            onClick={onBack}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
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
