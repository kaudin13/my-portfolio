"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Menu, Sparkles, X, Languages, Gamepad2, Heart, Upload, ExternalLink, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  number: string; title: string; type: string; description: string; tags: string[]; visual: string;
  summary: string; tools: string[]; languages: string[]; github?: string; live?: string;
};

type Memory = { title: string; clue: string; image?: string };

const projects: Project[] = [
  { number: "01", title: "Regulatory Intelligence", type: "AI · NLP · DOCUMENT SYSTEMS", description: "A semantic comparison workflow for aviation regulations, combining OCR, PDF parsing, embeddings and parallel similarity analysis to surface policy changes.", tags: ["Python", "Transformers", "Embeddings"], visual: "regulatory", summary: "A transformer-based document comparison system for aviation regulatory (DGCA) updates. The pipeline extracts and preprocesses policy documents, compares semantic meaning across versions, and generates concise revision summaries so important regulatory changes are easier to identify.", tools: ["Local LLMs / transformer models", "OCR and PDF parsing", "Embedding generation", "Semantic similarity analysis"], languages: ["Python"], github: "", live: "" },
  { number: "02", title: "URJAConnect", type: "FULL-STACK · RECRUITMENT", description: "A recruitment platform MVP connecting candidates with Japanese companies, with authentication flows and a candidate-first experience.", tags: ["React", "Node.js", "MySQL"], visual: "connect", summary: "A recruitment platform MVP designed to connect students and job seekers with Japanese companies. Work includes planning core workflows, database structure, authentication, and modules spanning the frontend and backend.", tools: ["React", "Node.js", "MySQL", "Google / LinkedIn OAuth (planned or implemented per MVP scope)"], languages: ["JavaScript", "SQL"], github: "", live: "" },
  { number: "03", title: "Katha-Speare", type: "GENERATIVE AI · STORYTELLING", description: "An AI storytelling chatbot built to turn prompts into imaginative, interactive narrative experiences.", tags: ["LLMs", "Python", "Chat UI"], visual: "story", summary: "An AI storytelling chatbot that transforms user prompts into imaginative narratives and gives users a conversational way to explore story ideas.", tools: ["LLM-powered generation", "Conversational interface"], languages: ["Python"], github: "", live: "" },
  { number: "04", title: "Bilingual Lead Assistant", type: "WEB · AUTOMATION", description: "A German and English lead-generation chatbot for a carpentry business, designed to make enquiries feel natural and useful.", tags: ["React", "Tailwind", "Express"], visual: "assistant", summary: "A custom German/English lead-generation chatbot integrated into a WordPress website for a German carpentry enterprise. It supports dynamic enquiry flows for custom windows and doors, image uploads, and formatted email notifications.", tools: ["React", "Tailwind CSS", "Framer Motion", "Node.js / Express", "Resend API", "WordPress"], languages: ["JavaScript", "HTML", "CSS"], github: "", live: "" },
  { number: "05", title: "IEEE Conference Website", type: "WEB DEVELOPMENT · ICSFT-26", description: "A responsive website for an IEEE conference, from page structure and content integration to interaction modules.", tags: ["Responsive UI", "Web development", "UX"], visual: "conference", summary: "Designed and developed a complete website for the IEEE Conference ICSFT-26, including responsive layouts, content integration, and user-interaction modules.", tools: ["Responsive web design", "Content integration", "Interaction modules"], languages: ["HTML", "CSS", "JavaScript"], github: "", live: "" },
  { number: "06", title: "Patient Management System", type: "DEPLOYED · HEALTHCARE WORKFLOW", description: "A web-based solution for patient records, appointments, prescriptions, and administrative workflows.", tags: ["Web app", "Database", "Deployment"], visual: "patient", summary: "A deployed patient management application to organize patient records, appointments, prescriptions, and administrative workflows in one place.", tools: ["Web application", "Database-backed records", "Deployment"], languages: ["Not specified in the uploaded resume"], github: "", live: "" },
  { number: "07", title: "Patient Bed Management", type: "SMART INDIA HACKATHON · 2024", description: "A queue-management and emergency-bed tracking concept focused on clearer hospital workflows.", tags: ["Workflow design", "Real-time updates", "Healthcare"], visual: "beds", summary: "Created a queue-management and emergency-bed tracking system concept to help optimize hospital workflows, emphasizing real-time status updates and user-friendly interfaces.", tools: ["Queue management", "Bed tracking", "Real-time update workflow"], languages: ["Not specified in the uploaded resume"], github: "", live: "" },
  { number: "08", title: "Rooftop Rainwater AR/VR", type: "SIH INTERCOLLEGE WINNER · 2025", description: "An immersive visualization tool for exploring water flow, storage, and rainwater-harvesting efficiency.", tags: ["AR/VR", "Simulation", "Sustainability"], visual: "rainwater", summary: "An AR/VR concept for simulating water flow, storage, and efficiency in rooftop rainwater harvesting. The visualization helps users explore design decisions and understand sustainable water-management outcomes.", tools: ["Unity / AR-VR workflow", "3D visualization", "Water-flow simulation"], languages: ["Not specified in the uploaded resume"], github: "", live: "" },
  { number: "09", title: "Parallel Paradox", type: "UNITY GAME · GAMETHON RUNNER-UP", description: "A puzzle game built around recording and replaying your own actions to solve physics-based challenges.", tags: ["Unity", "Game systems", "Puzzle design"], visual: "game", summary: "A Unity-based puzzle game featuring a self-cooperative mechanic: players record and replay their actions to solve physics-based challenges. Implemented core gameplay systems, UI, and scene transitions in a narrative-driven environment.", tools: ["Unity", "Gameplay systems", "UI and scene transitions"], languages: ["C#"], github: "", live: "" },
];

