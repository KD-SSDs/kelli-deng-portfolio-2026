import type { Metadata } from "next";
import { GlobalNav } from "../components/PortfolioShell";

export const metadata: Metadata = { title: "Home composition directions" };

const projects = [
  { name: "Strategy & Portfolio", image: "/embeds/project01/assets/hero candidate01.png", href: "/work/value-tier-portfolio" },
  { name: "Product Storytelling & GTM", image: "/embeds/project02/assets/web/200story-02.png", href: "/work/a200" },
  { name: "Agile CMF Upgrade", image: "/embeds/project02/assets/a200s/hero.png", href: "/work/a200#a200s" },
  { name: "GenAI-assisted Exploration", image: "/project04/06.jpg", href: "/work/genai-next-gen" },
];

function DirectionHeader({ title, note, recommended = false }: { title: string; note: string; recommended?: boolean }) {
  return <header className="direction-header"><div><span>{recommended ? "Recommended" : "Alternative"}</span><h2>{title}</h2></div><p>{note}</p></header>;
}

export default function HomeDirections() {
  return <main className="portfolio-page home-directions-page"><GlobalNav />
    <section className="directions-intro"><span>Home composition study</span><h1>三种更有辨识度，<br />但仍然克制的首页构图。</h1><p>所有方向沿用同一套字号、边距、导航和项目资产。这里只比较 Hero 与 Selected Work 的组织方式，不改变案例内容。</p></section>

    <article className="home-direction direction-ledger">
      <DirectionHeader recommended title="Research Ledger" note="把 Kelli 的核心价值放在判断与组织信息上。最贴近 Project01 的研究型、策略型气质。" />
      <div className="direction-canvas ledger-hero"><div className="ledger-name"><span>CMF designer</span><h3>kelli<br />邓楮月</h3></div><div className="ledger-thesis"><strong>设计师是研究者，<br />设计师是叙事者。</strong><p>Market insight becomes product value, then becomes a commercially viable design decision.</p></div></div>
      <div className="direction-canvas ledger-work"><header><h3>Selected Work</h3><span>Four projects</span></header>{projects.map((project, index) => <a href={project.href} key={project.name}><span>0{index + 1}</span><strong>{project.name}</strong><img src={project.image} alt="" /><b>↗</b></a>)}</div>
    </article>

    <article className="home-direction direction-quartet">
      <DirectionHeader title="Material Quartet" note="让真实 CMF 图像承担首页识别度。文字退后，四个项目形成有节奏的材料与产品拼贴。" />
      <div className="direction-canvas quartet-hero"><div><span>Kelli Deng / CMF Designer</span><h3>从市场判断到<br />产品被选择的理由。</h3><p>Research, strategy, CMF development and product storytelling.</p></div><div className="quartet-images">{projects.map((project) => <img key={project.name} src={project.image} alt="" />)}</div></div>
      <div className="direction-canvas quartet-work">{projects.map((project, index) => <a href={project.href} key={project.name}><img src={project.image} alt="" /><div><span>0{index + 1}</span><strong>{project.name}</strong><b>↗</b></div></a>)}</div>
    </article>

    <article className="home-direction direction-rail">
      <DirectionHeader title="Evidence Rail" note="把首页处理成一条连续证据带。更偏展览与编辑，但仍保留低动效和清晰阅读顺序。" />
      <div className="direction-canvas rail-hero"><div><span>kelli / 邓楮月</span><h3>Design decisions,<br />made visible.</h3><p>将洞察、产品价值与新兴工具转化为可执行的 CMF 决策。</p></div><img src={projects[0].image} alt="" /></div>
      <div className="direction-canvas rail-work"><header><h3>Selected Work</h3><p>Strategy, storytelling, agile development and future exploration.</p></header><div>{projects.map((project, index) => <a href={project.href} key={project.name}><img src={project.image} alt="" /><span>0{index + 1}</span><strong>{project.name}</strong></a>)}</div></div>
    </article>
  </main>;
}
