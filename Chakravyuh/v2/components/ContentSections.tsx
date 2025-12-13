import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Mail, Phone, ExternalLink, Send, CheckCircle, Award, Star, User, Trophy, ChevronDown, ChevronUp, ArrowRight, Download, HelpCircle } from 'lucide-react';
import { TRACKS, SCHEDULE, PLANET_COLORS } from '../constants';
import { PlanetName, NavigationCallback } from '../types';

interface SectionProps {
  onNavigate: NavigationCallback;
}

// --- HOME SECTION ---
export const HomeSection: React.FC<SectionProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2024-10-15T09:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-float">
      <div className="text-center md:text-left">
        <div className="inline-block px-3 py-1 mb-4 border border-space-accent/50 rounded-full bg-space-accent/10 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest text-space-accent uppercase">Galactic Hackathon</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 font-orbitron tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          CHAKRAVYUH <span className="text-space-accent">2.0</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 leading-relaxed md:max-w-lg">
          Enter the labyrinth of code. The universe awaits your innovation.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto md:mx-0">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="glass-panel rounded-lg p-2 md:p-4 text-center border-t border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-space-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10">
                <div className="text-2xl md:text-4xl font-bold text-white font-orbitron">{value}</div>
                <div className="text-[9px] md:text-xs uppercase tracking-widest text-gray-400 mt-1">{unit}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
            onClick={() => onNavigate(PlanetName.Pluto)}
            className="px-8 py-3 bg-space-accent text-white font-bold tracking-wider hover:bg-orange-600 transition-all rounded-full shadow-[0_0_20px_rgba(243,144,65,0.4)] text-sm md:text-base flex items-center justify-center gap-2 group"
        >
          REGISTER NOW <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
            onClick={() => onNavigate(PlanetName.Jupiter)}
            className="px-8 py-3 glass-panel border border-white/30 text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all rounded-full text-sm md:text-base"
        >
          VIEW TRACKS
        </button>
      </div>
    </div>
  );
};

