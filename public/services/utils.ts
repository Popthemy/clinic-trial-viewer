import { set } from "date-fns";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const themes = [
  // Theme 1: Blue Medical (Original - Updated to HSL) ⚕️
  // A classic, trustworthy, and clinical blue theme.
  {
    // Hues are all ~198 degrees (Blue/Cyan)
    "--background": "hsl(198 12% 98%)", // Very light, near-white blue
    "--foreground": "hsl(198 100% 9%)", // Deep Navy Blue
    "--card": "hsl(192 38% 85%)", // Light Blue-Gray
    "--card-foreground": "hsl(198 43% 38%)", // Steel Blue
    "--popover": "hsl(195 53% 80%)", // Sky Blue
    "--popover-foreground": "hsl(198 100% 9%)", // Deep Navy
    "--primary": "hsl(198 43% 38%)", // Steel Blue (Buttons)
    "--primary-foreground": "hsl(198 12% 98%)", // Very light
    "--secondary": "hsl(187 40% 59%)", // Cadet Blue/Teal
    "--secondary-foreground": "hsl(198 100% 9%)", // Deep Navy
    "--muted": "hsl(195 53% 80%)", // Light Sky Blue
    "--muted-foreground": "hsl(198 18% 30%)", // Mid-dark Gray Blue
    "--accent": "hsl(182 69% 68%)", // Bright Cyan
    "--accent-foreground": "hsl(198 12% 98%)", // Very light
    "--destructive": "hsl(25 40% 59%)", // Muted Red/Orange (Error/Alert)
    "--destructive-foreground": "hsl(198 12% 98%)", // Very light
    "--border": "hsl(192 38% 85%)", // Light Blue-Gray
    "--input": "hsl(192 38% 85%)", // Light Blue-Gray
    "--ring": "hsl(198 43% 38%)", // Steel Blue
    // Chart Colors
    "--chart-1": "hsl(182 69% 68%)", // Cyan
    "--chart-2": "hsl(187 40% 59%)", // Teal
    "--chart-3": "hsl(198 43% 38%)", // Steel blue
    "--chart-4": "hsl(195 53% 80%)", // Sky blue
    "--chart-5": "hsl(192 38% 85%)", // Light blue
    // Sidebar Colors
    "--sidebar": "hsl(192 38% 85%)",
    "--sidebar-foreground": "hsl(198 100% 9%)",
    "--sidebar-primary": "hsl(198 43% 38%)",
    "--sidebar-primary-foreground": "hsl(198 12% 98%)",
    "--sidebar-accent": "hsl(182 69% 68%)",
    "--sidebar-accent-foreground": "hsl(198 100% 9%)",
    "--sidebar-border": "hsl(192 38% 85%)",
    "--sidebar-ring": "hsl(198 43% 38%)",
  },
  // ---
  // Theme 2: Green Healing (Original - Updated to HSL) 🌿
  // A calm, natural, and therapeutic green palette.
  {
    // Hues are all ~150 degrees (Green)
    "--background": "hsl(150 15% 96%)", // Light mint green
    "--foreground": "hsl(150 1% 18%)", // Dark, neutral green
    "--card": "hsl(145 34% 86%)", // Soft Mint
    "--card-foreground": "hsl(140 37% 32%)", // Forest Green
    "--popover": "hsl(147 18% 84%)", // Pale Green
    "--popover-foreground": "hsl(150 1% 18%)", // Dark green
    "--primary": "hsl(145 42% 47%)", // Button Green
    "--primary-foreground": "hsl(150 15% 96%)", // Light mint
    "--secondary": "hsl(148 37% 62%)", // Slightly Teal-Green
    "--secondary-foreground": "hsl(150 1% 18%)", // Dark green
    "--muted": "hsl(147 18% 84%)", // Pale Green
    "--muted-foreground": "hsl(146 17% 36%)", // Mid-dark green
    "--accent": "hsl(149 25% 68%)", // Brighter Green
    "--accent-foreground": "hsl(150 15% 96%)", // Light mint
    "--destructive": "hsl(25 40% 59%)", // Muted Red/Orange
    "--destructive-foreground": "hsl(150 15% 96%)", // Light mint
    "--border": "hsl(145 34% 86%)", // Soft Mint
    "--input": "hsl(145 34% 86%)", // Soft Mint
    "--ring": "hsl(145 42% 47%)", // Green
    // Chart Colors
    "--chart-1": "hsl(149 25% 68%)", // Brighter green
    "--chart-2": "hsl(148 37% 62%)", // Teal-green
    "--chart-3": "hsl(145 42% 47%)", // Green
    "--chart-4": "hsl(147 18% 84%)", // Pale green
    "--chart-5": "hsl(145 34% 86%)", // Soft mint
    // Sidebar Colors
    "--sidebar": "hsl(145 34% 86%)",
    "--sidebar-foreground": "hsl(150 1% 18%)",
    "--sidebar-primary": "hsl(145 42% 47%)",
    "--sidebar-primary-foreground": "hsl(150 15% 96%)",
    "--sidebar-accent": "hsl(149 25% 68%)",
    "--sidebar-accent-foreground": "hsl(150 1% 18%)",
    "--sidebar-border": "hsl(145 34% 86%)",
    "--sidebar-ring": "hsl(145 42% 47%)",
  },
  // ---
  // Theme 3: Teal Trust (Original - Updated to HSL) 💠
  // A secure, balanced, and modern teal-focused design.
  {
    // Hues are all ~175 degrees (Teal)
    "--background": "hsl(180 18% 97%)", // Light Teal/Aqua
    "--foreground": "hsl(185 100% 12%)", // Deep Teal
    "--card": "hsl(175 40% 84%)", // Soft Teal
    "--card-foreground": "hsl(170 38% 38%)", // Darker Teal
    "--popover": "hsl(177 48% 81%)", // Pale Teal
    "--popover-foreground": "hsl(185 100% 12%)", // Deep Teal
    "--primary": "hsl(172 38% 54%)", // Button Teal
    "--primary-foreground": "hsl(180 18% 97%)", // Light teal
    "--secondary": "hsl(174 41% 62%)", // Slightly greener teal
    "--secondary-foreground": "hsl(185 100% 12%)", // Deep Teal
    "--muted": "hsl(177 48% 81%)", // Pale Teal
    "--muted-foreground": "hsl(173 21% 45%)", // Mid-dark teal
    "--accent": "hsl(176 34% 68%)", // Brighter Teal
    "--accent-foreground": "hsl(180 18% 97%)", // Light teal
    "--destructive": "hsl(25 40% 59%)", // Muted Red/Orange
    "--destructive-foreground": "hsl(180 18% 97%)", // Light teal
    "--border": "hsl(175 40% 84%)", // Soft Teal
    "--input": "hsl(175 40% 84%)", // Soft Teal
    "--ring": "hsl(172 38% 54%)", // Teal
    // Chart Colors
    "--chart-1": "hsl(176 34% 68%)", // Brighter teal
    "--chart-2": "hsl(174 41% 62%)", // Greener teal
    "--chart-3": "hsl(172 38% 54%)", // Teal
    "--chart-4": "hsl(177 48% 81%)", // Pale teal
    "--chart-5": "hsl(175 40% 84%)", // Soft teal
    // Sidebar Colors
    "--sidebar": "hsl(175 40% 84%)",
    "--sidebar-foreground": "hsl(185 100% 12%)",
    "--sidebar-primary": "hsl(172 38% 54%)",
    "--sidebar-primary-foreground": "hsl(180 18% 97%)",
    "--sidebar-accent": "hsl(176 34% 68%)",
    "--sidebar-accent-foreground": "hsl(185 100% 12%)",
    "--sidebar-border": "hsl(175 40% 84%)",
    "--sidebar-ring": "hsl(172 38% 54%)",
  },
  // ---
  // Theme 4: Neutral Clean (New) 🤍
  // Minimalist, high-contrast, professional, and entirely neutral for a very clinical feel.
  {
    // Hues are all ~0 (Grayscale), with minimal blue/warm tints for a modern look.
    "--background": "hsl(220 5% 98%)", // Very light off-white (slight cool tint)
    "--foreground": "hsl(220 5% 15%)", // Near-black, very dark gray
    "--card": "hsl(210 10% 92%)", // Light gray
    "--card-foreground": "hsl(220 5% 25%)", // Darker gray
    "--popover": "hsl(210 10% 90%)", // Pale gray
    "--popover-foreground": "hsl(220 5% 15%)", // Near-black
    "--primary": "hsl(210 10% 35%)", // Charcoal/slate for buttons (Subtle, strong)
    "--primary-foreground": "hsl(220 5% 98%)", // Very light off-white
    "--secondary": "hsl(210 10% 65%)", // Mid-tone gray
    "--secondary-foreground": "hsl(220 5% 15%)", // Near-black
    "--muted": "hsl(210 10% 85%)", // Pale gray
    "--muted-foreground": "hsl(210 10% 45%)", // Mid-dark gray
    "--accent": "hsl(210 10% 55%)", // Slightly darker mid-tone gray
    "--accent-foreground": "hsl(220 5% 98%)", // Very light off-white
    "--destructive": "hsl(350 70% 50%)", // Standard Red (Error/Alert)
    "--destructive-foreground": "hsl(220 5% 98%)", // Very light off-white
    "--border": "hsl(210 10% 92%)", // Light gray
    "--input": "hsl(210 10% 92%)", // Light gray
    "--ring": "hsl(210 10% 35%)", // Charcoal
    // Chart Colors (Use a complementary blue for charts to pop against the neutral base)
    "--chart-1": "hsl(200 70% 55%)", // Strong Blue
    "--chart-2": "hsl(150 30% 50%)", // Green
    "--chart-3": "hsl(30 70% 55%)", // Orange
    "--chart-4": "hsl(270 10% 35%)", // Charcoal
    "--chart-5": "hsl(210 10% 65%)", // Mid-tone gray
    // Sidebar Colors (Assuming a cleaner, lighter sidebar)
    "--sidebar": "hsl(210 10% 92%)",
    "--sidebar-foreground": "hsl(220 5% 15%)",
    "--sidebar-primary": "hsl(210 10% 35%)",
    "--sidebar-primary-foreground": "hsl(220 5% 98%)",
    "--sidebar-accent": "hsl(210 10% 55%)",
    "--sidebar-accent-foreground": "hsl(220 5% 15%)",
    "--sidebar-border": "hsl(210 10% 92%)",
    "--sidebar-ring": "hsl(210 10% 35%)",
  },
  // ---
  // Theme 5: Lavender Calm (New) 💜
  // A gentle, modern, and slightly innovative theme, often associated with wellness and sophistication.
  {
    // Hues are all ~260 degrees (Lavender/Violet)
    "--background": "hsl(260 20% 97%)", // Very light, pale lavender
    "--foreground": "hsl(260 20% 12%)", // Deep Eggplant/Violet
    "--card": "hsl(265 30% 88%)", // Soft Lavender
    "--card-foreground": "hsl(260 30% 30%)", // Muted Violet
    "--popover": "hsl(262 35% 85%)", // Pale Lavender
    "--popover-foreground": "hsl(260 20% 12%)", // Deep Eggplant
    "--primary": "hsl(265 40% 55%)", // Medium Violet (Buttons)
    "--primary-foreground": "hsl(260 20% 97%)", // Light lavender
    "--secondary": "hsl(255 35% 65%)", // Muted Magenta/Orchid
    "--secondary-foreground": "hsl(260 20% 12%)", // Deep Eggplant
    "--muted": "hsl(262 35% 85%)", // Pale Lavender
    "--muted-foreground": "hsl(260 25% 45%)", // Mid-dark Violet
    "--accent": "hsl(270 50% 75%)", // Brighter Lilac/Magenta
    "--accent-foreground": "hsl(260 20% 97%)", // Light lavender
    "--destructive": "hsl(350 70% 50%)", // Standard Red (Error/Alert)
    "--destructive-foreground": "hsl(260 20% 97%)", // Light lavender
    "--border": "hsl(265 30% 88%)", // Soft Lavender
    "--input": "hsl(265 30% 88%)", // Soft Lavender
    "--ring": "hsl(265 40% 55%)", // Violet
    // Chart Colors
    "--chart-1": "hsl(270 50% 75%)", // Lilac
    "--chart-2": "hsl(255 35% 65%)", // Orchid
    "--chart-3": "hsl(265 40% 55%)", // Violet
    "--chart-4": "hsl(280 25% 40%)", // Deep Violet
    "--chart-5": "hsl(265 30% 88%)", // Soft Lavender
    // Sidebar Colors
    "--sidebar": "hsl(265 30% 88%)",
    "--sidebar-foreground": "hsl(260 20% 12%)",
    "--sidebar-primary": "hsl(265 40% 55%)",
    "--sidebar-primary-foreground": "hsl(260 20% 97%)",
    "--sidebar-accent": "hsl(270 50% 75%)",
    "--sidebar-accent-foreground": "hsl(260 20% 12%)",
    "--sidebar-border": "hsl(265 30% 88%)",
    "--sidebar-ring": "hsl(265 40% 55%)",
  },
];

