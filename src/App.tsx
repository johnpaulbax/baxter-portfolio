import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  contact,
  credentials,
  homelabRepo,
  incidents,
  internshipStages,
  media,
  navigation,
  projects,
  skillGroups,
} from "./data/content";

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

function BrandIcon({ brand }: { brand: "linkedin" | "github" }) {
  const paths = {
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.475-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.456v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z",
    github:
      "M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.17a10.9 10.9 0 0 1 5.75 0c2.19-1.48 3.15-1.17 3.15-1.17.63 1.58.24 2.75.12 3.04.73.8 1.17 1.83 1.17 3.08 0 4.41-2.7 5.38-5.28 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7z",
  };

  return (
    <svg
      aria-hidden="true"
      data-brand={brand}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      focusable="false"
    >
      <path d={paths[brand]} />
    </svg>
  );
}

type CopyStatus = "idle" | "copied" | "failed";

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("Clipboard copy was not available");
}

function EmailContact() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    try {
      await copyToClipboard(contact.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 1800);
  };

  const feedback =
    status === "copied" ? "COPIED ✓" : status === "failed" ? "COPY FAILED" : "COPY";

  return (
    <div className="email-contact-row">
      <a href={`mailto:${contact.email}`} aria-label={`Send email to ${contact.email}`}>
        <Mail aria-hidden="true" />
        Email <small>{contact.email}</small>
      </a>
      <button type="button" onClick={handleCopy} aria-label="Copy email address">
        {status === "copied" ? <CheckCircle2 aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span aria-live="polite">{feedback}</span>
      </button>
    </div>
  );
}

