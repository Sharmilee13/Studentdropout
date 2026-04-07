// "use client";

// import { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   GraduationCap,
//   AlertCircle,
//   AlertTriangle,
//   Zap,
//   Loader2,
//   DollarSign,
//   HeartHandshake,
//   Activity,
//   ShieldAlert,
//   BrainCircuit,
//   Menu,
//   X,
//   ChevronRight,
//   CheckCircle,
//   FileText,
//   UserPlus,
//   Target,
//   TrendingUp,
//   Sparkles,
//   PieChart as PieChartIcon,
//   ArrowUpRight,
//   BarChart3,
//   Wallet,
//   Lightbulb,
//   BookOpen,
//   Scale,
//   GitCompare,
//   ListChecks,
//   Layers,
//   ClipboardList,
//   Package,
//   SlidersHorizontal,
//   Download
// } from "lucide-react";
// import { downloadEduGuardObjectivesPdf, type PdfReportInput } from "../lib/objectivesPdf";
// import {
//   PieChart,
//   Pie,
//   Tooltip as RechartsTooltip,
//   ResponsiveContainer,
//   Cell as RechartCell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LabelList
// } from "recharts";

// // --- GLOBAL DICTIONARY & HELPER TEXT ---
// const FEATURE_DICT = [
//   { name: "Marital Status", type: "select", options: { 1: "Single", 2: "Married", 3: "Widower", 4: "Divorced", 5: "Facto Union", 6: "Legally Separated" }, group: "Demographic", isStarred: false, desc: "Legal relationship status" },
//   { name: "Application Mode", type: "select", options: { 1: "1st phase-Gen", 2: "Ord. 612/93", 5: "1st phase-Spec(Azores)", 7: "Holders of other courses", 10: "Ord. 854-B/99", 15: "Intl Student", 17: "2nd phase-Gen", 18: "3rd phase-Gen", 39: "Over 23 yrs", 42: "Transfer", 43: "Change course", 44: "Tech. diploma", 51: "Change inst/course", 53: "Short cycle" }, group: "Academic", isStarred: false, desc: "How the student applied to the institution" },
//   { name: "Application Order", type: "number", hint: "0 to 9", group: "Academic", isStarred: false, desc: "Preference order (1 is highest preference)" },
//   { name: "Course", type: "select", options: { 33: "Biofuel Production", 171: "Animation & Multimedia", 8014: "Social Service", 9003: "Agronomy", 9070: "Communication Design", 9085: "Veterinary Nursing", 9119: "Informatics Engineering", 9147: "Management", 9238: "Social Care", 9254: "Tourism", 9500: "Nursing", 9773: "Journalism", 9853: "Basic Education" }, group: "Academic", isStarred: false, desc: "The degree program they are taking" },
//   { name: "Daytime/Evening Attendance", type: "select", options: { 1: "Daytime", 0: "Evening" }, group: "Academic", isStarred: false, desc: "Shift attended" },
//   { name: "Previous Qualification", type: "select", options: { 1: "Secondary education", 2: "Higher Ed-Bachelor", 3: "Higher Ed-Degree", 4: "Higher Ed-Master", 19: "Basic Ed 3rd Cycle", 39: "Tech specialization" }, group: "Academic", isStarred: false, desc: "Highest education level achieved prior" },
//   { name: "Previous Qualification Grade", type: "number", hint: "Score 0-200", group: "Academic", isStarred: false, desc: "Final grade of previous education" },
//   { name: "Nationality", type: "select", options: { 1: "Local", 15: "International" }, group: "Demographic", isStarred: false, desc: "Student's origin" },
//   { name: "Mother Qualification", type: "select", options: { 1: "Secondary Ed", 3: "Degree", 19: "Basic Ed", 34: "Unknown", 37: "Primary Ed" }, group: "Demographic", isStarred: false, desc: "Mother's highest education" },
//   { name: "Father Qualification", type: "select", options: { 1: "Secondary Ed", 3: "Degree", 19: "Basic Ed", 34: "Unknown", 37: "Primary Ed" }, group: "Demographic", isStarred: false, desc: "Father's highest education" },
//   { name: "Mother Occupation", type: "select", options: { 0: "Student", 1: "Director", 2: "Specialist", 4: "Admin", 5: "Service/Sales", 90: "Other" }, group: "Demographic", isStarred: false, desc: "Primary employment sector" },
//   { name: "Father Occupation", type: "select", options: { 0: "Student", 1: "Director", 2: "Specialist", 4: "Admin", 5: "Service/Sales", 90: "Other" }, group: "Demographic", isStarred: false, desc: "Primary employment sector" },
//   { name: "Admission Grade", type: "number", hint: "Score 0-200", group: "Academic", isStarred: true, desc: "Standardized admission test result" },
//   { name: "Displaced", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "Living away from their home address / family" },
//   { name: "Educational Special Needs", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "Requires academic accommodations" },
//   { name: "Debtor", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Student owes institutional debt" },
//   { name: "Tuition Fees Up To Date", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Are tuition payments currently cleared?" },
//   { name: "Gender", type: "select", options: { 1: "Male", 0: "Female" }, group: "Demographic", isStarred: false, desc: "Student's sex" },
//   { name: "Scholarship Holder", type: "select", options: { 1: "Yes", 0: "No" }, group: "Financial", isStarred: true, desc: "Is student receiving a grant/scholarship?" },
//   { name: "Age At Enrollment", type: "number", hint: "Years", group: "Demographic", isStarred: false, desc: "Age when they started this degree" },
//   { name: "International", type: "select", options: { 1: "Yes", 0: "No" }, group: "Demographic", isStarred: false, desc: "International fee-paying status" },
//   { name: "CU 1st Sem Credited", type: "number", hint: "Credits", group: "Academic", isStarred: false, desc: "Credits granted from past study (1st sem)" },
//   { name: "CU 1st Sem Enrolled", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes actively taking (1st sem)" },
//   { name: "CU 1st Sem Evaluations", type: "number", hint: "Exams", group: "Academic", isStarred: false, desc: "# of tests/evaluations attended (1st sem)" },
//   { name: "CU 1st Sem Approved", type: "number", hint: "Classes", group: "Academic", isStarred: true, desc: "# of classes successfully passed (1st sem)" },
//   { name: "CU 1st Sem Grade", type: "number", hint: "Avg Grade (0-20)", group: "Academic", isStarred: true, desc: "Average numeric grade (1st sem)" },
//   { name: "CU 1st Sem Without Evaluations", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes without attempted exams (1st sem)" },
//   { name: "CU 2nd Sem Credited", type: "number", hint: "Credits", group: "Academic", isStarred: false, desc: "Credits granted from past study (2nd sem)" },
//   { name: "CU 2nd Sem Enrolled", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes actively taking (2nd sem)" },
//   { name: "CU 2nd Sem Evaluations", type: "number", hint: "Exams", group: "Academic", isStarred: false, desc: "# of tests/evaluations attended (2nd sem)" },
//   { name: "CU 2nd Sem Approved", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes successfully passed (2nd sem)" },
//   { name: "CU 2nd Sem Grade", type: "number", hint: "Avg Grade (0-20)", group: "Academic", isStarred: false, desc: "Average numeric grade (2nd sem)" },
//   { name: "CU 2nd Sem Without Evaluations", type: "number", hint: "Classes", group: "Academic", isStarred: false, desc: "# of classes without attempted exams (2nd sem)" },
//   { name: "Unemployment Rate", type: "number", hint: "Local Rate (e.g. 10.8)", group: "Financial", isStarred: false, desc: "Macro-economic unemployment metric" },
//   { name: "Inflation Rate", type: "number", hint: "Rate (e.g. 1.4)", group: "Financial", isStarred: false, desc: "Macro-economic inflation metric" },
//   { name: "GDP", type: "number", hint: "GDP Index (e.g. 1.74)", group: "Financial", isStarred: false, desc: "Macro-economic growth index" }
// ];

// // --- UI COMPONENTS ---
// const GaugeChart = ({ score }: { score: number }) => {
//   const radius = 80;
//   const strokeWidth = 16;
//   const circumference = Math.PI * radius;
//   const offset = circumference - (score * circumference);
//   let color = "#10b981"; let label = "Low Risk";
//   if (score >= 0.3) { color = "#f59e0b"; label = "Moderate Risk"; } 
//   if (score >= 0.6) { color = "#ef4444"; label = "High Risk"; } 
//   return (
//     <div className="flex flex-col items-center justify-center relative w-full h-48">
//       <div className="relative w-64 h-32 overflow-hidden">
//         <svg viewBox="0 0 200 100" className="w-full h-full transform transition-transform duration-1000 ease-out">
//           <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="#1e293b" strokeWidth={strokeWidth} strokeLinecap="round" />
//           {/* Color Guides */}
//           <path d="M 20 90 A 70 70 0 0 1 70 28" fill="none" stroke="#064e3b" strokeWidth={strokeWidth} strokeLinecap="round" />
//           <path d="M 70 28 A 70 70 0 0 1 130 28" fill="none" stroke="#78350f" strokeWidth={strokeWidth} strokeLinecap="round" />
//           <path d="M 130 28 A 70 70 0 0 1 180 90" fill="none" stroke="#7f1d1d" strokeWidth={strokeWidth} strokeLinecap="round" />
//           {/* Needle / Score value */}
//           <path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
//         </svg>
//       </div>
//       <div className="absolute bottom-2 text-center">
//         <p className="text-4xl font-black drop-shadow-md" style={{ color }}>{(score * 100).toFixed(0)}%</p>
//         <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{label}</p>
//       </div>
//     </div>
//   );
// };

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-700 text-sm">
//         <p className="font-bold text-indigo-300">{label}</p>
//         <p className="text-white font-semibold">{`Contribution: ${payload[0].value}%`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const PieDriverTooltip = ({ active, payload }: any) => {
//   if (active && payload?.length) {
//     const p = payload[0];
//     return (
//       <div className="rounded-xl border border-slate-600 bg-slate-900/95 p-3 text-sm shadow-xl backdrop-blur-sm">
//         <p className="font-semibold text-white">{p.payload.fullName}</p>
//         <p className="mt-1 text-amber-300">{Number(p.value).toFixed(1)}% relative importance</p>
//       </div>
//     );
//   }
//   return null;
// };

// const isFinancialDriverName = (name: string) =>
//   /fee|debtor|scholarship|tuition|gdp|inflation|unemployment/i.test(name);

// type DriverRow = { name: string; value: number };

// function AutomatedInsightsPanel({
//   driverStats,
//   driversSorted,
// }: {
//   driverStats: {
//     top: DriverRow;
//     top3Sum: number;
//     finCount: number;
//     maxVal: number;
//   } | null;
//   driversSorted: DriverRow[];
// }) {
//   const second = driversSorted[1];
//   const third = driversSorted[2];
//   const financeNarrative =
//     driverStats == null
//       ? ""
//       : driverStats.finCount >= 4
//         ? "Economic and payment-related signals dominate this leaderboard—worth prioritizing in early-warning workflows."
//         : driverStats.finCount >= 2
//           ? "Financial factors show up alongside academic signals; interventions may need both registrar and aid-office alignment."
//           : "Top drivers lean toward academic and engagement metrics this run; still review tuition and debt fields in the full list.";

//   return (
//     <div className="flex flex-col rounded-3xl border border-amber-500/20 bg-gradient-to-b from-slate-900/90 via-amber-950/20 to-slate-950 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)] lg:col-span-2">
//       <div className="border-b border-amber-500/15 bg-gradient-to-r from-amber-950/40 to-transparent px-6 pb-5 pt-6 md:px-8">
//         <div className="flex items-start justify-between gap-4">
//           <div className="min-w-0 space-y-2">
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
//                 Narrative
//               </span>
//               <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
//                 Random Forest · global importance
//               </span>
//             </div>
//             <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white md:text-2xl">
//               <Lightbulb className="h-6 w-6 shrink-0 text-amber-400" strokeWidth={2} />
//               Automated insights
//             </h3>
//             <p className="max-w-md text-sm leading-relaxed text-slate-400">
//               Plain-language readout of what the model emphasizes across all students—not a single profile prediction.
//             </p>
//           </div>
//           <div className="hidden shrink-0 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 sm:block">
//             <Sparkles className="h-6 w-6 text-amber-300" />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-1 flex-col gap-5 p-6 md:gap-6 md:p-8">
//         {driverStats && (
//           <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-950/50 via-slate-900/80 to-slate-950 p-5 md:p-6">
//             <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300/90">Primary signal</p>
//             <p className="mt-3 text-lg font-bold leading-snug text-white md:text-xl">{driverStats.top.name}</p>
//             <div className="mt-4 flex flex-wrap items-end gap-3">
//               <span className="text-4xl font-black tabular-nums tracking-tight text-amber-300 md:text-5xl">
//                 {Number(driverStats.top.value).toFixed(1)}
//                 <span className="ml-1 text-xl font-bold text-amber-200/50">%</span>
//               </span>
//               <span className="mb-1.5 rounded-lg border border-slate-600/60 bg-slate-900/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
//                 of relative importance among top features
//               </span>
//             </div>
//             {(second || third) && (
//               <p className="mt-4 border-t border-amber-500/10 pt-4 text-sm leading-relaxed text-slate-400">
//                 <span className="font-semibold text-slate-300">Also elevated: </span>
//                 {second && (
//                   <>
//                     <span className="text-slate-200">{second.name}</span>
//                     <span className="tabular-nums text-amber-200/80"> ({Number(second.value).toFixed(1)}%)</span>
//                   </>
//                 )}
//                 {second && third && <span className="text-slate-500"> · </span>}
//                 {third && (
//                   <>
//                     <span className="text-slate-200">{third.name}</span>
//                     <span className="tabular-nums text-amber-200/80"> ({Number(third.value).toFixed(1)}%)</span>
//                   </>
//                 )}
//               </p>
//             )}
//           </div>
//         )}

//         <div className="grid gap-3">
//           <div className="group flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 transition hover:border-amber-500/25 hover:bg-slate-900/70 md:p-5">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 text-amber-300 ring-1 ring-amber-500/20">
//               <Wallet className="h-5 w-5" strokeWidth={2} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h4 className="text-sm font-bold text-white">Financial &amp; economic lens</h4>
//                 {driverStats != null && (
//                   <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-400">
//                     {driverStats.finCount} in top 10
//                   </span>
//                 )}
//               </div>
//               <p className="mt-2 text-sm leading-relaxed text-slate-400">{financeNarrative}</p>
//             </div>
//           </div>