// --- ABOUT SECTION ---
export const AboutSection: React.FC<SectionProps> = () => {
  const [counts, setCounts] = useState({ participants: 0, colleges: 0, projects: 0 });
  
  useEffect(() => {
    const duration = 1500;
    const targets = { participants: 500, colleges: 50, projects: 120 };
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCounts({
        participants: Math.floor(progress * targets.participants),
        colleges: Math.floor(progress * targets.colleges),
        projects: Math.floor(progress * targets.projects)
      });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 rounded-xl border-l-4 border-red-500">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-orbitron">THE MISSION</h3>
        <p className="text-gray-300 leading-relaxed text-justify">
          Chakravyuh 2.0 pushes the boundaries of student innovation. It's a 24-hour interstellar sprint to solve real-world problems.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
            { label: 'Hackers', count: counts.participants },
            { label: 'Colleges', count: counts.colleges },
            { label: 'Prototypes', count: counts.projects }
        ].map((stat, i) => (
            <div key={i} className="text-center p-4 glass-panel rounded-lg hover:border-red-500/50 transition-colors">
                <div className="text-2xl md:text-4xl font-bold text-white font-orbitron mb-1">{stat.count}+</div>
                <div className="text-[10px] md:text-xs text-red-400 uppercase tracking-widest">{stat.label}</div>
            </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-red-500" />
            <h3 className="text-lg font-bold">Base Camp Location</h3>
        </div>
        <div className="h-32 w-full bg-gray-900 rounded-lg flex items-center justify-center border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/75.3,17.6,14,0,0/600x300?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
            <span className="relative z-10 text-xs bg-black/80 px-2 py-1 rounded text-white">SVERI's College of Engineering</span>
        </div>
      </div>
    </div>
  );
};

// --- TRACKS SECTION ---
export const TracksSection: React.FC<SectionProps> = ({ onNavigate }) => (
  <div>
    <div className="flex justify-between items-end mb-6">
        <p className="text-gray-300 text-sm">Select a domain to dominate.</p>
        <button onClick={() => onNavigate(PlanetName.Pluto)} className="text-space-accent text-xs uppercase tracking-widest hover:underline">Register Now &rarr;</button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TRACKS.map((track, i) => (
        <div key={i} className="group glass-panel p-5 rounded-xl border-transparent hover:border-space-accent/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-16 h-16 bg-space-accent rounded-full blur-xl"></div>
          </div>
          <div className="flex items-start gap-4 relative z-10">
             <div className="text-space-accent bg-space-accent/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {track.icon}
             </div>
             <div>
                <h4 className="text-lg font-bold text-white mb-1 font-orbitron">{track.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{track.desc}</p>
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- SCHEDULE SECTION ---
export const ScheduleSection: React.FC<SectionProps> = () => (
  <div className="relative pl-4 md:pl-0">
    <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#b29d81] hover:text-white transition-colors border border-[#b29d81]/30 px-3 py-1 rounded-full">
            <Download size={14} /> Download PDF
        </button>
    </div>

    {/* Continuous Vertical Line */}
    <div className="absolute left-[19px] md:left-[27px] top-12 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-[#b29d81] to-transparent opacity-30"></div>
    
    <div className="space-y-8">
        {SCHEDULE.map((day, i) => (
        <div key={i} className="relative pl-10 md:pl-12 group">
            {/* Timeline Node */}
            <div className="absolute left-[14px] md:left-[22px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-[#b29d81] group-hover:bg-[#b29d81] group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(178,157,129,0.5)] z-10"></div>
            
            <div className="mb-4">
                <h3 className="text-xl font-bold text-[#b29d81] font-orbitron">{day.day}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{day.date}</p>
            </div>
            
            <div className="space-y-3">
            {day.events.map((evt, j) => (
                <div key={j} className="glass-panel p-3 rounded-r-lg border-l-2 border-l-transparent hover:border-l-[#b29d81] transition-all">
                <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-sm">{evt.title}</span>
                    <span className="text-[10px] font-mono text-[#b29d81] bg-[#b29d81]/10 px-2 py-1 rounded">{evt.time}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
        ))}
    </div>
  </div>
);

// --- SPONSOR SECTION ---
export const SponsorSection: React.FC<SectionProps> = () => (
  <div className="space-y-10 text-center">
    <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8dcdd8] to-transparent opacity-50"></div>
      <h3 className="text-[#8dcdd8] text-lg uppercase tracking-[0.3em] mb-8 font-orbitron">Diamond Partners</h3>
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 items-center">
         {/* Logos would go here, using text placeholders with glow */}
         {['GOOGLE', 'MICROSOFT', 'GITHUB'].map(name => (
             <div key={name} className="text-2xl font-bold text-white opacity-80 hover:opacity-100 hover:text-[#8dcdd8] transition-all cursor-default drop-shadow-[0_0_10px_rgba(141,205,216,0.3)]">
                 {name}
             </div>
         ))}
      </div>
    </div>
    
    <div className="glass-panel p-6 rounded-xl">
      <h3 className="text-[#8dcdd8] text-sm uppercase tracking-[0.2em] mb-6 font-orbitron opacity-80">Gold Partners</h3>
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 items-center opacity-60">
         {['POLYGON', 'DEVFOLIO'].map(name => (
             <div key={name} className="text-xl font-bold text-white hover:opacity-100 transition-all">
                 {name}
             </div>
         ))}
      </div>
    </div>
  </div>
);

// --- JUDGES SECTION ---
export const JudgesSection: React.FC<SectionProps> = () => (
  <div className="grid grid-cols-1 gap-4">
    {[
        { name: "Dr. Axon Ray", role: "AI Ethicist", desc: "Research lead at DeepMind, ex-NASA." },
        { name: "Sarah Connor", role: "Security Architect", desc: "10+ years in Cybersecurity, DEFCON speaker." },
        { name: "Linus Tech", role: "Hardware Guru", desc: "Expert in IoT and embedded systems." },
        { name: "Ada Lovelace", role: "Algorithm Specialist", desc: "Pioneer in computational logic." }
    ].map((judge, i) => (
      <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors group">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-black p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <User className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
        </div>
        <div>
          <h4 className="text-white font-bold font-orbitron">{judge.name}</h4>
          <p className="text-[#4f83e2] text-xs uppercase tracking-wider mb-1">{judge.role}</p>
          <p className="text-gray-500 text-xs truncate w-48">{judge.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// --- TEAM SECTION ---
export const TeamSection: React.FC<SectionProps> = () => (
  <div>
    <div className="mb-8 text-center">
        <h3 className="text-[#E8927C] text-lg uppercase tracking-widest mb-6 font-orbitron">Mission Control</h3>
        <div className="flex flex-wrap justify-center gap-6">
            {[
                { name: "Prof. Vikram Sarabhai", role: "Convener" },
                { name: "Dr. APJ Abdul Kalam", role: "Mentor" }
            ].map((lead, i) => (
                <div key={i} className="text-center group">
                     <div className="w-20 h-20 mx-auto rounded-full mb-3 border-2 border-[#E8927C] p-1 group-hover:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full bg-gray-800"></div>
                     </div>
                     <div className="text-white font-bold text-sm">{lead.name}</div>
                     <div className="text-[10px] text-gray-500 uppercase">{lead.role}</div>
                </div>
            ))}
        </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
        {[
            { name: "Aditi Verma", role: "Tech Lead" },
            { name: "Rahul Sharma", role: "Logistics" },
            { name: "Sneha Gupta", role: "Design" },
            { name: "Amit Patel", role: "Sponsorship" },
            { name: "Neha Das", role: "Outreach" },
            { name: "Rohan Kumar", role: "Web Dev" }
        ].map((member, i) => (
            <div key={i} className="glass-panel p-3 rounded flex items-center gap-3 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {member.name.charAt(0)}
                </div>
                <div>
                    <div className="text-xs text-white font-bold">{member.name}</div>
                    <div className="text-[9px] text-gray-400 uppercase">{member.role}</div>
                </div>
            </div>
        ))}
    </div>
  </div>
);

// --- FAQ SECTION ---
export const FaqSection: React.FC<SectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Who can participate?", a: "Any student with a valid college ID card can participate. Teams can be inter-college." },
    { q: "Is it free?", a: "Yes, registration is completely free for all shortlisted teams. We believe in open innovation." },
    { q: "What is the team size?", a: "Teams can have 2 to 4 members. Solo participation is not allowed for this edition." },
    { q: "Will food be provided?", a: "Yes, food, snacks, and accommodation are provided for the entire 24-hour duration." },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
                <div key={i} className={`glass-panel rounded-lg transition-all duration-300 ${isOpen ? 'border-orange-500/50 bg-white/5' : 'border-white/10'}`}>
                <button 
                    className="w-full text-left flex justify-between items-center p-4 text-white hover:text-orange-400 transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                    <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                        {faq.a}
                    </div>
                </div>
                </div>
            );
        })}
      </div>
      
      <div className="pt-4 text-center">
          <button className="text-sm text-gray-400 flex items-center justify-center gap-2 hover:text-white transition-colors">
              <HelpCircle size={16} /> Have more questions? Contact Us
          </button>
      </div>
    </div>
  );
};

// --- REGISTER SECTION ---
export const RegisterSection: React.FC<SectionProps> = () => (
  <div className="space-y-6">
    <div className="glass-panel p-4 rounded-xl flex items-center gap-4 border-orange-500/30 bg-orange-500/5">
        <div className="p-3 bg-orange-500/20 rounded-full text-orange-500">
            <Trophy size={24} />
        </div>
        <div>
            <h3 className="text-white font-bold font-orbitron">Prize Pool: ₹1,00,000</h3>
            <p className="text-xs text-gray-400">Total cash prizes + Internship opportunities</p>
        </div>
    </div>

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 pl-1">Team Name</label>
            <input type="text" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm font-mono" placeholder="Ex: CyberSamurai" />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 pl-1">Team Size</label>
            <select className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-orange-500 outline-none transition-all text-sm font-mono appearance-none">
                <option>2 Members</option>
                <option>3 Members</option>
                <option>4 Members</option>
            </select>
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest text-gray-500 pl-1">Leader Email</label>
        <input type="email" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-orange-500 outline-none transition-all text-sm font-mono" placeholder="leader@college.edu" />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest text-gray-500 pl-1">Preferred Track</label>
        <select className="w-full bg-black/40 border border-white/10 rounded p-3 text-gray-300 focus:border-orange-500 outline-none transition-all text-sm font-mono">
            {TRACKS.map(t => <option key={t.title}>{t.title}</option>)}
        </select>
      </div>
      
      <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded hover:from-orange-500 hover:to-red-500 transition-all uppercase tracking-[0.2em] shadow-lg shadow-orange-900/20 mt-4 group relative overflow-hidden">
        <span className="relative z-10">Initialize Registration</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </form>
  </div>
);