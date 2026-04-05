"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  GraduationCap,
  AlertCircle,
  AlertTriangle,
  Zap,
  Loader2,
  DollarSign,
  HeartHandshake,
  Activity,
  ShieldAlert,
  BrainCircuit,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  FileText,
  UserPlus,
  Target,
  Send,
  TrendingUp,
  Sparkles,
  PieChart as PieChartIcon,
  ArrowUpRight,
  BarChart3,
  Wallet,
  Lightbulb,
  BookOpen,
  Scale,
  GitCompare,
  ListChecks,
  Layers,
  ClipboardList,
  Package,
  SlidersHorizontal,
  Fingerprint,
  Eye,
  Download
} from "lucide-react";
import { downloadEduGuardObjectivesPdf } from "../lib/objectivesPdf";
import {
  PieChart,
  Pie,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell as RechartCell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList
} from "recharts";

// --- GLOBAL DICTIONARY & HELPER TEXT ---
const FEATURE_DICT = [
  { name: "Marital Status", type: "select", options: { 1: "Single", 2: "Married", 3: "Widower", 4: "Divorced", 5: "Facto Union", 6: "Legally Separated" }, group: "Demographic", isStarred: false, desc: "Legal relationship status" },
  { name: "Application Mode", type: "select", options: { 1: "1st phase-Gen", 2: "Ord. 612/93", 5: "1st phase-Spec(Azores)", 7: "Holders of other courses", 10: "Ord. 854-B/99", 15: "Intl Student", 17: "2nd phase-Gen", 18: "3rd phase-Gen", 39: "Over 23 yrs", 42: "Transfer", 43: "Change course", 44: "Tech. diploma", 51: "Change inst/course", 53: "Short cycle" }, group: "Academic", isStarred: false, desc: "How the student applied to the institution" },
  { name: "Application Order", type: "number", hint: "0 to 9", group: "Academic", isStarred: false, desc: "Preference order (1 is highest preference)" },
  { name: "Course", type: "select", options: { 33: "Biofuel Production", 171: "Animation & Multimedia", 8014: "Social Service", 9003: "Agronomy", 9070: "Communication Design", 9085: "Veterinary Nursing", 9119: "Informatics Engineering", 9147: "Management", 9238: "Social Care", 9254: "Tourism", 9500: "Nursing", 9773: "Journalism", 9853: "Basic Education" }, group: "Academic", isStarred: false, desc: "The degree program they are taking" },
  { name: "Daytime/Evening Attendance", type: "select", options: { 1: "Daytime", 0: "Evening" }, group: "Academic", isStarred: false, desc: "Shift attended" },
  { name: "Previous Qualification", type: "select", options: { 1: "Secondary education", 2: "Higher Ed-Bachelor", 3: "Higher Ed-Degree", 4: "Higher Ed-Master", 19: "Basic Ed 3rd Cycle", 39: "Tech specialization" }, group: "Academic", isStarred: false, desc: "Highest education level achieved prior" },
  { name: "Previous Qualification Grade", type: "number", hint: "Score 0-200", group: "Academic", isStarred: false, desc: "Final grade of previous education" },
  { name: "Nationality", type: "select", options: { 1: "Local", 15: "International" }, group: "Demographic", isStarred: false, desc: "Student's origin" },
  { name: "Mother Qualification", type: "select", options: { 1: "Secondary Ed", 3: "Degree", 19: "Basic Ed", 34: "Unknown", 37: "Primary Ed" }, group: "Demographic", isStarred: false, desc: "Mother's highest education" },
  { name: "Father Qualification", type: "select", options: { 1: "Secondary Ed", 3: "Degree", 19: "Basic Ed", 34: "Unknown", 37: "Primary Ed" }, group: "Demographic", isStarred: false, desc: "Father's highest education" },
  { name: "Mother Occupation", type: "select", options: { 0: "Student", 1: "Director", 2: "Specialist", 4: "Admin", 5: "Service/Sales", 90: "Other" }, group: "Demographic", isStarred: false, desc: "Primary employment sector" },
  { name: "Father Occupation", type: "select", options: { 0: "Student", 1: "Director", 2: "Specialist", 4: "Admin", 5: "Service/Sales", 90: "Other" }, group: "Demographic", isStarred: false, desc: "Primary employment sector" },
  { name: "Admission Grade", type: "number", hint: "Score 0-200", group: "Academic", isStarred: true, desc: "Standardized admission test result" },
  { name: "Displaced", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "Living away from their home address / family" },
  { name: "Educational Special Needs", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "Requires academic accommodations" },
  { name: "Debtor", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Student owes institutional debt" },
  { name: "Tuition Fees Up To Date", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Are tuition payments currently cleared?" },
  { name: "Gender", type: "select", options: { 1: "Male", 0: "Female" }, group: "Demographic", isStarred: false, desc: "Student's sex" },
  { name: "Scholarship Holder", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Is student receiving a grant/scholarship?" },
  { name: "Age At Enrollment", type: "number", hint: "Years", group: "Demographic", isStarred: false, desc: "Age when they started this degree" },
  { name: "International", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "International fee-paying status" },
  { name: "CU 1st Sem Credited", type: "number", hint: "Credits", group: "Academic", isStarred: false, desc: "Credits granted from past study (1st sem)" },
  { name: "CU 1st Sem Enrolled", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes actively taking (1st sem)" },
  { name: "CU 1st Sem Evaluations", type: "number", hint: "Exams", group: "Academic", isStarred: false, desc: "# of tests/evaluations attended (1st sem)" },
  { name: "CU 1st Sem Approved", type: "number", hint: "Classes", group: "Academic", isStarred: true, desc: "# of classes successfully passed (1st sem)" },
  { name: "CU 1st Sem Grade", type: "number", hint: "Avg Grade (0-20)", group: "Academic", isStarred: true, desc: "Average numeric grade (1st sem)" },
  { name: "CU 1st Sem Without Evaluations", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes without attempted exams (1st sem)" },
  { name: "CU 2nd Sem Credited", type: "number", hint: "Credits", group: "Academic", isStarred: false, desc: "Credits granted from past study (2nd sem)" },
  { name: "CU 2nd Sem Enrolled", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes actively taking (2nd sem)" },
  { name: "CU 2nd Sem Evaluations", type: "number", hint: "Exams", group: "Academic", isStarred: false, desc: "# of tests/evaluations attended (2nd sem)" },
  { name: "CU 2nd Sem Approved", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes successfully passed (2nd sem)" },
  { name: "CU 2nd Sem Grade", type: "number", hint: "Avg Grade (0-20)", group: "Academic", isStarred: false, desc: "Average numeric grade (2nd sem)" },
  { name: "CU 2nd Sem Without Evaluations", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes without attempted exams (2nd sem)" },
  { name: "Unemployment Rate", type: "number", hint: "Local Rate (e.g. 10.8)", group: "Financial", isStarred: false, desc: "Macro-economic unemployment metric" },
  { name: "Inflation Rate", type: "number", hint: "Rate (e.g. 1.4)", group: "Financial", isStarred: false, desc: "Macro-economic inflation metric" },
  { name: "GDP", type: "number", hint: "GDP Index (e.g. 1.74)", group: "Financial", isStarred: false, desc: "Macro-economic growth index" }
];

// --- UI COMPONENTS ---
const GaugeChart = ({ score }: { score: number }) => {
  const radius = 80;
  const strokeWidth = 16;
  const circumference = Math.PI * radius;
  const offset = circumference - (score * circumference);
  let color = "#10b981"; let label = "Low Risk";
  if (score >= 0.3) { color = "#f59e0b"; label = "Moderate Risk"; } 
  if (score >= 0.6) { color = "#ef4444"; label = "High Risk"; } 
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-48">
      <div className="relative w-64 h-32 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full transform transition-transform duration-1000 ease-out">
          <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="#1e293b" strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Color Guides */}
          <path d="M 20 90 A 70 70 0 0 1 70 28" fill="none" stroke="#064e3b" strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M 70 28 A 70 70 0 0 1 130 28" fill="none" stroke="#78350f" strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M 130 28 A 70 70 0 0 1 180 90" fill="none" stroke="#7f1d1d" strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Needle / Score value */}
          <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
        </svg>
      </div>
      <div className="absolute bottom-2 text-center">
        <p className="text-4xl font-black drop-shadow-md" style={{ color }}>{(score * 100).toFixed(0)}%</p>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{label}</p>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-700 text-sm">
        <p className="font-bold text-indigo-300">{label}</p>
        <p className="text-white font-semibold">{`Contribution: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const PieDriverTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const p = payload[0];
    return (
      <div className="rounded-xl border border-slate-600 bg-slate-900/95 p-3 text-sm shadow-xl backdrop-blur-sm">
        <p className="font-semibold text-white">{p.payload.fullName}</p>
        <p className="mt-1 text-amber-300">{Number(p.value).toFixed(1)}% relative importance</p>
      </div>
    );
  }
  return null;
};

const isFinancialDriverName = (name: string) =>
  /fee|debtor|scholarship|tuition|gdp|inflation|unemployment/i.test(name);

type DriverRow = { name: string; value: number };

function AutomatedInsightsPanel({
  driverStats,
  driversSorted,
}: {
  driverStats: {
    top: DriverRow;
    top3Sum: number;
    finCount: number;
    maxVal: number;
  } | null;
  driversSorted: DriverRow[];
}) {
  const second = driversSorted[1];
  const third = driversSorted[2];
  const financeNarrative =
    driverStats == null
      ? ""
      : driverStats.finCount >= 4
        ? "Economic and payment-related signals dominate this leaderboard—worth prioritizing in early-warning workflows."
        : driverStats.finCount >= 2
          ? "Financial factors show up alongside academic signals; interventions may need both registrar and aid-office alignment."
          : "Top drivers lean toward academic and engagement metrics this run; still review tuition and debt fields in the full list.";

  return (
    <div className="flex flex-col rounded-3xl border border-amber-500/20 bg-gradient-to-b from-slate-900/90 via-amber-950/20 to-slate-950 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)] lg:col-span-2">
      <div className="border-b border-amber-500/15 bg-gradient-to-r from-amber-950/40 to-transparent px-6 pb-5 pt-6 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
                Narrative
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Random Forest · global importance
              </span>
            </div>
            <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white md:text-2xl">
              <Lightbulb className="h-6 w-6 shrink-0 text-amber-400" strokeWidth={2} />
              Automated insights
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Plain-language readout of what the model emphasizes across all students—not a single profile prediction.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 sm:block">
            <Sparkles className="h-6 w-6 text-amber-300" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 md:gap-6 md:p-8">
        {driverStats && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-950/50 via-slate-900/80 to-slate-950 p-5 md:p-6">
            <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300/90">Primary signal</p>
            <p className="mt-3 text-lg font-bold leading-snug text-white md:text-xl">{driverStats.top.name}</p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-black tabular-nums tracking-tight text-amber-300 md:text-5xl">
                {Number(driverStats.top.value).toFixed(1)}
                <span className="ml-1 text-xl font-bold text-amber-200/50">%</span>
              </span>
              <span className="mb-1.5 rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                of relative importance among top features
              </span>
            </div>
            {(second || third) && (
              <p className="mt-4 border-t border-amber-500/10 pt-4 text-sm leading-relaxed text-slate-400">
                <span className="font-semibold text-slate-300">Also elevated: </span>
                {second && (
                  <>
                    <span className="text-slate-200">{second.name}</span>
                    <span className="tabular-nums text-amber-200/80"> ({Number(second.value).toFixed(1)}%)</span>
                  </>
                )}
                {second && third && <span className="text-slate-500"> · </span>}
                {third && (
                  <>
                    <span className="text-slate-200">{third.name}</span>
                    <span className="tabular-nums text-amber-200/80"> ({Number(third.value).toFixed(1)}%)</span>
                  </>
                )}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-3">
          <div className="group flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 transition hover:border-amber-500/25 hover:bg-slate-900/70 md:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 text-amber-300 ring-1 ring-amber-500/20">
              <Wallet className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-white">Financial &amp; economic lens</h4>
                {driverStats != null && (
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-400">
                    {driverStats.finCount} in top 10
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{financeNarrative}</p>
            </div>
          </div>

          <div className="group flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 transition hover:border-indigo-500/25 hover:bg-slate-900/70 md:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-600/20 text-indigo-300 ring-1 ring-indigo-500/20">
              <BookOpen className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-white">Academic momentum</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Grades, approvals, and first-semester workload often appear next to finance in the ranking. Pair
                transcript trends with the bar chart to see which semester-level signals the forest weighted most.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 md:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 ring-1 ring-slate-700">
              <Scale className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-white">How to read the percentages</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Values are <strong className="font-semibold text-slate-300">relative weights</strong> among the top
                features shown (roughly analogous to Gini-based importance), not dollar amounts or probabilities.
                {driverStats != null && (
                  <>
                    {" "}
                    Together, the top three account for{" "}
                    <span className="font-semibold text-indigo-200 tabular-nums">
                      {driverStats.top3Sum.toFixed(1)}%
                    </span>{" "}
                    of that slice.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 rounded-2xl border border-dashed border-amber-500/30 bg-amber-950/15 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2 text-amber-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Suggested next step</p>
              <p className="mt-1 text-sm text-amber-100/75">
                Cross-check the <strong className="text-amber-100">donut (top five)</strong> against the{" "}
                <strong className="text-amber-100">full ranking</strong>—then open Objective 1 or 3 for this student’s
                own risk readout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type PredictionsForStrict = {
  rfBalConfidence: number;
  rfBalVerdict: string;
  rfVerdict: string;
  rfConfidence: number;
  logisticConfidence: number;
};

type ProfileSignal = { label: string; detail: string; tier: "high" | "medium" };

function buildStrictClassificationContext(predictions: PredictionsForStrict, inputs: string[]) {
  const bal = predictions.rfBalConfidence;
  const rf = predictions.rfConfidence;
  const logC = predictions.logisticConfidence;
  const strictDrop = predictions.rfBalVerdict === "Dropout Risk";
  const overviewDrop = predictions.rfVerdict === "Dropout Risk";
  const delta = Math.abs(bal - rf);

  let crossModelTitle = "Model alignment";
  let crossModelBody = "";
  if (strictDrop && !overviewDrop) {
    crossModelTitle = "Strict model is more alarmed";
    crossModelBody =
      "The balanced Random Forest flags dropout risk while the standard Random Forest (Objective 1) does not. This pattern is exactly what the strict layer is for: catching cases the main model might under-emphasize. Prefer a human touchpoint even if the overview looked calmer.";
  } else if (!strictDrop && overviewDrop) {
    crossModelTitle = "Overview vs strict disagree";
    crossModelBody =
      "Objective 1 shows dropout risk, but the strict balanced classifier does not reach its alert threshold. Use both signals: continue monitoring and validate with records—the models optimize different trade-offs (overall accuracy vs missing fewer at-risk students).";
  } else if (strictDrop && overviewDrop) {
    crossModelTitle = "Strong agreement";
    crossModelBody =
      "Both the standard Random Forest and the balanced strict forest point toward dropout risk. When two independent RF variants align, escalation to advising or retention workflows is easier to justify.";
  } else {
    crossModelBody =
      "Neither forest variant is currently classifying this row into the dropout-risk bucket at the thresholds used here. Still use domain judgment for edge cases and policy holds.";
  }

  let logTension: string | null = null;
  if (logC > 0.55 && !strictDrop) {
    logTension =
      "Objective 5 (Semester‑1 logistic view) suggests elevated disengagement momentum, but Objective 3 does not fire. Consider a light outreach—early-term signals can move before the strict forest crosses its line.";
  } else if (logC <= 0.35 && strictDrop) {
    logTension =
      "The strict forest flags risk while the early Semester‑1 logistic read is relatively calm. Risk may be driven by fields outside first-semester momentum (e.g., finances, later terms, or interactions)—cross-check Objectives 2 and 6.";
  }

  const profileSignals: ProfileSignal[] = [];
  if (inputs[15] === "1") {
    profileSignals.push({
      label: "Debtor flag",
      detail: "Student is marked as owing institutional debt—a common correlate with stop-out in retention studies.",
      tier: "high",
    });
  }
  if (inputs[16] === "0") {
    profileSignals.push({
      label: "Tuition not up to date",
      detail: "Fees are not recorded as current; pairing with aid and bursar data is recommended.",
      tier: "high",
    });
  }
  const sem1Grade = parseFloat(inputs[25] || "");
  if (!Number.isNaN(sem1Grade) && sem1Grade > 0 && sem1Grade < 10) {
    profileSignals.push({
      label: "First-semester average under 10/20",
      detail: `Recorded average ${sem1Grade.toFixed(1)}/20 sits below a typical pass threshold; academic recovery plans matter for persistence.`,
      tier: "high",
    });
  }
  const approved1 = parseFloat(inputs[24] || "");
  const enrolled1 = parseFloat(inputs[22] || "");
  if (!Number.isNaN(approved1) && !Number.isNaN(enrolled1) && enrolled1 > 0 && approved1 / enrolled1 < 0.5) {
    profileSignals.push({
      label: "Low first-semester pass rate",
      detail: `Only ${approved1.toFixed(0)} of ${enrolled1.toFixed(0)} enrolled units approved—credit accumulation risk.`,
      tier: "medium",
    });
  }
  const noEval = parseFloat(inputs[26] || "");
  if (!Number.isNaN(noEval) && noEval >= 2) {
    profileSignals.push({
      label: "Several courses without evaluations",
      detail: `${noEval.toFixed(0)} first-semester units lack evaluations—possible disengagement or administrative gaps worth verifying.`,
      tier: "medium",
    });
  }
  if (inputs[18] === "0" && inputs[15] === "1") {
    profileSignals.push({
      label: "Debt without scholarship",
      detail: "No scholarship flag combined with debtor status increases exposure to financial shock.",
      tier: "medium",
    });
  }

  const riskBand: "critical" | "watch" | "standard" | "clear" =
    bal > 0.6 ? "critical" : bal > 0.45 ? "watch" : bal < 0.32 ? "clear" : "standard";

  const workflowSteps =
    riskBand === "critical"
      ? [
          "Assign to a named advisor within 48 hours and log contact in the retention system.",
          "Pull bursar + financial aid status; if debtor or tuition not current, prioritize aid counseling.",
          "Review transcript for failed or unevaluated units; schedule academic planning if credit velocity is low.",
        ]
      : riskBand === "watch"
        ? [
            "Schedule a proactive check-in (email or short meeting) within two weeks.",
            "Confirm accuracy of debtor, tuition, and grade fields—data errors can flip model behavior.",
            "If signals persist after midterm, re-run analysis or escalate using your local policy.",
          ]
        : [
            "Keep routine monitoring; no mandatory escalation from this objective alone.",
            "If other objectives or registrar flags disagree, document rationale for any hold or outreach.",
          ];

  return {
    strictDrop,
    overviewDrop,
    crossModelTitle,
    crossModelBody,
    logTension,
    profileSignals,
    riskBand,
    workflowSteps,
    delta,
    bal,
    rf,
    logC,
  };
}

function Objective3InsightsPanel({
  predictions,
  inputs,
}: {
  predictions: PredictionsForStrict;
  inputs: string[];
}) {
  const ctx = useMemo(() => buildStrictClassificationContext(predictions, inputs), [predictions, inputs]);

  const bandStyles =
    ctx.riskBand === "critical"
      ? "border-rose-500/30 bg-rose-950/20 text-rose-200"
      : ctx.riskBand === "watch"
        ? "border-amber-500/30 bg-amber-950/20 text-amber-200"
        : ctx.riskBand === "clear"
          ? "border-emerald-500/25 bg-emerald-950/15 text-emerald-200"
          : "border-slate-600/50 bg-slate-900/40 text-slate-300";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <BarChart3 className="h-4 w-4 text-rose-400" />
            Risk scores side by side
          </div>
          <p className="mb-6 text-sm text-slate-400">
            Same student, two Random Forest variants. “Strict” uses class balancing to reduce missed at-risk students;
            values are aligned risk scores (higher = more dropout-oriented), not probabilities calibrated to your campus.
          </p>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
                <span>Objective 1 · Standard RF</span>
                <span className="tabular-nums text-slate-200">{(ctx.rf * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, ctx.rf * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Verdict:{" "}
                <span className="font-semibold text-slate-300">
                  {predictions.rfVerdict || "—"}
                </span>
              </p>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
                <span>Objective 3 · Balanced RF</span>
                <span className="tabular-nums text-slate-200">{(ctx.bal * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, ctx.bal * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Verdict:{" "}
                <span className="font-semibold text-slate-300">
                  {predictions.rfBalVerdict || "—"}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <span className="text-xs font-semibold text-slate-500">Absolute gap</span>
              <span className="text-sm font-black tabular-nums text-white">{(ctx.delta * 100).toFixed(1)} pts</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <GitCompare className="h-5 w-5 shrink-0 text-sky-400" />
            <h3 className="text-base font-bold text-white">{ctx.crossModelTitle}</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{ctx.crossModelBody}</p>
        </div>

        {ctx.logTension && (
          <div className="rounded-3xl border border-orange-500/25 bg-orange-950/20 p-6 md:p-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-300">
              <AlertTriangle className="h-4 w-4" />
              Cross-check with Objective 5
            </div>
            <p className="text-sm leading-relaxed text-orange-100/80">{ctx.logTension}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className={`rounded-3xl border p-6 md:p-8 ${bandStyles}`}>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Operational band</p>
          <p className="mt-2 text-xl font-black capitalize text-white">
            {ctx.riskBand === "critical"
              ? "Critical — escalate"
              : ctx.riskBand === "watch"
                ? "Watch — proactive touchpoint"
                : ctx.riskBand === "clear"
                  ? "Clear — routine monitoring"
                  : "Standard — no automatic escalation"}
          </p>
          <p className="mt-3 text-sm leading-relaxed opacity-90">
            {ctx.riskBand === "critical"
              ? "Strict-aligned risk is above the UI alert threshold (60%). Treat as a retention workflow trigger unless you have a documented override."
              : ctx.riskBand === "watch"
                ? "Between ~45% and 60%: models are uncertain. Good window for low-cost verification of finance and grades before midterm."
                : ctx.riskBand === "clear"
                  ? "Strict score is relatively low; combine with registrar and faculty notes rather than model alone."
                  : "Middle range—neither the loudest alert nor the quietest; use cohort norms and local policy."}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <Layers className="h-4 w-4 text-indigo-400" />
            Why “balanced” exists
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Standard classifiers often under-predict minority outcomes when dropouts are fewer than graduates. Training with
            class rebalancing (or similar) pushes the forest to{" "}
            <strong className="text-slate-300">miss fewer true at-risk students</strong>, usually at the cost of more
            false alarms. Objective 3 is your{" "}
            <strong className="text-slate-300">safety-net read</strong>, not a replacement for Objective 1.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <ClipboardList className="h-4 w-4 text-amber-400" />
            Signals from this profile (form)
          </div>
          {ctx.profileSignals.length === 0 ? (
            <p className="text-sm text-slate-500">
              No high-priority combinations detected from the fields we scan (debt, tuition, Semester‑1 grades, pass rate,
              unevaluated units). That does not rule out risk—models use all 36 features.
            </p>
          ) : (
            <ul className="space-y-3">
              {ctx.profileSignals.map((s) => (
                <li
                  key={s.label}
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    s.tier === "high"
                      ? "border-rose-500/25 bg-rose-950/15 text-slate-300"
                      : "border-slate-700 bg-slate-950/50 text-slate-400"
                  }`}
                >
                  <span className="font-bold text-white">{s.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed opacity-90">{s.detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/20 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-indigo-300">
            <ListChecks className="h-4 w-4" />
            Suggested workflow
          </div>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-400">
            {ctx.workflowSteps.map((step, i) => (
              <li key={i} className="pl-1 marker:font-bold marker:text-indigo-400">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

type PredictionsForEarly = {
  logisticConfidence: number;
  rfConfidence: number;
  rfVerdict: string;
};

type LensRow = { label: string; value: string; detail: string; tone: "ok" | "warn" | "bad" | "neutral" };

function buildEarlyWarningContext(predictions: PredictionsForEarly, inputs: string[]) {
  const log = predictions.logisticConfidence;
  const rf = predictions.rfConfidence;
  const rows: LensRow[] = [];

  const g = parseFloat(inputs[25] || "");
  rows.push({
    label: "1st semester average grade",
    value: inputs[25] === "" ? "—" : `${Number.isNaN(g) ? inputs[25] : g}/20`,
    detail: "Core early academic momentum signal (typical pass benchmark ~10/20).",
    tone:
      inputs[25] === "" || Number.isNaN(g)
        ? "neutral"
        : g < 10
          ? "bad"
          : g < 12
            ? "warn"
            : "ok",
  });

  const enrolled1 = parseFloat(inputs[22] || "");
  const evals1 = parseFloat(inputs[23] || "");
  const approved1 = parseFloat(inputs[24] || "");
  const noEval1 = parseFloat(inputs[26] || "");

  rows.push({
    label: "1st sem enrolled vs evaluations",
    value:
      inputs[22] === "" || inputs[23] === ""
        ? "—"
        : `${enrolled1.toFixed(0)} enrolled · ${evals1.toFixed(0)} evals`,
    detail: "Participation in assessments—lags here often precede visible grade drops.",
    tone:
      Number.isNaN(enrolled1) || enrolled1 <= 0 || Number.isNaN(evals1)
        ? "neutral"
        : evals1 / enrolled1 < 0.5
          ? "bad"
          : evals1 / enrolled1 < 0.75
            ? "warn"
            : "ok",
  });

  rows.push({
    label: "1st sem approved units",
    value: inputs[24] === "" ? "—" : (Number.isNaN(approved1) ? inputs[24] : approved1.toFixed(0)),
    detail: "Credit velocity in the opening term—low approval counts compound risk.",
    tone:
      inputs[24] === "" || Number.isNaN(approved1)
        ? "neutral"
        : Number.isNaN(enrolled1) || enrolled1 <= 0
          ? "neutral"
          : approved1 / enrolled1 < 0.4
            ? "bad"
            : approved1 / enrolled1 < 0.65
              ? "warn"
              : "ok",
  });

  rows.push({
    label: "Courses without evaluations (1st sem)",
    value: inputs[26] === "" ? "—" : (Number.isNaN(noEval1) ? inputs[26] : noEval1.toFixed(0)),
    detail: "Silent friction: missing attempts can mean disengagement before failure posts.",
    tone:
      inputs[26] === "" || Number.isNaN(noEval1)
        ? "neutral"
        : noEval1 >= 3
          ? "bad"
          : noEval1 >= 1
            ? "warn"
            : "ok",
  });

  let crossModel = "";
  if (log > 0.55 && rf < 0.45) {
    crossModel =
      "Semester‑1 logistic stress is elevated while the overview Random Forest score is calmer. That is consistent with a lightweight early-warning lens that reacts to first-term momentum before the full 36-feature forest moves.";
  } else if (log <= 0.4 && rf > 0.55) {
    crossModel =
      "Overview risk is higher than the Semester‑1 logistic read. Later-term fields, finances, or interactions may be driving the forest—use Objective 2 to see global drivers.";
  } else if (log > 0.5 && rf > 0.5) {
    crossModel =
      "Both the early logistic view and the overview forest lean toward risk—prioritize a coordinated outreach rather than waiting for another term.";
  } else {
    crossModel =
      "Early-term and overview signals are relatively aligned on the low side here; still validate attendance and bursar data outside this model.";
  }

  const deployBullets = [
    "Logistic regression is fast, stable, and easy to audit—ideal for batch scoring at registration or week 4.",
    "Research prototypes pair this with RFE / LightGBM on a reduced feature set; the UI highlights the same spirit: a thin Semester‑1 slice you can explain to faculty.",
    "Deploy behind a fixed threshold (here: 50% on the normalized score) and recalibrate on your campus hold-out set.",
  ];

  return { rows, crossModel, log, rf, deployBullets };
}

function Objective5InsightsPanel({
  predictions,
  inputs,
}: {
  predictions: PredictionsForEarly;
  inputs: string[];
}) {
  const ctx = useMemo(() => buildEarlyWarningContext(predictions, inputs), [predictions, inputs]);

  const toneRing = (t: LensRow["tone"]) =>
    t === "bad"
      ? "border-rose-500/40 bg-rose-950/20"
      : t === "warn"
        ? "border-amber-500/35 bg-amber-950/15"
        : t === "ok"
          ? "border-emerald-500/30 bg-emerald-950/15"
          : "border-slate-700 bg-slate-950/40";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-950/30 to-slate-950 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-orange-300/90">
            <SlidersHorizontal className="h-4 w-4" />
            Lightweight early warning (design intent)
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Objective 5 targets a <strong className="text-slate-200">stable, deployable</strong> read: a{" "}
            <strong className="text-slate-200">reduced Semester‑1 feature lens</strong> analogous to pipelines that use{" "}
            <strong className="text-slate-200">RFE</strong> or gradient boosting on a short predictor list. The live API still
            receives all fields for compatibility, but the <strong className="text-slate-200">logistic model is interpreted
            here as an early-term momentum index</strong>—not a full causal model.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <Activity className="h-4 w-4 text-orange-400" />
            Critical Semester‑1 predictors (form lens)
          </div>
          <p className="mb-5 text-xs text-slate-500">
            Traffic lights are heuristics on the fields most aligned with “reduced feature” early warning—not the model’s
            internal coefficients.
          </p>
          <ul className="space-y-3">
            {ctx.rows.map((row) => (
              <li key={row.label} className={`rounded-2xl border p-4 ${toneRing(row.tone)}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span className="font-bold text-white">{row.label}</span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-slate-200">{row.value}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{row.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <GitCompare className="h-4 w-4 text-sky-400" />
            Versus Objective 1 (overview RF)
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{ctx.crossModel}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-orange-500/20 bg-orange-950/20 px-4 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80">Logistic (Obj 5)</p>
              <p className="mt-1 text-2xl font-black tabular-nums text-white">{(ctx.log * 100).toFixed(0)}%</p>
            </div>
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 px-4 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/80">Standard RF (Obj 1)</p>
              <p className="mt-1 text-2xl font-black tabular-nums text-white">{(ctx.rf * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <Package className="h-4 w-4 text-emerald-400" />
            Deployment &amp; operations
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
            {ctx.deployBullets.map((b) => (
              <li key={b} className="flex gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-dashed border-orange-500/30 bg-orange-950/10 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-200/90">Counselor note</p>
          <p className="mt-2 text-sm text-orange-100/75">
            If this objective fires but grades look “fine,” pull attendance and LMS activity where available—those channels
            often move before the next grade snapshot, matching the spirit of a <strong className="text-orange-100">lightweight
            sentinel</strong> rather than a full diagnostic workup.
          </p>
        </div>
      </div>
    </div>
  );
}

type PredictionsForBehavior = {
  kmeansCluster: string;
  rfConfidence: number;
  rfVerdict: string;
};

function buildSilentDropoutContext(
  predictions: PredictionsForBehavior,
  inputs: string[],
  clusterInfoMap: Record<string, { name: string; description: string; traits: string[] }>
) {
  const cID = predictions.kmeansCluster.split(" ")[1] ?? "";
  const info = clusterInfoMap[cID] ?? { name: "Pending", description: "Run analysis to load cluster copy.", traits: [] as string[] };

  const grade = parseFloat(inputs[25] || "");
  const enrolled1 = parseFloat(inputs[22] || "");
  const evals1 = parseFloat(inputs[23] || "");
  const noEval1 = parseFloat(inputs[26] || "");
  const debtor = inputs[15] === "1";
  const tuitionLate = inputs[16] === "0";

  const gradeOk = !Number.isNaN(grade) && grade >= 10;
  const silentNarratives: string[] = [];

  if (cID === "0" && gradeOk) {
    silentNarratives.push(
      "Silent dropout pattern: this row maps to the high-disengagement cluster while Semester‑1 grades still sit at or above 10/20. That is exactly the “no obvious failure yet” scenario clustering is meant to surface—pair with debt, evaluations, and attendance."
    );
  }
  if (cID === "0" && !gradeOk && !Number.isNaN(grade) && grade > 0) {
    silentNarratives.push(
      "Cluster and grades both point to strain—this is a louder pattern (academic + behavioral archetype)."
    );
  }
  if (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(evals1) && evals1 / enrolled1 < 0.55) {
    silentNarratives.push(
      "Evaluation participation is thin relative to enrollment—students can remain enrolled while quietly skipping assessment windows."
    );
  }
  if (!Number.isNaN(noEval1) && noEval1 >= 2) {
    silentNarratives.push(
      "Multiple first-semester units without evaluations increase the chance that struggle stays invisible until late withdrawal or stop-out."
    );
  }
  if ((debtor || tuitionLate) && gradeOk) {
    silentNarratives.push(
      "Financial stress (debtor or tuition not current) with passing grades is another classic silent pathway—money friction often precedes transcript collapse."
    );
  }

  const rfEcho =
    predictions.rfVerdict === "Dropout Risk"
      ? "The supervised Random Forest (Objective 1) also leans toward dropout risk, so behavioral clustering and the overview classifier are directionally consistent."
      : "The overview Random Forest is not in the dropout class here while K‑Means still places the student in a behavioral segment—use both views: clustering finds structure, RF scores policy thresholds.";

  const methodology = [
    "K‑Means partitions students into behavior archetypes using the same feature space—useful when labels are noisy or you want to discover cohorts before targeting interventions.",
    "In research workflows, a Random Forest (or other supervised model) often helps interpret or validate clusters against outcomes; EduGuard surfaces RF separately in Objectives 1–3 while Objective 6 stays unsupervised.",
    "Clusters are not diagnoses—they are statistical neighborhoods. Always confirm with advisors before messaging students.",
  ];

  return { cID, info, silentNarratives, rfEcho, methodology, gradeOk, debtor, tuitionLate };
}

function Objective6InsightsPanel({
  predictions,
  inputs,
  clusterInfoMap,
}: {
  predictions: PredictionsForBehavior;
  inputs: string[];
  clusterInfoMap: Record<string, { name: string; description: string; traits: string[] }> | Record<string, unknown>;
}) {
  const ctx = useMemo(
    () =>
      buildSilentDropoutContext(
        predictions,
        inputs,
        clusterInfoMap as Record<string, { name: string; description: string; traits: string[] }>
      ),
    [predictions, inputs, clusterInfoMap]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/40 to-slate-950 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-300/90">
            <Eye className="h-4 w-4" />
            Silent dropout detection (objective intent)
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            This objective targets students who show <strong className="text-slate-200">disengagement patterns</strong>{" "}
            without relying solely on obvious academic failure. K‑Means surfaces{" "}
            <strong className="text-slate-200">behavioral neighborhoods</strong> (e.g., missing evaluations, tuition
            friction) that can precede transcript damage—aligning with “silent” stop-out research narratives.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <Fingerprint className="h-4 w-4 text-cyan-400" />
            Engagement proxies in this profile
          </div>
          {ctx.silentNarratives.length === 0 ? (
            <p className="text-sm text-slate-500">
              No scripted silent-risk combinations fired on the fields we scan (cluster + grades + evaluations + finances).
              The assigned cluster still describes the closest behavioral archetype in feature space.
            </p>
          ) : (
            <ul className="space-y-3">
              {ctx.silentNarratives.map((s, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 px-4 py-3 text-sm leading-relaxed text-slate-300"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <GitCompare className="h-4 w-4 text-indigo-400" />
            Cluster vs Random Forest (Objective 1)
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{ctx.rfEcho}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
            <Layers className="h-4 w-4 text-blue-400" />
            K‑Means + supervised models in the workflow
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
            {ctx.methodology.map((m) => (
              <li key={m} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/20 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Practical check</p>
          <p className="mt-2 text-sm text-slate-400">
            If the cluster narrative feels mismatched with day-to-day observation, refresh inputs (especially Semester‑1
            evaluations and financial flags) and re-run analysis—K‑Means is sensitive to feature scale and missing proxies
            such as LMS logins when they are not in the dataset.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-blue-500/30 bg-blue-950/10 p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-200/90">Intervention framing</p>
          <p className="mt-2 text-sm text-blue-100/80">
            Prefer low-stigma nudges (success coaching, study skills, financial counseling) when{" "}
            <strong className="text-blue-100">silent</strong> signals show up—students may not self-identify as “at risk” if
            their GPA still looks acceptable on paper.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- APP COMPONENT ---
export default function App() {
  // Shared Input State
  const [inputs, setInputs] = useState<string[]>(Array(36).fill(""));
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Global Datasets
  const [globalImportance, setGlobalImportance] = useState<any[]>([]);
  const [clusterInfoMap, setClusterInfoMap] = useState<any>({});
  
  // Specific AI Outputs
  const [predictions, setPredictions] = useState({
    rfConfidence: 0,
    rfVerdict: "",
    logisticConfidence: 0,
    kmeansCluster: "",
    rfBalVerdict: "",
    rfBalConfidence: 0,
  });

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleDownloadPdf = useCallback(() => {
    if (!isAnalyzed) return;
    downloadEduGuardObjectivesPdf({
      predictions,
      globalImportance,
      clusterInfoMap,
      chatMessages,
    });
  }, [isAnalyzed, predictions, globalImportance, clusterInfoMap, chatMessages]);

  const driversSorted = useMemo(
    () => [...globalImportance].sort((a, b) => Number(b.value) - Number(a.value)),
    [globalImportance]
  );

  const driverStats = useMemo(() => {
    if (!driversSorted.length) return null;
    const top = driversSorted[0];
    const top3Sum = driversSorted.slice(0, 3).reduce((s, d) => s + Number(d.value), 0);
    const finCount = driversSorted.filter((d) => isFinancialDriverName(d.name)).length;
    return { top, top3Sum, finCount, maxVal: Number(top.value) || 1 };
  }, [driversSorted]);

  const pieTopDrivers = useMemo(() => {
    const palette = ["#fbbf24", "#f59e0b", "#a78bfa", "#6366f1", "#38bdf8"];
    return driversSorted.slice(0, 5).map((d, i) => ({
      name: d.name.length > 20 ? `${d.name.slice(0, 18)}…` : d.name,
      fullName: d.name,
      value: Number(d.value),
      fill: palette[i % palette.length],
    }));
  }, [driversSorted]);

  // Load backend static data
  useEffect(() => {
    fetch("http://127.0.0.1:5000/importance").then(r => r.json()).then(d => setGlobalImportance(d)).catch(e => console.log(e));
    fetch("http://127.0.0.1:5000/cluster-info").then(r => r.json()).then(d => setClusterInfoMap(d)).catch(e => console.log(e));
  }, []);

  // Set initial chatbot message based on analysis state
  useEffect(() => {
    if (activeTab === "counselor") {
      if (!isAnalyzed) {
        setChatMessages([{ role: "system", content: "Hello. I cannot assist until a student profile is built and analyzed in the Profile tab." }]);
      } else if (chatMessages.length === 0 || chatMessages[0].content.includes("cannot assist")) {
         setChatMessages([{ role: "system", content: "Student Profile Analyzed. I can explain the risk factors or suggest interventions based on the data provided." }]);
      }
    }
  }, [activeTab, isAnalyzed]);

  const loadDemoStudent = () => {
    setInputs([
      "1","1","3","9119","1", "1","150","1","1","1","2","2","142","0", "0","1","0","1","0","22","0",
      "6","6","4","2","9.5","2", "6","6","2","1","10.2","2", "10.8","1.4","1.8"
    ]);
  };

  const handleGlobalAnalysis = async () => {
    setLoading(true);
    try {
      const payload = inputs.map(v => v === "" ? 0 : parseFloat(v));
      
      // 1. Overall Risk (RF)
      const overRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "rf", values: payload})}).then(r => r.json());
      // 2. Early Warning (Logistic)
      const trajRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "logistic", values: payload})}).then(r => r.json());
      // 3. Behavior (KMeans)
      const clustRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "kmeans", values: payload})}).then(r => r.json());
      // 4. Strict At-Risk Focus (Balanced RF)
      const atRiskRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "rf_bal", values: payload})}).then(r => r.json());

      // Normalize confidence so that 100% means HIGH DROPOUT RISK natively.
      const normalizeRisk = (res: any) => res.result === "Dropout Risk" ? (res.confidence || 0.8) : (1 - (res.confidence || 0.8));

      setPredictions({
        rfConfidence: normalizeRisk(overRes),
        rfVerdict: overRes.result,
        logisticConfidence: normalizeRisk(trajRes),
        kmeansCluster: clustRes.result,
        rfBalVerdict: atRiskRes.result,
        rfBalConfidence: normalizeRisk(atRiskRes),
      });

      setIsAnalyzed(true);
      setActiveTab("early_risk"); // Auto navigate to results!
      window.scrollTo(0,0);
    } catch(err) {
      alert("Backend error. Are you sure app.py is running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = (e: any) => {
    e.preventDefault();
    if(!chatInput.trim() || !isAnalyzed) return;
    
    const newMsgs = [...chatMessages, {role: "user", content: chatInput}];
    setChatMessages(newMsgs);
    setChatInput("");

    setTimeout(() => {
      let response = "I don't have enough data on this student's specific pain points.";
      const debtor = inputs[15]; 
      const tuition = inputs[16]; 
      const failGrade = parseFloat(inputs[25] || "15"); 
      
      const isIntervention = chatInput.toLowerCase().includes("intervene") || chatInput.toLowerCase().includes("help");
      const isWhy = chatInput.toLowerCase().includes("why") || chatInput.toLowerCase().includes("factor");

      if (isIntervention) {
         if(debtor === "1" || tuition === "0") {
           response = "⚠️ **Financial Action Required:** Given their tuition arrears status, the most vital intervention is connecting them immediately with the Financial Aid Office to explore emergency grants or payment plans.";
         } else if (failGrade < 10) {
           response = "📚 **Academic Action Required:** Their first semester grades are failing. Immediate academic advising and peer-tutoring pairing is the highest leverage intervention.";
         } else {
           response = "Overall profile seems complex. Consider a general wellness check via an email touchpoint.";
         }
      } else if (isWhy) {
        if(debtor === "1" || tuition === "0") {
          response = "The primary friction point I am detecting is **Financial Distress**. Students marked as Debtors or behind on Tuition historicaly drop out at a 75% higher rate.";
        } else if (failGrade < 10) {
          response = "The severe risk factor here is **Academic**. They did not clear the 10/20 threshold in their foundational semester, leading to compounding difficulties.";
        } else {
          response = `Their generalized risk score is ${(predictions.rfConfidence * 100).toFixed(0)}%. No single extreme factor stands out, suggesting a compounding pattern of minor disengagements.`;
        }
      } else {
        response = `Try selecting one of the suggested actions like "Why is this student at risk?" or "Suggest interventions".`;
      }
      setChatMessages([...newMsgs, {role: "system", content: response}]);
    }, 800);
  };

  // Nav Item helper
  const NavItem = ({ id, icon, label, disabled = false }: any) => {
    return (
      <button
        disabled={disabled}
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold ${
          activeTab === id
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
            : disabled 
              ? "opacity-40 cursor-not-allowed text-slate-500" 
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon} <span className="text-sm text-left">{label}</span>
        </div>
        {!disabled && activeTab === id && <ChevronRight className="w-4 h-4" />}
      </button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-indigo-900/50 via-slate-800/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/20">
              <h2 className="text-3xl font-black text-white mb-3">Student Profile Inputs</h2>
              <p className="text-slate-300 max-w-2xl text-sm leading-relaxed mb-6">
                Fill in the details for a single student below. Look for the ⭐ symbol indicating high-importance variables. 
                Once analyzed, the results will seamlessly populate across all AI objectives in the sidebar.
              </p>
              <button onClick={loadDemoStudent} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-sm font-bold border border-slate-700 rounded-xl transition flex gap-2 items-center">
                 <UserPlus size={16} /> Load Critical Demo Profile
              </button>
            </div>

            <div className="space-y-12">
              {["Academic", "Financial", "Demographic"].map((groupName) => (
                <div key={groupName} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 lg:p-8">
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-700/50 pb-3">
                     {groupName === "Academic" && <FileText className="text-indigo-400" />}
                     {groupName === "Financial" && <DollarSign className="text-emerald-400" />}
                     {groupName === "Demographic" && <HeartHandshake className="text-purple-400" />}
                     {groupName} Features
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
                     {FEATURE_DICT.map((feature, idx) => {
                       if (feature.group !== groupName) return null;
                       return (
                          <div key={idx} className="flex flex-col gap-1.5 group relative">
                            <label className="text-xs font-bold text-slate-300 tracking-wide uppercase flex justify-between">
                              <span className="flex items-center gap-1.5">
                                {feature.name} {feature.isStarred && <span title="High Impact Feature" className="text-amber-400 text-sm">⭐</span>}
                              </span>
                            </label>
                            {feature.type === "select" ? (
                              <select
                                value={inputs[idx]}
                                onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
                                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <option value="" disabled>Select option...</option>
                                {Object.entries(feature.options!).map(([val, label]) => (
                                  <option key={val} value={val}>{label}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="number"
                                step="any"
                                value={inputs[idx]}
                                onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
                                placeholder={feature.hint || "0.00"}
                                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            )}
                            <p className="text-[10px] text-slate-500 font-medium pl-1">{feature.desc}</p>
                          </div>
                       );
                     })}
                   </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-6 flex justify-center z-20">
               <button
                 onClick={handleGlobalAnalysis}
                 disabled={loading}
                 className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                 {loading ? "Analyzing Models..." : "Lock Profile & Analyze"}
               </button>
            </div>
          </div>
        );

      case "early_risk":
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Activity className="text-indigo-400" /> Objective 1: Status & Overview Risk
                </h2>
                <p className="text-slate-400 text-sm mt-1">Uses the Random Forest model acting on all 36 variables to calculate a holistic status.</p>
             </div>
             
             <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 flex flex-col items-center">
                 <h3 className="text-lg font-bold text-slate-300 mb-6 uppercase tracking-widest text-center">Calculated Dropout Trajectory</h3>
                 <GaugeChart score={predictions.rfConfidence} />
                 
                 <div className={`mt-10 p-6 w-full max-w-xl mx-auto rounded-2xl border text-center ${predictions.rfConfidence > 0.6 ? 'bg-red-950/40 border-red-800/60' : 'bg-emerald-950/40 border-emerald-800/60'}`}>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Final Verdict</p>
                    <p className={`text-3xl font-black ${predictions.rfConfidence > 0.6 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {predictions.rfVerdict === "Dropout Risk" ? "HIGH ALERT" : "TRACKING TO GRADUATE"}
                    </p>
                 </div>
             </div>
          </div>
        );

      case "financial":
        return (
          <div className="space-y-8 animate-in fade-in duration-500 h-full pb-8">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-950/50 via-slate-900/80 to-slate-950 p-8 md:p-10 shadow-[0_0_60px_-12px_rgba(245,158,11,0.15)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200/90">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    Objective 2
                  </div>
                  <h2 className="flex flex-wrap items-center gap-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40">
                      <DollarSign className="h-6 w-6" strokeWidth={2.5} />
                    </span>
                    Underlying drivers
                  </h2>
                  <p className="text-base leading-relaxed text-slate-400">
                    Global feature importance from the Random Forest model: which signals matter most across the cohort, and how strongly financial and academic factors contribute.
                  </p>
                </div>
                {driverStats && (
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300">
                      <PieChartIcon className="h-4 w-4 text-amber-400" />
                      Top 10 drivers
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300">
                      <BarChart3 className="h-4 w-4 text-indigo-400" />
                      Live from API
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!driversSorted.length ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
                <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-amber-500/60" />
                <p className="font-semibold text-slate-300">Loading driver rankings…</p>
                <p className="mt-2 text-sm text-slate-500">Ensure the Flask backend is running on port 5000.</p>
              </div>
            ) : (
              <>
                {driverStats && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 transition hover:border-amber-500/30">
                      <div className="absolute right-4 top-4 rounded-lg bg-amber-500/10 p-2 text-amber-400">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Strongest signal</p>
                      <p className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-white">{driverStats.top.name}</p>
                      <p className="mt-4 text-4xl font-black tabular-nums text-amber-400">
                        {Number(driverStats.top.value).toFixed(1)}
                        <span className="ml-1 text-lg font-bold text-amber-200/60">%</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Highest relative importance in the model</p>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-950/40 to-slate-950 p-6">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Top 3 combined</p>
                      <p className="mt-4 text-4xl font-black tabular-nums text-indigo-300">
                        {driverStats.top3Sum.toFixed(1)}
                        <span className="ml-1 text-lg font-bold text-indigo-200/50">%</span>
                      </p>
                      <p className="mt-2 text-sm text-slate-400">Share of total importance held by the top three features</p>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                          style={{ width: `${Math.min(100, driverStats.top3Sum)}%` }}
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Economic / finance tags</p>
                      <p className="mt-4 text-4xl font-black text-emerald-300">{driverStats.finCount}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        Of the top drivers, how many map to tuition, debt, scholarships, or macro indicators.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Tuition", "Debt", "Scholarship", "Macro"].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 lg:grid-cols-5">
                  <AutomatedInsightsPanel driverStats={driverStats} driversSorted={driversSorted} />

                  <div className="lg:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Top five mix</h3>
                      <span className="text-xs text-slate-500">Hover segments for full names</span>
                    </div>
                    <div className="h-[280px] w-full md:h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
                            </filter>
                          </defs>
                          <Pie
                            data={pieTopDrivers}
                            cx="50%"
                            cy="50%"
                            innerRadius="58%"
                            outerRadius="82%"
                            paddingAngle={3}
                            dataKey="value"
                            stroke="rgba(15,23,42,0.9)"
                            strokeWidth={2}
                            style={{ filter: "url(#pieShadow)" }}
                          >
                            {pieTopDrivers.map((entry, i) => (
                              <RechartCell key={`pie-${i}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <RechartsTooltip content={<PieDriverTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 border-t border-slate-800/80 pt-4">
                      {pieTopDrivers.map((d) => (
                        <span
                          key={d.fullName}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/50 px-3 py-1 text-[11px] font-semibold text-slate-300"
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                          {d.fullName.length > 24 ? `${d.fullName.slice(0, 22)}…` : d.fullName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
                  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white">Full ranking</h3>
                      <p className="text-sm text-slate-500">Each row is scaled to the strongest driver in this view.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {driversSorted.map((row, idx) => {
                      const v = Number(row.value);
                      const pct = driverStats ? (v / driverStats.maxVal) * 100 : 0;
                      const fin = isFinancialDriverName(row.name);
                      return (
                        <div
                          key={`${row.name}-${idx}`}
                          className="group rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4 transition hover:border-slate-600 hover:bg-slate-900/60"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="flex shrink-0 items-center gap-3 sm:w-44">
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${
                                  idx === 0
                                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950"
                                    : "bg-slate-800 text-slate-300"
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold text-white">{row.name}</p>
                                {fin && (
                                  <span className="mt-0.5 inline-block rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                                    Finance-related
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Relative strength</span>
                                <span className="tabular-nums text-slate-200">{v.toFixed(1)}%</span>
                              </div>
                              <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    fin
                                      ? "bg-gradient-to-r from-amber-500 to-orange-400"
                                      : "bg-gradient-to-r from-indigo-500 to-violet-500"
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-black text-white">Comparison chart</h3>
                    <p className="text-sm text-slate-500">Horizontal bars — amber = finance-tagged drivers, indigo = other signals.</p>
                  </div>
                  <div className="h-[420px] w-full md:h-[480px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={driversSorted} margin={{ left: 8, right: 48, top: 8, bottom: 8 }}>
                        <defs>
                          <linearGradient id="barFin" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#ea580c" />
                          </linearGradient>
                          <linearGradient id="barGen" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#4f46e5" />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                        <XAxis type="number" domain={[0, "dataMax"]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "#475569" }} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          width={168}
                          tick={{ fontSize: 11, fontWeight: 600, fill: "#e2e8f0" }}
                        />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(30,41,59,0.35)" }} />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                          {driversSorted.map((entry, index) => (
                            <RechartCell
                              key={`bar-cell-${index}`}
                              fill={isFinancialDriverName(entry.name) ? "url(#barFin)" : "url(#barGen)"}
                            />
                          ))}
                          <LabelList
                            dataKey="value"
                            position="right"
                            formatter={(v: unknown) => `${Number(v).toFixed(1)}%`}
                            style={{ fill: "#cbd5e1", fontSize: 11, fontWeight: 700 }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case "at_risk":
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-8">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-black text-white">
                <ShieldAlert className="text-rose-400" /> Objective 3: Strict Classification
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
                Balanced Random Forest—tuned to miss fewer at-risk students than a standard forest. Use this objective as a
                safety net alongside Objective 1, not as a lone decision rule.
              </p>
            </div>

            <div
              className={`rounded-[2rem] border-2 bg-gradient-to-br p-8 md:p-10 ${
                predictions.rfBalConfidence > 0.6
                  ? "border-rose-800 from-rose-950/60 to-slate-900"
                  : "border-indigo-800 from-indigo-950/60 to-slate-900"
              }`}
            >
              <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                <div
                  className={`rounded-full p-6 ${
                    predictions.rfBalConfidence > 0.6 ? "bg-rose-900/40 text-rose-500" : "bg-indigo-900/40 text-indigo-500"
                  }`}
                >
                  <Target size={64} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">Strict model readout</p>
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <h3 className="text-4xl font-black text-white md:text-5xl">
                      {predictions.rfBalConfidence > 0.6 ? "CRITICAL FOCUS" : "STANDARD TRACK"}
                    </h3>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                        predictions.rfBalVerdict === "Dropout Risk"
                          ? "border-rose-500/40 bg-rose-950/50 text-rose-300"
                          : "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                      }`}
                    >
                      {predictions.rfBalVerdict || "—"}
                    </span>
                    <span className="rounded-full border border-slate-600 bg-slate-900/60 px-3 py-1 text-xs font-black tabular-nums text-slate-300">
                      {(predictions.rfBalConfidence * 100).toFixed(0)}% strict-aligned score
                    </span>
                  </div>
                  <p className="max-w-2xl text-lg text-slate-300">
                    {predictions.rfBalConfidence > 0.6
                      ? "This student crosses the strict alert threshold used in this dashboard. Treat as a retention workflow trigger and validate with live records."
                      : "This profile does not cross the strict alert threshold here. Continue to weigh Objectives 1, 5, and 6 before closing a case."}
                  </p>
                </div>
              </div>
            </div>

            <Objective3InsightsPanel predictions={predictions} inputs={inputs} />
          </div>
        );

      case "counselor":
        return (
          <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
             <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <BrainCircuit className="text-purple-400" /> Objective 4: Counselor Chat
                </h2>
                <p className="text-slate-400 text-sm mt-1">Automated decision support. Ask about interventions for the analyzed student.</p>
             </div>

             <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col overflow-hidden">
                 <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"}`}>
                          {msg.role === "system" && <div className="text-[10px] font-black uppercase text-purple-400 mb-2 tracking-widest">EduGuard AI Support</div>}
                          <div className="leading-relaxed whitespace-pre-wrap">{msg.content.replace(/\*\*(.*?)\*\*/g, '$1')}</div>
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 border-b flex gap-3 overflow-x-auto">
                    <button onClick={() => setChatInput("What interventions are needed?")} disabled={!isAnalyzed} className="shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs font-semibold text-slate-300 transition disabled:opacity-50">Generate Interventions</button>
                    <button onClick={() => setChatInput("Why is this student at risk?")} disabled={!isAnalyzed} className="shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs font-semibold text-slate-300 transition disabled:opacity-50">Explain Factors</button>
                 </div>

                 <form onSubmit={handleChatSubmit} className="p-4 bg-slate-950 flex gap-3">
                    <input disabled={!isAnalyzed} value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={isAnalyzed ? "Ask anything..." : "Please analyze a profile first..."} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white disabled:opacity-50" />
                    <button type="submit" disabled={!isAnalyzed || !chatInput} className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-5 rounded-xl transition flex items-center justify-center">
                       <Send size={18} />
                    </button>
                 </form>
             </div>
          </div>
        );

      case "early_warning":
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-8">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-black text-white">
                <AlertCircle className="text-orange-400" /> Objective 5: Lightweight early warning
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                <strong className="text-slate-300">Goal:</strong> a stable, simple signal using a{" "}
                <strong className="text-slate-300">reduced Semester‑1 slice</strong> of predictors—aligned with logistic /
                LightGBM + RFE style pipelines for easy deployment. Below, the{" "}
                <strong className="text-slate-300">logistic readout</strong> is unchanged; extra panels interpret it in that
                product sense.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
              <div className="mx-auto max-w-2xl space-y-6 text-center">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-900 bg-orange-950/40 px-4 py-2 text-sm font-bold text-orange-400">
                  <Zap size={16} /> Forecasting only (ignores 2nd semester fields in interpretation)
                </div>

                <p
                  className={`text-4xl font-black ${predictions.logisticConfidence > 0.5 ? "text-red-400" : "text-emerald-400"}`}
                >
                  {predictions.logisticConfidence > 0.5
                    ? "PREDICTING DROPOUT EVENT IN SEMESTER 2"
                    : "TRAJECTORY IS STABLE"}
                </p>
                <p className="text-lg text-slate-400">
                  The logistic sequence based on initial grades and enrollments indicates a{" "}
                  <strong className="text-slate-200">{(predictions.logisticConfidence * 100).toFixed(0)}%</strong>{" "}
                  normalized early-warning score for disengagement in the upcoming months (dashboard threshold 50%).
                </p>
              </div>
            </div>

            <Objective5InsightsPanel predictions={predictions} inputs={inputs} />
          </div>
        );
        
      case "behavior":
        return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-8">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-black text-white">
                <Zap className="text-blue-400" /> Objective 6: Silent dropout &amp; behavior pattern
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                <strong className="text-slate-300">Goal:</strong> surface disengagement-style patterns that may appear{" "}
                <strong className="text-slate-300">before obvious academic failure</strong>. <strong className="text-slate-300">K‑Means</strong>{" "}
                defines behavioral neighborhoods; <strong className="text-slate-300">Random Forest</strong> is used elsewhere in
                EduGuard (Objectives 1–3) to score outcomes—this tab keeps the original cluster readout and adds interpretation
                aligned with that research split.
              </p>
            </div>

            <div className="flex flex-col items-center gap-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-10 md:flex-row">
              <div className="flex w-full flex-col items-center justify-center rounded-[2rem] border border-blue-900/50 bg-blue-950/20 p-8 md:w-1/3">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-300/60">Cluster ID</p>
                <p className="text-6xl font-black text-blue-400">{predictions.kmeansCluster.split(" ")[1] || "?"}</p>
              </div>

              <div className="w-full md:w-2/3">
                {(() => {
                  const cID = predictions.kmeansCluster.split(" ")[1];
                  const raw = clusterInfoMap[cID] || {
                    name: "Pending",
                    description: "Waiting for analysis",
                    traits: [],
                  };
                  const info = {
                    ...raw,
                    traits: Array.isArray(raw.traits) ? raw.traits : [],
                  };
                  return (
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white">{info.name}</h3>
                      <p className="text-lg leading-relaxed text-slate-300">{info.description}</p>

                      <div className="pt-6">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Key identifiers</p>
                        <div className="flex flex-wrap gap-2">
                          {info.traits.map((t: string) => (
                            <span
                              key={t}
                              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-bold text-indigo-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <Objective6InsightsPanel predictions={predictions} inputs={inputs} clusterInfoMap={clusterInfoMap} />
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0f1e] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/80 backdrop-blur-3xl border-r border-slate-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 pb-8 border-b border-slate-800">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-3">
               <div className="bg-indigo-600 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                 <GraduationCap size={20} className="text-white" />
               </div>
               <h1 className="text-xl font-black tracking-tight text-white">Edu<span className="text-indigo-400">Guard</span></h1>
             </div>
             <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={20}/></button>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
           <div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">Setup</p>
             <div className="space-y-1">
               <NavItem id="profile" icon={<FileText size={18}/>} label="📝 Profile Builder" />
             </div>
           </div>

           <div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">The 6 AI Objectives</p>
             <div className="space-y-1 relative">
               {!isAnalyzed && (
                 <div className="absolute inset-0 z-10 bg-slate-900/20 backdrop-blur-[2px] flex items-center justify-center rounded-xl p-4 text-center">
                    <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 shadow-xl">Complete Profile first</span>
                 </div>
               )}
               <NavItem disabled={!isAnalyzed} id="early_risk" icon={<Activity size={18}/>} label="1. Status & Overview" />
               <NavItem disabled={!isAnalyzed} id="financial" icon={<DollarSign size={18}/>} label="2. Underlying Drivers" />
               <NavItem disabled={!isAnalyzed} id="at_risk" icon={<ShieldAlert size={18}/>} label="3. Strict Anomalies" />
               <NavItem disabled={!isAnalyzed} id="counselor" icon={<BrainCircuit size={18}/>} label="4. Counselor Chat" />
               <NavItem disabled={!isAnalyzed} id="early_warning" icon={<AlertCircle size={18}/>} label="5. Early warning" />
               <NavItem disabled={!isAnalyzed} id="behavior" icon={<Zap size={18}/>} label="6. Silent / behavior" />
             </div>
           </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0f1e]">
        <button onClick={() => setSidebarOpen(true)} className={`lg:hidden fixed top-6 left-6 z-40 p-2.5 bg-slate-800 border border-slate-700 rounded-xl shadow-xl ${sidebarOpen ? "hidden" : "block"}`}>
          <Menu size={20} />
        </button>

        {/* Ambient Gradient */}
        <div className="absolute top-0 left-1/4 w-3/4 h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto min-h-full max-w-6xl px-6 pb-24 pt-6 md:px-12 md:pt-8">
          <div className="sticky top-0 z-30 -mx-1 mb-6 flex flex-wrap items-center justify-end gap-3 border-b border-slate-800/60 bg-[#0a0f1e]/90 px-1 py-3 backdrop-blur-md md:-mx-2 md:px-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={!isAnalyzed}
              title={isAnalyzed ? "Download PDF summary of all six objectives" : "Analyze a profile first"}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:border-indigo-500/50 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-40"
            >
              <Download className="h-4 w-4 text-indigo-400" strokeWidth={2.5} />
              Download PDF report
            </button>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}