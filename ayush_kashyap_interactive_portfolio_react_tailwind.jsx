import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Moon, Sun, Filter, GraduationCap, BookOpenCheck, FlaskConical, Rocket, Trophy, ArrowUpRight, ChevronDown, Sparkles, BookText } from "lucide-react";

const projects = [
  {
    title: "Rainfall Prediction Using Machine Learning",
    period: "Jan 2025 – Apr 2025",
    summary: "Built Random Forest & XGBoost models on meteorological data and deployed a REST endpoint for real-time inference.",
    stack: ["Python", "Pandas", "XGBoost", "Flask", "Docker"],
    highlights: ["Feature engineering & model comparison", "REST API for inference"],
    repo: "https://github.com/Ayush0135",
    tags: ["ML", "Deployment"]
  },
  {
    title: "Text Summariser (NLP)",
    period: "Aug 2024 – Nov 2024",
    summary: "Extractive and abstractive summarization using Hugging Face and spaCy with evaluation dashboard.",
    stack: ["Python", "Hugging Face", "spaCy"],
    highlights: ["ROUGE evaluation", "Batch processing"],
    repo: "https://github.com/Ayush0135",
    tags: ["NLP", "ML"]
  },
  {
    title: "Weather Forecasting App",
    period: "May 2024 – Jul 2024",
    summary: "Desktop app using WeatherAPI for hourly/daily forecasts with graceful error handling.",
    stack: ["Python", "WeatherAPI", "Tkinter"],
    highlights: ["Auto location detection", "Hourly forecasts"],
    repo: "https://github.com/Ayush0135",
    tags: ["APIs", "App"]
  }
];

const blogs = [
  {
    title: "Rainfall Prediction Using Machine Learning — Research Paper",
    date: "Sept 2025",
    summary: "Published in IJSRET covering methodology, feature engineering, and results.",
    link: "https://ijsret.com/your-paper-link"
  },
  {
    title: "Hackathon Journey — ACIC VGU National Hackathon",
    date: "Mar 2024",
    summary: "Built an AI solution in 36 hours and secured 3rd place.",
    link: "#"
  }
];

const skills = {
  programming: ["Python", "SQL", "Flask", "Git"],
  ml: ["Supervised Learning", "NLP", "XGBoost"],
  tools: ["Render", "WeatherAPI", "Hugging Face"],
  soft: ["Leadership", "Communication"]
};

const experience = [
  {
    role: "Data Scientist Intern",
    org: "Code Veda, Jaipur",
    period: "Dec 2024 – Jan 2025",
    points: [
      "Built ML models for structured and unstructured data.",
      "Implemented feature selection and preprocessing pipelines."
    ]
  }
];

const education = [
  {
    degree: "B.Tech in Computer Science (AI & DS)",
    org: "Vivekananda Global University, Jaipur",
    period: "2023 – 2027",
    details: ["Key Coursework: ML, Deep Learning, Data Engineering"]
  }
];

const achievements = [
  "Published: ‘Rainfall Prediction Using Machine Learning’ – IJSRET (2025)",
  "3rd Place, National Hackathon (ACIC VGU, 2024)"
];

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <motion.h2 className="text-3xl md:text-4xl font-semibold flex items-center gap-3" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
        {icon}
        {title}
      </motion.h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Tag({ children }) {
  return <span className="px-3 py-1 rounded-full border text-xs md:text-sm">{children}</span>;
}

function Pill({ children }) {
  return <span className="px-3 py-1 rounded-full border text-xs bg-white/60 dark:bg-neutral-900/60">{children}</span>;
}

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

function ProjectCard({ p, onOpen }) {
  return (
    <motion.div layout className="group bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onClick={() => onOpen(p)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5" /> {p.title}</h3>
          <p className="text-sm opacity-70 mt-1">{p.period}</p>
        </div>
        <a href={p.repo} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm underline decoration-dotted" title="Open GitHub">
          <Github className="w-4 h-4" /> Repo <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="mt-3 text-sm md:text-base leading-relaxed opacity-90">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
    </motion.div>
  );
}