//           <div className="group flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 transition hover:border-indigo-500/25 hover:bg-slate-900/70 md:p-5">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-600/20 text-indigo-300 ring-1 ring-indigo-500/20">
//               <BookOpen className="h-5 w-5" strokeWidth={2} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h4 className="text-sm font-bold text-white">Academic momentum</h4>
//               <p className="mt-2 text-sm leading-relaxed text-slate-400">
//                 Grades, approvals, and first-semester workload often appear next to finance in the ranking. Pair
//                 transcript trends with the bar chart to see which semester-level signals the forest weighted most.
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 md:p-5">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 ring-1 ring-slate-700">
//               <Scale className="h-5 w-5" strokeWidth={2} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h4 className="text-sm font-bold text-white">How to read the percentages</h4>
//               <p className="mt-2 text-sm leading-relaxed text-slate-400">
//                 Values are <strong className="font-semibold text-slate-300">relative weights</strong> among the top
//                 features shown (roughly analogous to Gini-based importance), not dollar amounts or probabilities.
//                 {driverStats != null && (
//                   <>
//                     {" "}
//                     Together, the top three account for{" "}
//                     <span className="font-semibold text-indigo-200 tabular-nums">
//                       {driverStats.top3Sum.toFixed(1)}%
//                     </span>{" "}
//                     of that slice.
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-auto flex flex-col gap-3 rounded-2xl border border-dashed border-amber-500/30 bg-amber-950/15 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
//           <div className="flex items-start gap-3">
//             <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2 text-amber-400">
//               <ArrowUpRight className="h-4 w-4" />
//             </div>
//             <div>
//               <p className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Suggested next step</p>
//               <p className="mt-1 text-sm text-amber-100/75">
//                 Cross-check the <strong className="text-amber-100">donut (top five)</strong> against the{" "}
//                 <strong className="text-amber-100">full ranking</strong>—then open Objective 1 or 3 for this student’s
//                 own risk readout.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type PredictionsForStrict = {
//   rfBalConfidence: number;
//   rfBalVerdict: string;
//   rfVerdict: string;
//   rfConfidence: number;
//   logisticConfidence: number;
// };

// type ProfileSignal = { label: string; detail: string; tier: "high" | "medium" };

// function buildStrictClassificationContext(predictions: PredictionsForStrict, inputs: string[]) {
//   const bal = predictions.rfBalConfidence;
//   const rf = predictions.rfConfidence;
//   const logC = predictions.logisticConfidence;
//   const strictDrop = predictions.rfBalVerdict === "Dropout Risk";
//   const overviewDrop = predictions.rfVerdict === "Dropout Risk";
//   const delta = Math.abs(bal - rf);

//   let crossModelTitle = "Model alignment";
//   let crossModelBody = "";
//   if (strictDrop && !overviewDrop) {
//     crossModelTitle = "Strict model is more alarmed";
//     crossModelBody =
//       "The balanced Random Forest flags dropout risk while the standard Random Forest (Objective 1) does not. This pattern is exactly what the strict layer is for: catching cases the main model might under-emphasize. Prefer a human touchpoint even if the overview looked calmer.";
//   } else if (!strictDrop && overviewDrop) {
//     crossModelTitle = "Overview vs strict disagree";
//     crossModelBody =
//       "Objective 1 shows dropout risk, but the strict balanced classifier does not reach its alert threshold. Use both signals: continue monitoring and validate with records—the models optimize different trade-offs (overall accuracy vs missing fewer at-risk students).";
//   } else if (strictDrop && overviewDrop) {
//     crossModelTitle = "Strong agreement";
//     crossModelBody =
//       "Both the standard Random Forest and the balanced strict forest point toward dropout risk. When two independent RF variants align, escalation to advising or retention workflows is easier to justify.";
//   } else {
//     crossModelBody =
//       "Neither forest variant is currently classifying this row into the dropout-risk bucket at the thresholds used here. Still use domain judgment for edge cases and policy holds.";
//   }

//   let logTension: string | null = null;
//   if (logC > 0.55 && !strictDrop) {
//     logTension =
//       "Objective 5 (Semester‑1 logistic view) suggests elevated disengagement momentum, but Objective 3 does not fire. Consider a light outreach—early-term signals can move before the strict forest crosses its line.";
//   } else if (logC <= 0.35 && strictDrop) {
//     logTension =
//       "The strict forest flags risk while the early Semester‑1 logistic read is relatively calm. Risk may be driven by fields outside first-semester momentum (e.g., finances, later terms, or interactions)—cross-check Objectives 2 and 6.";
//   }

//   const profileSignals: ProfileSignal[] = [];
//   if (inputs[15] === "1") {
//     profileSignals.push({
//       label: "Debtor flag",
//       detail: "Student is marked as owing institutional debt—a common correlate with stop-out in retention studies.",
//       tier: "high",
//     });
//   }
//   if (inputs[16] === "0") {
//     profileSignals.push({
//       label: "Tuition not up to date",
//       detail: "Fees are not recorded as current; pairing with aid and bursar data is recommended.",
//       tier: "high",
//     });
//   }
//   const sem1Grade = parseFloat(inputs[25] || "");
//   if (!Number.isNaN(sem1Grade) && sem1Grade > 0 && sem1Grade < 10) {
//     profileSignals.push({
//       label: "First-semester average under 10/20",
//       detail: `Recorded average ${sem1Grade.toFixed(1)}/20 sits below a typical pass threshold; academic recovery plans matter for persistence.`,
//       tier: "high",
//     });
//   }
//   const approved1 = parseFloat(inputs[24] || "");
//   const enrolled1 = parseFloat(inputs[22] || "");
//   if (!Number.isNaN(approved1) && !Number.isNaN(enrolled1) && enrolled1 > 0 && approved1 / enrolled1 < 0.5) {
//     profileSignals.push({
//       label: "Low first-semester pass rate",
//       detail: `Only ${approved1.toFixed(0)} of ${enrolled1.toFixed(0)} enrolled units approved—credit accumulation risk.`,
//       tier: "medium",
//     });
//   }
//   const noEval = parseFloat(inputs[26] || "");
//   if (!Number.isNaN(noEval) && noEval >= 2) {
//     profileSignals.push({
//       label: "Several courses without evaluations",
//       detail: `${noEval.toFixed(0)} first-semester units lack evaluations—possible disengagement or administrative gaps worth verifying.`,
//       tier: "medium",
//     });
//   }
//   if (inputs[18] === "0" && inputs[15] === "1") {
//     profileSignals.push({
//       label: "Debt without scholarship",
//       detail: "No scholarship flag combined with debtor status increases exposure to financial shock.",
//       tier: "medium",
//     });
//   }

//   const riskBand: "critical" | "watch" | "standard" | "clear" =
//     bal > 0.6 ? "critical" : bal > 0.45 ? "watch" : bal < 0.32 ? "clear" : "standard";

//   const workflowSteps =
//     riskBand === "critical"
//       ? [
//           "Assign to a named advisor within 48 hours and log contact in the retention system.",
//           "Pull bursar + financial aid status; if debtor or tuition not current, prioritize aid counseling.",
//           "Review transcript for failed or unevaluated units; schedule academic planning if credit velocity is low.",
//         ]
//       : riskBand === "watch"
//         ? [
//             "Schedule a proactive check-in (email or short meeting) within two weeks.",
//             "Confirm accuracy of debtor, tuition, and grade fields—data errors can flip model behavior.",
//             "If signals persist after midterm, re-run analysis or escalate using your local policy.",
//           ]
//         : [
//             "Keep routine monitoring; no mandatory escalation from this objective alone.",
//             "If other objectives or registrar flags disagree, document rationale for any hold or outreach.",
//           ];

//   return {
//     strictDrop,
//     overviewDrop,
//     crossModelTitle,
//     crossModelBody,
//     logTension,
//     profileSignals,
//     riskBand,
//     workflowSteps,
//     delta,
//     bal,
//     rf,
//     logC,
//   };
// }

// type CounselorPredictions = {
//   rfConfidence: number;
//   rfVerdict: string;
//   logisticConfidence: number;
//   rfBalVerdict: string;
//   rfBalConfidence: number;
// };

// function normFeatureKey(s: string): string {
//   return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
// }

// function featureIndexForImportanceName(apiName: string): number | null {
//   const k = normFeatureKey(apiName);
//   for (let i = 0; i < FEATURE_DICT.length; i++) {
//     if (normFeatureKey(FEATURE_DICT[i].name) === k) return i;
//   }
//   for (let i = 0; i < FEATURE_DICT.length; i++) {
//     const dk = normFeatureKey(FEATURE_DICT[i].name);
//     if (dk.length >= 8 && (k.includes(dk) || dk.includes(k))) return i;
//   }
//   return null;
// }

// function formatProfileFieldDisplay(idx: number, raw: string): string {
//   if (raw === "") return "—";
//   const f = FEATURE_DICT[idx];
//   if (f.type === "select" && f.options) {
//     const n = parseInt(raw, 10);
//     if (!Number.isNaN(n) && f.options[n as keyof typeof f.options] != null) {
//       return String(f.options[n as keyof typeof f.options]);
//     }
//   }
//   return raw;
// }

// function buildCounselorGuidance(
//   inputs: string[],
//   p: CounselorPredictions,
//   driversSorted: { name: string; value: number | string }[]
// ) {
//   const pdfBullets: string[] = [];
//   const profileAlerts: { title: string; body: string; tone: "bad" | "warn" | "ok" }[] = [];

//   const debtor = inputs[15] === "1";
//   const sem1 = parseFloat(inputs[25] || "");
//   const approved1 = parseFloat(inputs[24] || "");
//   const enrolled1 = parseFloat(inputs[22] || "");
//   const evals1 = parseFloat(inputs[23] || "");
//   const noEval = parseFloat(inputs[26] || "");
//   const scholarship = inputs[18] === "1";
//   const displaced = inputs[13] === "1";
//   const specialNeeds = inputs[14] === "1";

//   if (debtor) {
//     profileAlerts.push({
//       title: "Debtor",
//       body: "Institutional debt is set. Connect with the bursar / financial office before holds block progress.",
//       tone: "bad",
//     });
//     pdfBullets.push("Profile: debtor flag — coordinate payment plan or aid.");
//   }
//   if (inputs[16] === "0") {
//     profileAlerts.push({
//       title: "Tuition not up to date",
//       body: "Fees are not recorded as current — a common driver of withdrawal even when grades are middling.",
//       tone: "bad",
//     });
//     pdfBullets.push("Profile: tuition not up to date — verify payment status.");
//   }
//   if (!Number.isNaN(sem1) && sem1 > 0 && sem1 < 10) {
//     profileAlerts.push({
//       title: "CU 1st Sem Grade",
//       body: `Average ${sem1.toFixed(1)}/20 is under a typical pass line — academic advising and tutoring should lead.`,
//       tone: "bad",
//     });
//     pdfBullets.push(`Profile: 1st-semester average ${sem1.toFixed(1)}/20 — academic support priority.`);
//   }
//   if (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(approved1) && approved1 / enrolled1 < 0.5) {
//     profileAlerts.push({
//       title: "Low pass rate (1st sem)",
//       body: `Only ${approved1.toFixed(0)} of ${enrolled1.toFixed(0)} enrolled units approved — credit accumulation at risk.`,
//       tone: "warn",
//     });
//     pdfBullets.push("Profile: low first-semester approval vs enrollment.");
//   }
//   if (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(evals1) && evals1 / enrolled1 < 0.55) {
//     profileAlerts.push({
//       title: "Thin evaluations (1st sem)",
//       body: "Few evaluations relative to enrolled units — check attendance and assessment participation.",
//       tone: "warn",
//     });
//     pdfBullets.push("Profile: thin evaluation participation in semester 1.");
//   }
//   if (!Number.isNaN(noEval) && noEval >= 2) {
//     profileAlerts.push({
//       title: "Units without evaluations",
//       body: `${noEval.toFixed(0)} first-semester units lack evaluations — disengagement can hide until late.`,
//       tone: "warn",
//     });
//     pdfBullets.push("Profile: multiple units without evaluations.");
//   }
//   if (!scholarship && debtor) {
//     profileAlerts.push({
//       title: "Debt without scholarship",
//       body: "No scholarship combined with debtor status increases exposure to financial shock.",
//       tone: "warn",
//     });
//     pdfBullets.push("Profile: debtor and no scholarship.");
//   }
//   if (displaced) {
//     profileAlerts.push({
//       title: "Displaced",
//       body: "Living away from home support networks can add stress not visible in grades alone.",
//       tone: "warn",
//     });
//   }
//   if (specialNeeds) {
//     profileAlerts.push({
//       title: "Educational special needs",
//       body: "Ensure accommodations are active and staff are aware — barriers can compound other risks.",
//       tone: "warn",
//     });
//   }

//   if (profileAlerts.length === 0) {
//     profileAlerts.push({
//       title: "No extreme profile flags",
//       body: `No debtor/tuition red flags or failing 1st-semester average from the fields we scan. Overview risk score is ${(p.rfConfidence * 100).toFixed(0)}% (normalized).`,
//       tone: "ok",
//     });
//     pdfBullets.push("No high-priority profile alerts from scanned fields; monitor holistically.");
//   }

//   const modelSummary = [
//     {
//       label: "Random Forest (Objective 1)",
//       text: `${p.rfVerdict || "—"} · normalized dropout-oriented score ${(p.rfConfidence * 100).toFixed(0)}%`,
//     },
//     {
//       label: "Balanced RF (Objective 3)",
//       text: `${p.rfBalVerdict || "—"} · strict-aligned score ${(p.rfBalConfidence * 100).toFixed(0)}%`,
//     },
//     {
//       label: "Logistic (Objective 5)",
//       text: `Early-warning score ${(p.logisticConfidence * 100).toFixed(0)}% (50% threshold in UI)`,
//     },
//   ];
//   pdfBullets.push(
//     `Models: RF ${p.rfVerdict || "N/A"} (${(p.rfConfidence * 100).toFixed(0)}%); strict RF ${p.rfBalVerdict || "N/A"}; logistic ${(p.logisticConfidence * 100).toFixed(0)}%.`
//   );

//   const interventions: string[] = [];
//   if (debtor || inputs[16] === "0") {
//     interventions.push("Financial aid / bursar: payment plan, emergency fund eligibility, hold review.");
//   }
//   if (!Number.isNaN(sem1) && sem1 > 0 && sem1 < 10) {
//     interventions.push("Academic: advising, tutoring, and course-load review for semester 1.");
//   }
//   if (
//     (!Number.isNaN(noEval) && noEval >= 2) ||
//     (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(evals1) && evals1 / enrolled1 < 0.55)
//   ) {
//     interventions.push("Engagement: confirm attendance and evaluation completion with instructors.");
//   }
//   if (interventions.length === 0) {
//     interventions.push("General: brief wellness check-in; confirm data accuracy in SIS.");
//   }
//   interventions.forEach((x) => pdfBullets.push(`Action: ${x}`));

