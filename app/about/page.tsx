import { Footer, GlobalNav } from "../components/PortfolioShell";

const resumeHref = "/resume/Kelli-Deng-Resume-2026.pdf";

export default function About() {
  return (
    <main className="portfolio-page">
      <GlobalNav />
      <section className="portfolio-index-hero portfolio-resume-hero">
        <span>About / 关于</span>
        <div>
          <h1>Kelli Deng<br /><small>邓楮月</small></h1>
          <p>战略设计师，工作覆盖消费电子外观策略、CMF开发、产品叙事与GenAI辅助探索。<br /><span>Strategic Designer working across consumer-electronics appearance strategy, CMF development, product storytelling and GenAI-assisted exploration.</span></p>
          <div className="portfolio-resume-actions">
            <a href={resumeHref} download>下载简历 / Download PDF ↓</a>
            <a href={resumeHref} target="_blank" rel="noreferrer">在线查看 / View PDF ↗</a>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-resume portfolio-about-resume">
        <article>
          <span>职业亮点 / Career highlights</span>
          <h2>三代消费电子外观策略与CMF开发经验，在市场洞察、视觉价值与制造实现之间建立连接。<small>Three generations of consumer-electronics appearance strategy and CMF development, connecting market insight, visual value and manufacturing reality.</small></h2>
          <ul className="portfolio-resume-highlights">
            <li>擅长在成本、周期及供应链约束下，基于本地化用户洞察、CMF策略提升大众消费电子产品感知价值，实现差异化定位。<span>Skilled at using localized user insight and CMF strategy to raise the perceived value of mass-market consumer electronics and create differentiated positioning within cost, schedule and supply-chain constraints.</span></li>
            <li>具备3代消费电子外观策略规划、CMF开发及量产导入经验，能够快速连接产品定位、视觉表达与制造实现，推动设计价值落地。<span>Experienced across three generations of consumer-electronics appearance strategy, CMF development and mass-production introduction, connecting product positioning, visual expression and manufacturing realization to bring design value into production.</span></li>
            <li>引入GenAI辅助市场研究、CMF概念探索及视觉表达，熟练应用于策略制定及设计价值传播，提升决策效率。<span>Introduced GenAI into market research, CMF concept exploration and visual communication, applying it to strategy and design-value storytelling to improve decision efficiency.</span></li>
          </ul>
        </article>
        <article>
          <span>策略与CMF / Strategy & CMF</span>
          <ul>
            <li>消费电子行业与产品线分析<span>Consumer-electronics industry and product-line analysis</span></li>
            <li>竞品CMF研究与区域用户洞察<span>Competitive CMF intelligence and regional user insight</span></li>
            <li>外观价值定义与设计语言建立<span>Appearance value definition and design-language building</span></li>
            <li>CMF开发、工艺转译与效果标准<span>CMF development, process translation and effect standards</span></li>
            <li>供应链协同与量产效果还原<span>Supplier collaboration and mass-production realization</span></li>
          </ul>
        </article>
        <article>
          <span>工具与实践 / Tools & practice</span>
          <ul>
            <li>Illustrator / Photoshop / Figma</li>
            <li>Pro/E / Rhino / KeyShot</li>
            <li>GenAI辅助设计流程<span>GenAI-assisted design workflow</span></li>
            <li>Vibe coding</li>
            <li>中文母语 / English IELTS 7+</li>
          </ul>
        </article>
        <article className="portfolio-resume-contact">
          <span>联系与教育 / Contact & education</span>
          <p><a href="mailto:kell1o02kelli@gmail.com">kell1o02kelli@gmail.com</a></p>
          <p className="portfolio-note">爱丁堡大学艺术学院 MA Design for Change<br />南京航空航天大学 工业设计学士</p>
        </article>
      </section>
      <Footer />
    </main>
  );
}