function ProjectModal({ open, onClose, data }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border rounded-3xl p-6 shadow-xl" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">{data?.title}</h3>
                <p className="text-sm opacity-70 mt-1">{data?.period}</p>
              </div>
              <button onClick={onClose} className="px-3 py-1.5 rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800">Close</button>
            </div>
            <p className="mt-4 opacity-90 leading-relaxed">{data?.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">{data?.stack?.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            {data?.highlights?.length ? (
              <div className="mt-5">
                <h4 className="font-medium">Highlights</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">{data.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </div>
            ) : null}
            <div className="mt-6 flex items-center gap-2">
              <a href={data?.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800"><Github className="w-4 h-4" /> View on GitHub <ArrowUpRight className="w-4 h-4" /></a>
              <a href="https://github.com/Ayush0135" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800"><Rocket className="w-4 h-4" /> Profile</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AyushPortfolio() {
  const { dark, setDark } = useTheme();
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [modal, setModal] = useState(null);

  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(), []);

  const filtered = useMemo(() => {
    const text = q.toLowerCase();
    return projects.filter((p) => {
      const matchesText = !text || p.title.toLowerCase().includes(text) || p.summary.toLowerCase().includes(text) || p.stack.join(" ").toLowerCase().includes(text);
      const matchesTags = activeTags.length ? activeTags.every((t) => p.tags.includes(t)) : true;
      return matchesText && matchesTags;
    });
  }, [q, activeTags]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      from_name: data.get("name"),
      from_email: data.get("email"),
      message: data.get("message")
    };

    if (typeof window !== "undefined" && window.emailjs && typeof window.emailjs.send === "function") {
      window.emailjs.send("service_id", "template_id", payload, "public_key").then(() => {
        alert("Message sent successfully!");
        form.reset();
      }).catch((err) => {
        console.error(err);
        alert("Error sending message: " + (err.text || err.message || "unknown"));
      });
    } else {
      const mailto = `mailto:ayush.kashyap7155@gmail.com?subject=${encodeURIComponent("Portfolio Contact from " + payload.from_name)}&body=${encodeURIComponent(payload.message + "\n\nFrom: " + payload.from_email)}`;
      window.location.href = mailto;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-neutral-950/50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-lg md:text-xl">Ayush Kashyap</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#education" className="hover:underline">Education</a>
            <a href="#achievements" className="hover:underline">Achievements</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="mailto:ayush.kashyap7155@gmail.com" className="px-3 py-1.5 rounded-full border hidden md:inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Say hi</a>
            <button className="p-2 rounded-full border" aria-label="Toggle theme" onClick={() => setDark((d) => !d)} title={dark ? "Switch to Light" : "Switch to Dark"}>{dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
          </div>
        </div>
      </header>

      <section id="home" className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">AI & Data Engineer</h1>
            <p className="mt-4 text-base md:text-lg opacity-90">Results-driven engineer with hands-on experience in Machine Learning, NLP, and Data Engineering. Building and deploying scalable, production-ready AI solutions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com/Ayush0135" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Github className="w-4 h-4" /> GitHub</a>
              <a href="https://www.linkedin.com/in/ayush-kashyap-11645626a/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Linkedin className="w-4 h-4" /> LinkedIn</a>
              <a href="mailto:ayush.kashyap7155@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Mail className="w-4 h-4" /> Contact</a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm opacity-80">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> Jaipur, India</span>
              <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" /> 9693932656</span>
            </div>
          </motion.div>
          <motion.div className="md:justify-self-end" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="relative">
              <div className="absolute -inset-1 blur-xl rounded-full bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-emerald-500/40" />
              <div className="relative bg-white dark:bg-neutral-900 border rounded-3xl p-6 shadow-xl">
                <p className="text-sm opacity-80">"Published researcher, hackathon finalist, and team leader with end-to-end model development & deployment experience."</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl border"><div className="text-xl font-semibold">5+</div><div className="text-xs opacity-70">Major Projects</div></div>
                  <div className="p-3 rounded-xl border"><div className="text-xl font-semibold">600+</div><div className="text-xs opacity-70">Hackathon Cohort</div></div>
                  <div className="p-3 rounded-xl border"><div className="text-xl font-semibold">IJSRET</div><div className="text-xs opacity-70">Published</div></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm opacity-70"><ChevronDown className="w-4 h-4" /> Scroll to explore</div>
      </section>

      <Section id="projects" title="Projects" icon={<FlaskConical className="w-7 h-7" />}>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2"><Filter className="w-4 h-4" />
            <div className="flex flex-wrap gap-2">{tags.map((t) => (
              <button key={t} className={`px-3 py-1 rounded-full border text-xs md:text-sm ${activeTags.includes(t) ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : ""}`} onClick={() => setActiveTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}>{t}</button>
            ))}</div>
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, stack, summary…" className="flex-1 px-4 py-2 rounded-full border bg-white/70 dark:bg-neutral-900/70" />
        </div>
        <motion.div layout className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>{filtered.map((p) => (
            <motion.div layout key={p.title}><ProjectCard p={p} onOpen={(d) => setModal(d)} /></motion.div>
          ))}</AnimatePresence>
        </motion.div>
        <ProjectModal open={!!modal} onClose={() => setModal(null)} data={modal} />
      </Section>

      <Section id="blogs" title="Blog & Articles" icon={<BookText className="w-7 h-7" />}>
        <div className="grid md:grid-cols-2 gap-4">{blogs.map((b) => (
          <div key={b.title} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-5">
            <h3 className="text-lg font-semibold">{b.title}</h3>
            <p className="text-sm opacity-70">{b.date}</p>
            <p className="mt-2 text-sm opacity-90">{b.summary}</p>
            <a href={b.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm underline">Read More <ExternalLink className="w-3 h-3" /></a>
          </div>
        ))}</div>
      </Section>

      <Section id="skills" title="Skills" icon={<Rocket className="w-7 h-7" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3"><h3 className="font-semibold">Programming</h3><div className="flex flex-wrap gap-2">{skills.programming.map((s) => <Pill key={s}>{s}</Pill>)}</div></div>
          <div className="space-y-3"><h3 className="font-semibold">Machine Learning</h3><div className="flex flex-wrap gap-2">{skills.ml.map((s) => <Pill key={s}>{s}</Pill>)}</div></div>
          <div className="space-y-3"><h3 className="font-semibold">Tools</h3><div className="flex flex-wrap gap-2">{skills.tools.map((s) => <Pill key={s}>{s}</Pill>)}</div></div>
          <div className="space-y-3"><h3 className="font-semibold">Soft Skills</h3><div className="flex flex-wrap gap-2">{skills.soft.map((s) => <Pill key={s}>{s}</Pill>)}</div></div>
        </div>
      </Section>

      <Section id="experience" title="Experience" icon={<BookOpenCheck className="w-7 h-7" />}>
        <div className="space-y-4">{experience.map((e) => (
          <div key={e.role} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3"><div><h3 className="text-xl font-semibold">{e.role}</h3><p className="text-sm opacity-70">{e.org}</p></div><span className="text-sm opacity-70">{e.period}</span></div>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        ))}</div>
      </Section>

      <Section id="education" title="Education" icon={<GraduationCap className="w-7 h-7" />}>
        <div className="space-y-4">{education.map((ed) => (
          <div key={ed.degree} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3"><div><h3 className="text-lg font-semibold">{ed.degree}</h3><p className="text-sm opacity-70">{ed.org}</p></div><span className="text-sm opacity-70">{ed.period}</span></div>
            {ed.details?.length ? <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">{ed.details.map((d, i) => <li key={i}>{d}</li>)}</ul> : null}
          </div>
        ))}</div>
      </Section>

      <Section id="achievements" title="Research & Achievements" icon={<Trophy className="w-7 h-7" />}>
        <ul className="grid md:grid-cols-2 gap-3">{achievements.map((a, i) => <li key={i} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-4 text-sm">{a}</li>)}</ul>
      </Section>

      <Section id="contact" title="Contact" icon={<Mail className="w-7 h-7" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="opacity-90">Open to internships, projects, and collaborations. Let’s build something smart together!</p>
            <div className="flex flex-wrap items-center gap-2">
              <a href="mailto:ayush.kashyap7155@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Mail className="w-4 h-4" /> Email</a>
              <a href="https://github.com/Ayush0135" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Github className="w-4 h-4" /> GitHub</a>
              <a href="https://www.linkedin.com/in/ayush-kashyap-11645626a/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border rounded-2xl p-5 space-y-3">
            <input name="name" required placeholder="Your name" className="w-full px-4 py-2 rounded-xl border bg-transparent" />
            <input name="email" type="email" required placeholder="Your email" className="w-full px-4 py-2 rounded-xl border bg-transparent" />
            <textarea name="message" required rows={4} placeholder="Your message" className="w-full px-4 py-2 rounded-xl border bg-transparent" />
            <button type="submit" className="px-4 py-2 rounded-full border hover:shadow inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Send</button>
          </form>
        </div>
      </Section>

      <footer className="border-t py-10 mt-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <div>© {new Date().getFullYear()} Ayush Kashyap. Built with React, Tailwind & Framer Motion.</div>
          <div className="flex items-center gap-4"><a href="#home" className="underline decoration-dotted">Back to top</a><a href="https://github.com/Ayush0135" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Github className="w-4 h-4" /> GitHub</a></div>
        </div>
      </footer>
    </div>
  );
}