function Section({
  id,
  number,
  title,
  kicker,
  children,
}: {
  id: string;
  number: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={
        reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : reveal
      }
      transition={{ duration: 0.55 }}
    >
      <header className="section-head">
        <span>
          {number} // {kicker}
        </span>
        <h2>{title}</h2>
        <i />
      </header>
      {children}
    </motion.section>
  );
}
function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55%" },
    );
    navigation.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const links = (
    <>
      {navigation.map((n) => (
        <a
          key={n.id}
          className={active === n.id ? "active" : ""}
          href={`#${n.id}`}
          onClick={() => setOpen(false)}
        >
          <b>{n.number}</b>
          <span>{n.label}</span>
        </a>
      ))}
    </>
  );
  return (
    <>
      <aside className="rail" aria-label="Portfolio sections">
        <div className="rail-brand">
          JP<span>RB</span>
        </div>
        <nav>{links}</nav>
        <div className="rail-progress">
          <i
            style={{
              height: `${progress}%`,
            }}
          />
        </div>
        <div className="rail-status"><small>PORTFOLIO STATUS</small><span><i /> ACTIVE</span></div>
      </aside>
      <header className="mobile-bar">
        <a href="#home" className="mobile-brand">
          JP // RB
        </a>
        <button
          ref={triggerRef}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && <nav>{links}</nav>}
      </header>
    </>
  );
}
function Portrait() {
  const [alt, setAlt] = useState(false);
  return (
    <button
      className={`portrait ${alt ? "alternate" : ""}`}
      onMouseEnter={() => setAlt(true)}
      onMouseLeave={() => setAlt(false)}
      onClick={() => setAlt(!alt)}
      aria-pressed={alt}
      aria-label="Toggle between professional and graduation portraits"
    >
      <img
        src={media.portraits.professional}
        alt="John Paul Baxter professional portrait"
      />
      <img
        className="graduate"
        src={media.portraits.graduate}
        alt="John Paul Baxter graduation portrait"
      />
      <span className="scan" />
      <small>PROFILE // {alt ? "GRADUATE" : "PROFESSIONAL"}</small>
    </button>
  );
}
function Lightbox({
  index,
  onClose,
  setIndex,
  returnFocus,
}: {
  index: number;
  onClose: () => void;
  setIndex: (n: number) => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(index);
  const onCloseRef = useRef(onClose);
  const setIndexRef = useRef(setIndex);
  useEffect(() => {
    indexRef.current = index;
    onCloseRef.current = onClose;
    setIndexRef.current = setIndex;
  }, [index, onClose, setIndex]);
  useEffect(() => {
    const focusTarget = returnFocus.current;
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") setIndexRef.current((indexRef.current + 4) % 5);
      if (e.key === "ArrowRight") setIndexRef.current((indexRef.current + 1) % 5);
      if (e.key === "Tab") {
        const controls = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      focusTarget?.focus();
    };
  }, [returnFocus]);
  return createPortal(
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Internship media viewer"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        ref={closeRef}
        className="close"
        onClick={onClose}
        aria-label="Close image"
      >
        <X />
      </button>
      <button
        onClick={() => setIndex((index + 4) % 5)}
        aria-label="Previous image"
      >
        <ChevronLeft />
      </button>
      <figure>
        <img
          src={internshipStages[index].image}
          alt={`${internshipStages[index].title} internship field log`}
        />
        <figcaption>
          {String(index + 1).padStart(2, "0")} //{" "}
          {internshipStages[index].title}
        </figcaption>
      </figure>
      <button onClick={() => setIndex((index + 1) % 5)} aria-label="Next image">
        <ChevronRight />
      </button>
    </motion.div>,
    document.body,
  );
}
function Experience() {
  const [index, setIndex] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const returnFocus = useRef<HTMLButtonElement>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveStage(Number((entry.target as HTMLElement).dataset.stage));
    }), { rootMargin: "-35% 0px -45%", threshold: 0.1 });
    stageRefs.current.forEach((stage) => stage && observer.observe(stage));
    return () => observer.disconnect();
  }, []);
  return (
    <Section
      id="experience"
      number="03"
      kicker="FIELD LOG"
      title="Internship experience"
    >
      <div className="experience">
        <div className="experience-intro panel">
          <span>JAN — APR 2026</span>
          <h3>Junior Web Developer Intern</h3>
          <p>
            Document Tracking System
            <br />
            AFP Pension &amp; Gratuity Management Center
          </p>
          <div className="stage-meter" aria-label={`Internship stage ${activeStage + 1} of 5`}>
            {internshipStages.map((stage, stageIndex) => <button key={stage.title} className={activeStage === stageIndex ? "active" : ""} onClick={() => stageRefs.current[stageIndex]?.scrollIntoView({ behavior: "smooth", block: "center" })}>{String(stageIndex + 1).padStart(2, "0")}</button>)}
          </div>
          <button className="active-stage-media" onClick={(event) => { returnFocus.current = event.currentTarget; setIndex(activeStage); }}>
            <AnimatePresence mode="wait"><motion.img key={internshipStages[activeStage].image} src={internshipStages[activeStage].image} alt={`${internshipStages[activeStage].title} internship stage`} initial={{opacity:0, clipPath:"inset(0 0 100% 0)"}} animate={{opacity:1, clipPath:"inset(0)"}} exit={{opacity:0}} /></AnimatePresence>
          </button>
          <small>{String(activeStage + 1).padStart(2, "0")} / 05</small>
          <h4>{internshipStages[activeStage].title}</h4>
          <p>{internshipStages[activeStage].text}</p>
        </div>
        <div className="timeline">
          {internshipStages.map((s, i) => (
            <article className={`stage ${activeStage === i ? "active" : ""}`} key={s.title} data-stage={i} ref={(node) => { stageRefs.current[i] = node; }}>
              <button onClick={(event) => { returnFocus.current = event.currentTarget; setIndex(i); }}>
                <img
                  loading="lazy"
                  src={s.image}
                  width={s.width}
                  height={s.height}
                  alt={`${s.title} during the internship`}
                />
                <span>
                  EXPAND <ExternalLink size={14} />
                </span>
              </button>
              <div>
                <small>{String(i + 1).padStart(2, "0")} / 05</small>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {index !== null && (
          <Lightbox
            index={index}
            onClose={() => setIndex(null)}
            setIndex={setIndex}
            returnFocus={returnFocus}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
function Topology() {
  const nodes = [
    ["Internet", "WAN access"],
    ["Windows Server 2025", "AD / DNS / DHCP"],
    ["Windows 11 Pro", "Domain client"],
    ["Ubuntu Server", "Linux services"],
    ["osTicket", "Helpdesk workflow"],
  ];
  const [selected, setSelected] = useState(1);
  return (
    <div className="topology panel">
      <svg viewBox="0 0 800 330" aria-hidden="true">
        <path d="M400 45V100M400 165V210M400 210H140V260M400 210V260M400 210H660V260" />
      </svg>
      {nodes.map((n, i) => (
        <motion.button key={n[0]} className={`node n${i}`} onFocus={() => setSelected(i)} onMouseEnter={() => setSelected(i)} aria-pressed={selected === i} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:i*.16}}>
          <i />
          {n[0]}
          <span>{n[1]}</span>
        </motion.button>
      ))}
      <div className="node-detail" aria-live="polite"><small>NODE // {String(selected + 1).padStart(2, "0")}</small><strong>{nodes[selected][0]}</strong><span>{nodes[selected][1]}</span></div>
    </div>
  );
}
function IncidentViewer() {
  const [active, setActive] = useState(0);
  const t = incidents[active];
  const moveTab = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? incidents.length - 1 : (index + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) + incidents.length) % incidents.length;
    setActive(next);
    document.getElementById(`incident-tab-${next}`)?.focus();
  };
  return (
    <div className="incident panel">
      <div className="ticket-list" role="tablist" aria-label="Incident records">
        {incidents.map((x, i) => (
          <button
            role="tab"
            aria-selected={i === active}
            aria-controls="incident-panel"
            id={`incident-tab-${i}`}
            tabIndex={i === active ? 0 : -1}
            key={x.id}
            onClick={() => setActive(i)}
            onKeyDown={(event) => moveTab(event, i)}
          >
            <b>{x.id}</b>
            <span>{x.title}</span>
          </button>
        ))}
      </div>
      <motion.article key={t.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:.32}} id="incident-panel" role="tabpanel" aria-labelledby={`incident-tab-${active}`} aria-live="polite">
        <header>
          <div>
            <small>{t.id}</small>
            <h3>{t.title}</h3>
          </div>
          <em>{t.status}</em>
        </header>
        {[
          ["Problem", t.problem],
          ["Diagnosis", t.diagnosis],
          ["Resolution", t.resolution],
          ["Verification", t.verification],
        ].map(([a, b], i) => (
          <div className="ticket-step" key={a}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <div>
              <h4>{a}</h4>
              <p>{b}</p>
            </div>
          </div>
        ))}
      </motion.article>
    </div>
  );
}
function VideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  return (
    <div className="video-frame">
      <header>
        <span>MVP DEMO // MEDIA FEED</span>
        <i>{playing ? "PLAYING" : "STANDBY"}</i>
      </header>
      <video
        ref={ref}
        src={media.avoidVideo}
        preload="metadata"
        controls
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        Your browser does not support HTML5 video.
      </video>
      <div className="video-shortcuts">
        <button
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            playing ? v.pause() : v.play();
          }}
        >
          {playing ? <Pause /> : <Play />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
          }}
        >
          {muted ? <VolumeX /> : <Volume2 />}
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
      <p>MVP / Capstone Demonstration</p>
    </div>
  );
}
function HomelabRepository() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (selected === null) return;
    const focusTarget = returnFocus.current;
    const background = Array.from(document.body.children).filter(
      (element) => !element.contains(dialogRef.current),
    );
    closeRef.current?.focus();
    background.forEach((element) => element.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      background.forEach((element) => element.removeAttribute("inert"));
      document.body.style.overflow = "";
      focusTarget?.focus();
    };
  }, [selected]);
  return (
    <div className="repo-showcase">
      <div className="repo-architecture">
        <div className="repo-meta">
          <span>{homelabRepo.domain}</span>
          <span>{homelabRepo.network}</span>
        </div>
        <img src={homelabRepo.architecture} alt="BaxterLab network architecture connecting SERVER01, CLIENT01, and TICKET01" />
        <div className="repo-systems">
          {homelabRepo.systems.map(([host, platform, role]) => (
            <article key={host}><small>{host}</small><strong>{platform}</strong><span>{role}</span></article>
          ))}
        </div>
      </div>
      <div className="repo-columns">
        <div><h4>Repository documentation</h4><ol className="repo-docs">{homelabRepo.docs.map((doc, index) => <li data-testid="homelab-doc" key={doc}><b>{String(index + 1).padStart(2, "0")}</b>{doc}</li>)}</ol></div>
        <div><h4>Selected evidence</h4><div className="repo-evidence">{homelabRepo.evidence.map((item, index) => <button key={item.title} aria-label={`Open ${item.title} evidence`} onClick={(event) => { returnFocus.current = event.currentTarget; setSelected(index); }}><img loading="lazy" src={item.src} alt="" /><span>{item.title}</span></button>)}</div></div>
      </div>
      <a className="repo-link" href={homelabRepo.url} target="_blank" rel="noreferrer">View BaxterLab repository <ExternalLink size={16} /></a>
      <p className="repo-disclaimer">Eight simulated lab incidents demonstrate a structured support workflow; they are not presented as production support experience.</p>
      <AnimatePresence>{selected !== null && createPortal(<motion.div ref={dialogRef} className="evidence-modal" role="dialog" aria-modal="true" aria-label={`${homelabRepo.evidence[selected].title} evidence`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><button ref={closeRef} aria-label="Close evidence" onClick={() => setSelected(null)}><X /></button><figure><img src={homelabRepo.evidence[selected].src} alt={homelabRepo.evidence[selected].caption} /><figcaption>{homelabRepo.evidence[selected].caption}</figcaption></figure></motion.div>, document.body)}</AnimatePresence>
    </div>
  );
}
function Projects() {
  return (
    <Section
      id="projects"
      number="06"
      kicker="DEPLOYMENTS"
      title="Featured projects"
    >
      <div className="projects">
        {projects.map((p, i) => (
          <details
            className={`project panel ${i === 0 ? "featured flagship" : ""}`}
            key={p.title}
            open={i === 0}
          >
            <summary>
              <div className="project-index"><b>PROJECT {String(i + 1).padStart(2, "0")}</b><small>{p.role}</small></div>
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <span>CASE STUDY +</span>
            </summary>
            <div className="project-body">
              <p>{p.description}</p>
              <h4>Key contribution</h4>
              <p>{p.contribution}</p>
              <div className="tags">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {p.url && (
                <a className="repo-link" href={p.url} target="_blank" rel="noreferrer">
                  View project repository <ExternalLink size={16} />
                </a>
              )}
              {p.title === "AVOID" && <VideoPlayer />}
              {p.title === "BaxterLab" && <HomelabRepository />}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
function Skills() {
  const [active, setActive] = useState(0);
  const moveTab = (event: React.KeyboardEvent, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? skillGroups.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + skillGroups.length) % skillGroups.length;
    setActive(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  };
  return (
    <Section
      id="skills"
      number="07"
      kicker="CAPABILITIES"
      title="Skills matrix"
    >
      <div className="skills panel">
        <div role="tablist">
          {skillGroups.map((g, i) => (
            <button
              role="tab"
              aria-selected={active === i}
              aria-controls="skill-panel"
              id={`skill-tab-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => moveTab(event, i)}
              key={g.name}
            >
              {g.name}
            </button>
          ))}
        </div>
        <motion.div
          className="skill-grid"
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${active}`}
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {skillGroups[active].skills.map((s) => (
            <span key={s}><i>&gt;</i>{s}</span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function CredentialViewer({
  index,
  setIndex,
  onClose,
  returnFocus,
}: {
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(index);
  const setIndexRef = useRef(setIndex);
  const onCloseRef = useRef(onClose);
  const reduce = useReducedMotion();
  useEffect(() => {
    indexRef.current = index;
    setIndexRef.current = setIndex;
    onCloseRef.current = onClose;
  }, [index, setIndex, onClose]);
  useEffect(() => {
    const focusTarget = returnFocus.current;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children).filter(
      (element) => !element.contains(dialogRef.current),
    );
    closeRef.current?.focus({ preventScroll: true });
    background.forEach((element) => element.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowLeft") setIndexRef.current((indexRef.current + credentials.length - 1) % credentials.length);
      if (event.key === "ArrowRight") setIndexRef.current((indexRef.current + 1) % credentials.length);
      if (event.key === "Tab") {
        const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      background.forEach((element) => element.removeAttribute("inert"));
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [returnFocus]);
  const credential = credentials[index];
  return createPortal(
    <motion.div
      className="credential-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.section ref={dialogRef} className="credential-inspector" role="dialog" aria-modal="true" aria-label="Credential viewer" initial={reduce ? false : { opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }} transition={{ duration: reduce ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }} onMouseDown={(event) => event.stopPropagation()}>
      <header className="credential-inspector__header"><div><span>CREDENTIAL // VERIFIED</span><h2>{credential.title}</h2></div><div className="credential-inspector__count">{String(index + 1).padStart(2, "0")} / {String(credentials.length).padStart(2, "0")}</div><button ref={closeRef} aria-label="Close credential" onClick={onClose}><X /></button></header>
      <div className="credential-inspector__media">
      <button aria-label="Previous credential" onClick={() => setIndex((index + credentials.length - 1) % credentials.length)}><ChevronLeft /></button>
      <figure>
        <motion.img
          key={credential.image}
          src={credential.image}
          alt={`${credential.title} credential issued by ${credential.issuer}`}
          initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.45 }}
        />
        <span className="credential-scan" aria-hidden="true" />
        <figcaption>{String(index + 1).padStart(2, "0")} / {String(credentials.length).padStart(2, "0")} — {credential.title}</figcaption>
      </figure>
      <button aria-label="Next credential" onClick={() => setIndex((index + 1) % credentials.length)}><ChevronRight /></button>
      </div>
      <footer className="credential-inspector__footer"><div><strong>{credential.issuer}</strong><span>{credential.status}</span><em><i /> VERIFIED</em></div></footer>
      </motion.section>
    </motion.div>,
    document.body,
  );
}

function Training() {
  const [selected, setSelected] = useState<number | null>(null);
  const returnFocus = useRef<HTMLButtonElement>(null);
  return (
    <Section id="training" number="08" kicker="CREDENTIALS" title="Training & course completions">
      <div className="credentials">
        {credentials.map((credential, index) => (
          <button
            className="credential-card panel"
            key={credential.title}
            aria-label={`View ${credential.title} credential`}
            onClick={(event) => { returnFocus.current = event.currentTarget; setSelected(index); }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{credential.issuer}</small>
            <h3>{credential.title}</h3>
            <em><CheckCircle2 size={14} aria-hidden="true" />{credential.status}</em>
            <b>VIEW CREDENTIAL +</b>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <CredentialViewer index={selected} setIndex={setSelected} onClose={() => setSelected(null)} returnFocus={returnFocus} />
        )}
      </AnimatePresence>
    </Section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="grid-bg" />
      <Nav />
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-copy">
            <span className="eyebrow">01 // SYSTEM INITIALIZED</span>
            <h1>
              JOHN PAUL
              <br />
              <mark>R. BAXTER</mark>
            </h1>
            <p className="role">
              <span>IT Support Specialist</span><i /><span>Systems Enthusiast</span><i /><span>Problem Solver</span>
            </p>
            <p>
              I troubleshoot systems, support users, and build practical tools
              that make technical work easier.
            </p>
            <div className="actions">
              <a className="primary" href="#projects">
                View my work
              </a>
              <a href="#contact">Contact me</a>
            </div>
            <div className="terminal">
              <b>C:\&gt; whoami</b>
              <span>John Paul R. Baxter</span>
              <b>C:\&gt; status</b>
              <span className="ok">Ready for new challenges.</span>
            </div>
            <motion.div className="system-summary" initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:.09}}}}>
              {[['HELPDESK LAB','Configured & Documented'],['8','Simulated Incidents'],['4','Major Projects'],['OPEN','For Opportunities']].map(([value,label]) => <motion.div key={label} variants={{hidden:{opacity:0,y:8},visible:{opacity:1,y:0}}}><strong>{value}</strong><span>{label}</span></motion.div>)}
            </motion.div>
          </div>
          <Portrait />
        </section>
        <Section
          id="about"
          number="02"
          kicker="SYSTEM PROFILE"
          title="About me"
        >
          <div className="about">
            <div className="profile panel">
              {[
                ["Name", "John Paul R. Baxter"],
                ["Location", "Antipolo City, Rizal"],
                ["Education", "BS Information Technology"],
                ["Specialization", "Cybersecurity"],
                ["Institution", "Technological Institute of the Philippines"],
                ["Status", "Open for Opportunities"],
              ].map(([a, b]) => (
                <div key={a}>
                  <small>{a}</small>
                  <strong>{b}</strong>
                </div>
              ))}
            </div>
            <div className="narrative panel">
              <span>CORE DIRECTIVE</span>
              <p>
                I enjoy troubleshooting, understanding how systems work, and
                helping people solve technical issues. I also love building
                applications that make work easier and more efficient.
              </p>
              <div className="tags">
                <span>Helpdesk</span>
                <span>Systems</span>
                <span>Networking</span>
                <span>Cybersecurity</span>
                <span>Development</span>
              </div>
            </div>
          </div>
        </Section>
        <Experience />
        <Section
          id="lab"
          number="04"
          kicker="HOMELAB"
          title="IT helpdesk environment"
        >
          <p className="lead">
            A virtual support environment for practicing identity, network
            services, ticketing, permissions, monitoring, and structured
            troubleshooting.
          </p>
          <Topology />
          <div className="tags lab-tags">
            {[
              "Windows Server 2025",
              "Windows 11 Pro",
              "Ubuntu Server",
              "VirtualBox",
              "Active Directory",
              "DNS",
              "DHCP",
              "Group Policy",
              "PowerShell",
              "Wireshark",
              "osTicket",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </Section>
        <Section
          id="incidents"
          number="05"
          kicker="TROUBLESHOOTING"
          title="Incident simulator"
        >
          <p className="lead">
            Select a lab ticket to inspect the reasoning path from symptom to
            verified resolution.
          </p>
          <IncidentViewer />
        </Section>
        <Projects />
        <Skills />
        <Training />
        <Section
          id="contact"
          number="09"
          kicker="FINAL STATUS"
          title="Ready for deployment."
        >
          <div className="contact panel">
            <div>
              <span>SYSTEM STATUS</span>
              <h3>
                READY <b>✓</b>
              </h3>
              <p>
                Let’s build, support, troubleshoot, and improve systems
                together.
              </p>
            </div>
            <div className="contact-links">
              <EmailContact />
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcon brand="linkedin" />
                LinkedIn <small>View profile</small>
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                <BrandIcon brand="github" />
                GitHub <small>View repositories</small>
              </a>
              <span>
                <MapPin />
                Antipolo City, Rizal
              </span>
            </div>
          </div>
        </Section>
      </main>
      <footer>
        JOHN PAUL R. BAXTER{" "}
        <span>IT SUPPORT &amp; SYSTEMS PORTFOLIO // 2026</span>
      </footer>
    </MotionConfig>
  );
}
