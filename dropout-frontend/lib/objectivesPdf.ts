import { jsPDF } from "jspdf";

export type PdfReportPredictions = {
  rfConfidence: number;
  rfVerdict: string;
  logisticConfidence: number;
  kmeansCluster: string;
  rfBalVerdict: string;
  rfBalConfidence: number;
};

export type PdfReportInput = {
  predictions: PdfReportPredictions;
  globalImportance: { name: string; value: number }[];
  clusterInfoMap: Record<string, { name?: string; description?: string; traits?: string[] }>;
  chatMessages: { role: string; content: string }[];
};

function safeText(s: string): string {
  return s
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\r\n\t\x20-\x7e]/g, (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0xa0 && c <= 0xff) return ch;
      return " ";
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function downloadEduGuardObjectivesPdf(data: PdfReportInput): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - margin * 2;
  let y = margin;

  const newPageIfNeeded = (blockHeight: number) => {
    if (y + blockHeight > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addTitle = (size: number, bold: boolean, text: string) => {
    newPageIfNeeded(24);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.text(safeText(text), margin, y);
    y += size + 8;
  };

  const addLines = (size: number, text: string, extraGap = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(safeText(text), maxW);
    const lineH = size * 1.2;
    for (let i = 0; i < lines.length; i++) {
      newPageIfNeeded(lineH + 4);
      doc.text(lines[i], margin, y);
      y += lineH;
    }
    y += extraGap;
  };

  const addBullet = (size: number, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const prefix = "- ";
    const lines = doc.splitTextToSize(prefix + safeText(text), maxW);
    const lineH = size * 1.2;
    for (let i = 0; i < lines.length; i++) {
      newPageIfNeeded(lineH + 4);
      doc.text(lines[i], margin, y);
      y += lineH;
    }
    y += 4;
  };

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

  addTitle(18, true, "EduGuard - Six objectives report");
  addLines(10, `Generated: ${now.toLocaleString()}`, 14);

  const p = data.predictions;

  addTitle(13, true, "Objective 1 - Status and overview (Random Forest)");
  addLines(
    10,
    `Verdict: ${p.rfVerdict || "N/A"}. Normalized dropout-oriented risk score: ${(p.rfConfidence * 100).toFixed(1)}%. ` +
      (p.rfConfidence > 0.6
        ? "Read as elevated relative to the dashboard's high band."
        : "Below the dashboard's high band used in the UI.")
  );

  addTitle(13, true, "Objective 2 - Underlying drivers (feature importance)");
  const imp = [...data.globalImportance].sort((a, b) => Number(b.value) - Number(a.value)).slice(0, 10);
  if (imp.length === 0) {
    addLines(10, "No importance data was available (API may be offline).");
  } else {
    addLines(10, "Top features by global Random Forest importance (relative %):");
    imp.forEach((row, i) => {
      addBullet(10, `${i + 1}. ${row.name}: ${Number(row.value).toFixed(1)}%`);
    });
  }

  addTitle(13, true, "Objective 3 - Strict classification (balanced Random Forest)");
  addLines(
    10,
    `Verdict: ${p.rfBalVerdict || "N/A"}. Strict-aligned score: ${(p.rfBalConfidence * 100).toFixed(1)}%. ` +
      (p.rfBalConfidence > 0.6
        ? "Exceeds the strict alert threshold (60%) used in the app."
        : "Does not exceed the strict alert threshold (60%) used in the app.")
  );

  addTitle(13, true, "Objective 4 - Counselor chat");
  const msgs = data.chatMessages.filter((m) => m.role === "user" || m.role === "system");
  if (msgs.length === 0) {
    addLines(10, "No chat messages recorded for this session.");
  } else {
    addLines(10, `Conversation excerpt (${msgs.length} message(s)):`);
    msgs.slice(-20).forEach((m) => {
      const role = m.role === "user" ? "User" : "Assistant";
      addLines(9, `${role}: ${m.content}`, 4);
    });
  }

  addTitle(13, true, "Objective 5 - Lightweight early warning (logistic, Semester 1 lens)");
  addLines(
    10,
    `Normalized early-warning score: ${(p.logisticConfidence * 100).toFixed(1)}% (dashboard threshold 50%). ` +
      (p.logisticConfidence > 0.5
        ? "Interpretation: predicting elevated disengagement risk into the next term on the Semester-1 logistic read."
        : "Interpretation: trajectory read as relatively stable on the Semester-1 logistic read.")
  );

  const cID = p.kmeansCluster.split(" ")[1] || "";
  const raw = data.clusterInfoMap[cID] || {};
  const cName = typeof raw.name === "string" ? raw.name : "Unknown cluster";
  const cDesc = typeof raw.description === "string" ? raw.description : "";
  const traits = Array.isArray(raw.traits) ? raw.traits.filter((t) => typeof t === "string") : [];

  addTitle(13, true, "Objective 6 - Silent dropout / behavior (K-Means)");
  addLines(10, `Assigned cluster ID: ${cID || "?"}. Label: ${cName}.`);
  if (cDesc) addLines(10, cDesc);
  if (traits.length) {
    addLines(10, "Key identifiers:");
    traits.forEach((t) => addBullet(10, t));
  }

  addTitle(11, true, "Disclaimer");
  addLines(
    9,
    "This PDF is an automated summary of dashboard outputs for documentation only. It is not a clinical or legal " +
      "assessment. Model scores are not calibrated probabilities for your institution unless you validate them locally."
  );

  doc.save(`EduGuard-report-${stamp}.pdf`);
}
