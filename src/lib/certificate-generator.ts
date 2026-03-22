// =============================================================================
// AI-AKADEMIN — Client-side certificate generator (Canvas API)
// =============================================================================

import type { CertificationLevel } from "./education-system";

export interface CertificateConfig {
  name: string;
  levelId: CertificationLevel;
  levelTitle: string;
  certificateId: string;
  earnedDate: string;
}

const LEVEL_COLORS: Record<string, { primary: string; secondary: string; badge: string }> = {
  "niva-1": { primary: "#d4a574", secondary: "#b8860b", badge: "BRONS" },
  "niva-2": { primary: "#b8c6d4", secondary: "#8fa3b8", badge: "SILVER" },
  "niva-3": { primary: "#d4af37", secondary: "#b8960c", badge: "GULD" },
};

const LEVEL_SUBTITLES: Record<string, string> = {
  "niva-1": "Grundnivå",
  "niva-2": "Fördjupning",
  "niva-3": "Avancerad",
};

export async function generateCertificateImage(
  config: CertificateConfig
): Promise<Blob> {
  const W = 1200;
  const H = 850;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const colors = LEVEL_COLORS[config.levelId] || LEVEL_COLORS["niva-1"];

  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);

  // Subtle radial glow
  const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
  glow.addColorStop(0, `${colors.primary}12`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ---------------------------------------------------------------------------
  // Border — gradient
  // ---------------------------------------------------------------------------
  const borderWidth = 2;
  // Top
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, "#330f1f");
  topGrad.addColorStop(0.13, "#c83228");
  topGrad.addColorStop(0.25, "#fb873f");
  topGrad.addColorStop(0.38, "#d3dd92");
  topGrad.addColorStop(0.5, "#59824f");
  topGrad.addColorStop(0.62, "#002414");
  topGrad.addColorStop(0.74, "#00143d");
  topGrad.addColorStop(0.86, "#2874d7");
  topGrad.addColorStop(0.97, "#99c2ff");
  ctx.fillStyle = topGrad;
  ctx.fillRect(24, 24, W - 48, borderWidth);
  // Bottom
  ctx.fillRect(24, H - 26, W - 48, borderWidth);
  // Left
  const leftGrad = ctx.createLinearGradient(0, 0, 0, H);
  leftGrad.addColorStop(0, "#330f1f");
  leftGrad.addColorStop(0.5, "#59824f");
  leftGrad.addColorStop(1, "#99c2ff");
  ctx.fillStyle = leftGrad;
  ctx.fillRect(24, 24, borderWidth, H - 48);
  // Right
  ctx.fillRect(W - 26, 24, borderWidth, H - 48);

  // ---------------------------------------------------------------------------
  // Inner border (subtle)
  // ---------------------------------------------------------------------------
  ctx.strokeStyle = `${colors.primary}30`;
  ctx.lineWidth = 1;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // ---------------------------------------------------------------------------
  // Top: "AI-hubben" + "Katrineholms kommun"
  // ---------------------------------------------------------------------------
  ctx.fillStyle = `${colors.primary}80`;
  ctx.font = '11px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "4px";
  ctx.textAlign = "center";
  ctx.fillText("AI-HUBBEN  ·  KATRINEHOLMS KOMMUN", W / 2, 72);

  // ---------------------------------------------------------------------------
  // "CERTIFIKAT" heading
  // ---------------------------------------------------------------------------
  ctx.fillStyle = `${colors.primary}60`;
  ctx.font = '13px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "8px";
  ctx.fillText("CERTIFIKAT", W / 2, 140);

  // ---------------------------------------------------------------------------
  // Level title (large)
  // ---------------------------------------------------------------------------
  ctx.fillStyle = "#fafafa";
  ctx.font = 'normal 52px "Georgia", "Times New Roman", serif';
  ctx.letterSpacing = "-1px";
  ctx.fillText(config.levelTitle, W / 2, 210);

  // Subtitle
  ctx.fillStyle = `${colors.primary}90`;
  ctx.font = '14px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "3px";
  ctx.fillText(LEVEL_SUBTITLES[config.levelId] || "", W / 2, 245);

  // ---------------------------------------------------------------------------
  // Decorative line
  // ---------------------------------------------------------------------------
  const lineGrad = ctx.createLinearGradient(W / 2 - 120, 0, W / 2 + 120, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.3, colors.primary);
  lineGrad.addColorStop(0.7, colors.secondary);
  lineGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(W / 2 - 120, 270, 240, 1);

  // ---------------------------------------------------------------------------
  // "Tilldelas" + Name
  // ---------------------------------------------------------------------------
  ctx.fillStyle = "#999";
  ctx.font = '13px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("TILLDELAS", W / 2, 320);

  // Name
  ctx.fillStyle = "#fafafa";
  ctx.font = 'normal 42px "Georgia", "Times New Roman", serif';
  ctx.letterSpacing = "0px";
  ctx.fillText(config.name, W / 2, 380);

  // ---------------------------------------------------------------------------
  // Description
  // ---------------------------------------------------------------------------
  ctx.fillStyle = "#888";
  ctx.font = '15px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "0px";

  const descriptions: Record<string, string[]> = {
    "niva-1": [
      "för att ha genomfört AI-akademins grundkurs och visat",
      "kunskaper i AI-grunderna, praktisk AI-användning och säker AI-hantering.",
    ],
    "niva-2": [
      "för att ha genomfört AI-akademins fördjupningskurs och visat",
      "avancerade kunskaper i AI-teknik, Intric, Copilot och regelverk.",
    ],
    "niva-3": [
      "för att ha genomfört AI-akademins avancerade kurs och visat",
      "ledarskapsförmåga inom AI-strategi, teknik och verksamhetsutveckling.",
    ],
  };

  const desc = descriptions[config.levelId] || descriptions["niva-1"];
  desc.forEach((line, i) => {
    ctx.fillText(line, W / 2, 440 + i * 24);
  });

  // ---------------------------------------------------------------------------
  // Badge circle
  // ---------------------------------------------------------------------------
  const badgeY = 540;
  const badgeGrad = ctx.createRadialGradient(
    W / 2, badgeY, 0,
    W / 2, badgeY, 32
  );
  badgeGrad.addColorStop(0, colors.primary);
  badgeGrad.addColorStop(1, colors.secondary);

  ctx.beginPath();
  ctx.arc(W / 2, badgeY, 32, 0, Math.PI * 2);
  ctx.fillStyle = badgeGrad;
  ctx.fill();

  // Badge ring
  ctx.strokeStyle = `${colors.primary}40`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(W / 2, badgeY, 38, 0, Math.PI * 2);
  ctx.stroke();

  // Badge text
  ctx.fillStyle = "#0a0a0a";
  ctx.font = 'bold 11px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "1px";
  ctx.fillText(colors.badge, W / 2, badgeY + 4);

  // ---------------------------------------------------------------------------
  // Bottom: Date + Certificate ID
  // ---------------------------------------------------------------------------
  const bottomY = 680;

  // Date
  ctx.fillStyle = "#666";
  ctx.font = '11px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "2px";
  ctx.textAlign = "left";
  ctx.fillText("DATUM", 80, bottomY);

  ctx.fillStyle = "#ccc";
  ctx.font = '15px "Georgia", "Times New Roman", serif';
  ctx.letterSpacing = "0px";
  ctx.fillText(formatDate(config.earnedDate), 80, bottomY + 22);

  // Certificate ID
  ctx.fillStyle = "#666";
  ctx.font = '11px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "2px";
  ctx.textAlign = "right";
  ctx.fillText("CERTIFIKAT-ID", W - 80, bottomY);

  ctx.fillStyle = "#ccc";
  ctx.font = '15px "Georgia", "Times New Roman", serif';
  ctx.letterSpacing = "0px";
  ctx.fillText(config.certificateId, W - 80, bottomY + 22);

  // Decorative bottom line
  ctx.fillStyle = lineGrad;
  ctx.fillRect(80, bottomY + 48, W - 160, 1);

  // Footer
  ctx.fillStyle = "#555";
  ctx.font = '11px "Segoe UI", system-ui, sans-serif';
  ctx.letterSpacing = "2px";
  ctx.textAlign = "center";
  ctx.fillText("AIHUBBEN.SE", W / 2, H - 50);

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate certificate image"));
      },
      "image/png",
      1.0
    );
  });
}

export function downloadCertificate(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const months = [
    "januari", "februari", "mars", "april", "maj", "juni",
    "juli", "augusti", "september", "oktober", "november", "december",
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}
