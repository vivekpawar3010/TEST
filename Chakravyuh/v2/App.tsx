import React, { useState, useMemo } from 'react';
import { PlanetName, PlanetData } from './types';
import { PLANET_TEXTURES, PLANET_COLORS } from './constants';
import { 
  HomeSection, AboutSection, TracksSection, ScheduleSection, 
  SponsorSection, JudgesSection, TeamSection, FaqSection, RegisterSection 
} from './components/ContentSections';
import { Menu, X, ArrowLeft } from 'lucide-react';

// CSS inspired by the reference "Solar Explorer"
const SOLAR_CSS = `
  /* Scene Setup */
  .solar-scene {
    perspective: 1200px; /* Enhanced depth */
    transform-style: preserve-3d;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  /* 
    Planet Container:
    Holds the planet and its info.
    We move this container in 3D space (Z-axis).
  */
  .planet-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s;
    pointer-events: none; 
  }

  /* The Actual Planet Sphere */
  .planet {
    position: absolute;
    /* Massive size for "Horizon" effect - curvature is key */
    width: 1800px;
    height: 1800px;
    border-radius: 50%;
    
    /* Centering Logic */
    left: 50%;
    top: 50%;
    margin-left: -900px; /* Half of width */
    margin-top: -900px;  /* Half of height */
    
    /* Textures & Lighting */
    background-repeat: repeat-x;
    background-size: 200% 100%; 
    box-shadow: 
        inset -400px -200px 500px rgba(0,0,0,0.9), /* Deep dark side */
        inset 50px 0px 150px rgba(255,255,255,0.2), /* Atmospheric rim */
        0 0 100px rgba(0,0,0,0.5); /* Outer glow */
    
    cursor: pointer;
    pointer-events: auto;
    
    /* Spin Animation */
    animation: planetRotate 180s linear infinite;
  }

  @keyframes planetRotate {
    0% { background-position: 0% center; }
    100% { background-position: -200% center; }
  }

  .planet:hover {
    filter: brightness(1.2) contrast(1.1);
  }

  /* Information Text floating above */
  .planet-info {
    position: absolute;
    /* Vertically centered by default, adjusted by container transform */
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: auto;
    text-align: center;
    opacity: 0;
    transition: all 0.6s ease-out 0.3s;
    pointer-events: none;
    z-index: 20;
    width: 100%;
    max-width: 1000px;
    padding: 0 20px;
  }

  /* Active State Styles */
  .planet-container.active .planet-info {
    opacity: 1;
    pointer-events: auto;
  }

  /* --- RESPONSIVE ADJUSTMENTS --- */
  
  /* Mobile Devices */
  @media (max-width: 768px) {
    .solar-scene {
      perspective: 900px;
    }

    .planet {
      width: 900px; /* Smaller but still creates a horizon */
      height: 900px;
      margin-left: -450px;
      margin-top: -450px;
    }
    
    /* Adjust text position on mobile */
    .planet-info {
        top: 35%;
    }

    .planet-info h1 {
      font-size: 3rem !important;
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
    setPanelOpen(false); 
    setMobileMenuOpen(false);
  };

  const navigateAndOpen = (planetName: PlanetName) => {
    setActivePlanetId(planetName);
    setPanelOpen(true);
  };

  return (
    <div className="bg-transparent min-h-screen text-white font-sans overflow-hidden relative selection:bg-space-accent selection:text-black">
      <style>{SOLAR_CSS}</style>

      {/* Navigation Bar (Top) */}
      <nav className="fixed top-0 left-0 w-full z-40 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
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
          
          // --- POSITIONING LOGIC ---
          // Active (0): Bottom horizon
          // Next (1): Distant target at top
          // Others: Hidden to keep it clear
          
          let yPos = 0;
          let zPos = 0;
          let opacity = 0;
          let display = 'none';

          if (offset === 0) {
            // ACTIVE: Horizon at bottom
            zPos = 0;
            // Push down so only the top curve is visible
            yPos = window.innerWidth < 768 ? 420 : 550; 
            opacity = 1;
            display = 'block';
          } else if (offset === 1) {
            // NEXT: Target in the sky
            zPos = -2800; // Far back
            yPos = -600;  // High up
            opacity = 0.8; 
            display = 'block';
          } else if (offset === -1) {
            // PREVIOUS: Fade out behind/below
            zPos = 500;
            yPos = 1200; 
            opacity = 0;
            display = 'block';
          } else if (offset === 2) {
             // NEXT NEXT: Very faint, deep background hint
             zPos = -5000;
             yPos = -1200;
             opacity = 0.2;
             display = 'block';
          } else {
             // Hide the rest
             display = 'none';
          }

          const transformStyle = {
            transform: `translate3d(0, ${yPos}px, ${zPos}px)`,
            opacity: opacity,
            zIndex: 10 - Math.abs(offset),
            display: display 
          };

          const isCurrent = index === activeIndex;

          return (
            <div 
              key={planet.id} 
              className={`planet-container ${isCurrent ? 'active' : ''}`}
              style={transformStyle}
            >
              <div 
                className="planet"
                onClick={() => isCurrent && setPanelOpen(true)}
                style={{ backgroundImage: `url(${planet.textureUrl})` }}
              >
                 {/* Visual Overlays for realism */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Text Info */}
              <div 
                className="planet-info pointer-events-auto"
                style={{ 
                    // Counter-act the container's Y shift to keep text centered on screen
                    transform: isCurrent ? `translateY(-${yPos * 0.5}px)` : 'none'
                }}
              >
                <h2 className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.4em] mb-2 font-orbitron text-shadow-sm">{planet.subtitle}</h2>
                <h1 
                    className="text-5xl md:text-9xl font-bold uppercase tracking-[0.05em] mb-6 text-white drop-shadow-2xl font-orbitron"
                    style={{ textShadow: `0 0 40px ${planet.color}50` }}
                >
                  {planet.title}
                </h1>
                <p className="max-w-xl mx-auto text-sm md:text-xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg font-light tracking-wide">
                  {planet.description}
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); setPanelOpen(true); }}
                  className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition duration-300 ease-out border rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/30 backdrop-blur-md hover:bg-white hover:text-black"
                  style={{ borderColor: planet.color }}
                >
                   <span className="flex items-center gap-2 tracking-widest text-xs md:text-sm uppercase">
                     Explore Sector <ArrowLeft className="rotate-180 w-4 h-4" />
                   </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Visual Cue Indicators (Bottom Dots) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 md:hidden z-30 pointer-events-none">
        {planets.map((p, idx) => (
             <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 shadow-lg ${idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`} 
             />
        ))}
      </div>

      {/* Left Sidebar Navigation (Desktop) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
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
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 border relative ${isActive ? 'bg-transparent scale-150' : 'bg-white/40 scale-100 group-hover:bg-white group-hover:scale-125'}`}
                  style={{ borderColor: isActive ? planet.color : 'transparent' }}
                >
                    {isActive && <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-white animate-pulse"></div>}
                </div>
                <div className={`transition-all duration-500 flex flex-col ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4 group-hover:opacity-80 group-hover:translate-x-0'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest font-orbitron text-white">{planet.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full bg-space-dark/95 backdrop-blur-2xl w-full md:w-[600px] z-50 transition-transform duration-500 ease-in-out border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={() => setPanelOpen(false)}
          className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors p-2 z-50"
        >
          <div className="flex items-center gap-2">
             <ArrowLeft size={20} /> <span className="uppercase text-xs tracking-widest font-orbitron">Back to Orbit</span>
          </div>
        </button>

        <div className="flex-1 overflow-y-auto p-6 md:p-16 pt-24 custom-scrollbar">
          <h2 className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.4em] mb-2 font-orbitron">{planets[activeIndex].subtitle}</h2>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 border-b border-white/10 pb-6 font-orbitron" style={{ color: planets[activeIndex].color }}>
            {planets[activeIndex].title}
          </h1>
          
          <div className="text-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
             {React.createElement(planets[activeIndex].component, { onNavigate: navigateAndOpen })}
          </div>
        </div>
      </div>
      
       {/* Mobile Menu Overlay */}
       {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center md:hidden animate-in fade-in duration-200">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2 hover:rotate-90 transition-transform">
                <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-center max-h-[80vh] overflow-y-auto w-full px-8">
                {planets.map((p) => (
                    <button 
                        key={p.id}
                        onClick={() => handlePlanetClick(p.name)}
                        className={`text-2xl font-bold uppercase tracking-widest py-3 border-b border-white/5 transition-all font-orbitron ${activePlanetId === p.name ? 'text-space-accent border-space-accent' : 'text-white/60 hover:text-white'}`}
                    >
                        {p.title}
                    </button>
                ))}
            </div>
        </div>
       )}

      {/* Decorative Gradient Overlay (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-20"></div>
    </div>
  );
}

export default App;