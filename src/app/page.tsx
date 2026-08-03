"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import SmartAvatar from "@/components/SmartAvatar";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  highlights: { label: string; value: string }[];
  client: string;
  date: string;
  stack: string[];
  demo: string;
  repo: string;
}

interface SkillItem {
  name: string;
  percentage: number;
  description: string;
  subskills: string[];
  projects: string[];
  color: string;
  icon: string;
}

// Fallback project data for immediate offline render
const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Nexa AI Analytics Dashboard",
    category: "Web Application",
    image: "/images/dashboard.jpg",
    gallery: ["/images/dashboard.jpg", "/images/web3d.jpg", "/images/mobile.jpg"],
    description: "Nexa is an immersive SaaS analytics platform mapping complex artificial intelligence infrastructure. Built for enterprise devops and ML engineers, Nexa displays GPU utilization, token counts, system temperature, API request volumes, and active billing tiers in real time.",
    features: [
      "Real-time GPU metric streaming over WebSockets",
      "Dynamic interactive charts built with Chart.js & D3",
      "Multi-tenant RBAC access control dashboard",
      "Automated alerting rules & threshold monitoring"
    ],
    highlights: [
      { label: "Performance", value: "99 / 100" },
      { label: "Stream Latency", value: "< 15 ms" },
      { label: "Active Nodes", value: "500+" }
    ],
    client: "Nexa Corp Inc.",
    date: "June 2025",
    stack: ["Next.js", "TypeScript", "Chart.js", "Vanilla CSS", "Docker"],
    demo: "https://yormsanti.design",
    repo: "https://github.com/YormSanti"
  },
  {
    id: "2",
    title: "Odyssey Immersive Travel Guide",
    category: "Mobile Application",
    image: "/images/mobile.jpg",
    gallery: ["/images/mobile.jpg", "/images/dashboard.jpg", "/images/web3d.jpg"],
    description: "Odyssey transforms typical travel planning into a sensory interactive story. Designed for tablets and mobile devices, Odyssey acts as a digital curator, using high-definition imagery and regional soundscapes to map historical sites. The app UI is built entirely in Flutter, utilizing Riverpod for state management.",
    features: [
      "Location-aware offline map tiles & GPS waypoints",
      "Bespoke audio engine with ambient soundscape mixing",
      "Interactive 3D landmark viewer with touch gestures",
      "Social itinerary sharing & trip planning timeline"
    ],
    highlights: [
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Downloads", value: "100k+" }
    ],
    client: "Odyssey Travel Ltd.",
    date: "Feb 2024",
    stack: ["Flutter", "Dart", "Riverpod", "Lottie"],
    demo: "https://yormsanti.design",
    repo: "https://github.com/YormSanti"
  },
  {
    id: "3",
    title: "Aura Automotive Configurator",
    category: "Flutter Web App",
    image: "/images/web3d.jpg",
    gallery: ["/images/web3d.jpg", "/images/mobile.jpg", "/images/dashboard.jpg"],
    description: "Aura Automotive is an elite vehicle configurator allowing luxury buyers to customize electric sports cars. Integrated with a Flutter Web framework, users customize body materials, paint reflections, wheel rims, and interior stitching in real time.",
    features: [
      "Real-time WebGL material rendering & PBR shaders",
      "360-degree vehicle interior & exterior camera rotation",
      "Instant price calculation based on custom trims",
      "High-resolution PDF build sheet exporter"
    ],
    highlights: [
      { label: "Render Engine", value: "Three.js / WebGL" },
      { label: "Paint Options", value: "24 Custom Trims" },
      { label: "Conversion Rate", value: "+38%" }
    ],
    client: "Aura Motors LLC",
    date: "November 2024",
    stack: ["Flutter", "Dart", "Three.js", "WebGL"],
    demo: "https://yormsanti.design",
    repo: "https://github.com/YormSanti"
  }
];

