"use client";

import { useRef } from "react";
import { Footer, GlobalNav } from "../../components/PortfolioShell";

const A = "/project04/";

const colors = [
  { image: "09.jpg", index: "01", name: "淬火黑", role: "基础色 · 强识别", note: "深色耐用基底，以厚镀渐变金属聚焦一体凹槽大装饰件。" },
  { image: "10.jpg", index: "02", name: "火山灰", role: "基础色 · 功能感", note: "矿物灰与警示橙建立清晰、可靠的户外工具属性。" },
  { image: "11.jpg", index: "03", name: "冰川蓝", role: "延展色 · 清爽感", note: "冷调高亮金属让耐用表达更轻、更接近日常消费电子。" },
  { image: "12.jpg", index: "04", name: "沙漠黄", role: "营销色 · 场景感", note: "温暖沙岩色连接高温、风沙环境与生活化审美。" },
];

function ColorCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * 0.84, behavior: "smooth" });

  return (
    <div className="carousel-shell">
      <div className="carousel-head">
        <p>04 / COLOR FAMILY</p>
        <div className="carousel-controls">
          <button aria-label="查看上一套配色" onClick={() => move(-1)}>←</button>
          <button aria-label="查看下一套配色" onClick={() => move(1)}>→</button>
        </div>
      </div>
      <div className="color-rail" ref={rail} tabIndex={0} aria-label="四套手机与配件配色方案">
        {colors.map((color) => (
          <article className="color-card" key={color.name}>
            <img src={`${A}${color.image}`} alt={`${color.name}手机与配件家族方案`} />
            <div className="color-caption">
              <span>{color.index}</span>
              <div><h3>{color.name}</h3><p>{color.role}</p></div>
              <p>{color.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="drag-hint">横向滑动浏览四套方案</p>
    </div>
  );
}

function EvidenceImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <figure className={`evidence ${className}`}><img src={`${A}${src}`} alt={alt} loading="lazy" /></figure>;
}

export default function Home() {
  return (
    <div className="p04-page">
      <GlobalNav />
      <main>
      <header className="topbar">
        <a className="brand" href="#top"><span>PROJECT 04</span><strong>GenAI-assisted Exploration</strong></a>
        <nav aria-label="案例章节">
          <a href="#background">Background</a><a href="#challenge">Challenge</a><a href="#action">Action</a><a href="#result">Result</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <img src={`${A}06.jpg`} alt="P90 手机户外场景概念图" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">CMFD · SERIES DESIGN LANGUAGE · 2-WEEK SPRINT</p>
          <h1>从大电池，<br />到时尚轻三防。</h1>
          <p>为真实户外工作场景，建立兼顾耐用、日常审美与家族识别的 P 系列设计语言。</p>
        </div>
        <div className="hero-meta"><span>ROLE<br /><b>CMFD Designer</b></span><span>SCOPE<br /><b>Phone + Accessories</b></span><span>METHOD<br /><b>GenAI Rapid Exploration</b></span></div>
        <a className="scroll-cue" href="#background">进入项目 ↓</a>
      </section>

      <section className="section light" id="background">
        <div className="section-label"><span>01</span><p>BACKGROUND</p></div>
        <div className="split-intro">
          <h2>户外，不只是远方。<br />也是每天工作的现场。</h2>
          <div className="body-copy">
            <p>P 系列长期以大电池与科技感轻机甲防护外观建立认知。当内存成本上升，单一容量卖点已不足以支撑英雄产品线持续差异化。</p>
            <p>目标市场用户经常在户外完成配送、运输、施工与现场作业。风吹雨晒、高处与夜间工作，让防水、防尘、防跌落和大手电成为高频、具体的需求。</p>
            <p>这不是登山徒步式的周末户外。手机既参与收入来源，也承担社交、娱乐与日常生活，因此机会不在于复制专业三防设备，而是让可靠防护进入一台更轻、更时尚的主力机。</p>
          </div>
        </div>

        <div className="context-grid">
          <figure className="persona-card"><img src={`${A}persona.jpg`} alt="东南亚城市配送骑手工作场景" /><figcaption><span>REAL CONTEXT</span><b>配送 / 户外作业 / 夜班</b><p>设备跨越工作与个人生活，不应被单一场景定义。</p></figcaption></figure>
          <div className="needs-panel">
            <p className="small-label">SCENE-DRIVEN NEEDS</p>
            <div className="need-row"><b>01</b><span>风吹雨晒</span><em>Water & dust resistance</em></div>
            <div className="need-row"><b>02</b><span>高处作业</span><em>Drop protection</em></div>
            <div className="need-row"><b>03</b><span>夜间工作</span><em>High-output flashlight</em></div>
            <div className="need-row"><b>04</b><span>全天候使用</span><em>Everyday usability</em></div>
          </div>
        </div>

        <div className="opportunity">
          <div className="opportunity-copy"><p className="small-label">DIFFERENTIATION OPPORTUNITY</p><h3>不是削弱防护，<br />而是拓宽防护产品的使用边界。</h3><p>专业三防手机以明确的功能表达服务特定用户；P 系列的机会，则是保留可靠感，同时减少视觉负担，让一台设备自然跨越工作与生活。</p></div>
          <div className="rugged-grid"><img src={`${A}rugged-01.jpg`} alt="专业三防手机案例一" /><img src={`${A}rugged-02.jpg`} alt="专业三防手机案例二" /><img src={`${A}rugged-03.jpg`} alt="专业三防手机案例三" /></div>
        </div>

        <div className="p80-block">
          <div className="p80-heading"><p className="small-label">STARTING POINT · P80</p><h3>从已上市产品中，沉淀可继承的设计基因。</h3><div className="feature-chips"><span>防护四角</span><span>防撞凹槽装饰件</span><span>耐用纹理 / 材质感知</span></div></div>
          <EvidenceImage src="p80-feature.webp" alt="P80 防护设计特征" />
          <div className="p80-colors"><img src={`${A}p80-black.webp`} alt="P80 黑色" /><img src={`${A}p80-green.webp`} alt="P80 绿色" /><img src={`${A}p80-orange.webp`} alt="P80 橙色" /></div>
        </div>
      </section>

      <section className="section dark" id="challenge">
        <div className="section-label"><span>02</span><p>CHALLENGE</p></div>
        <div className="challenge-title"><h2>两周，把一个产品基因<br />推演成一个家族。</h2><p>在形体仍在迭代的情况下，以 CMFD 快速建立可讨论、可扩展、具有市场识别度的系列方案。</p></div>
        <div className="challenge-grid">
          <article><span>01</span><h3>设计语言升级</h3><p>延续 P80 的防护四角、凹槽装饰件与耐用材质感知，同时形成更鲜明的时尚 / 耐用记忆点。</p></article>
          <article><span>02</span><h3>CMFD 协同形体</h3><p>配合 ID 初步形体，推进材质、配色、工艺与纹理，使外观符号和结构表达同步收敛。</p></article>
          <article><span>03</span><h3>跨品类家族化</h3><p>从手机扩展到平板、充电、音频等配件，统一颜色逻辑与细节特征，而非简单复制表面。</p></article>
        </div>
        <div className="constraint-band"><span><b>14</b> DAYS</span><span><b>GenAI</b> RAPID VISUALIZATION</span><span><b>1 → N</b> PHONE TO ECOSYSTEM</span></div>
      </section>

      <section className="section action" id="action">
        <div className="section-label"><span>03</span><p>ACTION</p></div>
        <div className="action-intro"><h2>先建立符号，<br />再验证它能否成为系统。</h2><p>所有效果图均以 GenAI 快速探索，用来把概念点转成可讨论的设计证据；重点聚焦结构、材质、色彩与家族扩展，而非把表达当作最终工程结果。</p></div>

        <div className="sequence">
          <div className="sequence-note"><span>01</span><h3>自然共生</h3><p>将再生颗粒感、可拆防撞角、金属凹槽装饰与强力照明组合为“耐用但不过度武装”的第一套语言。</p></div>
          <EvidenceImage src="01.jpg" alt="自然共生手机 CMF 设计语言方案" className="wide" />
          <div className="double-evidence"><EvidenceImage src="02.jpg" alt="可拆卸防撞角探索" /><EvidenceImage src="03.jpg" alt="防撞角多产品适配探索" /></div>
          <div className="sequence-note inline"><span>02</span><h3>从单品到家族</h3><p>把耐用颗粒、圆角防护、金属面与高识别点色扩展到平板、移动电源与音频产品。</p></div>
          <EvidenceImage src="04.jpg" alt="手机设计语言向配件家族延伸" className="wide" />
        </div>

        <div className="material-studies">
          <div className="study-title"><p className="small-label">FOCUSED COLOR STUDIES</p><h3>只深挖两条特殊配色，<br />让材质逻辑先于颜色命名。</h3></div>
          <article className="study heat">
            <div className="study-copy"><span>A</span><h3>淬火钛灰 → 淬火黑</h3><p>厚镀渐变镜片提供强反射防护与时尚感；钛金属反复受热形成的氧化层，则带来坚固、温度与时间的联想。</p><p>将这种渐变聚焦在一体金属凹槽大装饰件上，以基础黑控制整体张力，形成远看克制、近看有记忆点的表达。</p></div>
            <div className="mood-grid"><img src={`${A}heat-inspiration-01.jpg`} alt="厚镀渐变滑雪镜灵感" /><img src={`${A}heat-inspiration-02.jpg`} alt="火烧钛杯氧化渐变灵感" /></div>
            <img className="study-result" src={`${A}heat-titanium.jpg`} alt="淬火钛灰手机配色推演方案" />
            <img className="study-result" src={`${A}heat-titanium-02.jpg`} alt="淬火钛灰横向细节推演方案" />
          </article>
          <article className="study cold">
            <div className="study-copy"><span>B</span><h3>雪山冷铝</h3><p>以高亮抛光与冷铝光泽强调金属的硬度，同时减少传统工具感，让强度表达更精致、更接近日常时尚产品。</p></div>
            <img className="study-result" src={`${A}cold-aluminum.jpg`} alt="雪山冷铝手机配色推演方案" />
          </article>
        </div>

        <div className="family-proof">
          <div className="sequence-note inline"><span>03</span><h3>从颜色到场景</h3><p>四套 CMFD 方向先在手机上拉开角色，再进入真实尺度的手机、平板与音频场景验证。</p></div>
          <EvidenceImage src="05.jpg" alt="四套手机 CMF 配色方向" className="wide" />
          <div className="scene-grid"><EvidenceImage src="06.jpg" alt="手机户外场景视觉" /><EvidenceImage src="07.jpg" alt="平板户外场景视觉" /><EvidenceImage src="08.jpg" alt="音频配件户外场景视觉" /></div>
        </div>
      </section>

      <section className="section colors-section">
        <ColorCarousel />
        <EvidenceImage src="13.jpg" alt="四套配色的线下营销空间延展" className="retail" />
        <p className="retail-caption"><span>RETAIL EXTENSION</span> 四套 CMFD 主题进一步延伸至陈列材质、分区色彩与完整产品生态。</p>
      </section>

      <section className="section result" id="result">
        <div className="section-label"><span>04</span><p>RESULT</p></div>
        <div className="result-lead"><p className="small-label">FIRST-ROUND DESIGN REVIEW</p><h2>两周，从概念启动<br />走到第一轮提案。</h2></div>
        <div className="quote-card"><span>“</span><blockquote>淬火黑具有强设计记忆点。一体金属凹槽大装饰件的耐用感与识别度在线，为下一轮配色迭代奠定了方向。</blockquote><p>工业设计一级部门 Leader 评审反馈</p><em>下一步：继续强化大装饰件的独特质感，同时校准整体设计感。</em></div>
        <div className="outcome-grid">
          <article><span>01</span><h3>方向进入聚焦</h3><p>“自然共生”从六个主题中进入下一轮三个重点迭代方向。</p></article>
          <article><span>02</span><h3>记忆点被确认</h3><p>淬火黑与一体金属凹槽大装饰件，成为配色与工艺继续深化的核心。</p></article>
          <article><span>03</span><h3>冲刺目标达成</h3><p>借助 GenAI 快速表达，在两周内完成从概念启动到第一轮概念提案。</p></article>
        </div>
        <footer><p>PROJECT 04 · P90 N+1 DESIGN LANGUAGE</p><a href="#top">回到顶部 ↑</a></footer>
      </section>
      </main>
      <Footer nextHref="/work/value-tier-portfolio" nextLabel="Strategy & Portfolio" />
    </div>
  );
}
