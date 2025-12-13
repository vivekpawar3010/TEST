import React, { useState, useMemo } from 'react';
import { PlanetName, PlanetData } from './types';
import { PLANET_TEXTURES, PLANET_COLORS } from './constants';
import { 
  HomeSection, AboutSection, TracksSection, ScheduleSection, 
  SponsorSection, JudgesSection, TeamSection, FaqSection, RegisterSection 
} from './components/ContentSections';
import { Menu, X, ArrowLeft } from 'lucide-react';

const SOLAR_CSS = `
  .solar-scene {
    perspective: 1000px;
    transform-style: preserve-3d;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .planet-container {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 1200px;
    transform-style: preserve-3d;
    transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    justify-content: center;
    pointer-events: none; 
  }
  .planet {
    position: absolute;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    box-shadow: inset -40px -40px 100px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.5);
    transition: transform 1.5s cubic-bezier(0.33, 0, 0, 1), opacity 1s, filter 0.5s;
    cursor: pointer;
    pointer-events: auto;
  }
  @media (min-width: 769px) {
    .planet:hover {
        filter: brightness(1.1);
        transform: scale(1.02);
    }
  }

  .planet-info {
    position: absolute;
    top: -240px; 
    left: 0; 
    right: 0;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    transform: translateY(30px) scale(0.9);
    pointer-events: none;
    z-index: 20;
    padding: 0 20px;
  }
  .planet-container.active .planet-info {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* --- MOBILE ADJUSTMENTS --- */
  @media (max-width: 768px) {
    .solar-scene {
        perspective: 800px;
    }
    .planet-container {
        left: -35%;
        width: 140%;
        margin: 0;
    }
    .planet {
        width: 900px;
        height: 900px;
        bottom: -720px !important; 
    }
    .planet-info {
        top: -200px;
        left: 25%;
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 40px;
    }
    .planet-info h1 {
        font-size: 3rem;
        line-height: 1.1;
    }
    .planet-info p {
        text-align: left;
        margin-left: 0;
        font-size: 0.9rem;
    }
    .planet-info button {
        margin-top: 1rem;
    }
  }
`;

