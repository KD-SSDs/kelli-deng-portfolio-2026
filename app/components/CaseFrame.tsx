"use client";
import { useEffect, useRef } from "react";

export function CaseFrame({ src, title }: { src: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    let settleTimers: number[] = [];
    let stopSettling: (() => void) | undefined;

    const clearSettling = () => {
      settleTimers.forEach(window.clearTimeout);
      settleTimers = [];
      stopSettling?.();
      stopSettling = undefined;
    };

    const sync = () => {
      clearSettling();
      const iframe = frame.current;
      const hash = window.location.hash;
      if (!iframe || !hash) return;

      try {
        const childWindow = iframe.contentWindow;
        const childDocument = iframe.contentDocument;
        const target = childDocument?.getElementById(decodeURIComponent(hash.slice(1)));
        if (!childWindow || !target) return;

        // Updating only the child history avoids starting the iframe request a
        // second time when entering a deep-linked case study.
        childWindow.history.replaceState(null, "", `${src}${hash}`);
        const leadImage = target.querySelector("img");
        if (leadImage instanceof childWindow.HTMLImageElement) {
          leadImage.loading = "eager";
          leadImage.fetchPriority = "high";
        }
        const align = () => target.scrollIntoView({ block: "start", behavior: "auto" });
        align();

        // Late image decoding can adjust the long document above the anchor.
        // Re-align briefly, but stop immediately if the reader interacts.
        let active = true;
        const resizeObserver = "ResizeObserver" in childWindow
          ? new childWindow.ResizeObserver(() => { if (active) align(); })
          : undefined;
        resizeObserver?.observe(childDocument.documentElement);
        const stop = () => {
          active = false;
          resizeObserver?.disconnect();
        };
        stopSettling = () => {
          stop();
          ["wheel", "touchstart", "pointerdown", "keydown"].forEach((event) => childWindow.removeEventListener(event, stop));
        };
        ["wheel", "touchstart", "pointerdown", "keydown"].forEach((event) => childWindow.addEventListener(event, stop, { passive: true, once: true }));
        const settleUntil = window.performance.now() + 8000;
        const settle = () => {
          if (!active) return;
          align();
          if (window.performance.now() < settleUntil) {
            settleTimers.push(window.setTimeout(settle, 240));
          }
        };
        settleTimers.push(window.setTimeout(settle, 80));
      } catch {
        // Same-origin access is expected; leave the embedded page usable if a
        // future deployment changes that assumption.
      }
    };
    const iframe = frame.current;
    iframe?.addEventListener("load", sync);
    sync();
    window.addEventListener("hashchange", sync);
    return () => {
      clearSettling();
      iframe?.removeEventListener("load", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [src]);
  return <iframe ref={frame} className="portfolio-case-frame" src={src} title={title} />;
}
