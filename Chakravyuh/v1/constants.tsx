import React from 'react';
import { PlanetName, PlanetData } from './types';
import { 
  Trophy, Calendar, Users, Target, Zap, 
  MapPin, Globe, Rocket, HelpCircle, 
  Code, Cpu, Shield, Cloud, Bot, DollarSign
} from 'lucide-react';

// Using high-res textures from the reference or placeholders
export const PLANET_TEXTURES = {
  Mercury: "https://www.solarsystemscope.com/images/textures/full/2k_makemake_fictional.jpg",
  Venus: "https://nasa3d.arc.nasa.gov/shared_assets/images/ven0aaa2/ven0aaa2-copy-428-321.jpg",
  Earth: "https://img00.deviantart.net/04ef/i/2009/114/3/e/new_earth_texture_map_by_lightondesigns.jpg",
  Mars: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mars_texture.jpg",
  Jupiter: "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA07782_hires.jpg",
  Saturn: "https://www.solarsystemscope.com/images/textures/full/2k_saturn.jpg",
  Uranus: "https://img00.deviantart.net/957c/i/2017/165/4/9/uranus_texture_map_by_jcpag2010-db7yjwb.png",
  Neptune: "https://www.solarsystemscope.com/images/textures/full/2k_neptune.jpg",
  Pluto: "https://pre00.deviantart.net/4677/th/pre/f/2015/314/4/e/pluto_map__2015_nov_10__by_snowfall_the_cat-d918tlb.png"
};

// Colors associated with each section
export const PLANET_COLORS = {
  Mercury: '#E8927C',
  Venus: '#b45d15',
  Earth: '#26daaa',
  Mars: '#e55f45',
  Jupiter: '#ffa500',
  Saturn: '#b29d81',
  Uranus: '#8dcdd8',
  Neptune: '#4f83e2',
  Pluto: '#FF8732'
};

export const TRACKS = [
  { title: "FinTech", desc: "Revolutionize finance with blockchain & AI.", icon: <DollarSign className="w-6 h-6" /> },
  { title: "HealthTech", desc: "Innovate for a healthier tomorrow.", icon: <Users className="w-6 h-6" /> },
  { title: "EdTech", desc: "Transforming education accessibility.", icon: <Book className="w-6 h-6" /> },
  { title: "AgriTech", desc: "Smart solutions for modern farming.", icon: <Cloud className="w-6 h-6" /> },
  { title: "CyberSecurity", desc: "Protecting the digital frontier.", icon: <Shield className="w-6 h-6" /> },
  { title: "Open Innovation", desc: "Solve real-world abstract problems.", icon: <Zap className="w-6 h-6" /> },
];

export const SCHEDULE = [
  { day: "Day 1", date: "Oct 15", events: [
    { time: "09:00 AM", title: "Inauguration & Keynote" },
    { time: "11:00 AM", title: "Hackathon Begins" },
    { time: "01:00 PM", title: "Lunch Break" },
    { time: "04:00 PM", title: "Mentoring Round 1" },
  ]},
  { day: "Day 2", date: "Oct 16", events: [
    { time: "08:00 AM", title: "Breakfast" },
    { time: "10:00 AM", title: "Mentoring Round 2" },
    { time: "05:00 PM", title: "Evaluation Phase 1" },
    { time: "09:00 PM", title: "Dinner & Fun Activity" },
  ]},
  { day: "Day 3", date: "Oct 17", events: [
    { time: "09:00 AM", title: "Final Submission" },
    { time: "11:00 AM", title: "Final Pitching" },
    { time: "04:00 PM", title: "Prize Distribution" },
  ]}
];

// Helper icon component wrapper
function Book(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
}
