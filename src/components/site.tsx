"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Download, ExternalLink, Github, Globe2, Linkedin, MapPin, Menu, Phone, X } from "lucide-react";
import { certifications, education, expertise, experience, profile } from "@/data/cv";

const navItems = ["Home", "About", "Expertise", "Experience", "Education", "Contact"];

export function DownloadCVButton({ compact = false, sage = false }: { compact?: boolean; sage?: boolean }) {
  return <button className={`button ${sage ? "button-sage" : "button-dark"} ${compact ? "button-small" : ""}`} onClick={() => window.print()} aria-label="Print or save CV as PDF"><Download size={15} strokeWidth={1.8} /> <span>Download CV</span></button>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: "easeOut" }}>{children}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-30% 0px -60% 0px" });
    navItems.forEach((item) => { const el = document.getElementById(item.toLowerCase()); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <header className="navbar"><div className="nav-inner wrap"><a className="wordmark" href="#home" aria-label="Tehreem Fatima, home">TF<span>.</span></a><nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">{navItems.map((item) => <a key={item} className={active === item.toLowerCase() ? "nav-active" : ""} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}<div className="mobile-download"><DownloadCVButton compact /></div></nav><div className="nav-actions"><DownloadCVButton compact /><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div></header>;
}

function SocialLinks() {
  return <div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin /></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github /></a><a href={profile.portfolio} target="_blank" rel="noreferrer" aria-label="Code Avenue portfolio"><Globe2 /></a></div>;
}

function SectionHeading({ eyebrow, title, index }: { eyebrow: string; title: string; index: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><span className="section-index">{index}</span></div>;
}

function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({ initial: reduce ? false as const : { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: reduce ? 0 : delay } });
  return <section className="hero wrap" id="home"><div className="hero-copy"><motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.5 }}>INDEPENDENT PRACTICE · LAHORE, PAKISTAN</motion.p><motion.h1 initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.06 }}>Tehreem<br /><em>Fatima</em><span className="period">.</span></motion.h1><motion.p className="hero-role" {...fade(0.24)}>{profile.headline}</motion.p><motion.p className="hero-intro" {...fade(0.34)}>Building digital experiences and developing strategies that help businesses grow.</motion.p><motion.p className="hero-detail" {...fade(0.42)}>Combining full-stack development, digital strategy, and analytical thinking to create functional digital solutions and meaningful online experiences.</motion.p><motion.div className="hero-ctas" {...fade(0.5)}><a className="button button-dark" href="#experience">Explore My Experience <ArrowRight size={15} /></a><DownloadCVButton sage /></motion.div><motion.div className="hero-social" {...fade(0.58)}><SocialLinks /><a className="text-link" href={profile.portfolio} target="_blank" rel="noreferrer">Code Avenue <ArrowUpRight size={14} /></a></motion.div></div><div className="hero-aside"><div className="hero-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-center"><span>TF</span><i>Web · Strategy · Growth</i></div><span className="orbit-dot dot-one"/><span className="orbit-dot dot-two"/><span className="orbit-dot dot-three"/></div><div className="aside-note"><span className="note-line"/><p>Thoughtful digital work,<br />from first idea to launch.</p></div><a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown size={15} /></a></div></section>;
}

function About() { return <section className="section wrap" id="about"><Reveal><SectionHeading eyebrow="A little about me" title="About Me" index="01 / 06" /></Reveal><div className="about-grid"><Reveal className="about-lead"><p>Two disciplines.<br />One <em>curious mind.</em></p><span>Technical craft meets thoughtful strategy.</span></Reveal><Reveal className="about-body"><p>{profile.summary}</p><div className="about-location"><MapPin size={15} /> Lahore, Pakistan</div></Reveal></div></section>; }