//   const importanceTop = driversSorted.slice(0, 10).map((d) => ({
//     name: d.name,
//     value: Number(d.value),
//     idx: featureIndexForImportanceName(d.name),
//   }));

//   return { profileAlerts, modelSummary, interventions, importanceTop, pdfBullets };
// }

// function Objective4GuidancePanel({
//   isAnalyzed,
//   inputs,
//   predictions,
//   driversSorted,
// }: {
//   isAnalyzed: boolean;
//   inputs: string[];
//   predictions: CounselorPredictions;
//   driversSorted: { name: string; value: number | string }[];
// }) {
//   const g = useMemo(
//     () => buildCounselorGuidance(inputs, predictions, driversSorted),
//     [inputs, predictions, driversSorted]
//   );

//   const maxImp = useMemo(() => {
//     const v = g.importanceTop.map((r) => r.value);
//     return Math.max(1, ...v);
//   }, [g.importanceTop]);

//   if (!isAnalyzed) {
//     return (
//       <div className="rounded-3xl border border-dashed border-slate-600 bg-slate-900/30 p-12 text-center text-sm text-slate-500">
//         Build and analyze a profile in the Profile tab to see tailored guidance and feature importance.
//       </div>
//     );
//   }

//   const toneBorder = (t: "bad" | "warn" | "ok") =>
//     t === "bad"
//       ? "border-rose-500/30 bg-rose-950/15"
//       : t === "warn"
//         ? "border-amber-500/25 bg-amber-950/10"
//         : "border-emerald-500/20 bg-emerald-950/10";

//   return (
//     <div className="space-y-6">
//       <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//         <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400">
//           <BrainCircuit className="h-4 w-4" />
//           Model readouts (this student)
//         </div>
//         <ul className="space-y-3">
//           {g.modelSummary.map((row) => (
//             <li key={row.label} className="rounded-xl border border-slate-700/80 bg-slate-950/50 px-4 py-3 text-sm">
//               <span className="font-bold text-white">{row.label}</span>
//               <p className="mt-1 text-slate-400">{row.text}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//         <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
//           <ClipboardList className="h-4 w-4 text-amber-400" />
//           Profile-based messages
//         </div>
//         <p className="mb-4 text-xs text-slate-500">
//           Generated from your inputs (finance, semester 1 engagement, grades). Updates automatically when the profile changes.
//         </p>
//         <ul className="space-y-3">
//           {g.profileAlerts.map((a) => (
//             <li key={a.title} className={`rounded-xl border px-4 py-3 text-sm ${toneBorder(a.tone)}`}>
//               <span className="font-bold text-white">{a.title}</span>
//               <p className="mt-1 text-slate-400">{a.body}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/15 p-6 md:p-8">
//         <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300">
//           <ListChecks className="h-4 w-4" />
//           Suggested actions
//         </div>
//         <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
//           {g.interventions.map((line, i) => (
//             <li key={i} className="pl-1 marker:font-semibold marker:text-indigo-400">
//               {line}
//             </li>
//           ))}
//         </ol>
//       </div>

//       <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//         <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
//           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
//             <BarChart3 className="h-4 w-4 text-amber-400" />
//             Global feature importance (Random Forest)
//           </div>
//           <span className="text-[10px] text-slate-600">Cohort-level; same source as Objective 2</span>
//         </div>
//         <p className="mb-4 text-xs text-slate-500">
//           Top drivers across the dataset. &quot;Your profile&quot; shows this student&apos;s value when the field matches.
//         </p>
//         {g.importanceTop.length === 0 ? (
//           <p className="text-sm text-slate-500">Load the backend and open Objective 2 once — importance list is empty.</p>
//         ) : (
//           <ul className="space-y-3">
//             {g.importanceTop.map((row, i) => {
//               const pct = (row.value / maxImp) * 100;
//               const your =
//                 row.idx !== null ? formatProfileFieldDisplay(row.idx, inputs[row.idx] ?? "") : null;
//               const label = row.idx !== null ? FEATURE_DICT[row.idx].name : row.name;
//               return (
//                 <li key={`${row.name}-${i}`} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
//                   <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
//                     <span className="font-semibold text-slate-200">{label}</span>
//                     <span className="tabular-nums text-xs font-bold text-amber-200/90">{row.value.toFixed(1)}%</span>
//                   </div>
//                   {your != null && (
//                     <p className="mb-2 text-[11px] text-slate-500">
//                       Your profile: <span className="font-medium text-slate-400">{your}</span>
//                     </p>
//                   )}
//                   <div className="h-2 overflow-hidden rounded-full bg-slate-800">
//                     <div
//                       className={`h-full rounded-full ${isFinancialDriverName(label) ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-indigo-500 to-violet-500"}`}
//                       style={{ width: `${pct}%` }}
//                     />
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// function Objective3InsightsPanel({
//   predictions,
//   inputs,
// }: {
//   predictions: PredictionsForStrict;
//   inputs: string[];
// }) {
//   const ctx = useMemo(() => buildStrictClassificationContext(predictions, inputs), [predictions, inputs]);

//   const bandStyles =
//     ctx.riskBand === "critical"
//       ? "border-rose-500/30 bg-rose-950/20 text-rose-200"
//       : ctx.riskBand === "watch"
//         ? "border-amber-500/30 bg-amber-950/20 text-amber-200"
//         : ctx.riskBand === "clear"
//           ? "border-emerald-500/25 bg-emerald-950/15 text-emerald-200"
//           : "border-slate-600/50 bg-slate-900/40 text-slate-300";

//   return (
//     <div className="grid gap-6 lg:grid-cols-2">
//       <div className="space-y-6">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <BarChart3 className="h-4 w-4 text-rose-400" />
//             Risk scores side by side
//           </div>
//           <p className="mb-6 text-sm text-slate-400">
//             Same student, two Random Forest variants. “Strict” uses class balancing to reduce missed at-risk students;
//             values are aligned risk scores (higher = more dropout-oriented), not probabilities calibrated to your campus.
//           </p>
//           <div className="space-y-5">
//             <div>
//               <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
//                 <span>Objective 1 · Standard RF</span>
//                 <span className="tabular-nums text-slate-200">{(ctx.rf * 100).toFixed(0)}%</span>
//               </div>
//               <div className="h-3 overflow-hidden rounded-full bg-slate-800">
//                 <div
//                   className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500"
//                   style={{ width: `${Math.min(100, ctx.rf * 100)}%` }}
//                 />
//               </div>
//               <p className="mt-1 text-[11px] text-slate-500">
//                 Verdict:{" "}
//                 <span className="font-semibold text-slate-300">
//                   {predictions.rfVerdict || "—"}
//                 </span>
//               </p>
//             </div>
//             <div>
//               <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
//                 <span>Objective 3 · Balanced RF</span>
//                 <span className="tabular-nums text-slate-200">{(ctx.bal * 100).toFixed(0)}%</span>
//               </div>
//               <div className="h-3 overflow-hidden rounded-full bg-slate-800">
//                 <div
//                   className="h-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500 transition-all duration-500"
//                   style={{ width: `${Math.min(100, ctx.bal * 100)}%` }}
//                 />
//               </div>
//               <p className="mt-1 text-[11px] text-slate-500">
//                 Verdict:{" "}
//                 <span className="font-semibold text-slate-300">
//                   {predictions.rfBalVerdict || "—"}
//                 </span>
//               </p>
//             </div>
//             <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
//               <span className="text-xs font-semibold text-slate-500">Absolute gap</span>
//               <span className="text-sm font-black tabular-nums text-white">{(ctx.delta * 100).toFixed(1)} pts</span>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2">
//             <GitCompare className="h-5 w-5 shrink-0 text-sky-400" />
//             <h3 className="text-base font-bold text-white">{ctx.crossModelTitle}</h3>
//           </div>
//           <p className="text-sm leading-relaxed text-slate-400">{ctx.crossModelBody}</p>
//         </div>

//         {ctx.logTension && (
//           <div className="rounded-3xl border border-orange-500/25 bg-orange-950/20 p-6 md:p-8">
//             <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-300">
//               <AlertTriangle className="h-4 w-4" />
//               Cross-check with Objective 5
//             </div>
//             <p className="text-sm leading-relaxed text-orange-100/80">{ctx.logTension}</p>
//           </div>
//         )}
//       </div>

//       <div className="space-y-6">
//         <div className={`rounded-3xl border p-6 md:p-8 ${bandStyles}`}>
//           <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Operational band</p>
//           <p className="mt-2 text-xl font-black capitalize text-white">
//             {ctx.riskBand === "critical"
//               ? "Critical — escalate"
//               : ctx.riskBand === "watch"
//                 ? "Watch — proactive touchpoint"
//                 : ctx.riskBand === "clear"
//                   ? "Clear — routine monitoring"
//                   : "Standard — no automatic escalation"}
//           </p>
//           <p className="mt-3 text-sm leading-relaxed opacity-90">
//             {ctx.riskBand === "critical"
//               ? "Strict-aligned risk is above the UI alert threshold (60%). Treat as a retention workflow trigger unless you have a documented override."
//               : ctx.riskBand === "watch"
//                 ? "Between ~45% and 60%: models are uncertain. Good window for low-cost verification of finance and grades before midterm."
//                 : ctx.riskBand === "clear"
//                   ? "Strict score is relatively low; combine with registrar and faculty notes rather than model alone."
//                   : "Middle range—neither the loudest alert nor the quietest; use cohort norms and local policy."}
//           </p>
//         </div>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <Layers className="h-4 w-4 text-indigo-400" />
//             Why “balanced” exists
//           </div>
//           <p className="text-sm leading-relaxed text-slate-400">
//             Standard classifiers often under-predict minority outcomes when dropouts are fewer than graduates. Training with
//             class rebalancing (or similar) pushes the forest to{" "}
//             <strong className="text-slate-300">miss fewer true at-risk students</strong>, usually at the cost of more
//             false alarms. Objective 3 is your{" "}
//             <strong className="text-slate-300">safety-net read</strong>, not a replacement for Objective 1.
//           </p>
//         </div>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <ClipboardList className="h-4 w-4 text-amber-400" />
//             Signals from this profile (form)
//           </div>
//           {ctx.profileSignals.length === 0 ? (
//             <p className="text-sm text-slate-500">
//               No high-priority combinations detected from the fields we scan (debt, tuition, Semester‑1 grades, pass rate,
//               unevaluated units). That does not rule out risk—models use all 36 features.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {ctx.profileSignals.map((s) => (
//                 <li
//                   key={s.label}
//                   className={`rounded-xl border px-4 py-3 text-sm ${
//                     s.tier === "high"
//                       ? "border-rose-500/25 bg-rose-950/15 text-slate-300"
//                       : "border-slate-700 bg-slate-950/50 text-slate-400"
//                   }`}
//                 >
//                   <span className="font-bold text-white">{s.label}</span>
//                   <span className="mt-1 block text-xs leading-relaxed opacity-90">{s.detail}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/20 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-bold text-indigo-300">
//             <ListChecks className="h-4 w-4" />
//             Suggested workflow
//           </div>
//           <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-400">
//             {ctx.workflowSteps.map((step, i) => (
//               <li key={i} className="pl-1 marker:font-bold marker:text-indigo-400">
//                 {step}
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// }

// type PredictionsForEarly = {
//   logisticConfidence: number;
//   rfConfidence: number;
//   rfVerdict: string;
// };

// type LensRow = { label: string; value: string; detail: string; tone: "ok" | "warn" | "bad" | "neutral" };

// function buildEarlyWarningContext(predictions: PredictionsForEarly, inputs: string[]) {
//   const log = predictions.logisticConfidence;
//   const rf = predictions.rfConfidence;
//   const rows: LensRow[] = [];

//   const g = parseFloat(inputs[25] || "");
//   rows.push({
//     label: "1st semester average grade",
//     value: inputs[25] === "" ? "—" : `${Number.isNaN(g) ? inputs[25] : g}/20`,
//     detail: "Core early academic momentum signal (typical pass benchmark ~10/20).",
//     tone:
//       inputs[25] === "" || Number.isNaN(g)
//         ? "neutral"
//         : g < 10
//           ? "bad"
//           : g < 12
//             ? "warn"
//             : "ok",
//   });

//   const enrolled1 = parseFloat(inputs[22] || "");
//   const evals1 = parseFloat(inputs[23] || "");
//   const approved1 = parseFloat(inputs[24] || "");
//   const noEval1 = parseFloat(inputs[26] || "");

//   rows.push({
//     label: "1st sem enrolled vs evaluations",
//     value:
//       inputs[22] === "" || inputs[23] === ""
//         ? "—"
//         : `${enrolled1.toFixed(0)} enrolled · ${evals1.toFixed(0)} evals`,
//     detail: "Participation in assessments—lags here often precede visible grade drops.",
//     tone:
//       Number.isNaN(enrolled1) || enrolled1 <= 0 || Number.isNaN(evals1)
//         ? "neutral"
//         : evals1 / enrolled1 < 0.5
//           ? "bad"
//           : evals1 / enrolled1 < 0.75
//             ? "warn"
//             : "ok",
//   });

//   rows.push({
//     label: "1st sem approved units",
//     value: inputs[24] === "" ? "—" : (Number.isNaN(approved1) ? inputs[24] : approved1.toFixed(0)),
//     detail: "Credit velocity in the opening term—low approval counts compound risk.",
//     tone:
//       inputs[24] === "" || Number.isNaN(approved1)
//         ? "neutral"
//         : Number.isNaN(enrolled1) || enrolled1 <= 0
//           ? "neutral"
//           : approved1 / enrolled1 < 0.4
//             ? "bad"
//             : approved1 / enrolled1 < 0.65
//               ? "warn"
//               : "ok",
//   });

//   rows.push({
//     label: "Courses without evaluations (1st sem)",
//     value: inputs[26] === "" ? "—" : (Number.isNaN(noEval1) ? inputs[26] : noEval1.toFixed(0)),
//     detail: "Silent friction: missing attempts can mean disengagement before failure posts.",
//     tone:
//       inputs[26] === "" || Number.isNaN(noEval1)
//         ? "neutral"
//         : noEval1 >= 3
//           ? "bad"
//           : noEval1 >= 1
//             ? "warn"
//             : "ok",
//   });