function App() {
  const [activePlanetId, setActivePlanetId] = useState<PlanetName>(PlanetName.Earth);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define planets order and data
  const planets: PlanetData[] = useMemo(() => [
    { name: PlanetName.Mercury, id: 'mercury', textureUrl: PLANET_TEXTURES.Mercury, color: PLANET_COLORS.Mercury, title: 'Team', subtitle: 'The Organizers', description: 'Meet the core team and coordinators behind the event.', au: '0.39 AU', component: TeamSection },
    { name: PlanetName.Venus, id: 'venus', textureUrl: PLANET_TEXTURES.Venus, color: PLANET_COLORS.Venus, title: 'FAQ', subtitle: 'Common Questions', description: 'Find answers to your queries about participation.', au: '0.72 AU', component: FaqSection },
    { name: PlanetName.Earth, id: 'earth', textureUrl: PLANET_TEXTURES.Earth, color: PLANET_COLORS.Earth, title: 'Home', subtitle: 'Chakravyuh 2.0', description: 'The center of our universe. The starting point of your journey.', au: '1 AU', component: HomeSection },
    { name: PlanetName.Mars, id: 'mars', textureUrl: PLANET_TEXTURES.Mars, color: PLANET_COLORS.Mars, title: 'About', subtitle: 'The Mission', description: 'Discover the purpose, goals, and statistics of this galactic event.', au: '1.52 AU', component: AboutSection },
    { name: PlanetName.Jupiter, id: 'jupiter', textureUrl: PLANET_TEXTURES.Jupiter, color: PLANET_COLORS.Jupiter, title: 'Tracks', subtitle: 'Themes', description: 'Explore the various problem statements and tracks.', au: '5.20 AU', component: TracksSection },
    { name: PlanetName.Saturn, id: 'saturn', textureUrl: PLANET_TEXTURES.Saturn, color: PLANET_COLORS.Saturn, title: 'Schedule', subtitle: 'Timeline', description: 'A detailed timeline of the 3-day hackathon journey.', au: '9.58 AU', component: ScheduleSection },
    { name: PlanetName.Uranus, id: 'uranus', textureUrl: PLANET_TEXTURES.Uranus, color: PLANET_COLORS.Uranus, title: 'Sponsors', subtitle: 'Partners', description: 'Our industry partners making this event possible.', au: '19.22 AU', component: SponsorSection },
    { name: PlanetName.Neptune, id: 'neptune', textureUrl: PLANET_TEXTURES.Neptune, color: PLANET_COLORS.Neptune, title: 'Judges', subtitle: 'Panel', description: 'Industry experts and academics evaluating your solutions.', au: '30.05 AU', component: JudgesSection },
    { name: PlanetName.Pluto, id: 'pluto', textureUrl: PLANET_TEXTURES.Pluto, color: PLANET_COLORS.Pluto, title: 'Register', subtitle: 'Prizes & Entry', description: 'Sign up for the event and see what you can win.', au: '39.48 AU', component: RegisterSection },
  ], []);

  const activeIndex = planets.findIndex(p => p.name === activePlanetId);

  const handlePlanetClick = (planetName: PlanetName) => {
    setActivePlanetId(planetName);
    setPanelOpen(false); // Reset panel when switching
    setMobileMenuOpen(false);
  };

  // Used by "Register Now" buttons inside components
  const navigateAndOpen = (planetName: PlanetName) => {
    setActivePlanetId(planetName);
    setPanelOpen(true); // Auto-open the panel for the destination
  };

  return (
    <div className="bg-transparent min-h-screen text-white font-sans overflow-hidden relative selection:bg-space-accent selection:text-black">
      <style>{SOLAR_CSS}</style>

      {/* Navigation Bar (Top) */}
      <nav className="fixed top-0 left-0 w-full z-40 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase flex items-center gap-2 font-orbitron">
            <span className="w-2 h-2 rounded-full bg-space-accent animate-pulse shadow-[0_0_10px_#F39041]"></span>
            Chakravyuh <span className="text-space-accent text-xs md:text-sm tracking-widest opacity-80">2.0</span>
          </h1>
        </div>
        
        {/* Mobile Hamburger */}
        <div className="pointer-events-auto md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                <Menu size={28} />
            </button>
        </div>

        {/* Desktop Top Nav Items */}
        <div className="hidden md:flex gap-6 pointer-events-auto">
           <button 
                onClick={() => navigateAndOpen(PlanetName.Pluto)} 
                className="border border-white/30 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
           >
                Register Now
           </button>
        </div>
      </nav>

      {/* Main 3D Solar System Scene */}
      <div className="solar-scene z-10">
        {planets.map((planet, index) => {
          const offset = index - activeIndex;
          const zPos = offset * 2200; 
          
          const transformStyle = {
            transform: `translate3d(0, 0, ${-zPos}px) rotateX(10deg) scaleX(0.95)`,
            opacity: Math.abs(offset) > 1 ? 0 : (1 - Math.abs(offset) * 0.4),
            zIndex: 10 - Math.abs(offset),
            display: Math.abs(offset) > 2 ? 'none' : 'flex' 
          };

          const isCurrent = index === activeIndex;

          return (
            <div 
              key={planet.id} 
              className={`planet-container ${isCurrent ? 'active' : ''}`}
              style={{
                ...transformStyle,
                top: 'auto',
                bottom: '-950px'
              }}
            >
              <div 
                className="planet"
                onClick={() => isCurrent && setPanelOpen(true)}
                style={{ backgroundImage: `url(${planet.textureUrl})` }}
              >
                 <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                 <div 
                    className="absolute inset-0 rounded-full opacity-30 transition-opacity duration-500"
                    style={{ boxShadow: isCurrent ? `0 -10px 80px ${planet.color}` : 'none' }}
                 ></div>
              </div>

              <div className="planet-info pointer-events-auto">
                <h2 className="text-xs md:text-base text-gray-400 uppercase tracking-[0.4em] mb-2 pl-1 font-orbitron">{planet.subtitle}</h2>
                <h1 
                    className="text-4xl md:text-8xl font-bold uppercase tracking-[0.1em] mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl font-orbitron"
                >
                  {planet.title}
                </h1>
                <p className="max-w-md mx-auto text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed drop-shadow-md">
                  {planet.description}
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); setPanelOpen(true); }}
                  className="group relative inline-flex items-center justify-center px-6 md:px-8 py-2 md:py-3 overflow-hidden font-bold text-white transition duration-300 ease-out border rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-black/50 backdrop-blur-sm"
                  style={{ borderColor: planet.color, color: planet.color }}
                >
                   <span className="flex items-center gap-2 tracking-widest text-sm">
                     EXPLORE <ArrowLeft className="rotate-180 w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Visual Cue Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden z-30">
        {planets.map((_, idx) => (
             <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-white' : 'w-1 bg-white/30'}`} 
             />
        ))}
      </div>

      {/* Left Sidebar Navigation */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col gap-6">
          {planets.map((planet, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div 
                key={planet.id} 
                className="group flex items-center gap-4 cursor-pointer"
                onClick={() => handlePlanetClick(planet.name)}
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 border ${isActive ? 'bg-transparent scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white scale-100 group-hover:scale-125'}`}
                  style={{ borderColor: planet.color, backgroundColor: isActive ? planet.color : undefined }}
                ></div>
                <div className={`transition-all duration-300 flex flex-col ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2 group-hover:opacity-80 group-hover:translate-x-0'}`}>
                  <span className="text-xs font-bold uppercase tracking-widest font-orbitron">{planet.name}</span>
                  <span className="text-[10px] text-gray-500">{planet.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full bg-black/80 backdrop-blur-2xl w-full md:w-[600px] z-50 transition-transform duration-500 ease-in-out border-l border-white/10 shadow-2xl flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={() => setPanelOpen(false)}
          className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors p-2 z-50"
        >
          <div className="flex items-center gap-2">
             <ArrowLeft size={20} /> <span className="uppercase text-xs tracking-widest font-orbitron">Back</span>
          </div>
        </button>

        <div className="flex-1 overflow-y-auto p-6 md:p-16 pt-24 custom-scrollbar">
          <h2 className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.4em] mb-2 font-orbitron">{planets[activeIndex].subtitle}</h2>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 border-b border-white/10 pb-6 font-orbitron" style={{ color: planets[activeIndex].color }}>
            {planets[activeIndex].title}
          </h1>
          
          <div className="text-gray-200">
             {/* Render the active component and pass navigateAndOpen as onNavigate */}
             {React.createElement(planets[activeIndex].component, { onNavigate: navigateAndOpen })}
          </div>
        </div>
      </div>
      
       {/* Mobile Menu */}
       {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[60] flex flex-col items-center justify-center md:hidden animate-in fade-in duration-200">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2">
                <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-center max-h-[80vh] overflow-y-auto">
                {planets.map((p) => (
                    <button 
                        key={p.id}
                        onClick={() => handlePlanetClick(p.name)}
                        className={`text-2xl font-bold uppercase tracking-widest py-2 transition-colors font-orbitron ${activePlanetId === p.name ? 'text-space-accent' : 'text-white/70'}`}
                    >
                        {p.title}
                    </button>
                ))}
            </div>
        </div>
       )}

      <div className="fixed bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
    </div>
  );
}

export default App;