import React from 'react';
import { motion } from 'motion/react';
import { servicesData } from './servicesData';
import CustomCursor from './components/CustomCursor';
import { AudioPlayer } from './components/AudioPlayer';
import siteSalon from './image/site-salon.jpg.37.50.png';
import siteHoney from './image/site-honey.jpg.23.40.png';
import sitePersonal from './image/site-personal.jpg.12.45.png';
import siteTeam from './image/site-team.jpg.43.40.png';
import personalPhoto from './image/Im.jpeg';
import { 
  Bot, 
  Video, 
  Music, 
  ShoppingBag, 
  MessageSquare, 
  Globe, 
  MapPin, 
  Send, 
  Mail, 
  Play,
  Hammer,
  ArrowLeft,
  Target,
  ShieldCheck
} from 'lucide-react';

const Orb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 0.14,
      y: [0, -25, 0]
    }}
    transition={{ 
      opacity: { duration: 2.5 },
      y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={`fixed rounded-full blur-[140px] pointer-events-none z-0 ${className}`}
  />
);

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AmbientParticle = ({ 
  startX, 
  startY, 
  moveX, 
  moveY, 
  color, 
  duration, 
  delay 
}: { 
  startX: string; 
  startY: string; 
  moveX: string; 
  moveY: string; 
  color: string; 
  duration: number; 
  delay: number; 
}) => (
  <motion.div
    initial={{ left: startX, top: startY, opacity: 0 }}
    animate={{
      left: [startX, moveX, startX],
      top: [startY, moveY, startY],
      opacity: [0.03, 0.09, 0.05, 0.11, 0.03],
      scale: [1, 1.25, 0.85, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute w-3 h-3 rounded-full blur-[4px] pointer-events-none ${color}`}
  />
);

const AmbientMotionLayer = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Very soft drifting giant ambient orbs (low opacity, massive blur for luxury atmosphere) */}
    <motion.div
      animate={{
        x: [0, 40, -30, 20, 0],
        y: [0, -50, 30, -20, 0],
        scale: [1, 1.12, 0.92, 1.05, 1],
      }}
      transition={{
        duration: 35,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-[650px] h-[650px] rounded-full bg-violet/2.5 blur-[130px] top-1/4 left-1/4"
    />
    
    <motion.div
      animate={{
        x: [0, -30, 45, -20, 0],
        y: [0, 45, -45, 25, 0],
        scale: [1, 0.94, 1.08, 0.97, 1],
      }}
      transition={{
        duration: 42,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
      }}
      className="absolute w-[550px] h-[550px] rounded-full bg-cyan/1.5 blur-[140px] bottom-1/3 right-1/4"
    />

    <motion.div
      animate={{
        x: [0, 35, -25, 30, 0],
        y: [0, -30, 40, -35, 0],
        scale: [0.97, 1.05, 0.92, 1.1, 0.97],
      }}
      transition={{
        duration: 48,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 8
      }}
      className="absolute w-[600px] h-[600px] rounded-full bg-violet-light/1 blur-[150px] top-1/3 right-1/3"
    />

    {/* Cinematic micro particles floating slow-mo */}
    <AmbientParticle startX="15vw" startY="20vh" moveX="18vw" moveY="14vh" color="bg-violet" duration={28} delay={0} />
    <AmbientParticle startX="85vw" startY="35vh" moveX="81vw" moveY="42vh" color="bg-cyan" duration={33} delay={3} />
    <AmbientParticle startX="30vw" startY="75vh" moveX="35vw" moveY="68vh" color="bg-violet-light" duration={30} delay={6} />
    <AmbientParticle startX="70vw" startY="80vh" moveX="66vw" moveY="85vh" color="bg-violet" duration={36} delay={1.5} />
    <AmbientParticle startX="50vw" startY="15vh" moveX="46vw" moveY="22vh" color="bg-cyan" duration={32} delay={4.5} />
  </div>
);

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(null);

  const activeService = servicesData.find(s => s.id === selectedServiceId);

  return (
    <div className="relative min-h-screen">
      {/* Premium Digital Cursor */}
      <CustomCursor />

      {/* Cinematic Ambient Atmosphere Layer */}
      <AmbientMotionLayer />

      {/* Background Orbs */}
      <Orb className="w-[500px] h-[500px] bg-violet/45 -top-[150px] -right-[100px]" delay={0} />
      <Orb className="w-[350px] h-[350px] bg-cyan/35 bottom-[20%] -left-[100px]" delay={3} />
      <Orb className="w-[300px] h-[300px] bg-violet/25 top-[50%] -right-[80px]" delay={5} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-5 flex justify-between items-center bg-[rgba(6,6,15,0.7)] backdrop-blur-[20px] border-b border-border-accent">
        <div 
          onClick={() => {
            setSelectedServiceId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-syne font-extrabold text-[1.1rem] tracking-wider bg-linear-to-br from-violet-light to-cyan bg-clip-text text-transparent cursor-pointer"
        >
          TV · AI CREATOR
        </div>
        <div className="hidden md:flex gap-8">
          {['услуги', 'обо мне', 'связаться'].map((link) => (
            <a 
              key={link}
              href={selectedServiceId ? "#" : `#${link === 'обо мне' ? 'about' : link === 'связаться' ? 'contact' : 'services'}`}
              onClick={() => {
                if (selectedServiceId) {
                  setSelectedServiceId(null);
                }
              }}
              className="text-muted no-underline text-[0.85rem] font-medium tracking-wider uppercase transition-colors hover:text-violet-light cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {activeService ? (
        <div className="relative z-1 pt-32 pb-24 px-[5vw] max-w-[1100px] mx-auto min-h-[80vh]">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setSelectedServiceId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-muted hover:text-violet-light transition-colors mb-12 bg-transparent border-none cursor-pointer text-sm uppercase tracking-wider font-semibold"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Назад к списку
          </motion.button>

          {/* Hero segment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-violet/15 border border-violet/30 rounded-xl flex items-center justify-center text-violet-light">
                {activeService.icon}
              </div>
              <span className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-violet-light">
                {activeService.tags}
              </span>
            </div>
            <h1 className="font-syne text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.1] mb-4 tracking-tight bg-linear-to-br from-text-main via-text-main to-violet-light bg-clip-text text-transparent">
              {activeService.detailTitle}
            </h1>
            <p className="text-muted text-lg max-w-[700px] leading-relaxed">
              {activeService.subtitle}
            </p>
          </motion.div>

          {/* Projects inside the service */}
          <div className="space-y-24">
            {activeService.projects.map((project, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                key={i}
                className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center border-b border-border-accent/40 pb-16 last:border-none"
              >
                {/* Media frame */}
                <div className={`relative ${project.video ? 'aspect-[9/16] max-w-[320px] mx-auto w-full' : 'aspect-video w-full'} rounded-2xl border border-border-accent bg-bg-heavy overflow-hidden shadow-2xl group`}>
                  {project.video ? (
                    <video
                      src={project.video}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        style={{ transition: 'transform 0.5s ease' }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {project.audio && (
                        <AudioPlayer src={project.audio} title={project.title} />
                      )}
                    </>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-violet/85 text-white backdrop-blur-xs font-bold text-[0.75rem] rounded-full uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-syne text-2xl font-extrabold text-text-main">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-violet-light/90 font-semibold text-xs mt-1.5 uppercase tracking-widest">{project.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Task Card */}
                  <div className="bg-bg-alt border border-border-accent rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-cyan" />
                    <div className="flex items-center gap-2 mb-2 text-cyan">
                      <Target size={16} />
                      <span className="text-[0.78rem] font-bold uppercase tracking-wider">Сформулированная задача</span>
                    </div>
                    <p className="text-muted text-[0.88rem] leading-relaxed font-light">{project.task}</p>
                  </div>

                  {/* Realization Card */}
                  <div className="bg-bg-alt border border-border-accent rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-violet" />
                    <div className="flex items-center gap-2 mb-2 text-violet-light">
                      <ShieldCheck size={16} />
                      <span className="text-[0.78rem] font-bold uppercase tracking-wider">Реализация проекта</span>
                    </div>
                    <p className="text-muted text-[0.88rem] leading-relaxed font-light">{project.realization}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA at bottom */}
          <SectionReveal className="mt-20 text-center bg-bg-alt border border-border-accent rounded-3xl p-12 relative overflow-hidden max-w-[800px] mx-auto">
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-violet/10 rounded-full blur-3xl" />
            <h3 className="font-syne text-2xl font-extrabold mb-3 text-text-main">Понравился подход к работе?</h3>
            <p className="text-muted mb-8 max-w-[500px] mx-auto text-[0.95rem]">Давайте создадим уникальное технологичное решение для вашего бренда — быстро, качественно и с душой.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#contact" onClick={() => { setSelectedServiceId(null); }} className="btn btn-primary">Обсудить проект</a>
              <button onClick={() => { setSelectedServiceId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-outline">Все услуги</button>
            </div>
          </SectionReveal>
        </div>
      ) : (
        <>
          {/* Hero Section */}
      <section className="relative z-1 min-h-screen flex flex-col justify-center px-[5vw] py-20 max-w-[1100px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-cyan mb-8"
        >
          <span className="block w-8 h-[1px] bg-cyan" />
          Екатеринбург · AI Creator · Фриланс
        </motion.div>
        
        <motion.h1 
          className="font-syne text-[clamp(2rem,8vw,6.5rem)] font-extrabold leading-none tracking-tight mb-6"
        >
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="block bg-linear-to-br from-text-main via-text-main to-violet-light bg-clip-text text-transparent"
          >
            Татьяна<br />Власова
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="block bg-linear-to-br from-violet to-cyan bg-clip-text text-transparent"
          >
            AI Visuals &<br />Digital Creator
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="max-w-[650px] text-muted text-lg mb-12 leading-relaxed"
        >
          Интегрирую передовые AI-технологии в маркетинг брендов и экспертов. Создаю реалистичных цифровых аватаров, уникальный видеоконтент и умные ИТ-решения, которые сокращают расходы на продакшн до 70% и повышают вовлеченность аудитории.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-4 flex-wrap"
        >
          <a href="#contact" className="btn btn-primary">Обсудить проект</a>
          <a href="#services" className="btn btn-outline">Наши услуги</a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-12 mt-16 pt-12 border-t border-border-accent"
        >
          {[
            { num: '15+', label: 'лет в технологиях' },
            { num: '3', label: 'языка рекламы' },
            { num: '10+', label: 'AI-инструментов' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-syne text-[2rem] font-extrabold bg-linear-to-br from-violet-light to-cyan bg-clip-text text-transparent">
                {stat.num}
              </div>
              <div className="text-[0.8rem] text-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-1 py-24 px-[5vw] max-w-[1100px] mx-auto">
        <SectionReveal>
          <div className="section-tag">Что я делаю</div>
          <h2 className="section-title">Услуги</h2>
          <p className="text-muted max-w-[600px] mb-14">Комплексные AI-решения для автоматизации бизнес-процессов, усиления личного бренда и создания высококонверсионного контента.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setSelectedServiceId(service.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative bg-bg-alt border border-border-accent rounded-[20px] p-8 transition-all hover:border-violet/50 overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-violet to-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-13 h-13 bg-violet/15 border border-violet/30 rounded-[14px] flex items-center justify-center text-violet-light mb-5">
                  {service.icon}
                </div>
                <h3 className="font-syne text-[1.1rem] font-bold mb-3 text-text-main">{service.title}</h3>
                <p className="text-muted text-[0.9rem] leading-relaxed">{service.desc}</p>
                <div className="inline-block mt-4 px-3 py-0.5 bg-cyan/10 text-cyan rounded-full text-[0.75rem] font-semibold border border-cyan/20">
                  {service.tags}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Tools Section */}
      <section className="bg-bg-alt border-y border-border-accent">
        <div className="py-24 px-[5vw] max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="section-tag">Мой арсенал</div>
            <h2 className="section-title">Инструменты</h2>
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { name: "Gemini Pro", type: "ai" },
                { name: "Claude", type: "ai" },
                { name: "ChatGPT", type: "ai" },
                { name: "Meta AI", type: "ai" },
                { name: "Midjourney", type: "ai" },
                { name: "Veo", type: "ai" },
                { name: "Nano Banana", type: "ai" },
                { name: "CapCut", type: "video" },
                { name: "Suno / Udio", type: "video" },
                { name: "Heygen / D-ID", type: "video" },
                { name: "Telegram Bot API", type: "default" },
                { name: "AI-конструкторы сайтов", type: "default" },
              ].map((tool, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-2 px-4.5 py-2 bg-bg-heavy border border-border-accent rounded-full text-[0.85rem] font-medium text-muted hover:border-violet hover:text-violet-light transition-all"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${tool.type === 'ai' ? 'bg-cyan' : tool.type === 'video' ? 'bg-pink' : 'bg-violet'}`} />
                  {tool.name}
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="relative py-24 px-[5vw] max-w-[1100px] mx-auto overflow-hidden">
        {/* Subtle cinematic grain texture over the entire section */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center relative z-10">
          {/* Portrait Image with elegant scale-in & custom floaters */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] max-w-[380px] mx-auto group"
          >
            {/* Premium Translucent Cinematic Border Frame */}
            <motion.div 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                opacity: [0.75, 0.9, 0.75]
              }}
              transition={{ 
                backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
                opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ backgroundSize: "200% 200%" }}
              className="absolute -inset-[1px] rounded-[25px] bg-gradient-to-br from-white/20 via-violet-light/15 to-white/5 z-5 pointer-events-none"
            />

            {/* Main Image Container */}
            <div className="w-full h-full relative z-10 rounded-[24px] border border-border-accent/40 overflow-hidden bg-bg-alt/80 backdrop-blur-md">
              <img 
                src={personalPhoto} 
                alt="Татьяна Власова" 
                className="w-full h-full object-cover grayscale-[10%] brightness-105 transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0" 
              />
            </div>

            {/* Cinematic Ambient Glow Backdrops (Highly Diffused, Luxury Fashion Vibe) */}
            <div className="absolute -inset-[15%] z-0 pointer-events-none filter blur-[80px] opacity-75">
              {/* 1. Deep Purple slow breather */}
              <motion.div
                animate={{
                  scale: [0.9, 1.1, 0.95, 1.05, 0.9],
                  x: [-20, 20, -10, 15, -20],
                  y: [-15, 15, 20, -20, -15],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet/12 via-violet-light/8 to-transparent mix-blend-screen"
              />

              {/* 2. Soft Cyan shifting backdrop */}
              <motion.div
                animate={{
                  scale: [1.1, 0.9, 1.05, 0.95, 1.1],
                  x: [20, -20, 15, -15, 20],
                  y: [15, -15, -25, 20, 15],
                  rotate: [360, 270, 180, 90, 0]
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-[10%] rounded-full bg-gradient-to-bl from-cyan/8 via-violet/5 to-transparent mix-blend-screen"
              />

              {/* 3. Subtle floating soft neon spot */}
              <motion.div
                animate={{
                  x: [-45, 35, -15, 25, -45],
                  y: [-25, 40, 10, -25, -25],
                  scale: [0.85, 1.15, 0.95, 1.05, 0.85],
                  opacity: [0.3, 0.5, 0.4, 0.6, 0.3]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-[180px] h-[180px] rounded-full bg-cyan/6 blur-[55px] mix-blend-screen left-[15%] top-[10%]"
              />

              {/* 4. Deep Violet-Light breathing light */}
              <motion.div
                animate={{
                  x: [35, -25, 25, -35, 35],
                  y: [25, -30, -10, 20, 25],
                  scale: [1.1, 0.85, 1.05, 0.9, 1.1],
                  opacity: [0.2, 0.4, 0.3, 0.5, 0.2]
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-[160px] h-[160px] rounded-full bg-violet-light/6 blur-[50px] mix-blend-screen right-[10%] bottom-[15%]"
              />
            </div>
            
            {/* Floater 1: AI Native */}
            <motion.div 
              animate={{ 
                x: [0, 4, -2, 3, 0], 
                y: [0, -5, 3, -4, 0] 
              }} 
              transition={{ 
                duration: 11, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }} 
              whileHover={{ 
                scale: 1.06, 
                boxShadow: "0 0 22px rgba(6, 182, 212, 0.25)", 
                borderColor: "rgba(6, 182, 212, 0.45)" 
              }}
              className="hidden md:block absolute top-[10%] -right-[8%] z-20 bg-bg-alt/80 backdrop-blur-xl border border-border-accent/60 rounded-xl px-3.5 py-2 text-[0.78rem] font-semibold whitespace-nowrap text-cyan shadow-lg shadow-cyan/5 transition-all duration-300 select-none cursor-default"
            >
              🤖 AI Native
            </motion.div>
            
            {/* Floater 2: Video Creator */}
            <motion.div 
              animate={{ 
                x: [0, -3, 4, -2, 0], 
                y: [0, 4, -4, 3, 0] 
              }} 
              transition={{ 
                duration: 13, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: 2 
              }} 
              whileHover={{ 
                scale: 1.06, 
                boxShadow: "0 0 22px rgba(155, 93, 229, 0.25)", 
                borderColor: "rgba(155, 93, 229, 0.45)" 
              }}
              className="hidden md:block absolute bottom-[25%] -right-[12%] z-20 bg-bg-alt/80 backdrop-blur-xl border border-border-accent/60 rounded-xl px-3.5 py-2 text-[0.78rem] font-semibold whitespace-nowrap text-violet-light shadow-lg shadow-violet/5 transition-all duration-300 select-none cursor-default"
            >
              🎬 Video Creator
            </motion.div>
            
            {/* Floater 3: Tech Expert */}
            <motion.div 
              animate={{ 
                x: [0, 3, -4, 2, 0], 
                y: [0, -4, 4, -2, 0] 
              }} 
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: 4.5 
              }} 
              whileHover={{ 
                scale: 1.06, 
                boxShadow: "0 0 22px rgba(199, 125, 255, 0.25)", 
                borderColor: "rgba(199, 125, 255, 0.45)" 
              }}
              className="hidden md:block absolute bottom-[8%] -left-[6%] z-20 bg-bg-alt/80 backdrop-blur-xl border border-border-accent/60 rounded-xl px-3.5 py-2 text-[0.78rem] font-semibold whitespace-nowrap text-violet-light shadow-lg shadow-violet/5 transition-all duration-300 select-none cursor-default"
            >
              🛠️ Tech Expert
            </motion.div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <div className="section-tag mb-4">Обо мне</div>
            
            {/* Premium Header Reveal (Blur to sharp, upward reveal, cinematic easing) */}
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.16 }
                }
              }}
              className="font-syne text-[2.2rem] font-extrabold mb-6 leading-[1.2] tracking-tight text-text-main"
            >
              <div className="overflow-hidden flex gap-3 flex-wrap">
                {["Создаю", "AI-контент,"].map((word, wordIdx) => (
                  <motion.span
                    key={wordIdx}
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] } 
                      }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden flex gap-3 flex-wrap">
                {["digital-визуалы"].map((word, wordIdx) => (
                  <motion.span
                    key={wordIdx}
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] } 
                      }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)",
                      transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] } 
                    }
                  }}
                  className="inline-block text-violet-light"
                >
                  и премиальные сайты.
                </motion.span>
              </div>
            </motion.h2>

            {/* Paragraphs with delayed fade-in & smooth opacity/vertical movement */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 1.2, delay: 0.35, ease: [0.25, 1, 0.5, 1] } 
                }
              }}
              className="space-y-4"
            >
              <p className="text-muted text-[0.95rem] leading-relaxed">Мой бэкграунд объединяет технологическую экспертизу, AI-инструменты и визуальное мышление.</p>
              <p className="text-muted text-[0.95rem] leading-relaxed">Создаю digital-контент, AI-видео, визуальные концепции и сайты нового поколения — от идеи до готового продукта.</p>
              <p className="text-muted text-[0.95rem] font-medium text-violet-light leading-relaxed"><span className="text-text-main font-semibold">Фокус:</span> AI-визуал, контент-системы, digital-стратегия и эстетика premium-брендов.</p>
            </motion.div>

            {/* Timeline staggered release - luxury interface style with thin track & dot markers */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.6 }
                }
              }}
              className="relative border-l border-violet-light/10 pl-6 ml-1 space-y-7 mt-10"
            >
              {[
                { year: "2008", text: "Технический бэкграунд и цифровые системы." },
                { year: "2022", text: "Изучение AI-инструментов и digital production." },
                { year: "2024", text: "Создание AI-видео, сайтов и контент-концепций." },
                { year: "2025", text: "AI creative studio и коммерческий продакшн." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: -8, filter: "blur(2px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  whileHover={{ x: 2 }}
                  className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-6 transition-all duration-300"
                >
                  {/* Tiny delicate dot exactly on the vertical line */}
                  <div className="absolute -left-[28.5px] top-[7px] md:top-auto w-1.5 h-1.5 rounded-full bg-violet-light border border-bg shadow-[0_0_8px_rgba(199,125,255,0.4)] z-10" />
                  
                  <div className="text-[0.72rem] font-bold text-violet-light/85 uppercase tracking-[0.15em] min-w-[55px]">{item.year}</div>
                  <div className="text-[0.85rem] text-muted font-light tracking-wide">{item.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="bg-bg-alt border-t border-border-accent">
        <div className="text-center py-24 px-[5vw] max-w-[700px] mx-auto">
          <SectionReveal>
            <div className="section-tag">Связь</div>
            <h2 className="font-syne text-[clamp(2rem,5vw,3.5rem)] font-extrabold mb-4">
              Начнём<br /><span className="bg-linear-to-br from-violet to-cyan bg-clip-text text-transparent">проект?</span>
            </h2>
            <p className="text-muted mb-10">Я открыта к сотрудничеству. Напишите — обсудим вашу задачу, сроки и стоимость.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://t.me/trvlas" target="_blank" className="inline-flex items-center gap-2.5 px-8 py-4 bg-bg-heavy border border-border-accent rounded-xl text-text-main font-semibold text-[0.95rem] transition-all hover:border-violet hover:bg-violet/10 hover:-translate-y-0.75">
                <Send size={20} className="text-violet-light" /> @trvlas
              </a>
              <a href="mailto:trvlas@hotmail.com" className="inline-flex items-center gap-2.5 px-8 py-4 bg-bg-heavy border border-border-accent rounded-xl text-text-main font-semibold text-[0.95rem] transition-all hover:border-violet hover:bg-violet/10 hover:-translate-y-0.75">
                <Mail size={20} className="text-violet-light" /> trvlas@hotmail.com
              </a>
            </div>
            <p className="mt-8 text-[0.8rem] text-muted flex items-center justify-center gap-1.5">
              <MapPin size={14} /> Екатеринбург, Россия · Работаю удалённо со всей страной
            </p>
          </SectionReveal>
        </div>
      </section>
        </>
      )}

      <footer className="text-center py-8 text-muted text-[0.8rem] border-t border-border-accent">
        <p>© 2025 Татьяна Власова · <span className="text-violet-light">AI Creator & Digital Specialist</span> · Екатеринбург</p>
      </footer>
    </div>
  );
}