const skills = ["TypeScript", "JavaScript", "Python", "C++", "React", "Next.js", "Node.js", "Django", "PyTorch", "SQL", "Docker", "Git"];
const fade = { initial: { opacity: 1, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: 0.65, ease: "easeOut" as const } };
const memories: Memory[] = [
  { title: "Food & little joys", clue: "A favourite meal, cafe, or a food adventure" },
  { title: "Dance & celebrations", clue: "Garba, dance, festivals, and good energy" },
  { title: "Outside the screen", clue: "Badminton, football, gardening, or a day out" },
  { title: "People & memories", clue: "Friends, family, and moments worth keeping" },
  { title: "Creative corner", clue: "Doodling, baking, and things I make for fun" },
];
const maze = ["#########", "#P..#..1#", "#.#...#.#", "#..#.#..#", "#2...#3.#", "###.#.###", "#4..#..5#", "#.......#", "#########"];
const initialPlayer = { r: 1, c: 1 };
const initialTreats = [{ id: 0, r: 1, c: 2, memory: 0 }, { id: 1, r: 1, c: 3, memory: 1 }, { id: 2, r: 2, c: 5, memory: 2 }, { id: 3, r: 4, c: 1, memory: 3 }, { id: 4, r: 6, c: 1, memory: 4 }];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [japaneseMode, setJapaneseMode] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectLinks, setProjectLinks] = useState<Record<string, { github: string; live: string }>>({});
  const [player, setPlayer] = useState(initialPlayer);
  const [collected, setCollected] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [memoryImages, setMemoryImages] = useState<Record<number, string>>({});
  const email = "kavindeshpande2023.comp@mmcoe.edu.in";

  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem("kavin-project-links");
      const savedImages = localStorage.getItem("kavin-memory-images");
      if (savedLinks) setProjectLinks(JSON.parse(savedLinks));
      if (savedImages) setMemoryImages(JSON.parse(savedImages));
    } catch { /* Ignore invalid browser storage and keep the page usable. */ }
  }, []);



  const collectedCount = collected.length;
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${email}`; }
  };

  function movePlayer(dr: number, dc: number) {
    const next = { r: player.r + dr, c: player.c + dc };
    if (next.r < 0 || next.c < 0 || next.r >= maze.length || next.c >= maze[0].length || maze[next.r][next.c] === "#") return;
    setPlayer(next);
    const treat = initialTreats.find((item) => item.r === next.r && item.c === next.c);
    if (treat && !collected.includes(treat.id)) {
      setCollected((old) => old.includes(treat.id) ? old : [...old, treat.id]);
      setActiveMemory(treat.memory);
    }
  }

  function saveProjectLink(title: string, field: "github" | "live", value: string) {
    setProjectLinks((old) => {
      const next = { ...old, [title]: { github: old[title]?.github ?? "", live: old[title]?.live ?? "", [field]: value } };
      try { localStorage.setItem("kavin-project-links", JSON.stringify(next)); } catch { /* Storage may be disabled. */ }
      return next;
    });
  }

  async function uploadMemoryImage(index: number, file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) { alert("Please choose an image smaller than 3 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result);
      setMemoryImages((old) => {
        const next = { ...old, [index]: image };
        try { localStorage.setItem("kavin-memory-images", JSON.stringify(next)); } catch { alert("This image could not be saved in browser storage. Try a smaller image."); }
        return next;
      });
    };
    reader.readAsDataURL(file);
  }

  const selectedProjectLinks = useMemo(() => activeProject ? (projectLinks[activeProject.title] ?? { github: activeProject.github ?? "", live: activeProject.live ?? "" }) : null, [activeProject, projectLinks]);

  return <main className="site-shell">
    <header className="topbar">
      <a href="#home" className="wordmark" aria-label="Kavin Deshpande home">KD<span>.</span></a>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
        {[ ["About", "#about"], ["Projects", "#projects"], ["Experience", "#experience"], ["Personal", "#personal"], ["Contact", "#contact"] ].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={14}/></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section id="home" className="hero section-wrap">
      <div className="hero-copy">
        <motion.div className="eyebrow" {...fade}><span className="status-dot"/> COMPUTER ENGINEERING · PUNE, INDIA</motion.div>
        <motion.h1 initial={{opacity:1,y:25}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>{japaneseMode ? <>こんにちは、<br/><button type="button" className="name-toggle" onClick={() => setJapaneseMode((value) => !value)} aria-label="Switch introduction to English"><span>カヴィン</span></button> デシュパンデ<span className="period">。</span></> : <>Hello, I&apos;m<br/><button type="button" className="name-toggle" onClick={() => setJapaneseMode((value) => !value)} aria-label="Switch introduction to Japanese"><span>Kavin</span></button> Deshpande<span className="period">.</span></>}</motion.h1>
        <motion.p className="hero-lede" initial={{opacity:1,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.25}}>{japaneseMode ? <>こんにちは、カヴィンです。コンピューター工学を勉強しています。AIや言語の技術を使って、便利なソフトウェアを作りたいです。</> : <>I build thoughtful software at the intersection of <em>AI, language,</em> and real-world systems.</>}</motion.p>
        <button className="language-hint" type="button" onClick={() => setJapaneseMode((value) => !value)}><Languages size={14}/>{japaneseMode ? "Show English · 日本語を表示中" : "Click my name to switch to N4 Japanese"}</button>
        <motion.div className="hero-actions" initial={{opacity:1}} animate={{opacity:1}} transition={{delay:.45}}>
          <a href="#projects" className="button button-light">Explore my work <ArrowDownRight size={16}/></a>
          <a href="/Kavin_Deshpande_CV.pdf" download className="button button-quiet">View CV <ArrowUpRight size={15}/></a>
        </motion.div>
        <motion.div className="hero-footnote" initial={{opacity:1}} animate={{opacity:1}} transition={{delay:.6}}><span>Currently exploring</span><span className="mini-sep"/> NLP, agentic AI & edge computing</motion.div>
      </div>
      <motion.div className="hero-art" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:"easeOut"}}>
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="art-glow"/><div className="art-core"><span>カ</span><span className="core-caption">CURIOUS BY DESIGN</span></div>
        <div className="floating-chip chip-ai"><Sparkles size={14}/> AI / NLP</div><div className="floating-chip chip-code"><span className="tiny-square"/> SYSTEMS</div><div className="floating-chip chip-jp">こんにちは</div><span className="art-index">FIG. 01 — BUILDING WHAT&apos;S NEXT</span>
      </motion.div>
      <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
    </section>

    <section id="about" className="section-wrap about-section">
      <motion.div className="section-heading" {...fade}><span className="section-index">01 / ABOUT</span><h2>Engineer by training.<br/><span>Curious by default.</span></h2></motion.div>
      <div className="about-grid">
        <motion.article className="panel profile-panel" {...fade}><div className="panel-top"><span className="micro-label">A SHORT PROFILE</span><span className="panel-mark">✳</span></div><p className="profile-statement">I like building things that make complex technology feel <span>useful, human, and clear.</span></p><p className="muted-copy">I’m a fourth-year Computer Engineering student at MMCOE, Pune. My work moves between language models, document intelligence, full-stack products, and the systems that bring them together.</p><div className="profile-bottom"><span>MMCOE · SPPU</span><span>CLASS OF 2027 ↗</span></div></motion.article>
        <motion.article className="panel stats-panel" {...fade}><span className="micro-label">A FEW DETAILS</span><div className="stat-row"><strong>9.33<span>/10</span></strong><div><b>Academic score</b><small>CGPA · current</small></div></div><div className="stat-row"><strong>04<span>+</span></strong><div><b>Areas I explore</b><small>AI · NLP · Web · Systems</small></div></div><div className="stat-row"><strong>日本語</strong><div><b>Japanese learner</b><small>Working toward JLPT N3</small></div></div><div className="stats-note"><span className="status-dot"/> Always learning, always building.</div></motion.article>
        <motion.article className="panel stack-panel" {...fade}><div className="panel-top"><span className="micro-label">TOOLS OF THE TRADE</span><span className="muted-copy small-copy">MY EVERYDAY STACK</span></div><h3>My primary tech stack</h3><div className="skill-cloud">{skills.map((skill, i) => <span key={skill} className={i < 3 ? "skill-pill skill-highlight" : "skill-pill"}>{skill}</span>)}</div><div className="stack-footer"><span>AND ALWAYS SOMETHING NEW</span><ArrowUpRight size={16}/></div></motion.article>
        <motion.article className="panel note-panel" {...fade}><div className="note-orb"><span>?</span></div><div><span className="micro-label">THE INSIDE SCOOP</span><h3>Currently connecting the dots.</h3><p className="muted-copy">Exploring how AI agents, local models, and efficient systems can work together to solve practical problems.</p><a href="#personal" className="text-link">Unlock a little more about me <ArrowRight size={14}/></a></div></motion.article>
      </div>
    </section>

    <section id="projects" className="section-wrap projects-section">
      <motion.div className="section-heading heading-inline" {...fade}><div><span className="section-index">02 / SELECTED WORK</span><h2>Some things I&apos;ve <span>built.</span></h2></div><p className="muted-copy">Select any project to open its details, technology stack, and editable repository or live-demo links.</p></motion.div>
      <div className="project-grid">{projects.map((project) => <motion.article className="project-card" key={project.number} {...fade}>
        <button type="button" className={`project-visual visual-${project.visual}`} onClick={() => setActiveProject(project)} aria-label={`View details for ${project.title}`}><div className="visual-grid"/><div className="visual-content">{project.visual === "regulatory" ? <><div className="doc-card doc-back">DGCA / 2024</div><div className="doc-card doc-front"><span className="doc-tag">POLICY UPDATE</span><span className="doc-line wide"/><span className="doc-line"/><span className="doc-highlight">semantic match · 94.8%</span><span className="doc-line short"/></div><div className="visual-orbit"/></> : project.visual === "connect" ? <><div className="app-window"><div className="app-dots"><i/><i/><i/></div><div className="app-avatar">UR</div><span className="app-heading">Find your next chapter.</span><span className="app-line"/><span className="app-line short"/><div className="app-button">Explore roles ↗</div></div><div className="connect-spark">✳</div></> : project.visual === "story" ? <><div className="story-sun"/><div className="story-moon"/><div className="story-book"><span>Once upon<br/>a prompt...</span><i/></div><span className="story-star star-a">✳</span><span className="story-star star-b">✦</span></> : project.visual === "assistant" ? <><div className="chat-window"><div className="chat-top"><span className="chat-avatar">W</span><span>Wolf Assistant <small>Online · DE / EN</small></span><span className="chat-menu">•••</span></div><div className="chat-bubble">Guten Tag! Wie kann ich helfen?</div><div className="chat-bubble user-bubble">I&apos;d like a custom shelf.</div><div className="chat-input">Write a message... <ArrowUpRight size={13}/></div></div><div className="assistant-spark">✧</div></> : <div className="generic-project-art"><span>{project.number}</span><strong>{project.title}</strong><small>{project.type}</small><div className="generic-art-lines"><i/><i/><i/></div></div>}</div><span className="visual-arrow"><ArrowUpRight size={18}/></span><span className="project-number">{project.number} / {String(projects.length).padStart(2, "0")}</span><span className="project-open-hint">CLICK TO EXPLORE</span></button>
        <div className="project-meta"><span className="micro-label">{project.type}</span><h3>{project.title}</h3><p className="muted-copy">{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="text-link project-link" type="button" onClick={() => setActiveProject(project)}>Project details <ArrowUpRight size={14}/></button></div>
      </motion.article>)}</div>
      <div className="project-endnote"><span>MORE IDEAS IN PROGRESS</span><span className="mini-sep"/><span>THE NEXT ONE IS ALWAYS UNDER CONSTRUCTION.</span></div>
    </section>

    <section id="experience" className="section-wrap experience-section">
      <motion.div className="section-heading" {...fade}><span className="section-index">03 / EXPERIENCE & JOURNEY</span><h2>Learning by <span>doing.</span></h2><p className="muted-copy heading-description">From shipping MVPs with a team to experimenting with AI workflows, each project adds a new perspective.</p></motion.div>
      <div className="experience-list">
        <motion.article className="experience-item" {...fade}><div className="experience-symbol">01</div><div className="experience-main"><span className="micro-label">JAN 2026 — PRESENT · TEAM LEAD</span><h3>URJA Japanese Consultancy</h3><p className="muted-copy">Leading development of an internal workflow and recruitment platform MVP, contributing to backend architecture, database structure, feature planning, and frontend/backend modules.</p><div className="project-tags"><span>React</span><span>Full-stack MVP</span><span>Team collaboration</span></div></div><span className="experience-type">PRODUCT BUILD</span></motion.article>
        <motion.article className="experience-item" {...fade}><div className="experience-symbol">02</div><div className="experience-main"><span className="micro-label">JAN — APR 2026 · AI / NLP INTERN</span><h3>ConvenioTech Software Systems</h3><p className="muted-copy">Built a transformer-based document comparison workflow for aviation regulations and a bilingual lead-generation chatbot for a German carpentry business.</p><div className="project-tags"><span>NLP</span><span>Python</span><span>React / Express</span></div></div><span className="experience-type">AI ENGINEERING</span></motion.article>
        <motion.article className="experience-item" {...fade}><div className="experience-symbol">03</div><div className="experience-main"><span className="micro-label">2023 — 2027 · UNDERGRADUATE</span><h3>MMCOE, Pune · SPPU</h3><p className="muted-copy">Computer Engineering, with a growing focus on natural language processing, intelligent data systems, computer vision, and edge computing.</p><div className="project-tags"><span>CGPA 9.33</span><span>Computer Engineering</span></div></div><span className="experience-type">EDUCATION</span></motion.article>
      </div>
      <motion.div className="journey-banner" {...fade}><div className="journey-symbol">↗</div><div><span className="micro-label">WHAT&apos;S NEXT</span><h3>Build useful things. Keep asking better questions.</h3><p className="muted-copy">Interested in AI engineering, NLP research, and teams that care about thoughtful software.</p></div><a href="#contact" className="round-link" aria-label="Contact me"><ArrowUpRight size={21}/></a></motion.div>
    </section>

    <section id="personal" className="section-wrap personal-section">
      <motion.div className="section-heading heading-inline" {...fade}><div><span className="section-index">04 / BEYOND THE BUILD</span><h2>Want to know the <span>human?</span></h2></div><p className="muted-copy">A tiny Pac-Man-inspired maze. Collect the glowing treats to unlock little windows into life beyond code.</p></motion.div>
      <motion.div className="personal-game-panel" {...fade}>
        <div className="game-intro"><div className="game-icon"><Gamepad2 size={22}/></div><div><span className="micro-label">KAVIN&apos;S MINI MAZE</span><h3>Collect a treat. Unlock a memory.</h3><p className="muted-copy">Use arrow keys or the controls. When you collect a treat, its memory card unlocks. Upload your own photos to personalize each one.</p></div><div className="game-score"><strong>{collectedCount}<span>/5</span></strong><small>TREATS FOUND</small></div></div>
        <div className="game-layout">
          <div className="maze-wrap"><div className="maze-grid" role="application" aria-label="Mini maze game. Focus this maze and use the arrow keys to move." tabIndex={0} onKeyDown={(event) => { const moves: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1], w: [-1, 0], s: [1, 0], a: [0, -1], d: [0, 1] }; const move = moves[event.key]; if (move) { event.preventDefault(); movePlayer(move[0], move[1]); } }}>{maze.map((row, r) => row.split("").map((cell, c) => {
            const treat = initialTreats.find((item) => item.r === r && item.c === c);
            const isPlayer = player.r === r && player.c === c;
            return <div key={`${r}-${c}`} className={`maze-cell ${cell === "#" ? "maze-wall" : "maze-floor"}`}>{isPlayer ? <span className="pacman">◕</span> : treat && !collected.includes(treat.id) ? <span className="maze-treat">✦</span> : cell !== "#" && (r + c) % 3 === 0 ? <span className="maze-dot"/> : null}</div>;
          }))}</div><div className="game-controls"><button type="button" aria-label="Move up" onClick={() => movePlayer(-1, 0)}><ChevronUp size={17}/></button><div><button type="button" aria-label="Move left" onClick={() => movePlayer(0, -1)}><ChevronLeft size={17}/></button><button type="button" aria-label="Move down" onClick={() => movePlayer(1, 0)}><ChevronDown size={17}/></button><button type="button" aria-label="Move right" onClick={() => movePlayer(0, 1)}><ChevronRight size={17}/></button></div><button type="button" className="reset-game" onClick={() => { setPlayer(initialPlayer); setCollected([]); setActiveMemory(null); }}><RotateCcw size={13}/> Reset</button></div></div>
          <div className="memory-side"><div className="memory-side-top"><span className="micro-label">UNLOCKED MEMORIES</span><span>{collectedCount} / {memories.length}</span></div>{memories.map((memory, index) => <button type="button" key={memory.title} className={`memory-row ${collected.includes(index) ? "memory-unlocked" : ""} ${activeMemory === index ? "memory-active" : ""}`} onClick={() => collected.includes(index) && setActiveMemory(index)} disabled={!collected.includes(index)}><span className="memory-index">{collected.includes(index) ? <Heart size={14} fill="currentColor"/> : "✦"}</span><span><b>{collected.includes(index) ? memory.title : "??? Hidden memory"}</b><small>{collected.includes(index) ? memory.clue : "Find a treat to unlock"}</small></span><ArrowRight size={14}/></button>)}</div>
        </div>
        {activeMemory !== null && collected.includes(activeMemory) && <div className="memory-detail"><div className="memory-photo">{memoryImages[activeMemory] ? <img src={memoryImages[activeMemory]} alt={memories[activeMemory].title}/> : <div className="photo-placeholder"><Heart size={26}/><span>Your photo goes here</span><small>Upload a memory below</small></div>}</div><div className="memory-detail-copy"><span className="micro-label">MEMORY UNLOCKED · 0{activeMemory + 1}</span><h3>{memories[activeMemory].title}</h3><p className="muted-copy">{memories[activeMemory].clue}. Replace this text or add a photo to make this little corner your own.</p><label className="upload-button"><Upload size={15}/> {memoryImages[activeMemory] ? "Change photo" : "Upload a photo"}<input type="file" accept="image/*" onChange={(event) => uploadMemoryImage(activeMemory, event.target.files?.[0])}/></label><small className="upload-note">Images up to 3 MB are saved in this browser on this device.</small></div></div>}
        {collectedCount === memories.length && <p className="game-complete"><Sparkles size={15}/> Maze cleared! You found all five memory corners.</p>}
      </motion.div>
    </section>

    <section id="contact" className="section-wrap contact-section">
      <motion.div className="contact-card" {...fade}><div className="contact-decoration"><div className="contact-ring ring-a"/><div className="contact-ring ring-b"/><div className="contact-star">✳</div></div><span className="section-index">05 / YOUR TURN</span><h2>Let&apos;s make<br/>something <span>matter.</span></h2><p className="muted-copy">Have a project, an interesting problem, or just want to talk about technology? My inbox is open.</p><div className="contact-actions"><a href={`mailto:${email}`} className="button button-light">Get in touch <ArrowUpRight size={16}/></a><button className="button button-outline" onClick={copyEmail}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Email copied" : "Copy email"}</button></div><div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={12}/></a><a href="https://www.linkedin.com/in/kavindeshpande-999402292" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={12}/></a><a href={`mailto:${email}`}><Mail size={16}/> Email <ArrowUpRight size={12}/></a></div></motion.div>
      <footer className="footer"><a href="#home" className="wordmark">KD<span>.</span></a><span>DESIGNED WITH CURIOSITY · BUILT WITH INTENTION</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
    </section>

    {activeProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button type="button" className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={20}/></button><span className="section-index">PROJECT {activeProject.number} / DETAILS</span><span className="micro-label modal-project-type">{activeProject.type}</span><h2 id="project-modal-title">{activeProject.title}<span>.</span></h2><p className="modal-summary">{activeProject.summary}</p><div className="modal-detail-grid"><div><span className="micro-label">TOOLS & FRAMEWORKS</span><div className="modal-chip-list">{activeProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div><span className="micro-label">LANGUAGES</span><div className="modal-chip-list">{activeProject.languages.map((language) => <span key={language}>{language}</span>)}</div></div></div><div className="project-link-editor"><span className="micro-label">YOUR PROJECT LINKS · OPTIONAL</span><label>GitHub repository<input type="url" placeholder="https://github.com/yourname/project" value={selectedProjectLinks?.github ?? ""} onChange={(event) => saveProjectLink(activeProject.title, "github", event.target.value)}/></label><label>Live demo<input type="url" placeholder="https://your-project.vercel.app" value={selectedProjectLinks?.live ?? ""} onChange={(event) => saveProjectLink(activeProject.title, "live", event.target.value)}/></label><p>Links save in this browser. Add a URL to show a button below.</p></div><div className="modal-actions">{selectedProjectLinks?.github && <a href={selectedProjectLinks.github} target="_blank" rel="noreferrer" className="button button-light">GitHub repository <ExternalLink size={14}/></a>}{selectedProjectLinks?.live && <a href={selectedProjectLinks.live} target="_blank" rel="noreferrer" className="button button-light">Open live demo <ExternalLink size={14}/></a>}<button type="button" className="button button-outline" onClick={() => setActiveProject(null)}>Done <Check size={14}/></button></div></section></div>}
  </main>;
}
