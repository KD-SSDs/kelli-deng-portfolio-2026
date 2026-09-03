import type { Metadata } from "next";
import { CaseFrame } from "../components/CaseFrame";
export const metadata: Metadata = { title: "CMF Competitive Intelligence" };
export default function Page() { return <CaseFrame src="/embeds/approach/index.html" title="CMF Competitive Intelligence" />; }
