"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Award,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { CERTIFICATION_LEVELS } from "@/lib/education-data";
import {
  getCertificates,
  earnCertificate,
  type CertificateEntry,
} from "@/lib/education-progress";
import {
  generateCertificateImage,
  downloadCertificate,
} from "@/lib/certificate-generator";
import type { CertificationLevel } from "@/lib/education-system";

const LEVEL_GRADIENTS: Record<string, string> = {
  "niva-1": "linear-gradient(135deg, #d4a574 0%, #b8860b 50%, #cd853f 100%)",
  "niva-2": "linear-gradient(135deg, #b8c6d4 0%, #8fa3b8 50%, #a0b0c0 100%)",
  "niva-3": "linear-gradient(135deg, #d4af37 0%, #b8960c 50%, #daa520 100%)",
};

/** Stand-alone earn + view flow for when user passes the final exam */
export function CertificateEarnFlow({
  levelId,
  onDone,
}: {
  levelId: string;
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [certificate, setCertificate] = useState<CertificateEntry | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const level = CERTIFICATION_LEVELS.find((l) => l.id === levelId);

  const handleGenerate = useCallback(async () => {
    if (!name.trim() || !level) return;
    setGenerating(true);

    const cert = earnCertificate(
      levelId as CertificationLevel,
      name.trim()
    );
    setCertificate(cert);

    try {
      const blob = await generateCertificateImage({
        name: cert.name,
        levelId: cert.levelId,
        levelTitle: level.title,
        certificateId: cert.certificateId,
        earnedDate: cert.earnedDate,
      });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch {
      // fallback — show text version
    }
    setGenerating(false);
  }, [name, level, levelId]);

  const handleDownload = useCallback(async () => {
    if (!certificate || !level) return;
    const blob = await generateCertificateImage({
      name: certificate.name,
      levelId: certificate.levelId,
      levelTitle: level.title,
      certificateId: certificate.certificateId,
      earnedDate: certificate.earnedDate,
    });
    downloadCertificate(
      blob,
      `AI-akademin-${level.title.replace(/\s+/g, "-")}-certifikat.png`
    );
  }, [certificate, level]);

  if (!level) return null;

  // Step 1: Enter name
  if (!certificate) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto max-w-[28rem] px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ background: LEVEL_GRADIENTS[levelId] }}
            >
              <Award size={40} className="text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2
              className="mt-6 text-[1.5rem] leading-[1.2] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
            >
              Ditt certifikat väntar!
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted-foreground">
              Skriv ditt namn som det ska stå på certifikatet.
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ditt namn"
              className="mt-6 w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-[1.0625rem] focus:border-foreground/30 focus:outline-none"
              autoFocus
            />

            <button
              onClick={handleGenerate}
              disabled={!name.trim() || generating}
              className="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {generating ? "Genererar..." : "Skapa certifikat"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Step 2: Show certificate
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          onClick={onDone}
          className="flex items-center gap-1 text-[0.8125rem] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Tillbaka till akademin
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-all hover:bg-foreground/90"
        >
          <Download size={14} />
          Ladda ner
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto p-6">
        <div className="w-full max-w-[700px]">
          {/* Confetti-like decoration */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <p className="text-[0.9375rem] font-medium">
              Grattis, {certificate.name}!
            </p>
            <Sparkles size={18} className="text-amber-500" />
          </div>

          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt="Certifikat"
              className="w-full rounded-xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <Award size={48} className="mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-[1.125rem] font-medium">
                {level.title}
              </h3>
              <p className="mt-2 text-[0.875rem] text-muted-foreground">
                Certifikat-ID: {certificate.certificateId}
              </p>
              <p className="text-[0.875rem] text-muted-foreground">
                Utfärdat: {certificate.earnedDate}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** Certificate gallery for "Mina certifikat" page */
export function CertificateGallery() {
  const [certificates, setCertificates] = useState<CertificateEntry[]>([]);

  useEffect(() => {
    setCertificates(getCertificates());
  }, []);

  const handleDownload = async (cert: CertificateEntry) => {
    const level = CERTIFICATION_LEVELS.find((l) => l.id === cert.levelId);
    if (!level) return;
    const blob = await generateCertificateImage({
      name: cert.name,
      levelId: cert.levelId,
      levelTitle: level.title,
      certificateId: cert.certificateId,
      earnedDate: cert.earnedDate,
    });
    downloadCertificate(
      blob,
      `AI-akademin-${level.title.replace(/\s+/g, "-")}-certifikat.png`
    );
  };

  return (
    <>
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-8 md:pt-28">
        <FadeIn>
          <Link
            href="/akademin"
            className="mb-6 inline-flex items-center gap-1 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tillbaka till akademin
          </Link>

          <h1
            className="text-[1.5rem] leading-[1.2] tracking-[-0.03em] sm:text-[2rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Mina certifikat
          </h1>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            Dina intjänade certifikat från AI-akademin.
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      <section className="mx-auto max-w-[68.75rem] px-6 py-8">
        {certificates.length === 0 ? (
          <FadeIn>
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <Award size={40} className="mx-auto text-muted-foreground/40" />
              <p className="mt-4 text-[1rem] font-medium">Inga certifikat ännu</p>
              <p className="mt-2 text-[0.875rem] text-muted-foreground">
                Genomför en nivå i AI-akademin och klara slutprovet för att få
                ditt första certifikat.
              </p>
              <Link
                href="/akademin"
                className="mt-6 inline-block rounded-lg bg-foreground px-6 py-2.5 text-[0.875rem] font-medium text-background transition-all hover:bg-foreground/90"
              >
                Gå till akademin →
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => {
              const level = CERTIFICATION_LEVELS.find(
                (l) => l.id === cert.levelId
              );
              return (
                <FadeIn key={cert.certificateId} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-xl">
                    <div
                      className="h-1.5 w-full"
                      style={{
                        background: LEVEL_GRADIENTS[cert.levelId],
                      }}
                    />
                    <div className="p-6">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: LEVEL_GRADIENTS[cert.levelId] }}
                      >
                        <Award size={28} className="text-white" />
                      </div>
                      <h3 className="mt-4 text-[1.0625rem] font-medium">
                        {level?.title}
                      </h3>
                      <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                        {cert.name}
                      </p>
                      <p className="text-[0.75rem] text-muted-foreground">
                        {cert.earnedDate} · {cert.certificateId}
                      </p>

                      <button
                        onClick={() => handleDownload(cert)}
                        className="mt-4 flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-[0.8125rem] font-medium transition-all hover:bg-secondary"
                      >
                        <Download size={14} />
                        Ladda ner
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
