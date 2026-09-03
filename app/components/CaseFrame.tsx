"use client";
import { useEffect, useRef } from "react";

export function CaseFrame({ src, title }: { src: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const sync = () => {
      if (!frame.current) return;
      const wanted = `${src}${window.location.hash}`;
      const url = new URL(frame.current.src);
      if (`${url.pathname}${url.hash}` !== wanted) frame.current.src = wanted;
    };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [src]);
  return <iframe ref={frame} className="portfolio-case-frame" src={src} title={title} />;
}
