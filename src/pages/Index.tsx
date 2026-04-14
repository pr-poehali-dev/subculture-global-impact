import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "definitions", label: "Definitions" },
  { id: "digital", label: "Digital" },
  { id: "examples", label: "Examples" },
  { id: "identity", label: "Identity" },
  { id: "conclusion", label: "Conclusion" },
];

function useActiveSection() {
  const [activeId, setActiveId] = useState("intro");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return activeId;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Orb({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />;
}

export default function Index() {
  const activeId = useActiveSection();

  return (
    <div className="bg-[#07070f] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between backdrop-blur-xl border-b border-white/5">
        <span className="text-xs tracking-[0.3em] text-white/30 uppercase" style={{ fontFamily: "'Unbounded', sans-serif" }}>
          Culture
        </span>
        <div className="hidden md:flex gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-full text-xs transition-all duration-300"
              style={{
                fontFamily: "'Golos Text', sans-serif",
                color: activeId === s.id ? "#fff" : "rgba(255,255,255,0.35)",
                background: activeId === s.id ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="w-2 h-2 rounded-full" style={{ background: "#ff3cac", boxShadow: "0 0 8px #ff3cac" }} />
      </nav>

      {/* ─── SECTION 1: INTRO ─── */}
      <section id="intro" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <Orb className="w-[700px] h-[700px] opacity-25" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", top: "-200px", left: "-200px" }} />
        <Orb className="w-[500px] h-[500px] opacity-20" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", bottom: "-100px", right: "-100px" }} />
        <Orb className="w-[300px] h-[300px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "30%", right: "5%" }} />

        <div className="relative z-10 text-center max-w-5xl">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/40 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#ff3cac" }} />
              Research Report · 2024
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1
              className="leading-none mb-6"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 900,
              }}
            >
              <span className="block text-white">MAINSTREAM</span>
              <span
                className="block"
                style={{ background: "linear-gradient(90deg, #ff3cac 0%, #7b2ff7 50%, #00e5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                &amp; SUBCULTURES
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-white/55 max-w-3xl mx-auto leading-relaxed">
              How the digital age reshapes the boundaries of cultural belonging,
              blurs the line between mass and niche, and forges a new kind of identity
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#definitions"
                className="px-8 py-3 rounded-full text-white font-semibold transition-transform hover:scale-105"
                style={{ fontFamily: "'Unbounded', sans-serif", background: "linear-gradient(135deg, #ff3cac, #7b2ff7)", fontSize: "0.75rem" }}
              >
                Start
              </a>
              <a
                href="#examples"
                className="px-8 py-3 rounded-full text-white/60 hover:text-white transition-all border border-white/15 hover:border-white/30"
                style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.75rem" }}
              >
                Examples
              </a>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-1 text-white/20 text-xs">
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #ff3cac, transparent)" }} />
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: DEFINITIONS ─── */}
      <section id="definitions" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[500px] h-[500px] opacity-15" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", top: 0, right: "-150px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#ff3cac] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>02 / Definitions</div>
            <h2 className="mb-16 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              What is<br />
              <span style={{ background: "linear-gradient(90deg, #7b2ff7, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cultural mainstream?</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                emoji: "🌊",
                title: "Mainstream",
                text: "The dominant cultural current that reaches the majority. Pop music, Hollywood films, viral trends — content consumed by mass audiences without any particular filter of belonging.",
                tags: ["Scale", "Accessibility", "Uniformity"],
                accent: "#ff3cac",
              },
              {
                emoji: "⚡",
                title: "Subculture",
                text: "A group of people united by shared values, aesthetics, or a lifestyle distinct from the dominant culture. Niche identity is their strength and defining characteristic.",
                tags: ["Identity", "Belonging", "Distinction"],
                accent: "#7b2ff7",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 group h-full">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${card.accent}, #7b2ff7)` }}
                  >
                    {card.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>{card.title}</h3>
                  <p className="text-white/55 leading-relaxed mb-5">{card.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/35">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-6 p-7 rounded-3xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 text-center">
              <p className="text-white/70 text-lg leading-relaxed">
                <span className="text-[#00e5ff] font-bold" style={{ fontFamily: "'Unbounded', sans-serif" }}>Key question:</span>{" "}
                In the digital age the boundary between them blurs —
                subcultures become mainstream faster than they have time to form
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 3: DIGITAL SPACE ─── */}
      <section id="digital" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[600px] h-[600px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "20%", left: "-200px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#00e5ff] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>03 / Digital Space</div>
            <h2 className="mb-4 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Algorithms<br />
              <span style={{ background: "linear-gradient(90deg, #00e5ff, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>dictate culture</span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mb-14">
              Social media and recommendation engines have become the new curators of cultural consumption
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 mb-7">
            {[
              { icon: "📱", title: "The TikTok Effect", desc: "The For You algorithm turns niche content viral within 24 hours. Subcultures live and die at the speed of a trending sound.", color: "#ff3cac" },
              { icon: "🔄", title: "Echo Chambers", desc: "Algorithms build bubbles — you only see what you already agree with. A subculture becomes a sealed-off ecosystem.", color: "#7b2ff7" },
              { icon: "📊", title: "Trend Analytics", desc: "Google Trends, Spotify Charts, Billboard — data decides what counts as popular. Culture turns into a metric.", color: "#00e5ff" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-400 group cursor-default h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.9rem" }}>{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: item.color }} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={360}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "4.9B", label: "social media users worldwide" },
                { num: "63%", label: "of youth discover music via algorithms" },
                { num: "2024", label: "the year the algorithm became the main DJ" },
                { num: "∞", label: "subcultures born every day" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl text-center border border-white/5 bg-white/3">
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ fontFamily: "'Unbounded', sans-serif", background: "linear-gradient(135deg, #ff3cac, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-white/35 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 4: EXAMPLES ─── */}
      <section id="examples" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[500px] h-[500px] opacity-15" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", bottom: 0, right: "-100px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#7b2ff7] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>04 / Examples</div>
            <h2 className="mb-14 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Three{" "}
              <span style={{ background: "linear-gradient(90deg, #ff3cac, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cultural</span>
              <br />phenomena
            </h2>
          </Reveal>

          <div className="space-y-5">
            {[
              {
                emoji: "🎤",
                tag: "Hip-Hop",
                year: "1973 → today",
                title: "From the Bronx to the mainstream",
                desc: "Born as the voice of street communities. Today hip-hop is the world's most-streamed genre. The subculture won — but did it change in the process?",
                stats: ["#1 genre by streaming", "Billion-dollar industry", "Shaped fashion, language & film"],
                accent: "#ff3cac",
              },
              {
                emoji: "🎭",
                tag: "K-pop",
                year: "1990s → globally",
                title: "Korea took over the world",
                desc: "BTS, BLACKPINK, NewJeans — Korean pop culture became a global phenomenon, with devoted fandoms (Army, Blink) functioning as fully-fledged subcultures.",
                stats: ["Fandom as subculture", "South Korea's soft power", "Billion views per MV"],
                accent: "#7b2ff7",
              },
              {
                emoji: "🎮",
                tag: "Gamer Culture",
                year: "1970s → metaverse",
                title: "Gamers rule the internet",
                desc: "From 'nerds in the basement' to the architects of the internet's dominant language. Memes, streams, Twitch, esports — gaming culture became the universal language of Gen Z.",
                stats: ["3.3B gamers worldwide", "Esports > traditional sports", "Twitch = the new TV"],
                accent: "#00e5ff",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-400 group"
                  style={{ background: `linear-gradient(135deg, ${item.accent}11 0%, rgba(255,255,255,0.03) 100%)` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="text-6xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">{item.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ fontFamily: "'Unbounded', sans-serif", background: item.accent + "22", color: item.accent }}
                        >
                          {item.tag}
                        </span>
                        <span className="text-white/25 text-xs">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Unbounded', sans-serif" }}>{item.title}</h3>
                      <p className="text-white/55 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0 md:min-w-[220px]">
                      {item.stats.map((s, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-white/45">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.accent }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: IDENTITY ─── */}
      <section id="identity" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[700px] h-[700px] opacity-10" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#ff3cac] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>05 / Identity</div>
            <h2 className="mb-4 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Who am I in the<br />
              <span style={{ background: "linear-gradient(90deg, #ff3cac, #7b2ff7, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                digital world?
              </span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mb-12">
              Subcultures aren't just tastes — they're a way of saying: "This is who I am"
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-7">
            <div className="space-y-4">
              {[
                { title: "Multiple Identities", icon: "🪞", desc: "One person can simultaneously be a K-pop fan, a gamer, and a skater. Subcultures are no longer mutually exclusive." },
                { title: "Online vs Offline", icon: "💻", desc: "A digital identity can differ radically from the real one. Anonymity lets people experiment freely with belonging." },
                { title: "Consumption = Belonging", icon: "🛍️", desc: "Merch, playlists, memes — buying the symbols of a subculture is how people join it. But is that genuine membership?" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.85rem" }}>{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="flex flex-col gap-4">
              <div className="flex-1 p-8 rounded-3xl border border-[#ff3cac]/20 bg-[#ff3cac]/5 flex flex-col justify-between">
                <blockquote className="text-2xl font-bold text-white leading-snug" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  "A subculture isn't what you listen to. It's what you believe in."
                </blockquote>
                <div className="mt-5 text-white/25 text-sm">— cultural studies thesis</div>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="text-white/40 text-sm mb-3">The belonging formula:</div>
                <div className="font-bold text-lg text-white" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.9rem" }}>
                  Values + Aesthetics + Community
                  <span style={{ color: "#ff3cac" }}> = Identity</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CONCLUSION ─── */}
      <section id="conclusion" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[600px] h-[600px] opacity-20" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", bottom: "-200px", left: "-200px" }} />
        <Orb className="w-[400px] h-[400px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "-100px", right: "-100px" }} />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#00e5ff] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>06 / Conclusion</div>
            <h2 className="leading-none mb-8" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, color: "#fff" }}>
              What's next?
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-white/55 text-xl leading-relaxed max-w-3xl mx-auto mb-12">
              The line between mainstream and subculture keeps dissolving.
              Algorithms accelerate the cultural cycle — trends last weeks, not years.
              The future may belong to <span className="text-white font-semibold">micro-subcultures</span> —
              niches so specific they reach thousands, not millions.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "🔮", title: "Hyper-personalisation", desc: "The algorithm builds a culture of one" },
                { icon: "🌐", title: "Global Niches", desc: "Subcultures are going transnational" },
                { icon: "🤖", title: "AI & Culture", desc: "Artificial intelligence as a new cultural agent" },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="font-bold text-white mb-1" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.8rem" }}>{item.title}</div>
                  <div className="text-white/35 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div
              className="p-8 rounded-3xl border border-white/10"
              style={{ background: "linear-gradient(135deg, rgba(255,60,172,0.1), rgba(123,47,247,0.1), rgba(0,229,255,0.1))" }}
            >
              <p
                className="text-2xl md:text-3xl font-black text-white leading-tight"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Subcultures aren't going anywhere —<br />
                <span style={{ background: "linear-gradient(90deg, #ff3cac, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  they're just getting faster
                </span>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-white/20 text-xs">
              <div className="h-px w-16 bg-white/15" />
              <span>End of presentation</span>
              <div className="h-px w-16 bg-white/15" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-5 flex items-center justify-between text-white/20 text-xs">
        <span style={{ fontFamily: "'Unbounded', sans-serif" }}>CULTURE 2024</span>
        <div className="hidden md:flex gap-4">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-white/45 transition-colors">{s.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
