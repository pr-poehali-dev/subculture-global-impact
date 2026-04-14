import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "intro", label: "Введение" },
  { id: "definitions", label: "Определения" },
  { id: "digital", label: "Цифровое" },
  { id: "examples", label: "Примеры" },
  { id: "identity", label: "Идентичность" },
  { id: "conclusion", label: "Заключение" },
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
          Культура
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

      {/* ─── СЕКЦИЯ 1: ВВЕДЕНИЕ ─── */}
      <section id="intro" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <Orb className="w-[700px] h-[700px] opacity-25" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", top: "-200px", left: "-200px" }} />
        <Orb className="w-[500px] h-[500px] opacity-20" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", bottom: "-100px", right: "-100px" }} />
        <Orb className="w-[300px] h-[300px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "30%", right: "5%" }} />

        <div className="relative z-10 text-center max-w-5xl">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/40 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#ff3cac" }} />
              Доклад · 2024
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1
              className="font-display leading-none mb-6"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 900,
              }}
            >
              <span className="block text-white">МЕЙНСТРИМ</span>
              <span
                className="block"
                style={{ background: "linear-gradient(90deg, #ff3cac 0%, #7b2ff7 50%, #00e5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                &amp; СУБКУЛЬТУРЫ
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-white/55 max-w-3xl mx-auto leading-relaxed">
              Как цифровая эпоха переформатирует границы культурной принадлежности,
              стирает различия между массовым и нишевым, и создаёт новую идентичность
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#definitions"
                className="px-8 py-3 rounded-full text-sm text-white font-semibold transition-transform hover:scale-105"
                style={{ fontFamily: "'Unbounded', sans-serif", background: "linear-gradient(135deg, #ff3cac, #7b2ff7)", fontSize: "0.75rem" }}
              >
                Начать
              </a>
              <a
                href="#examples"
                className="px-8 py-3 rounded-full text-sm text-white/60 hover:text-white transition-all border border-white/15 hover:border-white/30"
                style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.75rem" }}
              >
                Примеры
              </a>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-1 text-white/20 text-xs">
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #ff3cac, transparent)" }} />
            <span>Скролл</span>
          </div>
        </div>
      </section>

      {/* ─── СЕКЦИЯ 2: ОПРЕДЕЛЕНИЯ ─── */}
      <section id="definitions" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[500px] h-[500px] opacity-15" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", top: 0, right: "-150px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#ff3cac] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>02 / Определения</div>
            <h2 className="mb-16 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Что такое<br />
              <span style={{ background: "linear-gradient(90deg, #7b2ff7, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>культурный мейнстрим?</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                emoji: "🌊",
                title: "Мейнстрим",
                text: "Культурное течение, охватывающее большинство. Это массовые тренды, поп-музыка, голливудские фильмы — всё, что потребляет широкая аудитория без особого фильтра принадлежности.",
                tags: ["Масштаб", "Доступность", "Унификация"],
                accent: "#ff3cac",
              },
              {
                emoji: "⚡",
                title: "Субкультура",
                text: "Группа людей, объединённых общими ценностями, эстетикой или стилем жизни, отличным от доминирующей культуры. Нишевость — их сила и отличительная черта.",
                tags: ["Идентичность", "Принадлежность", "Различие"],
                accent: "#7b2ff7",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 150}>
                <div
                  className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 group h-full"
                >
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
                <span className="text-[#00e5ff] font-bold" style={{ fontFamily: "'Unbounded', sans-serif" }}>Ключевой вопрос:</span>{" "}
                В цифровую эпоху граница между ними размывается —
                субкультуры становятся мейнстримом быстрее, чем успевают сформироваться
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── СЕКЦИЯ 3: ЦИФРОВОЕ ПРОСТРАНСТВО ─── */}
      <section id="digital" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[600px] h-[600px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "20%", left: "-200px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#00e5ff] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>03 / Цифровое пространство</div>
            <h2 className="mb-4 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Алгоритмы<br />
              <span style={{ background: "linear-gradient(90deg, #00e5ff, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>диктуют культуру</span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mb-14">
              Социальные сети и рекомендательные системы стали новыми кураторами культурного потребления
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 mb-7">
            {[
              { icon: "📱", title: "TikTok-эффект", desc: "Алгоритм For You превращает нишевый контент в вирусный за 24 часа. Субкультуры живут и умирают в темпе trending звука.", color: "#ff3cac" },
              { icon: "🔄", title: "Эхо-камеры", desc: "Алгоритмы создают пузыри — человек видит только то, с чем согласен. Субкультура становится замкнутой экосистемой.", color: "#7b2ff7" },
              { icon: "📊", title: "Аналитика трендов", desc: "Google Trends, Spotify Charts, Billboard — данные определяют, что считать популярным. Культура превращается в метрику.", color: "#00e5ff" },
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
                { num: "4.9B", label: "пользователей соцсетей в мире" },
                { num: "63%", label: "молодёжи открывают музыку через алгоритмы" },
                { num: "2024", label: "год, когда алгоритм стал главным DJ" },
                { num: "∞", label: "субкультур рождается ежедневно" },
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

      {/* ─── СЕКЦИЯ 4: ПРИМЕРЫ ─── */}
      <section id="examples" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[500px] h-[500px] opacity-15" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", bottom: 0, right: "-100px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#7b2ff7] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>04 / Примеры</div>
            <h2 className="mb-14 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Три{" "}
              <span style={{ background: "linear-gradient(90deg, #ff3cac, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>культурных</span>
              <br />феномена
            </h2>
          </Reveal>

          <div className="space-y-5">
            {[
              {
                emoji: "🎤",
                tag: "Хип-хоп",
                year: "1973 → сегодня",
                title: "Из Бронкса в мейнстрим",
                desc: "Зародился как голос уличных кварталов. Сегодня хип-хоп — самый прослушиваемый жанр мира. Субкультура победила, но изменилась ли она при этом?",
                stats: ["#1 жанр по стримингу", "Billion-dollar индустрия", "Повлиял на моду, язык, кино"],
                accent: "#ff3cac",
              },
              {
                emoji: "🎭",
                tag: "K-pop",
                year: "1990е → глобально",
                title: "Корея захватила мир",
                desc: "BTS, BLACKPINK, NewJeans — корейская поп-культура превратилась в глобальный феномен с преданными фандомами (Army, Blink) как полноценными субкультурами.",
                stats: ["Fandom как субкультура", "Soft power Кореи", "Billion viewers per MV"],
                accent: "#7b2ff7",
              },
              {
                emoji: "🎮",
                tag: "Gamer Culture",
                year: "1970е → метавселенная",
                title: "Геймеры правят интернетом",
                desc: "Из «нёрдов в подвале» — в создателей доминирующего языка интернета. Мемы, стримы, Twitch, esports — игровая культура стала универсальным языком поколения Z.",
                stats: ["3.3B геймеров в мире", "Esports > традиционный спорт", "Twitch = новое ТВ"],
                accent: "#00e5ff",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-400 group"
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
                    <div className="flex flex-col gap-2 flex-shrink-0 md:min-w-[200px]">
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

      {/* ─── СЕКЦИЯ 5: ИДЕНТИЧНОСТЬ ─── */}
      <section id="identity" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[700px] h-[700px] opacity-10" style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#ff3cac] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>05 / Идентичность</div>
            <h2 className="mb-4 leading-tight" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff" }}>
              Кто я в цифровом<br />
              <span style={{ background: "linear-gradient(90deg, #ff3cac, #7b2ff7, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                мире?
              </span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mb-12">
              Субкультуры — это не просто вкусы, это способ сказать: «Я — это вот это»
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-7">
            <div className="space-y-4">
              {[
                { title: "Множественная идентичность", icon: "🪞", desc: "Один человек может быть одновременно фанатом K-pop, геймером и скейтером. Субкультуры перестали быть взаимоисключающими." },
                { title: "Онлайн vs Офлайн", icon: "💻", desc: "Цифровая идентичность может кардинально отличаться от реальной. Анонимность позволяет экспериментировать с принадлежностью." },
                { title: "Потребление = принадлежность", icon: "🛍️", desc: "Мерч, плейлисты, мемы — покупая символы субкультуры, человек присоединяется к ней. Это ли настоящее членство?" },
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
                  "Субкультура — это не то, что ты слушаешь. Это то, во что ты веришь."
                </blockquote>
                <div className="mt-5 text-white/25 text-sm">— культурологический тезис</div>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="text-white/40 text-sm mb-3">Формула принадлежности:</div>
                <div className="font-bold text-lg text-white" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.9rem" }}>
                  Ценности + Эстетика + Сообщество
                  <span style={{ color: "#ff3cac" }}> = Идентичность</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── СЕКЦИЯ 6: ЗАКЛЮЧЕНИЕ ─── */}
      <section id="conclusion" className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden">
        <Orb className="w-[600px] h-[600px] opacity-20" style={{ background: "radial-gradient(circle, #ff3cac, transparent 70%)", bottom: "-200px", left: "-200px" }} />
        <Orb className="w-[400px] h-[400px] opacity-15" style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", top: "-100px", right: "-100px" }} />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-[#00e5ff] uppercase mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>06 / Заключение</div>
            <h2 className="leading-none mb-8" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, color: "#fff" }}>
              Что дальше?
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-white/55 text-xl leading-relaxed max-w-3xl mx-auto mb-12">
              Граница между мейнстримом и субкультурой продолжает размываться.
              Алгоритмы ускоряют культурный цикл — тренды живут недели, не годы.
              Возможно, будущее за <span className="text-white font-semibold">микросубкультурами</span> —
              нишами настолько специфичными, что охватывают тысячи, а не миллионы.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "🔮", title: "Гиперперсонализация", desc: "Алгоритм создаёт культуру для одного" },
                { icon: "🌐", title: "Глобальные ниши", desc: "Субкультуры становятся транснациональными" },
                { icon: "🤖", title: "AI и культура", desc: "Искусственный интеллект как новый культурный агент" },
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
                Субкультуры никуда не исчезнут —<br />
                <span style={{ background: "linear-gradient(90deg, #ff3cac, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  они просто становятся быстрее
                </span>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-white/20 text-xs">
              <div className="h-px w-16 bg-white/15" />
              <span>Конец доклада</span>
              <div className="h-px w-16 bg-white/15" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-5 flex items-center justify-between text-white/20 text-xs">
        <span style={{ fontFamily: "'Unbounded', sans-serif" }}>КУЛЬТУРА 2024</span>
        <div className="hidden md:flex gap-4">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-white/45 transition-colors">{s.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