//   let crossModel = "";
//   if (log > 0.55 && rf < 0.45) {
//     crossModel =
//       "Semester‑1 logistic stress is elevated while the overview Random Forest score is calmer. That is consistent with a lightweight early-warning lens that reacts to first-term momentum before the full 36-feature forest moves.";
//   } else if (log <= 0.4 && rf > 0.55) {
//     crossModel =
//       "Overview risk is higher than the Semester‑1 logistic read. Later-term fields, finances, or interactions may be driving the forest—use Objective 2 to see global drivers.";
//   } else if (log > 0.5 && rf > 0.5) {
//     crossModel =
//       "Both the early logistic view and the overview forest lean toward risk—prioritize a coordinated outreach rather than waiting for another term.";
//   } else {
//     crossModel =
//       "Early-term and overview signals are relatively aligned on the low side here; still validate attendance and bursar data outside this model.";
//   }

//   const deployBullets = [
//     "Logistic regression is fast, stable, and easy to audit—ideal for batch scoring at registration or week 4.",
//     "Research prototypes pair this with RFE / LightGBM on a reduced feature set; the UI highlights the same spirit: a thin Semester‑1 slice you can explain to faculty.",
//     "Deploy behind a fixed threshold (here: 50% on the normalized score) and recalibrate on your campus hold-out set.",
//   ];

//   return { rows, crossModel, log, rf, deployBullets };
// }

// function Objective5InsightsPanel({
//   predictions,
//   inputs,
// }: {
//   predictions: PredictionsForEarly;
//   inputs: string[];
// }) {
//   const ctx = useMemo(() => buildEarlyWarningContext(predictions, inputs), [predictions, inputs]);

//   const toneRing = (t: LensRow["tone"]) =>
//     t === "bad"
//       ? "border-rose-500/40 bg-rose-950/20"
//       : t === "warn"
//         ? "border-amber-500/35 bg-amber-950/15"
//         : t === "ok"
//           ? "border-emerald-500/30 bg-emerald-950/15"
//           : "border-slate-700 bg-slate-950/40";

//   return (
//     <div className="grid gap-6 lg:grid-cols-2">
//       <div className="space-y-6">
//         <div className="rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-950/30 to-slate-950 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-orange-300/90">
//             <SlidersHorizontal className="h-4 w-4" />
//             Lightweight early warning (design intent)
//           </div>
//           <p className="text-sm leading-relaxed text-slate-400">
//             Objective 5 targets a <strong className="text-slate-200">stable, deployable</strong> read: a{" "}
//             <strong className="text-slate-200">reduced Semester‑1 feature lens</strong> analogous to pipelines that use{" "}
//             <strong className="text-slate-200">RFE</strong> or gradient boosting on a short predictor list. The live API still
//             receives all fields for compatibility, but the <strong className="text-slate-200">logistic model is interpreted
//             here as an early-term momentum index</strong>—not a full causal model.
//           </p>
//         </div>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <Activity className="h-4 w-4 text-orange-400" />
//             Critical Semester‑1 predictors (form lens)
//           </div>
//           <p className="mb-5 text-xs text-slate-500">
//             Traffic lights are heuristics on the fields most aligned with “reduced feature” early warning—not the model’s
//             internal coefficients.
//           </p>
//           <ul className="space-y-3">
//             {ctx.rows.map((row) => (
//               <li key={row.label} className={`rounded-2xl border p-4 ${toneRing(row.tone)}`}>
//                 <div className="flex flex-wrap items-start justify-between gap-2">
//                   <span className="font-bold text-white">{row.label}</span>
//                   <span className="font-mono text-sm font-semibold tabular-nums text-slate-200">{row.value}</span>
//                 </div>
//                 <p className="mt-2 text-xs leading-relaxed text-slate-400">{row.detail}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <GitCompare className="h-4 w-4 text-sky-400" />
//             Versus Objective 1 (overview RF)
//           </div>
//           <p className="text-sm leading-relaxed text-slate-400">{ctx.crossModel}</p>
//           <div className="mt-5 grid grid-cols-2 gap-3">
//             <div className="rounded-xl border border-orange-500/20 bg-orange-950/20 px-4 py-3 text-center">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80">Logistic (Obj 5)</p>
//               <p className="mt-1 text-2xl font-black tabular-nums text-white">{(ctx.log * 100).toFixed(0)}%</p>
//             </div>
//             <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 px-4 py-3 text-center">
//               <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/80">Standard RF (Obj 1)</p>
//               <p className="mt-1 text-2xl font-black tabular-nums text-white">{(ctx.rf * 100).toFixed(0)}%</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//           <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
//             <Package className="h-4 w-4 text-emerald-400" />
//             Deployment &amp; operations
//           </div>
//           <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
//             {ctx.deployBullets.map((b) => (
//               <li key={b} className="flex gap-3">
//                 <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80" />
//                 <span>{b}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-3xl border border-dashed border-orange-500/30 bg-orange-950/10 p-6">
//           <p className="text-xs font-bold uppercase tracking-wider text-orange-200/90">Counselor note</p>
//           <p className="mt-2 text-sm text-orange-100/75">
//             If this objective fires but grades look “fine,” pull attendance and LMS activity where available—those channels
//             often move before the next grade snapshot, matching the spirit of a <strong className="text-orange-100">lightweight
//             sentinel</strong> rather than a full diagnostic workup.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// type PredictionsForBehavior = {
//   kmeansCluster: string;
//   rfConfidence: number;
//   rfVerdict: string;
// };

// type SilentDropoutFactor = {
//   label: string;
//   detail: string;
//   tags: ("Profile" | "K-Means" | "RF")[];
// };

// function buildSilentDropoutContext(
//   predictions: PredictionsForBehavior,
//   inputs: string[],
//   clusterInfoMap: Record<string, { name: string; description: string; traits: string[] }>
// ) {
//   const cID = predictions.kmeansCluster.split(" ")[1] ?? "";
//   const info = clusterInfoMap[cID] ?? { name: "Pending", description: "Run analysis to load cluster copy.", traits: [] as string[] };

//   const grade = parseFloat(inputs[25] || "");
//   const enrolled1 = parseFloat(inputs[22] || "");
//   const evals1 = parseFloat(inputs[23] || "");
//   const noEval1 = parseFloat(inputs[26] || "");

//   const debtor = inputs[15] === "1";
//   const tuitionLate = inputs[16] === "0";
//   const displaced = inputs[13] === "1";
//   const international = inputs[20] === "1";

//   const unemp = parseFloat(inputs[33] || "");
//   const infl = parseFloat(inputs[34] || "");
//   const gdp = parseFloat(inputs[35] || "");

//   const hasGrade = inputs[25] !== "" && !Number.isNaN(grade);
//   const explicitAcademicFailure = hasGrade && grade > 0 && grade < 10;
//   const notFailingOnPaper = !explicitAcademicFailure;

//   const thinEvals =
//     !Number.isNaN(enrolled1) &&
//     enrolled1 > 0 &&
//     !Number.isNaN(evals1) &&
//     evals1 / enrolled1 < 0.55;
//   const severalNoEval = !Number.isNaN(noEval1) && noEval1 >= 2;

//   const rfDropout = predictions.rfVerdict === "Dropout Risk";
//   const highDisengagementCluster = cID === "0";

//   const factors: SilentDropoutFactor[] = [];

//   if (explicitAcademicFailure) {
//     factors.push({
//       label: "CU 1st Sem Grade",
//       tags: ["Profile"],
//       detail: `Average ${grade.toFixed(1)}/20 is below a typical pass line — this is direct academic strain, not a silent-only story.`,
//     });
//   }

//   if (cID !== "") {
//     factors.push({
//       label: "K-Means behavior cluster",
//       tags: ["K-Means"],
//       detail:
//         highDisengagementCluster
//           ? `Cluster ${cID} — “${info.name}”. The model groups this student with higher disengagement / friction patterns.`
//           : `Cluster ${cID} — “${info.name}”. Structural neighborhood from unsupervised learning (not a grade by itself).`,
//     });
//   }

//   if (highDisengagementCluster && !rfDropout && notFailingOnPaper) {
//     factors.push({
//       label: "Random Forest (Objective 1)",
//       tags: ["RF", "K-Means"],
//       detail:
//         "RF does not flag Dropout Risk, but K-Means is in the high-disengagement cluster — typical place to check silent drivers (tuition/debt, attendance, withdrawal intent) before grades collapse.",
//     });
//   } else if (rfDropout && !highDisengagementCluster) {
//     factors.push({
//       label: "Random Forest (Objective 1)",
//       tags: ["RF"],
//       detail:
//         "RF flags Dropout Risk while K-Means is not the high-disengagement segment — supervised outcome risk outweighs this cluster persona.",
//     });
//   } else if (rfDropout && highDisengagementCluster) {
//     factors.push({
//       label: "Random Forest (Objective 1)",
//       tags: ["RF"],
//       detail: "RF flags Dropout Risk and K-Means is the high-disengagement cluster — models agree; this is not silent-only.",
//     });
//   } else {
//     factors.push({
//       label: "Random Forest (Objective 1)",
//       tags: ["RF"],
//       detail:
//         "RF is not in the Dropout Risk class and K-Means is not the high-disengagement cluster — rely on the profile factors below if they appear.",
//     });
//   }

//   if (debtor) {
//     factors.push({
//       label: "Debtor",
//       tags: ["Profile"],
//       detail: "Owing the institution can force stops or holds even when averages still look acceptable.",
//     });
//   }
//   if (tuitionLate) {
//     factors.push({
//       label: "Tuition Fees Up To Date",
//       tags: ["Profile"],
//       detail: "Tuition not recorded as current — payment friction often drives withdrawal before grades drop.",
//     });
//   }
//   if (displaced) {
//     factors.push({
//       label: "Displaced",
//       tags: ["Profile"],
//       detail: "Away-from-home status can add cost and support gaps that do not show as failing grades immediately.",
//     });
//   }
//   if (international) {
//     factors.push({
//       label: "International",
//       tags: ["Profile"],
//       detail: "Visa, fees, or admin friction can raise silent attrition risk independent of classroom averages.",
//     });
//   }

//   if (!Number.isNaN(unemp) && unemp >= 11) {
//     factors.push({
//       label: "Unemployment Rate",
//       tags: ["Profile"],
//       detail: `Local unemployment ${unemp.toFixed(1)}% is elevated — economic pressure on staying enrolled.`,
//     });
//   }
//   if (!Number.isNaN(infl) && infl >= 2.5) {
//     factors.push({
//       label: "Inflation Rate",
//       tags: ["Profile"],
//       detail: `Inflation ${infl.toFixed(1)}% is high — squeezes living costs alongside tuition.`,
//     });
//   }
//   if (!Number.isNaN(gdp) && gdp > 0 && gdp < 1.2) {
//     factors.push({
//       label: "GDP",
//       tags: ["Profile"],
//       detail: `GDP index ${gdp.toFixed(2)} is on the low side — weaker macro context for vulnerable students.`,
//     });
//   }

//   if (thinEvals && notFailingOnPaper) {
//     factors.push({
//       label: "CU 1st Sem Evaluations vs enrolled",
//       tags: ["Profile"],
//       detail: `Only ${evals1.toFixed(0)} evaluations for ${enrolled1.toFixed(0)} enrolled units — thin participation before grades may reflect stress.`,
//     });
//   }
//   if (severalNoEval && notFailingOnPaper) {
//     factors.push({
//       label: "CU 1st Sem Without Evaluations",
//       tags: ["Profile"],
//       detail: `${noEval1.toFixed(0)} units have no evaluation — risk can stay off the transcript early.`,
//     });
//   }

//   return {
//     cID,
//     info,
//     factors,
//   };
// }

// function Objective6InsightsPanel({
//   predictions,
//   inputs,
//   clusterInfoMap,
// }: {
//   predictions: PredictionsForBehavior;
//   inputs: string[];
//   clusterInfoMap: Record<string, { name: string; description: string; traits: string[] }> | Record<string, unknown>;
// }) {
//   const ctx = useMemo(
//     () =>
//       buildSilentDropoutContext(
//         predictions,
//         inputs,
//         clusterInfoMap as Record<string, { name: string; description: string; traits: string[] }>
//       ),
//     [predictions, inputs, clusterInfoMap]
//   );

//   const profileFactorCount = ctx.factors.filter((f) => f.tags.includes("Profile")).length;

//   return (
//     <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//       <div className="mb-6 flex flex-wrap items-center gap-3">
//         <ListChecks className="h-5 w-5 shrink-0 text-blue-400" strokeWidth={2} />
//         <h3 className="text-lg font-black text-white">Factors for this student</h3>
//         {profileFactorCount > 0 && (
//           <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
//             {profileFactorCount} from profile (non‑grade / economic / engagement)
//           </span>
//         )}
//       </div>
//       <p className="mb-6 text-xs text-slate-500">
//         <strong className="text-slate-400">Profile</strong> = fields you entered. <strong className="text-slate-400">K‑Means</strong> /{" "}
//         <strong className="text-slate-400">RF</strong> = model outputs.
//       </p>
//       <ul className="space-y-3">
//         {ctx.factors.map((f, idx) => (
//           <li
//             key={`silent-factor-${idx}`}
//             className="rounded-2xl border border-slate-700/90 bg-slate-950/60 px-4 py-4"
//           >
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="font-bold text-white">{f.label}</span>
//               <span className="flex flex-wrap gap-1">
//                 {f.tags.map((t) => (
//                   <span
//                     key={t}
//                     className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${
//                       t === "Profile"
//                         ? "bg-emerald-500/15 text-emerald-300"
//                         : t === "K-Means"
//                           ? "bg-blue-500/15 text-blue-300"
//                           : "bg-indigo-500/15 text-indigo-300"
//                     }`}
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </span>
//             </div>
//             <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.detail}</p>
//           </li>
//         ))}
//       </ul>
//       {ctx.factors.length === 0 && (
//         <p className="text-sm text-slate-500">Run analysis to load cluster and model outputs.</p>
//       )}
//     </div>
//   );
// }

// // --- APP COMPONENT ---
// export default function App() {
//   // Shared Input State
//   const [inputs, setInputs] = useState<string[]>(Array(36).fill(""));
//   const [isAnalyzed, setIsAnalyzed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Global Datasets
//   const [globalImportance, setGlobalImportance] = useState<any[]>([]);
//   const [clusterInfoMap, setClusterInfoMap] = useState<any>({});
//   const [importanceLoaded, setImportanceLoaded] = useState(false);
//   const [importanceError, setImportanceError] = useState<string | null>(null);
  
//   // Specific AI Outputs
//   const [predictions, setPredictions] = useState({
//     rfConfidence: 0,
//     rfVerdict: "",
//     logisticConfidence: 0,
//     kmeansCluster: "",
//     rfBalVerdict: "",
//     rfBalConfidence: 0,
//   });

//   const driversSorted = useMemo(
//     () => [...globalImportance].sort((a, b) => Number(b.value) - Number(a.value)),
//     [globalImportance]
//   );