export function changeTheme() {
  const index = Math.floor(Math.random() * themes.length);
  const selected = themes[index];
  const root = document.documentElement;
  Object.keys(selected).forEach((key) => {
    root.style.setProperty(key, selected[key]);
  });
}

export async function pdfExporter(el: HTMLElement, trialId: string) {
  const debug = true;
  try {
    await document.fonts?.ready.catch(() => null);
    await new Promise((r) => setTimeout(r, 2000));

    // collect boxes relative to container
    const linkSelectors = ["#link1", "#link2", "#link3"];
    const boxes = linkSelectors
      .map((sel) => {
        const node = el.querySelector(sel) as HTMLElement | null;
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();
        const url =
          node.getAttribute("data-href") || (node as HTMLAnchorElement).href;
        return {
          url,
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
        };
      })
      .filter(Boolean) as {
      url: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }[];

    // capture
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const canvas = await html2canvas(el, {
      scale: dpr,
      backgroundColor: "#ffffff",
      logging: false,
      scrollY: -window.scrollY,
      useCORS: true,
    });

    // target PDF canvas (A4/A5 pixel size used by you)
    const targetWidth = 1240;
    const targetHeight = 1754;
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = targetWidth;
    outputCanvas.height = targetHeight;
    const ctx = outputCanvas.getContext("2d");
    if (!ctx) throw new Error("2D context not found");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // compute scale & offsets used to draw original canvas into outputCanvas
    const scale = Math.min(
      targetWidth / canvas.width,
      targetHeight / canvas.height
    );
    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const offsetX = (targetWidth - scaledWidth) / 2;
    const offsetY = (targetHeight - scaledHeight) / 2;

    // draw the captured canvas
    ctx.drawImage(canvas, offsetX, offsetY, scaledWidth, scaledHeight);

    // For debugging: draw rectangles where links will be mapped (optional)
    const debug = false; // set true to see the boxes on the image before pdf generation
    if (debug) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
    }

    // scale from DOM -> raw canvas
    const scaleCanvasX = canvas.width / el.clientWidth;
    const scaleCanvasY = canvas.height / el.clientHeight;

    // Map boxes to outputCanvas (PDF) coordinates and optionally draw
    const pdfLinkRects = boxes.map((b) => {
      const xOnRawCanvas = b.x * scaleCanvasX;
      const yOnRawCanvas = b.y * scaleCanvasY;
      const wOnRawCanvas = b.width * scaleCanvasX;
      const hOnRawCanvas = b.height * scaleCanvasY;

      const xPdf = offsetX + xOnRawCanvas * scale;
      const yPdf = offsetY + yOnRawCanvas * scale;
      const wPdf = wOnRawCanvas * scale;
      const hPdf = hOnRawCanvas * scale;

      if (debug) {
        ctx.strokeRect(xPdf, yPdf, wPdf, hPdf);
      }
      return { url: b.url, xPdf, yPdf, wPdf, hPdf };
    });

    if (debug) {
      // open the debug image in a new tab so you can visually verify
      const dataUrl = outputCanvas.toDataURL("image/png");
      window.open(dataUrl, "_blank");
      return;
    }

    // build PDF (px units)
    const imageData = outputCanvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [targetWidth, targetHeight],
    });

    pdf.addImage(imageData, "PNG", 0, 0, targetWidth, targetHeight);

    // add links using the mapped coordinates
    for (const rect of pdfLinkRects) {
      // basic validation
      if (!rect.url) continue;
      pdf.link(rect.xPdf, rect.yPdf, rect.wPdf, rect.hPdf, { url: rect.url });
    }

    pdf.save(`clinical-trial-${trialId}.pdf`);
  } catch (err: any) {
    console.error("PDF export failed:", err);
    throw err;
  }
}
