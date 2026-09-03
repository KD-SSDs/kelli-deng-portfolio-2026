import { Footer, GlobalNav, ProjectCard } from "../components/PortfolioShell";

export default function Work() {
  return <main className="portfolio-page"><GlobalNav /><section className="portfolio-index-hero"><span>Work / 2026</span><h1>Selected<br />Projects</h1><p>CMF strategy, product storytelling, agile upgrade and next-generation exploration.</p></section><section className="portfolio-section portfolio-project-grid">
    <ProjectCard number="01" title="副屏产品线 CMF 策略 & 主力机开发" english="Value-Tier Product Portfolio Strategy" subtitle="Strategy & Portfolio" href="/work/value-tier-portfolio" image="/embeds/project01/assets/hero candidate01.png" />
    <ProjectCard number="02" title="A200 Series" english="Product Storytelling & GTM" subtitle="旗舰视觉转译" href="/work/a200" image="/embeds/project02/assets/web/200story-02.png" />
    <ProjectCard number="03" title="A200s Series" english="Agile CMF Upgrade" subtitle="敏捷CMF升级" href="/work/a200#a200s" image="/embeds/project02/assets/a200s/hero.png" />
    <ProjectCard number="04" title="P90 ✕ GenAI N+1 设计语言" english="GenAI-assisted Next-gen Exploration" subtitle="时尚轻三防新航道设计语言迭代" href="/work/genai-next-gen" image="/project04/06.jpg" />
  </section><Footer /></main>;
}
