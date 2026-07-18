"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface JourneyItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "milestone";
}

const JOURNEY_DATA: JourneyItem[] = [
  {
    year: "2024 - Present",
    title: "Freelance Full-Stack Developer",
    company: "Independent Contracts",
    description: "Building premium React, Next.js, and mobile applications with integrated SUPABASE backends and tailored animations.",
    type: "work"
  },
  {
    year: "2022 - 2024",
    title: "Mobile App Developer",
    company: "Creative Design Studio",
    description: "Specialized in cross-platform mobile development using Flutter and Dart, optimizing reactive architecture and state tracking.",
    type: "work"
  },
  {
    year: "2020 - 2022",
    title: "Front-End Engineer",
    company: "Nexa Digital Agency",
    description: "Crafted interactive landing pages, web tools, and charts using React, HTML5, and high-fidelity custom CSS systems.",
    type: "work"
  },
  {
    year: "2016 - 2019",
    title: "B.S. in Computer Science",
    company: "University of Creative Technology",
    description: "Gained foundational systems engineering knowledge while specializing in human-computer interaction models.",
    type: "education"
  }
];

export default function About() {
  const [activeTimelineTab, setActiveTimelineTab] = useState<"all" | "work" | "education">("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  // Scroll and Cursor Glow Listeners
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Cursor Glow tracking
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    const speed = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    const animateGlow = () => {
      glowX += (mouseX - glowX) * speed;
      glowY += (mouseY - glowY) * speed;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${glowX}px`;
        cursorGlowRef.current.style.top = `${glowY}px`;
      }
      frameId = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Particle Canvas System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const activeCanvas = canvas;
    const activeCtx = ctx;
    const mouse = { x: 0, y: 0 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * activeCanvas.width;
        this.y = Math.random() * activeCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      draw() {
        activeCtx.beginPath();
        activeCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        activeCtx.fillStyle = `rgba(211, 24, 24, ${this.alpha * 0.6})`;
        activeCtx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > activeCanvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > activeCanvas.height) this.vy = -this.vy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 1200;
          this.x -= dx * force;
          this.y -= dy * force;
        }
      }
    }

    let particles: Particle[] = [];
    let maxParticles = 50;

    const handleResize = () => {
      activeCanvas.width = window.innerWidth;
      activeCanvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    particles = Array.from({ length: maxParticles }, () => new Particle());

    let animationFrameId: number;
    const draw = () => {
      activeCtx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      <canvas id="particle-canvas" ref={canvasRef}></canvas>
      <div id="cursor-glow" ref={cursorGlowRef}></div>

      {/* Navbar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link href="/" className="nav-brand-group">
            <span className="nav-brand-title">YORM SANTI</span>
            <span className="nav-brand-subtitle">WEB DEVELOPER & CREATOR</span>
          </Link>
          <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link active">About</Link>
            <Link href="/#skills" className="nav-link">Skills</Link>
            <Link href="/#projects" className="nav-link">Projects</Link>
            <Link href="/#contact" className="nav-link btn-contact-nav">Contact</Link>
          </nav>
          <div className="nav-availability-badge">
            <span>AVAILABLE FOR HIRE</span>
            <i className="fa-solid fa-star-of-life text-red animate-spin-slow"></i>
          </div>
          <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }} className="page-enter">
        {/* Intro Section */}
        <section className="section-container" style={{ marginBottom: "6rem" }}>
          <div className="section-header">
            <span className="section-subtitle">Biography</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider"></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "start" }} className="responsive-about-grid">
            {/* Left Story Column */}
            <div>
              <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--accent-red)" }}>
                Designing High-Performance Digital Experiences
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.7" }}>
                Hello, my name is <strong>Yorm Santi</strong>. I am a full-stack web developer and creative designer. I specialize in crafting interactive user interfaces, structured components, and reactive cross-platform mobile apps.
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.7" }}>
                My journey began with design and basic front-end tools, eventually expanding into sophisticated architecture like Next.js Server Components, custom rendering layers, type-safe API schemas, and native Flutter modules. I focus on creating polished transitions, robust code optimization, and attention to detail.
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1.05rem", lineHeight: "1.7" }}>
                When I am not writing code, I research new web metrics, design custom icon architectures, and explore immersive typography systems.
              </p>

              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/#contact" className="btn btn-primary">Hire Me <i className="fa-solid fa-arrow-right"></i></Link>
                <Link href="/#projects" className="btn btn-secondary">View Work</Link>
              </div>
            </div>

            {/* Right Column: Profile Image + Core Philosophy */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {/* Profile Avatar Card */}
              <div 
                className="skills-category-card interactive-card"
                onMouseMove={handleCardMouseMove}
                style={{ 
                  "--category-color": "var(--accent-red)", 
                  padding: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                } as React.CSSProperties}
              >
                <div style={{ position: "relative", width: "100%", maxWidth: "260px", aspectRatio: "1/1" }}>
                  <div className="hero-avatar-glow" style={{ position: "absolute", width: "100%", height: "100%" }}></div>
                  <Image 
                    src="/images/avatar.png" 
                    alt="Yorm Santi" 
                    className="hero-avatar-img" 
                    fill
                    sizes="260px"
                    priority
                  />
                </div>
              </div>

              {/* Core Philosophy Card */}
              <div 
                className="skills-inspector-card interactive-card"
                onMouseMove={handleCardMouseMove}
                style={{ "--active-color": "var(--accent-red)", padding: "2.5rem" } as React.CSSProperties}
              >
                <div className="inspector-card-glow"></div>
                <h3 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>Core Philosophy</h3>
                
                <ul style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 2 }}>
                <li style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                  <i className="fa-solid fa-bolt" style={{ color: "var(--accent-red)", fontSize: "1.2rem", marginTop: "3px" }}></i>
                  <div>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>Performance First</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Creating lightweight applications with optimized page load speeds and clean assets.</span>
                  </div>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                  <i className="fa-solid fa-cubes" style={{ color: "var(--accent-red)", fontSize: "1.2rem", marginTop: "3px" }}></i>
                  <div>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>Modular Architecture</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Designing reusable design systems, type schemas, and container builds.</span>
                  </div>
                </li>
                <li style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                  <i className="fa-solid fa-bezier-curve" style={{ color: "var(--accent-red)", fontSize: "1.2rem", marginTop: "3px" }}></i>
                  <div>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>Creative Transitions</strong>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Utilizing physics-based animations, spotlights, and micro-interactions.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Journey Timeline Section */}
        <section className="section-container" style={{ marginBottom: "8rem" }}>
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <span className="section-subtitle">History</span>
            <h2 className="section-title">My Professional Journey</h2>
            <div className="section-divider"></div>
          </div>

          {/* Filters */}
          <div className="projects-filter-bar" style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
            <button 
              type="button" 
              className={`filter-tag ${activeTimelineTab === "all" ? "active" : ""}`} 
              onClick={() => setActiveTimelineTab("all")}
            >
              ALL STEPS
            </button>
            <button 
              type="button" 
              className={`filter-tag ${activeTimelineTab === "work" ? "active" : ""}`} 
              onClick={() => setActiveTimelineTab("work")}
            >
              WORK HISTORY
            </button>
            <button 
              type="button" 
              className={`filter-tag ${activeTimelineTab === "education" ? "active" : ""}`} 
              onClick={() => setActiveTimelineTab("education")}
            >
              EDUCATION
            </button>
          </div>

          {/* Timeline Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            {JOURNEY_DATA.filter((item) => activeTimelineTab === "all" || item.type === activeTimelineTab).map((item, idx) => (
              <div 
                key={idx}
                className="skills-category-card interactive-card"
                onMouseMove={handleCardMouseMove}
                style={{ 
                  "--category-color": item.type === "work" ? "var(--accent-red)" : "var(--text-muted)",
                  padding: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "2rem"
                } as React.CSSProperties}
              >
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "start" }}>
                  <div className="skills-card-icon" style={{ flexShrink: 0, color: item.type === "work" ? "var(--accent-red)" : "var(--text-muted)" }}>
                    <i className={item.type === "work" ? "fa-solid fa-briefcase" : "fa-solid fa-graduation-cap"}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-red)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.year}</span>
                    <h4 style={{ fontSize: "1.25rem", margin: "0.25rem 0", color: "var(--text-primary)" }}>{item.title}</h4>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "block", marginBottom: "0.75rem" }}>{item.company}</span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container footer-grid">
          {/* Brand & Contact */}
          <div className="footer-brand">
            <span className="footer-logo">YORM SANTI</span>
            <p className="footer-tagline">Designing and building stylish, user-focused web applications and mobile experiences.</p>
            <div className="footer-contact-info">
              <a href="mailto:yormsanti38@gmail.com" className="footer-contact-link">
                <i className="fa-solid fa-envelope"></i> yormsanti38@gmail.com
              </a>
              <a href="tel:011256124" className="footer-contact-link">
                <i className="fa-solid fa-phone"></i> 011256124
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="footer-nav">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Me</Link></li>
              <li><Link href="/#skills">Skills</Link></li>
              <li><Link href="/#projects">Projects</Link></li>
            </ul>
          </div>
          
          {/* Socials & Status */}
          <div className="footer-status">
            <div className="footer-status-badge">
              <span className="pulse-dot"></span>
              <span>Available for Hire</span>
            </div>
            <div className="footer-socials">
              <a href="https://github.com/YormSanti" target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="mailto:yormsanti38@gmail.com" aria-label="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; 2026 Yorm Santi. All rights reserved. Crafted with clean code.</p>
          <Link href="/about" className="back-to-top">Back to top <i className="fa-solid fa-arrow-up"></i></Link>
        </div>
      </footer>
    </>
  );
}