//   const counselorPdfBullets = useMemo(() => {
//     if (!isAnalyzed) return [] as string[];
//     return buildCounselorGuidance(inputs, predictions, driversSorted).pdfBullets;
//   }, [isAnalyzed, inputs, predictions, driversSorted]);

//   const handleDownloadPdf = useCallback(() => {
//     if (!isAnalyzed) return;
//     const payload: PdfReportInput = {
//       predictions,
//       globalImportance,
//       clusterInfoMap,
//       counselorGuidanceBullets: counselorPdfBullets,
//     };
//     downloadEduGuardObjectivesPdf(payload);
//   }, [isAnalyzed, predictions, globalImportance, clusterInfoMap, counselorPdfBullets]);

//   const driverStats = useMemo(() => {
//     if (!driversSorted.length) return null;
//     const top = driversSorted[0];
//     const top3Sum = driversSorted.slice(0, 3).reduce((s, d) => s + Number(d.value), 0);
//     const finCount = driversSorted.filter((d) => isFinancialDriverName(d.name)).length;
//     return { top, top3Sum, finCount, maxVal: Number(top.value) || 1 };
//   }, [driversSorted]);

//   const pieTopDrivers = useMemo(() => {
//     const palette = ["#fbbf24", "#f59e0b", "#a78bfa", "#6366f1", "#38bdf8"];
//     return driversSorted.slice(0, 5).map((d, i) => ({
//       name: d.name.length > 20 ? `${d.name.slice(0, 18)}…` : d.name,
//       fullName: d.name,
//       value: Number(d.value),
//       fill: palette[i % palette.length],
//     }));
//   }, [driversSorted]);

//   // Load backend static data
//   useEffect(() => {
//     setImportanceLoaded(false);
//     setImportanceError(null);

//     fetch("http://127.0.0.1:5000/importance")
//       .then(async (r) => {
//         if (!r.ok) throw new Error(`HTTP ${r.status}`);
//         return r.json();
//       })
//       .then((d) => {
//         setGlobalImportance(Array.isArray(d) ? d : []);
//         setImportanceLoaded(true);
//       })
//       .catch((e) => {
//         setGlobalImportance([]);
//         setImportanceLoaded(true);
//         setImportanceError(e?.message || "Backend unavailable");
//         console.log(e);
//       });

//     fetch("http://127.0.0.1:5000/cluster-info")
//       .then((r) => r.json())
//       .then((d) => setClusterInfoMap(d))
//       .catch((e) => console.log(e));
//   }, []);

//   const loadDemoStudent = () => {
//     setInputs([
//       "1","1","3","9119","1", "1","150","1","1","1","2","2","142","0", "0","1","0","1","0","22","0",
//       "6","6","4","2","9.5","2", "6","6","2","1","10.2","2", "10.8","1.4","1.8"
//     ]);
//   };

//   const handleGlobalAnalysis = async () => {
//     setLoading(true);
//     try {
//       const payload = inputs.map(v => v === "" ? 0 : parseFloat(v));
      
//       // 1. Overall Risk (RF)
//       const overRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "rf", values: payload})}).then(r => r.json());
//       // 2. Early Warning (Logistic)
//       const trajRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "logistic", values: payload})}).then(r => r.json());
//       // 3. Behavior (KMeans)
//       const clustRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "kmeans", values: payload})}).then(r => r.json());
//       // 4. Strict At-Risk Focus (Balanced RF)
//       const atRiskRes = await fetch("http://127.0.0.1:5000/predict", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({model: "rf_bal", values: payload})}).then(r => r.json());

//       // Normalize confidence so that 100% means HIGH DROPOUT RISK natively.
//       const normalizeRisk = (res: any) => res.result === "Dropout Risk" ? (res.confidence || 0.8) : (1 - (res.confidence || 0.8));

//       setPredictions({
//         rfConfidence: normalizeRisk(overRes),
//         rfVerdict: overRes.result,
//         logisticConfidence: normalizeRisk(trajRes),
//         kmeansCluster: clustRes.result,
//         rfBalVerdict: atRiskRes.result,
//         rfBalConfidence: normalizeRisk(atRiskRes),
//       });

//       setIsAnalyzed(true);
//       setActiveTab("early_risk"); // Auto navigate to results!
//       window.scrollTo(0,0);
//     } catch(err) {
//       alert("Backend error. Are you sure app.py is running on port 5000?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Nav Item helper
//   const NavItem = ({ id, icon, label, disabled = false }: any) => {
//     return (
//       <button
//         disabled={disabled}
//         onClick={() => setActiveTab(id)}
//         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold ${
//           activeTab === id
//             ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
//             : disabled 
//               ? "opacity-40 cursor-not-allowed text-slate-500" 
//               : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           {icon} <span className="text-sm text-left">{label}</span>
//         </div>
//         {!disabled && activeTab === id && <ChevronRight className="w-4 h-4" />}
//       </button>
//     );
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="space-y-10 animate-in fade-in duration-500">
//             <div className="bg-gradient-to-br from-indigo-900/50 via-slate-800/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/20">
//               <h2 className="text-3xl font-black text-white mb-3">Student Profile Inputs</h2>
//               <p className="text-slate-300 max-w-2xl text-sm leading-relaxed mb-6">
//                 Fill in the details for a single student below. Look for the ⭐ symbol indicating high-importance variables. 
//                 Once analyzed, the results will seamlessly populate across all AI objectives in the sidebar.
//               </p>
//               <button onClick={loadDemoStudent} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-sm font-bold border border-slate-700 rounded-xl transition flex gap-2 items-center">
//                  <UserPlus size={16} /> Load Critical Demo Profile
//               </button>
//             </div>

//             <div className="space-y-12">
//               {["Academic", "Financial", "Demographic"].map((groupName) => (
//                 <div key={groupName} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 lg:p-8">
//                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-700/50 pb-3">
//                      {groupName === "Academic" && <FileText className="text-indigo-400" />}
//                      {groupName === "Financial" && <DollarSign className="text-emerald-400" />}
//                      {groupName === "Demographic" && <HeartHandshake className="text-purple-400" />}
//                      {groupName} Features
//                    </h3>
//                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
//                      {FEATURE_DICT.map((feature, idx) => {
//                        if (feature.group !== groupName) return null;
//                        return (
//                           <div key={idx} className="flex flex-col gap-1.5 group relative">
//                             <label className="text-xs font-bold text-slate-300 tracking-wide uppercase flex justify-between">
//                               <span className="flex items-center gap-1.5">
//                                 {feature.name} {feature.isStarred && <span title="High Impact Feature" className="text-amber-400 text-sm">⭐</span>}
//                               </span>
//                             </label>
//                             {feature.type === "select" ? (
//                               <select
//                                 value={inputs[idx]}
//                                 onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
//                                 className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                               >
//                                 <option value="" disabled>Select option...</option>
//                                 {Object.entries(feature.options!).map(([val, label]) => (
//                                   <option key={val} value={val}>{label}</option>
//                                 ))}
//                               </select>
//                             ) : (
//                               <input
//                                 type="number"
//                                 step="any"
//                                 value={inputs[idx]}
//                                 onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
//                                 placeholder={feature.hint || "0.00"}
//                                 className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                               />
//                             )}
//                             <p className="text-[10px] text-slate-500 font-medium pl-1">{feature.desc}</p>
//                           </div>
//                        );
//                      })}
//                    </div>
//                 </div>
//               ))}
//             </div>

//             <div className="sticky bottom-6 flex justify-center z-20">
//                <button
//                  onClick={handleGlobalAnalysis}
//                  disabled={loading}
//                  className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
//                >
//                  {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
//                  {loading ? "Analyzing Models..." : "Lock Profile & Analyze"}
//                </button>
//             </div>
//           </div>
//         );

//       case "early_risk":
//         return (
//           <div className="space-y-6 animate-in fade-in duration-500">
//              <div>
//                 <h2 className="text-3xl font-black text-white flex items-center gap-3">
//                   <Activity className="text-indigo-400" /> Objective 1: Status & Overview Risk
//                 </h2>
//                 <p className="text-slate-400 text-sm mt-1">Uses the Random Forest model acting on all 36 variables to calculate a holistic status.</p>
//              </div>
             
//              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 flex flex-col items-center">
//                  <h3 className="text-lg font-bold text-slate-300 mb-6 uppercase tracking-widest text-center">Calculated Dropout Trajectory</h3>
//                  <GaugeChart score={predictions.rfConfidence} />
                 
//                  <div className={`mt-10 p-6 w-full max-w-xl mx-auto rounded-2xl border text-center ${predictions.rfConfidence > 0.6 ? 'bg-red-950/40 border-red-800/60' : 'bg-emerald-950/40 border-emerald-800/60'}`}>
//                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Final Verdict</p>
//                     <p className={`text-3xl font-black ${predictions.rfConfidence > 0.6 ? 'text-red-400' : 'text-emerald-400'}`}>
//                       {predictions.rfVerdict === "Dropout Risk" ? "HIGH ALERT" : "TRACKING TO GRADUATE"}
//                     </p>
//                  </div>
//              </div>
//           </div>
//         );

