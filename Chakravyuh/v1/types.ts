import React from 'react';

export enum PlanetName {
  Mercury = 'Mercury', // Team
  Venus = 'Venus',     // FAQ
  Earth = 'Earth',     // Home
  Mars = 'Mars',       // About
  Jupiter = 'Jupiter', // Tracks
  Saturn = 'Saturn',   // Schedule
  Uranus = 'Uranus',   // Sponsors
  Neptune = 'Neptune', // Judges
  Pluto = 'Pluto'      // Prizes/Registration
}

// Navigation Helper Type
export type NavigationCallback = (planetName: PlanetName) => void;

export interface PlanetData {
  name: PlanetName;
  id: string;
  textureUrl: string;
  color: string; // Accent color
  title: string;
  subtitle: string;
  description: string;
  au: string; // Distance (for UI only)
  // Component now accepts props
  component: React.FC<{ onNavigate: NavigationCallback }>;
}

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'Diamond' | 'Gold' | 'Silver';
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Track {
  title: string;
  description: string;
  icon: string;
}