function Expertise() { return <section className="section expertise-section" id="expertise"><div className="wrap"><Reveal><SectionHeading eyebrow="What I bring" title="Areas of expertise" index="02 / 06" /></Reveal><div className="expertise-grid">{expertise.map((area) => <Reveal key={area.title} className="expertise-card"><div className="expertise-title"><span>{area.number}</span><h3>{area.title}</h3></div>{area.groups.map((group) => <div className="skill-group" key={group.label}><h4>{group.label}</h4><ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</Reveal>)}</div></div></section>; }

function Experience() { return <section className="section wrap" id="experience"><Reveal><SectionHeading eyebrow="Where I have worked" title="Experience" index="03 / 06" /></Reveal><div className="timeline">{experience.map((item, index) => <Reveal className="timeline-item" key={item.organisation}><div className="timeline-marker"><span>0{index + 1}</span></div><div className="timeline-content"><div className="timeline-top"><div><p className="eyebrow">{item.arrangement}</p><h3>{item.role}</h3><p className="organisation">{item.organisation}</p></div>{item.start && <span className="date-label">Since {item.start}</span>}</div>{item.bullets && <ul className="experience-list">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div></Reveal>)}</div></section>; }

function Portfolio() { return <section className="portfolio-section"><div className="wrap portfolio-layout"><Reveal><div className="portfolio-preview"><div className="preview-top"><span className="preview-mark">CA<span>.</span></span><span className="preview-site">codeavenuepk.com <ArrowUpRight size={13} /></span></div><div className="preview-body"><span className="preview-kicker">CODE AVENUE · LAHORE</span><p>Designing<br /><em>what’s next.</em></p><div className="preview-rule"/><span className="preview-caption">WEB DEVELOPMENT & DIGITAL MARKETING</span></div><div className="preview-bottom"><span>Creative technology for growing businesses.</span><ArrowUpRight size={16} /></div></div></Reveal><Reveal className="portfolio-copy"><p className="eyebrow">Selected presence</p><h2>One home for<br /><em>digital growth.</em></h2><p className="portfolio-description"><strong>Code Avenue — Web Development & Digital Marketing</strong><br />Professional portfolio showcasing web development projects, digital solutions, and digital marketing services.</p><a href={profile.portfolio} className="button button-light" target="_blank" rel="noreferrer">Visit Code Avenue <ExternalLink size={15} /></a></Reveal></div></section>; }

function Education() { return <section className="section wrap" id="education"><Reveal><SectionHeading eyebrow="Learning & credentials" title="Education & certifications" index="04 / 06" /></Reveal><div className="education-layout"><Reveal className="education-card"><p className="eyebrow">Education</p><span className="education-mark">ED</span><div className="education-entries">{education.map((item, index) => <div className="education-entry" key={item.qualification}><span className="education-entry-index">0{index + 1}</span><h3>{item.qualification}</h3><p>{item.institution}</p></div>)}</div></Reveal><div className="cert-list">{certifications.map((cert, index) => <Reveal className="cert-item" key={cert.title}><span className="cert-number">0{index + 1}</span><div><h3>{cert.title}</h3><p>{cert.issuer}</p></div><time>{cert.date ?? ""}</time></Reveal>)}</div></div></section>; }

function Contact() { return <section className="contact-section" id="contact"><div className="wrap"><Reveal><SectionHeading eyebrow="Let’s connect" title="Good work starts with a conversation." index="05 / 06" /></Reveal><div className="contact-grid"><Reveal className="contact-lead"><p>Have a project in mind, or simply want to say hello? I’d be glad to hear from you.</p><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight /></a></Reveal><Reveal className="contact-details"><a href={`tel:${profile.phone.replaceAll(" ", "")}`}><span><Phone /></span>{profile.phone}<ArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span><Linkedin /></span>LinkedIn <ArrowUpRight /></a><a href={profile.github} target="_blank" rel="noreferrer"><span><Github /></span>GitHub <ArrowUpRight /></a><a href={profile.portfolio} target="_blank" rel="noreferrer"><span><Globe2 /></span>Code Avenue <ArrowUpRight /></a></Reveal></div></div></section>; }

export function Site() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <><Navbar /><main><Hero /><About /><Expertise /><Experience /><Portfolio /><Education /><Contact /></main><footer className="footer"><div className="wrap footer-inner"><div><a className="wordmark footer-mark" href="#home">TF<span>.</span></a><p>{profile.headline}</p></div><SocialLinks /><a className="back-top" href="#home">Back to top <ArrowUp size={14} /></a><span className="copyright">© {year ?? ""} Tehreem Fatima</span></div></footer><PrintableCV /></>;
}

function PrintableCV() {
  return <article className="print-cv" aria-label="Printable CV"><header className="cv-header"><h1>{profile.name}</h1><p>{profile.headline}</p><div className="cv-contact">{profile.location} · {profile.email} · {profile.phone}<br />{profile.linkedin} · {profile.github} · {profile.portfolio}</div></header><section><h2>Professional Summary</h2><p>{profile.summary}</p></section><section><h2>Core Expertise</h2>{expertise.map((area) => <div className="cv-skill-area" key={area.title}><h3>{area.title}</h3>{area.groups.map((group) => <p key={group.label}><strong>{group.label}: </strong>{group.items.join(", ")}</p>)}</div>)}</section><section><h2>Professional Experience</h2>{experience.map((item) => <div className="cv-entry" key={item.organisation}><h3>{item.role}</h3><p><strong>{item.organisation}</strong> · {item.arrangement}{item.start ? ` · Since ${item.start}` : ""}</p>{item.bullets && <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>)}</section><section><h2>Education</h2>{education.map((item) => <div className="cv-entry" key={item.qualification}><h3>{item.qualification}</h3><p>{item.institution}</p></div>)}</section><section><h2>Certifications</h2>{certifications.map((cert) => <div className="cv-entry cv-cert" key={cert.title}><p><strong>{cert.title}</strong> — {cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</p></div>)}</section></article>;
}