//       case "financial":
//         return (
//           <div className="space-y-8 animate-in fade-in duration-500 h-full pb-8">
//             <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-950/50 via-slate-900/80 to-slate-950 p-8 md:p-10 shadow-[0_0_60px_-12px_rgba(245,158,11,0.15)]">
//               <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
//               <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />
//               <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//                 <div className="max-w-2xl space-y-4">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200/90">
//                     <Sparkles className="h-3.5 w-3.5 text-amber-400" />
//                     Objective 2
//                   </div>
//                   <h2 className="flex flex-wrap items-center gap-3 text-3xl font-black tracking-tight text-white md:text-4xl">
//                     <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40">
//                       <DollarSign className="h-6 w-6" strokeWidth={2.5} />
//                     </span>
//                     Underlying drivers
//                   </h2>
//                   <p className="text-base leading-relaxed text-slate-400">
//                     Global feature importance from the Random Forest model: which signals matter most across the cohort, and how strongly financial and academic factors contribute.
//                   </p>
//                 </div>
//                 {driverStats && (
//                   <div className="flex flex-wrap gap-3 lg:justify-end">
//                     <span className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300">
//                       <PieChartIcon className="h-4 w-4 text-amber-400" />
//                       Top 10 drivers
//                     </span>
//                     <span className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300">
//                       <BarChart3 className="h-4 w-4 text-indigo-400" />
//                       Live from API
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {!importanceLoaded ? (
//               <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
//                 <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-amber-500/60" />
//                 <p className="font-semibold text-slate-300">Loading driver rankings…</p>
//                 <p className="mt-2 text-sm text-slate-500">Fetching `/importance` from the Flask backend.</p>
//               </div>
//             ) : importanceError ? (
//               <div className="rounded-3xl border border-rose-500/25 bg-rose-950/15 p-10 text-center">
//                 <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-rose-400" />
//                 <p className="font-semibold text-rose-200">Objective 2 cannot load drivers.</p>
//                 <p className="mt-2 text-sm text-rose-200/70">
//                   Backend error: <span className="font-mono">{importanceError}</span>. Start `python app.py` (port 5000) and refresh.
//                 </p>
//               </div>
//             ) : !driversSorted.length ? (
//               <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
//                 <p className="font-semibold text-slate-300">No driver data returned.</p>
//                 <p className="mt-2 text-sm text-slate-500">
//                   The backend responded, but returned an empty importance list. Check that `models/rf.pkl` loaded and `/importance` returns data.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {driverStats && (
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                     <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 transition hover:border-amber-500/30">
//                       <div className="absolute right-4 top-4 rounded-lg bg-amber-500/10 p-2 text-amber-400">
//                         <TrendingUp className="h-5 w-5" />
//                       </div>
//                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Strongest signal</p>
//                       <p className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-white">{driverStats.top.name}</p>
//                       <p className="mt-4 text-4xl font-black tabular-nums text-amber-400">
//                         {Number(driverStats.top.value).toFixed(1)}
//                         <span className="ml-1 text-lg font-bold text-amber-200/60">%</span>
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">Highest relative importance in the model</p>
//                     </div>
//                     <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-950/40 to-slate-950 p-6">
//                       <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
//                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Top 3 combined</p>
//                       <p className="mt-4 text-4xl font-black tabular-nums text-indigo-300">
//                         {driverStats.top3Sum.toFixed(1)}
//                         <span className="ml-1 text-lg font-bold text-indigo-200/50">%</span>
//                       </p>
//                       <p className="mt-2 text-sm text-slate-400">Share of total importance held by the top three features</p>
//                       <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
//                         <div
//                           className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
//                           style={{ width: `${Math.min(100, driverStats.top3Sum)}%` }}
//                         />
//                       </div>
//                     </div>
//                     <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Economic / finance tags</p>
//                       <p className="mt-4 text-4xl font-black text-emerald-300">{driverStats.finCount}</p>
//                       <p className="mt-2 text-sm leading-relaxed text-slate-400">
//                         Of the top drivers, how many map to tuition, debt, scholarships, or macro indicators.
//                       </p>
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {["Tuition", "Debt", "Scholarship", "Macro"].map((tag) => (
//                           <span
//                             key={tag}
//                             className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="grid gap-6 lg:grid-cols-5">
//                   <AutomatedInsightsPanel driverStats={driverStats} driversSorted={driversSorted} />

//                   <div className="lg:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//                     <div className="mb-2 flex items-center justify-between gap-4">
//                       <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Top five mix</h3>
//                       <span className="text-xs text-slate-500">Hover segments for full names</span>
//                     </div>
//                     <div className="h-[280px] w-full md:h-[320px]">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <defs>
//                             <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
//                               <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
//                             </filter>
//                           </defs>
//                           <Pie
//                             data={pieTopDrivers}
//                             cx="50%"
//                             cy="50%"
//                             innerRadius="58%"
//                             outerRadius="82%"
//                             paddingAngle={3}
//                             dataKey="value"
//                             stroke="rgba(15,23,42,0.9)"
//                             strokeWidth={2}
//                             style={{ filter: "url(#pieShadow)" }}
//                           >
//                             {pieTopDrivers.map((entry, i) => (
//                               <RechartCell key={`pie-${i}`} fill={entry.fill} />
//                             ))}
//                           </Pie>
//                           <RechartsTooltip content={<PieDriverTooltip />} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="mt-4 flex flex-wrap justify-center gap-3 border-t border-slate-800/80 pt-4">
//                       {pieTopDrivers.map((d) => (
//                         <span
//                           key={d.fullName}
//                           className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/50 px-3 py-1 text-[11px] font-semibold text-slate-300"
//                         >
//                           <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
//                           {d.fullName.length > 24 ? `${d.fullName.slice(0, 22)}…` : d.fullName}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
//                   <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//                     <div>
//                       <h3 className="text-lg font-black text-white">Full ranking</h3>
//                       <p className="text-sm text-slate-500">Each row is scaled to the strongest driver in this view.</p>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {driversSorted.map((row, idx) => {
//                       const v = Number(row.value);
//                       const pct = driverStats ? (v / driverStats.maxVal) * 100 : 0;
//                       const fin = isFinancialDriverName(row.name);
//                       return (
//                         <div
//                           key={`${row.name}-${idx}`}
//                           className="group rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4 transition hover:border-slate-600 hover:bg-slate-900/60"
//                         >
//                           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
//                             <div className="flex shrink-0 items-center gap-3 sm:w-44">
//                               <span
//                                 className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${
//                                   idx === 0
//                                     ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950"
//                                     : "bg-slate-800 text-slate-300"
//                                 }`}
//                               >
//                                 {idx + 1}
//                               </span>
//                               <div className="min-w-0 flex-1">
//                                 <p className="truncate font-semibold text-white">{row.name}</p>
//                                 {fin && (
//                                   <span className="mt-0.5 inline-block rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
//                                     Finance-related
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="min-w-0 flex-1">
//                               <div className="mb-1 flex justify-between text-xs font-semibold">
//                                 <span className="text-slate-500">Relative strength</span>
//                                 <span className="tabular-nums text-slate-200">{v.toFixed(1)}%</span>
//                               </div>
//                               <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
//                                 <div
//                                   className={`h-full rounded-full transition-all duration-500 ${
//                                     fin
//                                       ? "bg-gradient-to-r from-amber-500 to-orange-400"
//                                       : "bg-gradient-to-r from-indigo-500 to-violet-500"
//                                   }`}
//                                   style={{ width: `${pct}%` }}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
//                   <div className="mb-6">
//                     <h3 className="text-lg font-black text-white">Comparison chart</h3>
//                     <p className="text-sm text-slate-500">Horizontal bars — amber = finance-tagged drivers, indigo = other signals.</p>
//                   </div>
//                   <div className="h-[420px] w-full md:h-[480px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart layout="vertical" data={driversSorted} margin={{ left: 8, right: 48, top: 8, bottom: 8 }}>
//                         <defs>
//                           <linearGradient id="barFin" x1="0" y1="0" x2="1" y2="0">
//                             <stop offset="0%" stopColor="#fbbf24" />
//                             <stop offset="100%" stopColor="#ea580c" />
//                           </linearGradient>
//                           <linearGradient id="barGen" x1="0" y1="0" x2="1" y2="0">
//                             <stop offset="0%" stopColor="#818cf8" />
//                             <stop offset="100%" stopColor="#4f46e5" />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
//                         <XAxis type="number" domain={[0, "dataMax"]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "#475569" }} />
//                         <YAxis
//                           dataKey="name"
//                           type="category"
//                           axisLine={false}
//                           tickLine={false}
//                           width={168}
//                           tick={{ fontSize: 11, fontWeight: 600, fill: "#e2e8f0" }}
//                         />
//                         <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(30,41,59,0.35)" }} />
//                         <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
//                           {driversSorted.map((entry, index) => (
//                             <RechartCell
//                               key={`bar-cell-${index}`}
//                               fill={isFinancialDriverName(entry.name) ? "url(#barFin)" : "url(#barGen)"}
//                             />
//                           ))}
//                           <LabelList
//                             dataKey="value"
//                             position="right"
//                             formatter={(v: unknown) => `${Number(v).toFixed(1)}%`}
//                             style={{ fill: "#cbd5e1", fontSize: 11, fontWeight: 700 }}
//                           />
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         );

//       case "at_risk":
//         return (
//           <div className="space-y-8 animate-in fade-in duration-500 pb-8">
//             <div>
//               <h2 className="flex items-center gap-3 text-3xl font-black text-white">
//                 <ShieldAlert className="text-rose-400" /> Objective 3: Strict Classification
//               </h2>
//               <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
//                 Balanced Random Forest—tuned to miss fewer at-risk students than a standard forest. Use this objective as a
//                 safety net alongside Objective 1, not as a lone decision rule.
//               </p>
//             </div>

//             <div
//               className={`rounded-[2rem] border-2 bg-gradient-to-br p-8 md:p-10 ${
//                 predictions.rfBalConfidence > 0.6
//                   ? "border-rose-800 from-rose-950/60 to-slate-900"
//                   : "border-indigo-800 from-indigo-950/60 to-slate-900"
//               }`}
//             >
//               <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
//                 <div
//                   className={`rounded-full p-6 ${
//                     predictions.rfBalConfidence > 0.6 ? "bg-rose-900/40 text-rose-500" : "bg-indigo-900/40 text-indigo-500"
//                   }`}
//                 >
//                   <Target size={64} />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">Strict model readout</p>
//                   <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
//                     <h3 className="text-4xl font-black text-white md:text-5xl">
//                       {predictions.rfBalConfidence > 0.6 ? "CRITICAL FOCUS" : "STANDARD TRACK"}
//                     </h3>
//                     <span
//                       className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
//                         predictions.rfBalVerdict === "Dropout Risk"
//                           ? "border-rose-500/40 bg-rose-950/50 text-rose-300"
//                           : "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
//                       }`}
//                     >
//                       {predictions.rfBalVerdict || "—"}
//                     </span>
//                     <span className="rounded-full border border-slate-600 bg-slate-900/60 px-3 py-1 text-xs font-black tabular-nums text-slate-300">
//                       {(predictions.rfBalConfidence * 100).toFixed(0)}% strict-aligned score
//                     </span>
//                   </div>
//                   <p className="max-w-2xl text-lg text-slate-300">
//                     {predictions.rfBalConfidence > 0.6
//                       ? "This student crosses the strict alert threshold used in this dashboard. Treat as a retention workflow trigger and validate with live records."
//                       : "This profile does not cross the strict alert threshold here. Continue to weigh Objectives 1, 5, and 6 before closing a case."}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <Objective3InsightsPanel predictions={predictions} inputs={inputs} />
//           </div>
//         );

//       case "counselor":
//         return (
//           <div className="space-y-6 animate-in fade-in duration-500 pb-8">
//             <div>
//               <h2 className="flex items-center gap-3 text-3xl font-black text-white">
//                 <BrainCircuit className="text-purple-400" /> Objective 4: Counselor guidance
//               </h2>
//               <p className="mt-2 max-w-3xl text-sm text-slate-400">
//                 One-page summary: model readouts for this student, <strong className="text-slate-300">custom messages</strong> from
//                 your inputs, suggested actions, and <strong className="text-slate-300">global Random Forest feature importance</strong>{" "}
//                 (with your values where fields match).
//               </p>
//             </div>

//             <Objective4GuidancePanel
//               isAnalyzed={isAnalyzed}
//               inputs={inputs}
//               predictions={predictions}
//               driversSorted={driversSorted}
//             />
//           </div>
//         );

//       case "early_warning":
//         return (
//           <div className="space-y-8 animate-in fade-in duration-500 pb-8">
//             <div>
//               <h2 className="flex items-center gap-3 text-3xl font-black text-white">
//                 <AlertCircle className="text-orange-400" /> Objective 5: Lightweight early warning
//               </h2>
//               <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
//                 <strong className="text-slate-300">Goal:</strong> a stable, simple signal using a{" "}
//                 <strong className="text-slate-300">reduced Semester‑1 slice</strong> of predictors—aligned with logistic /
//                 LightGBM + RFE style pipelines for easy deployment. Below, the{" "}
//                 <strong className="text-slate-300">logistic readout</strong> is unchanged; extra panels interpret it in that
//                 product sense.
//               </p>
//             </div>

//             <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
//               <div className="mx-auto max-w-2xl space-y-6 text-center">
//                 <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-900 bg-orange-950/40 px-4 py-2 text-sm font-bold text-orange-400">
//                   <Zap size={16} /> Forecasting only (ignores 2nd semester fields in interpretation)
//                 </div>

//                 <p
//                   className={`text-4xl font-black ${predictions.logisticConfidence > 0.5 ? "text-red-400" : "text-emerald-400"}`}
//                 >
//                   {predictions.logisticConfidence > 0.5
//                     ? "PREDICTING DROPOUT EVENT IN SEMESTER 2"
//                     : "TRAJECTORY IS STABLE"}
//                 </p>
//                 <p className="text-lg text-slate-400">
//                   The logistic sequence based on initial grades and enrollments indicates a{" "}
//                   <strong className="text-slate-200">{(predictions.logisticConfidence * 100).toFixed(0)}%</strong>{" "}
//                   normalized early-warning score for disengagement in the upcoming months (dashboard threshold 50%).
//                 </p>
//               </div>
//             </div>

//             <Objective5InsightsPanel predictions={predictions} inputs={inputs} />
//           </div>
//         );
        
//       case "behavior":
//         return (
//           <div className="space-y-6 animate-in fade-in duration-500 pb-8">
//             <div>
//               <h2 className="flex items-center gap-3 text-3xl font-black text-white">
//                 <Zap className="text-blue-400" /> Objective 6: Silent dropout
//               </h2>
//               <p className="mt-2 max-w-3xl text-sm text-slate-400">
//                 Disengagement without obvious failing grades. Factors = your profile (finance, engagement, macro) plus{" "}
//                 <strong className="text-slate-300">K‑Means</strong> and <strong className="text-slate-300">Random Forest</strong>{" "}
//                 (Objective 1).
//               </p>
//             </div>

//             <Objective6InsightsPanel predictions={predictions} inputs={inputs} clusterInfoMap={clusterInfoMap} />
//           </div>
//         );

//       default: return null;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#0a0f1e] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      
//       {/* Sidebar */}
//       <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/80 backdrop-blur-3xl border-r border-slate-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
//         <div className="p-6 pb-8 border-b border-slate-800">
//            <div className="flex items-center justify-between mb-2">
//              <div className="flex items-center gap-3">
//                <div className="bg-indigo-600 p-2 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">
//                  <GraduationCap size={20} className="text-white" />
//                </div>
//                <h1 className="text-xl font-black tracking-tight text-white">Edu<span className="text-indigo-400">Guard</span></h1>
//              </div>
//              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={20}/></button>
//            </div>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
//            <div>
//              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">Setup</p>
//              <div className="space-y-1">
//                <NavItem id="profile" icon={<FileText size={18}/>} label="📝 Profile Builder" />
//              </div>
//            </div>

//            <div>
//              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-3">The 6 AI Objectives</p>
//              <div className="space-y-1 relative">
//                {!isAnalyzed && (
//                  <div className="absolute inset-0 z-10 bg-slate-900/20 backdrop-blur-[2px] flex items-center justify-center rounded-xl p-4 text-center">
//                     <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 shadow-xl">Complete Profile first</span>
//                  </div>
//                )}
//                <NavItem disabled={!isAnalyzed} id="early_risk" icon={<Activity size={18}/>} label="1. Status & Overview" />
//                <NavItem disabled={!isAnalyzed} id="financial" icon={<DollarSign size={18}/>} label="2. Underlying Drivers" />
//                <NavItem disabled={!isAnalyzed} id="at_risk" icon={<ShieldAlert size={18}/>} label="3. Strict Anomalies" />
//                <NavItem disabled={!isAnalyzed} id="counselor" icon={<BrainCircuit size={18}/>} label="4. Counselor guidance" />
//                <NavItem disabled={!isAnalyzed} id="early_warning" icon={<AlertCircle size={18}/>} label="5. Early warning" />
//                <NavItem disabled={!isAnalyzed} id="behavior" icon={<Zap size={18}/>} label="6. Silent dropout" />
//              </div>
//            </div>
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 overflow-y-auto relative bg-[#0a0f1e]">
//         <button onClick={() => setSidebarOpen(true)} className={`lg:hidden fixed top-6 left-6 z-40 p-2.5 bg-slate-800 border border-slate-700 rounded-xl shadow-xl ${sidebarOpen ? "hidden" : "block"}`}>
//           <Menu size={20} />
//         </button>

//         {/* Ambient Gradient */}
//         <div className="absolute top-0 left-1/4 w-3/4 h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

//         <div className="relative z-10 mx-auto min-h-full max-w-6xl px-6 pb-24 pt-6 md:px-12 md:pt-8">
//           <div className="sticky top-0 z-30 -mx-1 mb-6 flex flex-wrap items-center justify-end gap-3 border-b border-slate-800/60 bg-[#0a0f1e]/90 px-1 py-3 backdrop-blur-md md:-mx-2 md:px-2">
//             <button
//               type="button"
//               onClick={handleDownloadPdf}
//               disabled={!isAnalyzed}
//               title={isAnalyzed ? "Download PDF summary of all six objectives" : "Analyze a profile first"}
//               className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:border-indigo-500/50 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-40"
//             >
//               <Download className="h-4 w-4 text-indigo-400" strokeWidth={2.5} />
//               Download PDF report
//             </button>
//           </div>
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }
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
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  FileText,
  Target,
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
  Download
} from "lucide-react";
import { downloadEduGuardObjectivesPdf, type PdfReportInput } from "../lib/objectivesPdf";
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

type CsvFeatureRange = {
  name: string;
  min: number;
  max: number;
  n_unique: number;
  uniques: number[] | null;
};

function formatCsvRangeNumber(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const r = Math.round(n * 10000) / 10000;
  return String(r);
}

function csvRangeBadge(stat: CsvFeatureRange | undefined): string | null {
  if (!stat || typeof stat.min !== "number" || typeof stat.max !== "number") return null;
  return `${formatCsvRangeNumber(stat.min)}–${formatCsvRangeNumber(stat.max)}`;
}

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

type SupervisedMetric = {
  name: string;
  acc: string;
  pre: string;
  rec: string;
  f1: string;
};

type UnsupervisedMetric = {
  name: string;
  silhouette: string;
  inertia: string;
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

type CounselorPredictions = {
  rfConfidence: number;
  rfVerdict: string;
  logisticConfidence: number;
  rfBalVerdict: string;
  rfBalConfidence: number;
};

function normFeatureKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function featureIndexForImportanceName(apiName: string): number | null {
  const k = normFeatureKey(apiName);
  for (let i = 0; i < FEATURE_DICT.length; i++) {
    if (normFeatureKey(FEATURE_DICT[i].name) === k) return i;
  }
  for (let i = 0; i < FEATURE_DICT.length; i++) {
    const dk = normFeatureKey(FEATURE_DICT[i].name);
    if (dk.length >= 8 && (k.includes(dk) || dk.includes(k))) return i;
  }
  return null;
}

function formatProfileFieldDisplay(idx: number, raw: string): string {
  if (raw === "") return "—";
  const f = FEATURE_DICT[idx];
  if (f.type === "select" && f.options) {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && f.options[n as keyof typeof f.options] != null) {
      return String(f.options[n as keyof typeof f.options]);
    }
  }
  return raw;
}

function buildCounselorGuidance(
  inputs: string[],
  p: CounselorPredictions,
  driversSorted: { name: string; value: number | string }[]
) {
  const pdfBullets: string[] = [];
  const profileAlerts: { title: string; body: string; tone: "bad" | "warn" | "ok" }[] = [];

  const debtor = inputs[15] === "1";
  const sem1 = parseFloat(inputs[25] || "");
  const approved1 = parseFloat(inputs[24] || "");
  const enrolled1 = parseFloat(inputs[22] || "");
  const evals1 = parseFloat(inputs[23] || "");
  const noEval = parseFloat(inputs[26] || "");
  const scholarship = inputs[18] === "1";
  const displaced = inputs[13] === "1";
  const specialNeeds = inputs[14] === "1";

  if (debtor) {
    profileAlerts.push({
      title: "Debtor",
      body: "Institutional debt is set. Connect with the bursar / financial office before holds block progress.",
      tone: "bad",
    });
    pdfBullets.push("Profile: debtor flag — coordinate payment plan or aid.");
  }
  if (inputs[16] === "0") {
    profileAlerts.push({
      title: "Tuition not up to date",
      body: "Fees are not recorded as current — a common driver of withdrawal even when grades are middling.",
      tone: "bad",
    });
    pdfBullets.push("Profile: tuition not up to date — verify payment status.");
  }
  if (!Number.isNaN(sem1) && sem1 > 0 && sem1 < 10) {
    profileAlerts.push({
      title: "CU 1st Sem Grade",
      body: `Average ${sem1.toFixed(1)}/20 is under a typical pass line — academic advising and tutoring should lead.`,
      tone: "bad",
    });
    pdfBullets.push(`Profile: 1st-semester average ${sem1.toFixed(1)}/20 — academic support priority.`);
  }
  if (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(approved1) && approved1 / enrolled1 < 0.5) {
    profileAlerts.push({
      title: "Low pass rate (1st sem)",
      body: `Only ${approved1.toFixed(0)} of ${enrolled1.toFixed(0)} enrolled units approved — credit accumulation at risk.`,
      tone: "warn",
    });
    pdfBullets.push("Profile: low first-semester approval vs enrollment.");
  }
  if (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(evals1) && evals1 / enrolled1 < 0.55) {
    profileAlerts.push({
      title: "Thin evaluations (1st sem)",
      body: "Few evaluations relative to enrolled units — check attendance and assessment participation.",
      tone: "warn",
    });
    pdfBullets.push("Profile: thin evaluation participation in semester 1.");
  }
  if (!Number.isNaN(noEval) && noEval >= 2) {
    profileAlerts.push({
      title: "Units without evaluations",
      body: `${noEval.toFixed(0)} first-semester units lack evaluations — disengagement can hide until late.`,
      tone: "warn",
    });
    pdfBullets.push("Profile: multiple units without evaluations.");
  }
  if (!scholarship && debtor) {
    profileAlerts.push({
      title: "Debt without scholarship",
      body: "No scholarship combined with debtor status increases exposure to financial shock.",
      tone: "warn",
    });
    pdfBullets.push("Profile: debtor and no scholarship.");
  }
  if (displaced) {
    profileAlerts.push({
      title: "Displaced",
      body: "Living away from home support networks can add stress not visible in grades alone.",
      tone: "warn",
    });
  }
  if (specialNeeds) {
    profileAlerts.push({
      title: "Educational special needs",
      body: "Ensure accommodations are active and staff are aware — barriers can compound other risks.",
      tone: "warn",
    });
  }

  if (profileAlerts.length === 0) {
    profileAlerts.push({
      title: "No extreme profile flags",
      body: `No debtor/tuition red flags or failing 1st-semester average from the fields we scan. Overview risk score is ${(p.rfConfidence * 100).toFixed(0)}% (normalized).`,
      tone: "ok",
    });
    pdfBullets.push("No high-priority profile alerts from scanned fields; monitor holistically.");
  }

  const modelSummary = [
    {
      label: "Random Forest (Objective 1)",
      text: `${p.rfVerdict || "—"} · normalized dropout-oriented score ${(p.rfConfidence * 100).toFixed(0)}%`,
    },
    {
      label: "Balanced RF (Objective 3)",
      text: `${p.rfBalVerdict || "—"} · strict-aligned score ${(p.rfBalConfidence * 100).toFixed(0)}%`,
    },
    {
      label: "Logistic (Objective 5)",
      text: `Early-warning score ${(p.logisticConfidence * 100).toFixed(0)}% (50% threshold in UI)`,
    },
  ];
  pdfBullets.push(
    `Models: RF ${p.rfVerdict || "N/A"} (${(p.rfConfidence * 100).toFixed(0)}%); strict RF ${p.rfBalVerdict || "N/A"}; logistic ${(p.logisticConfidence * 100).toFixed(0)}%.`
  );

  const interventions: string[] = [];
  if (debtor || inputs[16] === "0") {
    interventions.push("Financial aid / bursar: payment plan, emergency fund eligibility, hold review.");
  }
  if (!Number.isNaN(sem1) && sem1 > 0 && sem1 < 10) {
    interventions.push("Academic: advising, tutoring, and course-load review for semester 1.");
  }
  if (
    (!Number.isNaN(noEval) && noEval >= 2) ||
    (!Number.isNaN(enrolled1) && enrolled1 > 0 && !Number.isNaN(evals1) && evals1 / enrolled1 < 0.55)
  ) {
    interventions.push("Engagement: confirm attendance and evaluation completion with instructors.");
  }
  if (interventions.length === 0) {
    interventions.push("General: brief wellness check-in; confirm data accuracy in SIS.");
  }
  interventions.forEach((x) => pdfBullets.push(`Action: ${x}`));

  const importanceTop = driversSorted.slice(0, 10).map((d) => ({
    name: d.name,
    value: Number(d.value),
    idx: featureIndexForImportanceName(d.name),
  }));

  return { profileAlerts, modelSummary, interventions, importanceTop, pdfBullets };
}

function Objective4GuidancePanel({
  isAnalyzed,
  inputs,
  predictions,
  driversSorted,
}: {
  isAnalyzed: boolean;
  inputs: string[];
  predictions: CounselorPredictions;
  driversSorted: { name: string; value: number | string }[];
}) {
  const g = useMemo(
    () => buildCounselorGuidance(inputs, predictions, driversSorted),
    [inputs, predictions, driversSorted]
  );

  const maxImp = useMemo(() => {
    const v = g.importanceTop.map((r) => r.value);
    return Math.max(1, ...v);
  }, [g.importanceTop]);

  if (!isAnalyzed) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-600 bg-slate-900/30 p-12 text-center text-sm text-slate-500">
        Build and analyze a profile in the Profile tab to see tailored guidance and feature importance.
      </div>
    );
  }

  const toneBorder = (t: "bad" | "warn" | "ok") =>
    t === "bad"
      ? "border-rose-500/30 bg-rose-950/15"
      : t === "warn"
        ? "border-amber-500/25 bg-amber-950/10"
        : "border-emerald-500/20 bg-emerald-950/10";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400">
          <BrainCircuit className="h-4 w-4" />
          Model readouts (this student)
        </div>
        <ul className="space-y-3">
          {g.modelSummary.map((row) => (
            <li key={row.label} className="rounded-xl border border-slate-700/80 bg-slate-950/50 px-4 py-3 text-sm">
              <span className="font-bold text-white">{row.label}</span>
              <p className="mt-1 text-slate-400">{row.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
          <ClipboardList className="h-4 w-4 text-amber-400" />
          Profile-based messages
        </div>
        <p className="mb-4 text-xs text-slate-500">
          Generated from your inputs (finance, semester 1 engagement, grades). Updates automatically when the profile changes.
        </p>
        <ul className="space-y-3">
          {g.profileAlerts.map((a) => (
            <li key={a.title} className={`rounded-xl border px-4 py-3 text-sm ${toneBorder(a.tone)}`}>
              <span className="font-bold text-white">{a.title}</span>
              <p className="mt-1 text-slate-400">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/15 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300">
          <ListChecks className="h-4 w-4" />
          Suggested actions
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {g.interventions.map((line, i) => (
            <li key={i} className="pl-1 marker:font-semibold marker:text-indigo-400">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
            <BarChart3 className="h-4 w-4 text-amber-400" />
            Global feature importance (Random Forest)
          </div>
          <span className="text-[10px] text-slate-600">Cohort-level; same source as Objective 2</span>
        </div>
        <p className="mb-4 text-xs text-slate-500">
          Top drivers across the dataset. &quot;Your profile&quot; shows this student&apos;s value when the field matches.
        </p>
        {g.importanceTop.length === 0 ? (
          <p className="text-sm text-slate-500">Load the backend and open Objective 2 once — importance list is empty.</p>
        ) : (
          <ul className="space-y-3">
            {g.importanceTop.map((row, i) => {
              const pct = (row.value / maxImp) * 100;
              const your =
                row.idx !== null ? formatProfileFieldDisplay(row.idx, inputs[row.idx] ?? "") : null;
              const label = row.idx !== null ? FEATURE_DICT[row.idx].name : row.name;
              return (
                <li key={`${row.name}-${i}`} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-slate-200">{label}</span>
                    <span className="tabular-nums text-xs font-bold text-amber-200/90">{row.value.toFixed(1)}%</span>
                  </div>
                  {your != null && (
                    <p className="mb-2 text-[11px] text-slate-500">
                      Your profile: <span className="font-medium text-slate-400">{your}</span>
                    </p>
                  )}
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${isFinancialDriverName(label) ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-indigo-500 to-violet-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
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

function MetricsPanel({
  supervised,
  unsupervised,
  loading,
  error,
}: {
  supervised: SupervisedMetric[] | null;
  unsupervised: UnsupervisedMetric[] | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-black text-white">
          <BarChart3 className="text-sky-400" /> Objective 7: Model metrics
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
          Evaluation snapshot of all loaded models on the held-out dataset used by the backend. Supervised classifiers
          report accuracy, precision, recall, and F1; the unsupervised K-Means model reports silhouette score and
          inertia.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10 text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-sky-400" />
          <p className="font-semibold text-slate-200">Loading metrics…</p>
          <p className="mt-2 text-sm text-slate-500">Fetching `/metrics` from the Flask backend.</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-500/25 bg-rose-950/20 p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-rose-400" />
          <p className="font-semibold text-rose-100">Metrics are not available.</p>
          <p className="mt-2 text-sm text-rose-200/80">
            Backend error: <span className="font-mono text-xs">{error}</span>. Start{" "}
            <code className="rounded bg-rose-900/60 px-1">python app.py</code> (port 5000) and refresh.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">Supervised models</h3>
                <p className="text-xs text-slate-500">
                  Dropout vs Enrolled vs Graduate classifiers evaluated on the same hold-out slice.
                </p>
              </div>
            </div>
            {supervised && supervised.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800 text-sm">
                  <thead className="bg-slate-900/80">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                        Model
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                        Accuracy
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                        Precision
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                        Recall
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                        F1
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {supervised.map((row) => (
                      <tr key={row.name} className="hover:bg-slate-900/70">
                        <td className="px-4 py-3 font-semibold text-slate-100">{row.name}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-200">{row.acc}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-200">{row.pre}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-200">{row.rec}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-100">{row.f1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No supervised metrics were returned from the backend.</p>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">Unsupervised models</h3>
                <p className="text-xs text-slate-500">
                  Clustering quality metrics for the K-Means behavior persona model.
                </p>
              </div>
            </div>
            {unsupervised && unsupervised.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {unsupervised.map((row) => (
                  <div
                    key={row.name}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-[0_0_20px_rgba(15,23,42,0.6)]"
                  >
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">K-Means</p>
                    <p className="mt-1 text-base font-bold text-white">{row.name}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Silhouette
                        </p>
                        <p className="mt-1 text-xl font-black tabular-nums text-sky-300">{row.silhouette}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inertia</p>
                        <p className="mt-1 text-xl font-black tabular-nums text-indigo-300">{row.inertia}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                      Silhouette closer to 1.0 suggests more separated clusters; inertia summarizes within-cluster
                      compactness on the evaluation set.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No unsupervised metrics were returned from the backend.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

type PredictionsForBehavior = {
  kmeansCluster: string;
  rfConfidence: number;
  rfVerdict: string;
};

type SilentDropoutFactor = {
  label: string;
  detail: string;
  tags: ("Profile" | "K-Means" | "RF")[];
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
  const displaced = inputs[13] === "1";
  const international = inputs[20] === "1";

  const unemp = parseFloat(inputs[33] || "");
  const infl = parseFloat(inputs[34] || "");
  const gdp = parseFloat(inputs[35] || "");

  const hasGrade = inputs[25] !== "" && !Number.isNaN(grade);
  const explicitAcademicFailure = hasGrade && grade > 0 && grade < 10;
  const notFailingOnPaper = !explicitAcademicFailure;

  const thinEvals =
    !Number.isNaN(enrolled1) &&
    enrolled1 > 0 &&
    !Number.isNaN(evals1) &&
    evals1 / enrolled1 < 0.55;
  const severalNoEval = !Number.isNaN(noEval1) && noEval1 >= 2;

  const rfDropout = predictions.rfVerdict === "Dropout Risk";
  const highDisengagementCluster = cID === "0";

  const factors: SilentDropoutFactor[] = [];

  if (explicitAcademicFailure) {
    factors.push({
      label: "CU 1st Sem Grade",
      tags: ["Profile"],
      detail: `Average ${grade.toFixed(1)}/20 is below a typical pass line — this is direct academic strain, not a silent-only story.`,
    });
  }

  if (cID !== "") {
    factors.push({
      label: "K-Means behavior cluster",
      tags: ["K-Means"],
      detail:
        highDisengagementCluster
          ? `Cluster ${cID} — “${info.name}”. The model groups this student with higher disengagement / friction patterns.`
          : `Cluster ${cID} — “${info.name}”. Structural neighborhood from unsupervised learning (not a grade by itself).`,
    });
  }

  if (highDisengagementCluster && !rfDropout && notFailingOnPaper) {
    factors.push({
      label: "Random Forest (Objective 1)",
      tags: ["RF", "K-Means"],
      detail:
        "RF does not flag Dropout Risk, but K-Means is in the high-disengagement cluster — typical place to check silent drivers (tuition/debt, attendance, withdrawal intent) before grades collapse.",
    });
  } else if (rfDropout && !highDisengagementCluster) {
    factors.push({
      label: "Random Forest (Objective 1)",
      tags: ["RF"],
      detail:
        "RF flags Dropout Risk while K-Means is not the high-disengagement segment — supervised outcome risk outweighs this cluster persona.",
    });
  } else if (rfDropout && highDisengagementCluster) {
    factors.push({
      label: "Random Forest (Objective 1)",
      tags: ["RF"],
      detail: "RF flags Dropout Risk and K-Means is the high-disengagement cluster — models agree; this is not silent-only.",
    });
  } else {
    factors.push({
      label: "Random Forest (Objective 1)",
      tags: ["RF"],
      detail:
        "RF is not in the Dropout Risk class and K-Means is not the high-disengagement cluster — rely on the profile factors below if they appear.",
    });
  }

  if (debtor) {
    factors.push({
      label: "Debtor",
      tags: ["Profile"],
      detail: "Owing the institution can force stops or holds even when averages still look acceptable.",
    });
  }
  if (tuitionLate) {
    factors.push({
      label: "Tuition Fees Up To Date",
      tags: ["Profile"],
      detail: "Tuition not recorded as current — payment friction often drives withdrawal before grades drop.",
    });
  }
  if (displaced) {
    factors.push({
      label: "Displaced",
      tags: ["Profile"],
      detail: "Away-from-home status can add cost and support gaps that do not show as failing grades immediately.",
    });
  }
  if (international) {
    factors.push({
      label: "International",
      tags: ["Profile"],
      detail: "Visa, fees, or admin friction can raise silent attrition risk independent of classroom averages.",
    });
  }

  if (!Number.isNaN(unemp) && unemp >= 11) {
    factors.push({
      label: "Unemployment Rate",
      tags: ["Profile"],
      detail: `Local unemployment ${unemp.toFixed(1)}% is elevated — economic pressure on staying enrolled.`,
    });
  }
  if (!Number.isNaN(infl) && infl >= 2.5) {
    factors.push({
      label: "Inflation Rate",
      tags: ["Profile"],
      detail: `Inflation ${infl.toFixed(1)}% is high — squeezes living costs alongside tuition.`,
    });
  }
  if (!Number.isNaN(gdp) && gdp > 0 && gdp < 1.2) {
    factors.push({
      label: "GDP",
      tags: ["Profile"],
      detail: `GDP index ${gdp.toFixed(2)} is on the low side — weaker macro context for vulnerable students.`,
    });
  }

  if (thinEvals && notFailingOnPaper) {
    factors.push({
      label: "CU 1st Sem Evaluations vs enrolled",
      tags: ["Profile"],
      detail: `Only ${evals1.toFixed(0)} evaluations for ${enrolled1.toFixed(0)} enrolled units — thin participation before grades may reflect stress.`,
    });
  }
  if (severalNoEval && notFailingOnPaper) {
    factors.push({
      label: "CU 1st Sem Without Evaluations",
      tags: ["Profile"],
      detail: `${noEval1.toFixed(0)} units have no evaluation — risk can stay off the transcript early.`,
    });
  }

  return {
    cID,
    info,
    factors,
  };
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

  const profileFactorCount = ctx.factors.filter((f) => f.tags.includes("Profile")).length;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <ListChecks className="h-5 w-5 shrink-0 text-blue-400" strokeWidth={2} />
        <h3 className="text-lg font-black text-white">Factors for this student</h3>
        {profileFactorCount > 0 && (
          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {profileFactorCount} from profile (non‑grade / economic / engagement)
          </span>
        )}
      </div>
      <p className="mb-6 text-xs text-slate-500">
        <strong className="text-slate-400">Profile</strong> = fields you entered. <strong className="text-slate-400">K‑Means</strong> /{" "}
        <strong className="text-slate-400">RF</strong> = model outputs.
      </p>
      <ul className="space-y-3">
        {ctx.factors.map((f, idx) => (
          <li
            key={`silent-factor-${idx}`}
            className="rounded-2xl border border-slate-700/90 bg-slate-950/60 px-4 py-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-white">{f.label}</span>
              <span className="flex flex-wrap gap-1">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                      t === "Profile"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : t === "K-Means"
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-indigo-500/15 text-indigo-300"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.detail}</p>
          </li>
        ))}
      </ul>
      {ctx.factors.length === 0 && (
        <p className="text-sm text-slate-500">Run analysis to load cluster and model outputs.</p>
      )}
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
  const [importanceLoaded, setImportanceLoaded] = useState(false);
  const [importanceError, setImportanceError] = useState<string | null>(null);
  const [featureRanges, setFeatureRanges] = useState<CsvFeatureRange[] | null>(null);
  const [featureRangesError, setFeatureRangesError] = useState<string | null>(null);
  const [metricsSupervised, setMetricsSupervised] = useState<SupervisedMetric[] | null>(null);
  const [metricsUnsupervised, setMetricsUnsupervised] = useState<UnsupervisedMetric[] | null>(null);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(false);
  
  // Specific AI Outputs
  const [predictions, setPredictions] = useState({
    rfConfidence: 0,
    rfVerdict: "",
    logisticConfidence: 0,
    kmeansCluster: "",
    rfBalVerdict: "",
    rfBalConfidence: 0,
  });

  const driversSorted = useMemo(
    () => [...globalImportance].sort((a, b) => Number(b.value) - Number(a.value)),
    [globalImportance]
  );

  const counselorPdfBullets = useMemo(() => {
    if (!isAnalyzed) return [] as string[];
    return buildCounselorGuidance(inputs, predictions, driversSorted).pdfBullets;
  }, [isAnalyzed, inputs, predictions, driversSorted]);

  const handleDownloadPdf = useCallback(() => {
    if (!isAnalyzed) return;
    const payload: PdfReportInput = {
      predictions,
      globalImportance,
      clusterInfoMap,
      counselorGuidanceBullets: counselorPdfBullets,
    };
    downloadEduGuardObjectivesPdf(payload);
  }, [isAnalyzed, predictions, globalImportance, clusterInfoMap, counselorPdfBullets]);

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
    setImportanceLoaded(false);
    setImportanceError(null);

    fetch("http://127.0.0.1:5000/importance")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setGlobalImportance(Array.isArray(d) ? d : []);
        setImportanceLoaded(true);
      })
      .catch((e) => {
        setGlobalImportance([]);
        setImportanceLoaded(true);
        setImportanceError(e?.message || "Backend unavailable");
        console.log(e);
      });

    fetch("http://127.0.0.1:5000/cluster-info")
      .then((r) => r.json())
      .then((d) => setClusterInfoMap(d))
      .catch((e) => console.log(e));

    setFeatureRangesError(null);
    fetch("http://127.0.0.1:5000/feature-ranges")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setFeatureRanges(Array.isArray(d) ? d : []);
        setFeatureRangesError(null);
      })
      .catch((e) => {
        setFeatureRanges(null);
        setFeatureRangesError(e?.message || "Could not load CSV ranges");
        console.log(e);
      });

    setMetricsLoading(true);
    setMetricsError(null);
    fetch("http://127.0.0.1:5000/metrics")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setMetricsSupervised(Array.isArray(d?.supervised) ? d.supervised : []);
        setMetricsUnsupervised(Array.isArray(d?.unsupervised) ? d.unsupervised : []);
        setMetricsError(null);
      })
      .catch((e) => {
        setMetricsSupervised(null);
        setMetricsUnsupervised(null);
        setMetricsError(e?.message || "Could not load model metrics");
        console.log(e);
      })
      .finally(() => setMetricsLoading(false));
  }, []);

  const applyDemoProfile = (values: string[]) => {
    setInputs(values);
    setIsAnalyzed(false);
    setActiveTab("profile");
    window.scrollTo(0, 0);
  };

  // Graduate-like sample row from data/Dropout (1).csv (all values observed in CSV ranges)
  const loadLowRiskDemoProfile = () => {
    applyDemoProfile([
      "1", "15", "1", "9254", "1", "1", "160", "1", "1", "3", "3", "3", "142.5", "1", "0", "0", "0", "1", "0", "19", "0",
      "0", "6", "6", "6", "14", "0", "0", "6", "6", "6", "13.66666667", "0", "13.9", "-0.3", "0.79"
    ]);
  };

  // Dropout-like sample row from data/Dropout (1).csv (all values observed in CSV ranges)
  const loadHighRiskDemoProfile = () => {
    applyDemoProfile([
      "1", "17", "5", "171", "1", "1", "122", "1", "19", "12", "5", "9", "127.3", "1", "0", "0", "1", "1", "0", "20", "0",
      "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "10.8", "1.4", "1.74"
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
                {featureRangesError && (
                  <span className="mt-2 block text-amber-200/80">
                    Dataset ranges unavailable ({featureRangesError}). Start the Flask API to see min/max from{" "}
                    <code className="rounded bg-slate-800 px-1 text-indigo-200">data/Dropout (1).csv</code>.
                  </span>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={loadLowRiskDemoProfile}
                  className="px-5 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 text-sm font-bold border border-emerald-700/60 rounded-xl transition flex gap-2 items-center"
                >
                  <CheckCircle size={16} /> Load Low-Risk Demo
                </button>
                <button
                  onClick={loadHighRiskDemoProfile}
                  className="px-5 py-2.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 text-sm font-bold border border-rose-700/60 rounded-xl transition flex gap-2 items-center"
                >
                  <AlertTriangle size={16} /> Load High-Risk Demo
                </button>
              </div>
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
                       const csvStat = featureRanges?.[idx];
                       const rangePill = csvRangeBadge(csvStat);
                       return (
                          <div
                            key={idx}
                            className="group/profile relative flex flex-col gap-1.5 rounded-xl border border-transparent p-2 -m-2 transition-all duration-200 hover:border-indigo-500/30 hover:bg-slate-800/35 hover:shadow-md hover:shadow-indigo-950/15"
                          >
                            <label className="flex items-start justify-between gap-2 text-xs font-bold uppercase tracking-wide text-slate-300">
                              <span className="flex min-w-0 items-center gap-1.5 leading-snug">
                                {feature.name} {feature.isStarred && <span title="High Impact Feature" className="text-amber-400 text-sm">⭐</span>}
                              </span>
                              {rangePill ? (
                                <span
                                  className="shrink-0 cursor-default rounded-md bg-indigo-950/80 px-2 py-0.5 text-[10px] font-bold tabular-nums tracking-normal text-indigo-200 ring-1 ring-indigo-500/30"
                                  title="Hover the field for full CSV range details"
                                >
                                  {rangePill}
                                </span>
                              ) : null}
                            </label>
                            {feature.type === "select" ? (
                              <select
                                value={inputs[idx]}
                                onChange={(e) => { const n = [...inputs]; n[idx] = e.target.value; setInputs(n); }}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            )}
                            <p className="pl-1 text-[10px] font-medium text-slate-500">{feature.desc}</p>
                            {csvStat ? (
                              <div className="pointer-events-none absolute left-2 right-2 top-full z-30 mt-1 opacity-0 transition-all duration-200 group-hover/profile:opacity-100">
                                <div className="rounded-xl border border-indigo-500/35 bg-slate-900/95 px-3 py-2.5 text-[11px] leading-relaxed text-slate-200 shadow-xl backdrop-blur-sm">
                                  <p className="font-bold text-indigo-200">Acceptable range (from CSV)</p>
                                  <p className="mt-1 text-slate-300">
                                    Numeric span in <span className="font-mono text-slate-400">Dropout (1).csv</span>:{" "}
                                    <span className="font-semibold tabular-nums text-white">
                                      {formatCsvRangeNumber(csvStat.min)} to {formatCsvRangeNumber(csvStat.max)}
                                    </span>
                                  </p>
                                  <p className="mt-1 text-slate-400">
                                    Distinct values in file:{" "}
                                    <span className="font-semibold text-slate-300">{csvStat.n_unique}</span>
                                  </p>
                                  {csvStat.uniques && csvStat.uniques.length > 0 ? (
                                    <p className="mt-1.5 break-words text-slate-400">
                                      Values observed:{" "}
                                      <span className="font-mono text-[10px] text-indigo-100/90">
                                        {csvStat.uniques.map(formatCsvRangeNumber).join(", ")}
                                      </span>
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
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

            {!importanceLoaded ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-16 text-center">
                <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-amber-500/60" />
                <p className="font-semibold text-slate-300">Loading driver rankings…</p>
                <p className="mt-2 text-sm text-slate-500">Fetching `/importance` from the Flask backend.</p>
              </div>
            ) : importanceError ? (
              <div className="rounded-3xl border border-rose-500/25 bg-rose-950/15 p-10 text-center">
                <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-rose-400" />
                <p className="font-semibold text-rose-200">Objective 2 cannot load drivers.</p>
                <p className="mt-2 text-sm text-rose-200/70">
                  Backend error: <span className="font-mono">{importanceError}</span>. Start `python app.py` (port 5000) and refresh.
                </p>
              </div>
            ) : !driversSorted.length ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
                <p className="font-semibold text-slate-300">No driver data returned.</p>
                <p className="mt-2 text-sm text-slate-500">
                  The backend responded, but returned an empty importance list. Check that `models/rf.pkl` loaded and `/importance` returns data.
                </p>
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
          <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-black text-white">
                <BrainCircuit className="text-purple-400" /> Objective 4: Counselor guidance
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">
                One-page summary: model readouts for this student, <strong className="text-slate-300">custom messages</strong> from
                your inputs, suggested actions, and <strong className="text-slate-300">global Random Forest feature importance</strong>{" "}
                (with your values where fields match).
              </p>
            </div>

            <Objective4GuidancePanel
              isAnalyzed={isAnalyzed}
              inputs={inputs}
              predictions={predictions}
              driversSorted={driversSorted}
            />
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
          <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-black text-white">
                <Zap className="text-blue-400" /> Objective 6: Silent dropout
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">
                Disengagement without obvious failing grades. Factors = your profile (finance, engagement, macro) plus{" "}
                <strong className="text-slate-300">K‑Means</strong> and <strong className="text-slate-300">Random Forest</strong>{" "}
                (Objective 1).
              </p>
            </div>

            <Objective6InsightsPanel predictions={predictions} inputs={inputs} clusterInfoMap={clusterInfoMap} />
          </div>
        );

      case "metrics":
        return (
          <MetricsPanel
            supervised={metricsSupervised}
            unsupervised={metricsUnsupervised}
            loading={metricsLoading}
            error={metricsError}
          />
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
               <NavItem disabled={!isAnalyzed} id="counselor" icon={<BrainCircuit size={18}/>} label="4. Counselor guidance" />
               <NavItem disabled={!isAnalyzed} id="early_warning" icon={<AlertCircle size={18}/>} label="5. Early warning" />
               <NavItem disabled={!isAnalyzed} id="behavior" icon={<Zap size={18}/>} label="6. Silent dropout" />
              <NavItem disabled={false} id="metrics" icon={<BarChart3 size={18}/>} label="7. Model metrics" />
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