type ProjectCardProps = { number: string; title: string; english: string; subtitle: string; href: string; image: string };

export function GlobalNav() {
  return <header className="portfolio-nav"><a className="portfolio-brand" href="/"><strong>kelli deng</strong><span>portfolio 2026</span></a><nav aria-label="Global navigation"><a href="/work">Work</a><a href="/approach">Approach</a><a href="/about">About</a></nav></header>;
}

export function Footer({ nextHref, nextLabel }: { nextHref?: string; nextLabel?: string }) {
  return <>{nextHref && <a className="portfolio-next" href={nextHref}><span>Next Project</span><strong>{nextLabel} →</strong></a>}<footer className="portfolio-footer"><div><strong>Kelli 邓楮月</strong><span>Strategic Designer</span></div><nav><a href="/work">Work</a><a href="/approach">Approach</a><a href="/about">About</a></nav><nav><a href="mailto:kell1o02kelli@gmail.com?subject=Portfolio%20Enquiry" target="_top">Contact</a><a href="/resume/Kelli-Deng-Resume-2026.pdf" download>Download Resume</a></nav><small>© 2026 Kelli. All rights reserved.</small></footer></>;
}

export function ProjectCard({ number, title, english, subtitle, href, image }: ProjectCardProps) {
  return <a className="portfolio-project-card" href={href}><figure><img src={image} alt="" /></figure><div className="portfolio-project-meta"><span className="portfolio-project-number">{number}</span><div><p>{subtitle}</p><h3>{title}</h3><h4>{english}</h4></div><span className="portfolio-arrow" aria-hidden="true">↗</span></div></a>;
}