const SKILLS_DATA: { category: string; icon: string; items: SkillItem[] }[] = [
  {
    category: "Web Engineering",
    icon: "fa-solid fa-code",
    items: [
      {
        name: "React / Next.js",
        percentage: 94,
        description: "Deep expertise in server-side rendering, static site generation, server components, and state optimization using React 19 and Next.js App Router.",
        subskills: ["React Server Components", "App Router", "Suspense", "Zustand", "Context API"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(193, 95%, 68%)",
        icon: "fa-brands fa-react"
      },
      {
        name: "JavaScript / TypeScript",
        percentage: 92,
        description: "Strong command of modern ES6+ Javascript and strict TypeScript configuration for bulletproof type safety and compile-time correctness.",
        subskills: ["Asynchronous Programming", "Generics & Advanced Types", "ES Modules", "Vite / Turbopack"],
        projects: ["Nexa AI Analytics Dashboard", "Aura Automotive Configurator"],
        color: "hsl(211, 80%, 60%)",
        icon: "fa-brands fa-js"
      },
      {
        name: "HTML5 / Vanilla CSS3",
        percentage: 95,
        description: "Semantic markup and high-fidelity stylesheet architecture utilizing modern CSS variables, Grid, Flexbox, and CSS modules.",
        subskills: ["CSS Grid & Flexbox", "Custom Variables", "CSS Modules", "Responsive Layouts"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(14, 90%, 61%)",
        icon: "fa-brands fa-css3-alt"
      },
      {
        name: "Performance & SEO",
        percentage: 90,
        description: "Audit and implementation of Core Web Vitals optimizations, lazy loading, script strategy, and search engine metadata.",
        subskills: ["Lighthouse Audits", "Image Optimization", "Core Web Vitals", "SEO Metadata"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(145, 80%, 50%)",
        icon: "fa-solid fa-gauge-high"
      }
    ]
  },
  {
    category: "Flutter & Mobile Dev",
    icon: "fa-solid fa-mobile-screen-button",
    items: [
      {
        name: "Flutter Framework",
        percentage: 95,
        description: "Comprehensive knowledge of the Flutter ecosystem for constructing high-performance native cross-platform mobile apps.",
        subskills: ["Custom Painters & Canvas", "Platform Channels", "Native Integrations", "Dart FFI"],
        projects: ["Odyssey Immersive Travel Guide", "Aura Automotive Configurator"],
        color: "hsl(202, 90%, 55%)",
        icon: "fa-solid fa-mobile-screen-button"
      },
      {
        name: "Dart Programming",
        percentage: 90,
        description: "Clean asynchronous code design using Streams, Futures, sound null-safety, and generic programming paradigms.",
        subskills: ["Sound Null-Safety", "Asynchronous streams", "Isolates / Multi-threading", "Generics"],
        projects: ["Odyssey Immersive Travel Guide", "Aura Automotive Configurator"],
        color: "hsl(184, 90%, 45%)",
        icon: "fa-solid fa-terminal"
      },
      {
        name: "Riverpod / Bloc",
        percentage: 88,
        description: "Robust, testable architectural patterns for predictable data flow, modular separation of concern, and state tracking.",
        subskills: ["Riverpod Providers", "Bloc Pattern", "Reactive Architectures", "Dependency Injection"],
        projects: ["Odyssey Immersive Travel Guide"],
        color: "hsl(262, 80%, 60%)",
        icon: "fa-solid fa-layer-group"
      },
      {
        name: "Custom UI Canvas",
        percentage: 85,
        description: "Bespoke animations, motion-matching gestures, and physics-based interactions using custom painters.",
        subskills: ["Custom Painters", "Physics Simulations", "Lottie Animations", "Gesture Arena"],
        projects: ["Odyssey Immersive Travel Guide", "Aura Automotive Configurator"],
        color: "hsl(38, 95%, 55%)",
        icon: "fa-solid fa-wand-magic-sparkles"
      }
    ]
  },
  {
    category: "Backend & Integrations",
    icon: "fa-solid fa-server",
    items: [
      {
        name: "FastAPI / Python",
        percentage: 85,
        description: "High-performance asynchronous backend services with automatic API documentation and dependency injection.",
        subskills: ["Pydantic Validation", "Async/Await API handlers", "SQLAlchemy ORM", "Uvicorn deployment"],
        projects: [],
        color: "hsl(208, 60%, 45%)",
        icon: "fa-brands fa-python"
      },
      {
        name: "Firebase / Supabase",
        percentage: 90,
        description: "Cloud backend integration including realtime databases, authorization rules, storage, and serverless edge functions.",
        subskills: ["Supabase Auth & RLS", "Firestore database", "Edge Functions", "Realtime Synced DB"],
        projects: [],
        color: "hsl(35, 95%, 55%)",
        icon: "fa-solid fa-cloud"
      },
      {
        name: "RESTful / GraphQL APIs",
        percentage: 88,
        description: "Scalable endpoint schemas design ensuring efficient payload serialization and query optimization.",
        subskills: ["JSON REST specs", "GraphQL Schema & Resolvers", "Apollo client", "CORS/Security headers"],
        projects: [],
        color: "hsl(319, 90%, 55%)",
        icon: "fa-solid fa-network-wired"
      },
      {
        name: "Docker / Database / CD",
        percentage: 80,
        description: "Containerization, relational schema design, index optimization, and modern CI/CD deployment pipelines.",
        subskills: ["Docker Multi-stage Builds", "SQL Queries & Indexing", "GitHub Actions CI/CD", "Vercel / AWS hosting"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(217, 90%, 60%)",
        icon: "fa-brands fa-docker"
      }
    ]
  },
  {
    category: "Design & Tooling",
    icon: "fa-solid fa-compass-drafting",
    items: [
      {
        name: "Tailwind CSS",
        percentage: 92,
        description: "Utility-first design systems, responsive layouts, dark mode states, and glassmorphic micro-interactions.",
        subskills: ["Utility Classes", "Custom Plugins", "Design Tokens", "Dark Mode", "JIT Compiler"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(198, 93%, 60%)",
        icon: "fa-solid fa-wind"
      },
      {
        name: "Node.js & Express",
        percentage: 88,
        description: "Event-driven backend microservices, RESTful endpoints, middleware architecture, and WebSocket connections.",
        subskills: ["Express.js", "Event Loop", "JWT Auth", "Streams & Buffers", "WebSockets"],
        projects: ["Nexa AI Analytics Dashboard"],
        color: "hsl(120, 48%, 54%)",
        icon: "fa-brands fa-node-js"
      },
      {
        name: "Git & Version Control",
        percentage: 95,
        description: "Collaborative branch management, rebase workflows, release tagging, pull request code reviews, and CI/CD.",
        subskills: ["Git Rebase & Merge", "GitHub Actions", "Semantic Versioning", "Branching Models"],
        projects: ["Nexa AI Analytics Dashboard", "Odyssey Immersive Travel Guide"],
        color: "hsl(9, 100%, 62%)",
        icon: "fa-brands fa-git-alt"
      },
      {
        name: "Figma & UI/UX Design",
        percentage: 89,
        description: "Transforming product visions into high-fidelity UI component libraries, design systems, and interactive user flows.",
        subskills: ["Auto-Layout", "Design Systems", "Interactive Prototypes", "Component Libraries"],
        projects: ["Odyssey Immersive Travel Guide", "Aura Automotive Configurator"],
        color: "hsl(340, 82%, 52%)",
        icon: "fa-brands fa-figma"
      }
    ]
  }
];

interface TechBadge {
  name: string;
  icon: string;
  isCustomText?: string;
}

const TECH_BADGES: TechBadge[] = [
  { name: "C", icon: "fa-solid fa-c", isCustomText: "C" },
  { name: "C++", icon: "fa-solid fa-code", isCustomText: "C++" },
  { name: "Java", icon: "fa-brands fa-java" },
  { name: "Python", icon: "fa-brands fa-python" },
  { name: "JavaScript", icon: "fa-brands fa-js" },
  { name: "React", icon: "fa-brands fa-react" },
  { name: "Next.js", icon: "fa-solid fa-n", isCustomText: "N" },
  { name: "Tailwind", icon: "fa-solid fa-wind" },
  { name: "Node.js", icon: "fa-brands fa-node-js" },
  { name: "SQL", icon: "fa-solid fa-database" },
  { name: "PostgreSQL", icon: "fa-solid fa-server" },
  { name: "MongoDB", icon: "fa-solid fa-leaf" },
  { name: "JUnit", icon: "fa-solid fa-vial" },
  { name: "JMeter", icon: "fa-solid fa-gauge-high" },
  { name: "Git", icon: "fa-brands fa-git-alt" },
  { name: "GitHub", icon: "fa-brands fa-github" },
  { name: "Docker", icon: "fa-brands fa-docker" }
];

export default function Home() {
  // State variables
  const projects = FALLBACK_PROJECTS;
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "features">("overview");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const statusText = "Available for Freelance & Contracts";
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0].items[0]);
  const [selectedTechCard, setSelectedTechCard] = useState<string>("C");
  
  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ text: "", type: "" });

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  // --- Animations, Scroll Listeners & Glow Effects ---
  useEffect(() => {
    // Loaded state for Hero
    if (heroRef.current) {
      heroRef.current.classList.add("loaded");
    }

    // Scroll handlers
    const handleScroll = () => {
      // Navbar scroll effect
      setIsScrolled(window.scrollY > 50);

      // Section scroll reveal
      const reveals = document.querySelectorAll(".scroll-reveal");
      const triggerBottom = window.innerHeight * 0.85;

      reveals.forEach((el) => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
          el.classList.add("revealed");
        }
      });

      // Active menu section selection
      const sections = ["hero", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 220;
      let currentSection = "hero";

      // Check if near bottom of page for contact section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        currentSection = "contact";
      } else {
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

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

  // --- Canvas Particles system ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const activeCanvas: HTMLCanvasElement = canvas;
    const activeCtx: CanvasRenderingContext2D = ctx;
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
    let maxParticles = 65;
    let connectionDistance = 110;

    const handleResize = () => {
      activeCanvas.width = window.innerWidth;
      activeCanvas.height = window.innerHeight;
      const targetCount = window.innerWidth < 768 ? 30 : 65;
      connectionDistance = window.innerWidth < 768 ? 80 : 110;
      if (maxParticles !== targetCount || particles.length === 0) {
        maxParticles = targetCount;
        particles = Array.from({ length: maxParticles }, () => new Particle());
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const draw = () => {
      activeCtx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            activeCtx.beginPath();
            activeCtx.moveTo(particles[i].x, particles[i].y);
            activeCtx.lineTo(particles[j].x, particles[j].y);
            activeCtx.strokeStyle = `rgba(211, 24, 24, ${alpha})`;
            activeCtx.lineWidth = 0.8;
            activeCtx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOpenProject = (proj: Project) => {
    setActiveProject(proj);
    setActiveImageIndex(0);
    setActiveModalTab("overview");
  };

  // --- Handle Contact Form Submission (Simulated Client-Side) ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormFeedback({ text: "", type: "" });

    // Simulate network delay
    setTimeout(() => {
      setFormLoading(false);
      setFormFeedback({
        text: `Thank you, ${formName}! Your message has been sent successfully. I will get back to you shortly.`,
        type: "success",
      });
      
      // Clear input fields
      setFormName("");
      setFormEmail("");
      setFormMessage("");

      // Clear feedback message after 6 seconds
      setTimeout(() => {
        setFormFeedback({ text: "", type: "" });
      }, 6000);
    }, 1500);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleToggleFilter = (filterName: string) => {
    if (activeFilter.toLowerCase() === filterName.toLowerCase()) {
      setActiveFilter("all");
    } else {
      setActiveFilter(filterName);
    }
  };

  const handleSelectTechFilter = (techName: string) => {
    let filterKey = techName;
    if (techName === "HTML5 / Vanilla CSS3") filterKey = "Vanilla CSS";
    if (techName === "React / Next.js") filterKey = "Next.js";
    if (techName === "JavaScript / TypeScript") filterKey = "TypeScript";
    if (techName === "Flutter Framework") filterKey = "Flutter";
    if (techName === "Dart Programming") filterKey = "Dart";
    if (techName === "Riverpod / Bloc") filterKey = "Riverpod";
    if (techName === "Custom UI Canvas") filterKey = "Three.js";
    if (techName === "Docker / Database / CD") filterKey = "Docker";
    if (techName === "Tailwind CSS") filterKey = "Vanilla CSS";
    if (techName === "Node.js & Express") filterKey = "TypeScript";
    if (techName === "Git & Version Control") filterKey = "Docker";
    if (techName === "Figma & UI/UX Design") filterKey = "Flutter";
    
    setActiveFilter(filterKey);
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <canvas id="particle-canvas" ref={canvasRef}></canvas>
      <div id="cursor-glow" ref={cursorGlowRef}></div>

      {/* Navbar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-brand-group">
            <span className="nav-brand-title">YORM SANTI</span>
            <span className="nav-brand-subtitle">WEB DEVELOPER & CREATOR</span>
          </a>
          <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <a href="#hero" className={`nav-link ${activeSection === "hero" ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#skills" className={`nav-link ${activeSection === "skills" ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a href="#projects" className={`nav-link ${activeSection === "projects" ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Projects</a>
            <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            <a href="#contact" className="nav-link btn-contact-nav" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <div className="mobile-theme-toggle-wrapper" style={{ marginTop: "1rem" }}>
              <ThemeToggle />
            </div>
          </nav>
          <div className="nav-right-actions">
            <div className="nav-availability-badge">
              <span>{statusText.toUpperCase()}</span>
              <i className="fa-solid fa-star-of-life text-red animate-spin-slow"></i>
            </div>
            <div className="desktop-theme-toggle-wrapper">
              <ThemeToggle />
            </div>
          </div>
          <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <main className="page-enter">
        {/* Hero Section */}
        <section id="hero" className="hero-section" ref={heroRef}>
          {/* Giant Background Text */}
          <div className="hero-bg-text">PORTFOLIO</div>
          
          <div className="section-container hero-grid-layout">
            {/* Left Column */}
            <div className="hero-col-left">
              <span className="hero-cursive-welcome fade-in-up" id="hero-status">Hello, I&apos;m</span>
              <h1 className="hero-display-name fade-in-up" id="hero-title-header">
                YORM <br />
                SANTI
              </h1>
              <span className="hero-display-subtitle fade-in-up" id="hero-subtitle">WEB DEVELOPER & CREATOR</span>
              <p className="hero-display-desc fade-in-up" id="hero-desc-p">
                I design and build stylish, user-focused web applications that combine creative interactions with high-performance code. Passionate about clean aesthetics, smooth transitions, and attention to detail.
              </p>
              <div className="hero-availability-footer">
                <i className="fa-solid fa-earth-americas text-red"></i>
                <span>AVAILABLE WORLDWIDE</span>
              </div>
            </div>

            {/* Center Column: Avatar Showcase */}
            <div className="hero-col-center fade-in-up" id="hero-avatar-showcase">
              <div className="hero-avatar-wrapper">
                <div className="hero-avatar-glow"></div>
                <SmartAvatar 
                  src="/images/avatar.png" 
                  alt="Yorm Santi - Portrait" 
                  className="hero-avatar-img" 
                />
              </div>
            </div>

            {/* Right Column: Metrics */}
            <div className="hero-col-right fade-in-up" id="hero-buttons">
              {/* Rotating target badge */}
              <div className="hero-rotating-badge">
                <div className="badge-spin-container">
                  <i className="fa-solid fa-star-of-life badge-star-icon"></i>
                </div>
              </div>

              <div className="hero-metrics-list">
                <div className="hero-metric-item">
                  <span className="metric-num">6+</span>
                  <span className="metric-text">YEARS <br /> EXPERIENCE</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-num">40+</span>
                  <span className="metric-text">PROJECTS <br /> COMPLETED</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-num">99%</span>
                  <span className="metric-text">CLIENT <br /> SATISFACTION</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span className="scroll-mouse"><span className="scroll-wheel"></span></span>
            <span className="scroll-text">Scroll Down</span>
          </div>
        </section>

        {/* Toolkit & Capabilities Section */}
        <section id="skills" className="skills-section scroll-reveal">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">Expertise</span>
              <h2 className="section-title">My Toolkit & Capabilities</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="skills-layout-wrapper">
              {/* Left Column: Categories and Skills Selection */}
              <div className="skills-categories-column">
                {SKILLS_DATA.map((cat, catIdx) => {
                  const catColors = ["hsl(193, 95%, 68%)", "hsl(202, 90%, 55%)", "hsl(165, 85%, 45%)"];
                  const categoryColor = catColors[catIdx] || "var(--accent-red)";
                  return (
                    <div
                      key={catIdx}
                      className="skills-category-card interactive-card"
                      onMouseMove={handleCardMouseMove}
                      style={{ "--category-color": categoryColor } as React.CSSProperties}
                    >
                      <div className="skills-category-header">
                        <div className="skills-card-icon" style={{ color: categoryColor, borderColor: `color-mix(in srgb, ${categoryColor} 20%, transparent)` }}><i className={cat.icon}></i></div>
                        <h3>{cat.category}</h3>
                      </div>
                      <div className="skills-interactive-list">
                        {cat.items.map((item, itemIdx) => {
                          const isSelected = selectedSkill.name === item.name;
                          return (
                            <button
                              key={itemIdx}
                              type="button"
                              className={`skill-item-row ${isSelected ? "active" : ""}`}
                              onClick={() => setSelectedSkill(item)}
                              style={{ "--skill-color": item.color } as React.CSSProperties}
                            >
                              <span className="skill-item-name-group">
                                <i className={`${item.icon} skill-item-mini-icon`}></i>
                                <span className="skill-item-title">{item.name}</span>
                              </span>
                              <span className="skill-item-percent">{item.percentage}%</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle Column: Orbiting Stack Visual */}
              <div className="skills-orbit-column">
                <div className="orbit-wrapper">
                  {/* Silhouette Background */}
                  <div className="orbit-skyline-bg">
                    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M0 250 L80 250 L90 200 L95 200 L100 150 L105 150 L110 100 L115 100 L120 70 L125 70 L130 100 L135 100 L140 150 L145 150 L150 200 L155 200 L165 250 L180 250 L190 190 L195 190 L200 130 L205 130 L210 60 L215 60 L220 30 L225 30 L230 60 L235 60 L240 130 L245 130 L250 190 L255 190 L265 250 L280 250 L290 205 L295 205 L300 155 L305 155 L310 105 L315 105 L320 75 L325 75 L330 105 L335 105 L340 155 L345 155 L350 205 L355 205 L400 250 L400 300 L0 300 Z" 
                        fill="rgba(255, 255, 255, 0.02)"
                      />
                    </svg>
                  </div>

                  {/* Soft blurred color spots */}
                  <div className="orbit-glow-spot spot-1"></div>
                  <div className="orbit-glow-spot spot-2"></div>

                  {/* Rotating Ring */}
                  <div className="orbit-ring">
                    {SKILLS_DATA.flatMap(cat => cat.items).map((item, idx, arr) => {
                      const angle = (idx * 360) / arr.length;
                      const radians = (angle * Math.PI) / 180;
                      const r = 135; // orbit radius
                      const x = r * Math.cos(radians);
                      const y = r * Math.sin(radians);
                      
                      const isSelected = selectedSkill.name === item.name;
                      
                      return (
                        <button
                          key={idx}
                          type="button"
                          className={`orbit-item ${isSelected ? "active" : ""}`}
                          onClick={() => setSelectedSkill(item)}
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                            "--brand-color": item.color
                          } as React.CSSProperties}
                          title={item.name}
                        >
                          <div className="orbit-item-icon-wrapper">
                            <i className={item.icon}></i>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Center Glowing Hub */}
                  <div className="orbit-center" style={{ "--active-color": selectedSkill.color } as React.CSSProperties}>
                    <div className="orbit-center-glow"></div>
                    <div className="orbit-center-icon-wrapper">
                      <i className={selectedSkill.icon}></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Skill Inspector Details Panel */}
              <div className="skills-inspector-column">
                <div 
                  className="skills-inspector-card interactive-card" 
                  onMouseMove={handleCardMouseMove}
                  style={{ "--active-color": selectedSkill.color } as React.CSSProperties}
                >
                  <div className="inspector-card-glow"></div>
                  <div className="inspector-header">
                    <div className="inspector-icon-wrapper" style={{ color: selectedSkill.color }}>
                      <i className={selectedSkill.icon}></i>
                    </div>
                    <div className="inspector-title-group">
                      <span className="inspector-eyebrow">Skill Profile</span>
                      <h3 className="inspector-title">{selectedSkill.name}</h3>
                    </div>
                    <div className="inspector-rating-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart" style={{ stroke: selectedSkill.color }}>
                        <path className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                          strokeDasharray={`${selectedSkill.percentage}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{selectedSkill.percentage}%</text>
                      </svg>
                    </div>
                  </div>

                  <div className="inspector-body">
                    <p className="inspector-desc">{selectedSkill.description}</p>
                    
                    <div className="inspector-subskills">
                      <h4>Core Areas</h4>
                      <div className="subskills-pills">
                        {selectedSkill.subskills.map((sub, idx) => (
                          <span key={idx} className="subskill-pill">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedSkill.projects.length > 0 ? (
                      <div className="inspector-projects">
                        <h4>Demonstrated In</h4>
                        <div className="inspector-projects-list">
                          {selectedSkill.projects.map((proj, idx) => (
                            <div key={idx} className="inspector-project-item">
                              <i className="fa-solid fa-circle-check" style={{ color: selectedSkill.color }}></i>
                              <span>{proj}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary inspector-action-btn"
                          onClick={() => handleSelectTechFilter(selectedSkill.name)}
                          style={{
                            background: `linear-gradient(135deg, ${selectedSkill.color} 0%, var(--accent-purple, #a855f7) 100%)`,
                            color: '#000',
                            boxShadow: `0 4px 15px ${selectedSkill.color}30`
                          }}
                        >
                          Filter projects using this skill <i className="fa-solid fa-arrow-down"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="inspector-projects">
                        <h4>Demonstrated In</h4>
                        <p className="inspector-no-projects">General competence applied in various service and integration frameworks.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* High-Contrast Interactive Tech Skill Grid (Matching User Reference) */}
            <div className="tech-badge-grid-wrapper">
              <div className="tech-grid-header">
                <span className="section-subtitle">Tech Stack Grid</span>
                <h3 className="tech-grid-title">Technologies & Frameworks</h3>
              </div>
              <div className="tech-badge-grid">
                {TECH_BADGES.map((badge) => {
                  const isSelected = selectedTechCard === badge.name;
                  return (
                    <button
                      key={badge.name}
                      type="button"
                      className={`tech-badge-card ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        setSelectedTechCard(badge.name);
                        handleSelectTechFilter(badge.name);
                      }}
                    >
                      <div className="tech-badge-icon-box">
                        {badge.isCustomText ? (
                          <span className="tech-custom-text-icon">{badge.isCustomText}</span>
                        ) : (
                          <i className={badge.icon}></i>
                        )}
                      </div>
                      <span className="tech-badge-name">{badge.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects Section */}
        <section id="projects" className="projects-section scroll-reveal">
          <div className="section-container">
            <div className="projects-section-header">
              <h2 className="projects-section-title">SELECTED PROJECTS</h2>
              <button type="button" className="projects-view-all" onClick={() => setActiveFilter("all")}>
                VIEW ALL PROJECTS <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
            
            <div className="projects-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
              <button type="button" className={`filter-tag ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>ALL</button>
              <button type="button" className={`filter-tag ${activeFilter === "web" ? "active" : ""}`} onClick={() => setActiveFilter("web")}>WEB APPS</button>
              <button type="button" className={`filter-tag ${activeFilter === "mobile" ? "active" : ""}`} onClick={() => setActiveFilter("mobile")}>FLUTTER APPS</button>
              {Array.from(new Set(projects.flatMap(p => p.stack))).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className={`filter-tag ${activeFilter.toLowerCase() === tech.toLowerCase() ? "active" : ""}`}
                  onClick={() => handleToggleFilter(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="projects-display-grid">
              {projects
                .filter((p) => {
                  if (activeFilter === "all") return true;
                  if (activeFilter === "web") {
                    return p.category.toLowerCase().includes("web") || p.stack.includes("Next.js") || p.stack.includes("React");
                  }
                  if (activeFilter === "mobile") {
                    return p.category.toLowerCase().includes("mobile") || p.stack.includes("Flutter");
                  }
                  return p.stack.some(tech => 
                    tech.toLowerCase().includes(activeFilter.toLowerCase()) || 
                    activeFilter.toLowerCase().includes(tech.toLowerCase())
                  );
                })
                .map((p, idx) => (
                  <article key={p.id} className="project-display-card interactive-card" onMouseMove={handleCardMouseMove}>
                    <div className="project-display-img-wrapper" onClick={() => handleOpenProject(p)}>
                      <Image 
                        src={p.image} 
                        alt={p.title} 
                        width={600} 
                        height={400} 
                        className="project-display-img" 
                      />
                      <div className="project-display-overlay">
                        <span className="btn-view-details">VIEW DETAILS</span>
                      </div>
                    </div>
                    <div className="project-display-meta">
                      <div className="project-display-index">0{idx + 1}</div>
                      <div className="project-display-info-group">
                        <h3 className="project-display-title" onClick={() => handleOpenProject(p)}>{p.title}</h3>
                        <span className="project-display-category">{p.category}</span>
                      </div>
                      <button type="button" className="project-display-link-arrow" onClick={() => handleOpenProject(p)}>
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* Bottom Details Section (Education & Skills + Work Process + Quote) */}
        <section className="details-block-section scroll-reveal">
          <div className="section-container details-grid-layout">
            {/* Column 1: Education & Skills */}
            <div className="details-col-edu-skills">
              <div className="details-subblock">
                <span className="details-block-eyebrow">Education</span>
                <h2 className="details-block-title">Education & Certs</h2>
                
                <div className="education-timeline-list">
                  <div className="education-item">
                    <span className="education-date">2016 - 2019</span>
                    <h4 className="education-degree">B.S. in Computer Science & Interaction Design</h4>
                    <span className="education-school">University of Creative Technology</span>
                  </div>
                  <div className="education-item">
                    <span className="education-date">2018</span>
                    <h4 className="education-degree">Certified UX Architect</h4>
                    <span className="education-school">Nielsen Norman Group (NNg)</span>
                  </div>
                </div>
              </div>

              <div className="details-subblock">
                <span className="details-block-eyebrow">Skills</span>
                <h2 className="details-block-title">Core Toolkit</h2>
                
                <div className="skills-tag-cloud">
                  <span>React / Next.js</span>
                  <span>TypeScript</span>
                  <span>HTML5 / CSS3</span>
                  <span>Flutter</span>
                  <span>Dart</span>
                  <span>Riverpod / Bloc</span>
                  <span>FastAPI / Python</span>
                  <span>Supabase / Firebase</span>
                  <span>GraphQL / REST</span>
                  <span>Docker</span>
                  <span>PostgreSQL</span>
                  <span>CI/CD</span>
                </div>
              </div>
            </div>

            {/* Column 2: Work Process */}
            <div className="details-col-work-process">
              <span className="details-block-eyebrow">Methodology</span>
              <h2 className="details-block-title">Work Process</h2>
              
              <div className="process-vertical-steps">
                <div className="process-vertical-step">
                  <div className="process-step-num">01</div>
                  <div className="process-step-indicator">
                    <div className="process-step-circle"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div className="process-step-line"></div>
                  </div>
                  <div className="process-step-content">
                    <h4>DISCOVER</h4>
                    <p>Understanding goals, audience, and project requirements.</p>
                  </div>
                </div>
                
                <div className="process-vertical-step">
                  <div className="process-step-num">02</div>
                  <div className="process-step-indicator">
                    <div className="process-step-circle"><i className="fa-solid fa-lightbulb"></i></div>
                    <div className="process-step-line"></div>
                  </div>
                  <div className="process-step-content">
                    <h4>IDEATE</h4>
                    <p>Planning, wireframing, and creating the right concept.</p>
                  </div>
                </div>

                <div className="process-vertical-step">
                  <div className="process-step-num">03</div>
                  <div className="process-step-indicator">
                    <div className="process-step-circle"><i className="fa-solid fa-pen-nib"></i></div>
                    <div className="process-step-line"></div>
                  </div>
                  <div className="process-step-content">
                    <h4>DESIGN</h4>
                    <p>Crafting visual design with a focus on user experience.</p>
                  </div>
                </div>

                <div className="process-vertical-step">
                  <div className="process-step-num">04</div>
                  <div className="process-step-indicator">
                    <div className="process-step-circle"><i className="fa-solid fa-code"></i></div>
                    <div className="process-step-line"></div>
                  </div>
                  <div className="process-step-content">
                    <h4>DEVELOP</h4>
                    <p>Building fast, responsive, and high-performing websites.</p>
                  </div>
                </div>

                <div className="process-vertical-step">
                  <div className="process-step-num">05</div>
                  <div className="process-step-indicator">
                    <div className="process-step-circle"><i className="fa-solid fa-paper-plane"></i></div>
                  </div>
                  <div className="process-step-content">
                    <h4>DELIVER</h4>
                    <p>Testing, optimizing, and launching with perfection.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Quote Block Card */}
            <div className="details-col-quote-card">
              <div className="quote-card-content">
                <i className="fa-solid fa-quote-left quote-large-icon"></i>
                <p className="quote-text">
                  Good design is not just how it looks, but how it works.
                </p>
                <div className="quote-author-group">
                  <div className="quote-author-line"></div>
                  <span className="quote-author-name">Yorm Santi</span>
                </div>
                <div className="quote-footer-banner">
                  <span>LET&apos;S CREATE SOMETHING GREAT TOGETHER.</span>
                  <i className="fa-solid fa-star-of-life text-red animate-spin-slow"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section scroll-reveal">
          <div className="section-container contact-section-grid">
            <div className="contact-col-left">
              <h2 className="contact-massive-title">LET&apos;S WORK <br /> TOGETHER</h2>
              <p className="contact-left-desc">
                I am currently open for new projects and collaborations. Let&apos;s create something amazing that drives results.
              </p>
              <a href="mailto:yormsanti38@gmail.com" className="contact-action-btn-circle">
                <span>AVAILABLE FOR FREELANCE</span>
                <i className="fa-solid fa-arrow-right-long btn-arrow-icon"></i>
              </a>
            </div>

            <div className="contact-col-middle">
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <i className="fa-solid fa-envelope info-icon"></i>
                  <div className="info-text-group">
                    <span>Email</span>
                    <a href="mailto:yormsanti38@gmail.com">yormsanti38@gmail.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-globe info-icon"></i>
                  <div className="info-text-group">
                    <span>Website</span>
                    <a href="https://yormsanti.design" target="_blank" rel="noreferrer">www.yormsanti.design</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-phone info-icon"></i>
                  <div className="info-text-group">
                    <span>Phone</span>
                    <a href="tel:011256124">011256124</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-location-dot info-icon"></i>
                  <div className="info-text-group">
                    <span>Location</span>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-col-right">
              <form id="contact-form" onSubmit={handleContactSubmit} className="contact-form-dark">
                <h3 className="form-title">Send a message</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    id="contact-name" 
                    required 
                    placeholder=" "
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <label htmlFor="contact-name">Your Name</label>
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    id="contact-email" 
                    required 
                    placeholder=" "
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                  <label htmlFor="contact-email">Your Email</label>
                </div>
                <div className="form-group">
                  <textarea 
                    id="contact-message" 
                    rows={4} 
                    required 
                    placeholder=" "
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  ></textarea>
                  <label htmlFor="contact-message">Project Details</label>
                </div>
                <button type="submit" className={`btn btn-primary btn-submit ${formLoading ? "loading" : ""}`} disabled={formLoading}>
                  <span className="submit-text">Send Message</span>
                  <span className="submit-spinner"><i className="fa-solid fa-circle-notch fa-spin"></i></span>
                </button>
                {formFeedback.text && (
                  <div className={`form-response ${formFeedback.type}`}>
                    {formFeedback.text}
                  </div>
                )}
              </form>
            </div>
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
              <li><a href="#hero">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><Link href="/about">About Me</Link></li>
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
          <a href="#hero" className="back-to-top">Back to top <i className="fa-solid fa-arrow-up"></i></a>
        </div>
      </footer>

      {/* Enhanced Project Detail & Gallery Modal */}
      {activeProject && (
        <div className="modal active" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setActiveProject(null)}></div>
          <div className="modal-wrapper">
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close dialog">
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="modal-body">
              {/* Gallery Carousel & Lightbox */}
              <div className="modal-gallery-container">
                <div className="modal-main-img-wrapper">
                  <Image 
                    src={activeProject.gallery[activeImageIndex] || activeProject.image} 
                    alt={`${activeProject.title} screenshot ${activeImageIndex + 1}`} 
                    width={900} 
                    height={500} 
                    className="modal-main-img" 
                  />
                  {activeProject.gallery.length > 1 && (
                    <>
                      <button 
                        type="button" 
                        className="modal-nav-arrow modal-nav-prev" 
                        onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : activeProject.gallery.length - 1))}
                        aria-label="Previous screenshot"
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <button 
                        type="button" 
                        className="modal-nav-arrow modal-nav-next" 
                        onClick={() => setActiveImageIndex((prev) => (prev < activeProject.gallery.length - 1 ? prev + 1 : 0))}
                        aria-label="Next screenshot"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                      <span className="modal-img-counter">
                        {activeImageIndex + 1} / {activeProject.gallery.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Gallery Thumbnail Strip */}
                {activeProject.gallery.length > 1 && (
                  <div className="modal-thumbnails-strip">
                    {activeProject.gallery.map((imgUrl, idx) => (
                      <div 
                        key={idx}
                        className={`modal-thumb-item ${activeImageIndex === idx ? "active" : ""}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <Image 
                          src={imgUrl} 
                          alt={`Thumbnail ${idx + 1}`} 
                          width={120} 
                          height={70} 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Category Header */}
              <span className="modal-category">{activeProject.category}</span>
              <h3 className="modal-title">{activeProject.title}</h3>

              {/* Modal Tabs Bar */}
              <div className="modal-tabs-bar">
                <button 
                  type="button" 
                  className={`modal-tab-btn ${activeModalTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveModalTab("overview")}
                >
                  Overview & Specs
                </button>
                <button 
                  type="button" 
                  className={`modal-tab-btn ${activeModalTab === "features" ? "active" : ""}`}
                  onClick={() => setActiveModalTab("features")}
                >
                  Key Features ({activeProject.features?.length || 0})
                </button>
              </div>
              
              <div className="modal-grid">
                <div className="modal-desc">
                  {activeModalTab === "overview" ? (
                    <>
                      <h4>Project Summary</h4>
                      <p>{activeProject.description}</p>

                      {/* Performance / Project Highlights */}
                      {activeProject.highlights && activeProject.highlights.length > 0 && (
                        <div className="modal-highlights-grid">
                          {activeProject.highlights.map((item, idx) => (
                            <div key={idx} className="modal-highlight-card">
                              <span className="modal-highlight-label">{item.label}</span>
                              <span className="modal-highlight-val">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h4>Architecture & Key Features</h4>
                      <div className="modal-features-list">
                        {activeProject.features?.map((feature, idx) => (
                          <div key={idx} className="modal-feature-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="modal-links">
                    <a href={activeProject.demo} className="btn btn-primary" target="_blank" rel="noreferrer">
                      Live Preview <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <a href={activeProject.repo} className="btn btn-secondary" target="_blank" rel="noreferrer">
                      View Code <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>

                <div className="modal-meta">
                  <h4>Client & Tech Stack</h4>
                  <div className="modal-meta-list">
                    <div className="modal-meta-item">
                      <span>Client</span>
                      <span>{activeProject.client}</span>
                    </div>
                    <div className="modal-meta-item">
                      <span>Date</span>
                      <span>{activeProject.date}</span>
                    </div>
                    <div className="modal-meta-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span>Tech Stack</span>
                      <div className="modal-stack-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                        {activeProject.stack.map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            className="modal-stack-pill"
                            onClick={() => {
                              setActiveProject(null);
                              setActiveFilter(tech);
                              const projectsSection = document.getElementById("projects");
                              if (projectsSection) {
                                projectsSection.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
