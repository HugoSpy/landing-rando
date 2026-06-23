"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import "maplibre-gl/dist/maplibre-gl.css";

// --- CUSTOM INLINE SVG ICONS ---
function MountainIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function CustomMountainLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="miter" />
      <polygon points="50,15 35,85 65,85" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
    </svg>
  );
}

function TrainIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="16" x="4" y="2" rx="2" />
      <path d="M4 14h16" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M12 17v4" />
      <path d="m8 21 4-4 4 4" />
    </svg>
  );
}

function CompassIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6Z" />
    </svg>
  );
}

function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function HikerSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Backpack */}
      <rect x="25" y="32" width="22" height="34" rx="6" fill="#445E2D" />
      <rect x="22" y="38" width="8" height="22" rx="3" fill="#394C28" />
      {/* Body / Torso */}
      <path d="M40 38H60C64 38 66 42 65 47L58 72H43L40 47C39 42 41 38 40 38Z" fill="#719A48" />
      {/* Straps */}
      <rect x="42" y="38" width="4" height="20" rx="1" fill="#E5EFD8" />
      <rect x="54" y="38" width="4" height="20" rx="1" fill="#E5EFD8" />
      {/* Head */}
      <circle cx="50" cy="22" r="12" fill="#F4F8ED" stroke="#445E2D" strokeWidth="2.5" />
      {/* Cap */}
      <path d="M38 20C38 13.5 43.5 9 50 9C56.5 9 62 13.5 62 20H38Z" fill="#394C28" />
      <path d="M50 9C56 9 65 11 67 15H50V9Z" fill="#445E2D" />
      {/* Face details */}
      <circle cx="53" cy="21" r="1.5" fill="#394C28" />
      <path d="M50 25C51.5 26.5 54 26.5 55 25" stroke="#394C28" strokeWidth="2" strokeLinecap="round" />
      {/* Legs & Boots */}
      <path d="M45 72V86H39" stroke="#445E2D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39 86H34V91H45V86" fill="#394C28" />
      <path d="M56 72V84H65" stroke="#445E2D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M65 84H71V89H60V84" fill="#394C28" />
      {/* Walking Stick */}
      <line x1="68" y1="40" x2="68" y2="92" stroke="#8FB566" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="68" cy="40" r="3" fill="#394C28" />
    </svg>
  );
}

function TrainSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Main Train Body */}
      <path d="M5 45V15C5 12 8 8 16 8H100C110 8 115 15 115 25V45H5Z" fill="#719A48" />
      {/* Bottom Chassis */}
      <rect x="2" y="45" width="116" height="6" rx="2" fill="#394C28" />
      {/* Wheels */}
      <circle cx="20" cy="53" r="5" fill="#182310" />
      <circle cx="35" cy="53" r="5" fill="#182310" />
      <circle cx="85" cy="53" r="5" fill="#182310" />
      <circle cx="100" cy="53" r="5" fill="#182310" />
      {/* Windshield */}
      <path d="M100 12H110C113 12 114 15 114 20V28H98L100 12Z" fill="#E5EFD8" stroke="#394C28" strokeWidth="1.5" />
      {/* Passenger Windows */}
      <rect x="15" y="14" width="16" height="12" rx="2" fill="#E5EFD8" />
      <rect x="36" y="14" width="16" height="12" rx="2" fill="#E5EFD8" />
      <rect x="57" y="14" width="16" height="12" rx="2" fill="#E5EFD8" />
      <rect x="78" y="14" width="16" height="12" rx="2" fill="#E5EFD8" />
      {/* Lights */}
      <circle cx="112" cy="38" r="3.5" fill="#FFF" />
      {/* Sleek Line Accent */}
      <rect x="5" y="34" width="90" height="3" fill="#E5EFD8" />
    </svg>
  );
}

function FloatingBadge3D({ 
  emoji, 
  bgColor, 
  borderColor, 
  className = "", 
  style = {},
  floatSpeed = "slow"
}: { 
  emoji: string; 
  bgColor: string; 
  borderColor: string; 
  className?: string; 
  style?: React.CSSProperties;
  floatSpeed?: "slow" | "medium" | "fast";
}) {
  const floatClass = floatSpeed === "slow" 
    ? "animate-float-slow" 
    : floatSpeed === "medium" 
      ? "animate-float-medium" 
      : "animate-float-fast";

  return (
    <div 
      className={`absolute select-none pointer-events-none transition-all duration-100 ease-out z-30 ${className}`}
      style={style}
    >
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl border-b-4 shadow-md ${bgColor} ${borderColor} ${floatClass}`}>
        {emoji}
      </div>
    </div>
  );
}


function PhoneMockup({ activeStep, isMobile = false }: { activeStep: number; isMobile?: boolean }) {
  const stepImages = [
    { src: '/step_choisistrain.png', alt: 'Écran Névé — Choisis ta randonnée' },
    { src: '/step_reservetrain.png', alt: 'Écran Névé — Réserve ton billet de train' },
    { src: '/step_marchetrain.png', alt: 'Écran Névé — Suis le tracé GPX en marchant' },
    { src: '/step_rentretrain.png', alt: 'Écran Névé — Alerte retour pour ton train' },
  ];

  return (
    <div className={`relative w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-xl select-none ${isMobile ? 'scale-95 sm:scale-100 origin-center' : ''}`}>
      {stepImages.map((img, i) => {
        const stepNum = i + 1;
        const isActive = activeStep === stepNum;
        return (
          <div
            key={stepNum}
            className={`absolute inset-0 transition-all duration-500 ${
              isActive
                ? 'opacity-100 scale-100 z-20'
                : 'opacity-0 scale-95 z-10 pointer-events-none'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top"
              sizes="280px"
              priority={stepNum === 1}
            />
          </div>
        );
      })}
    </div>
  );
}

interface HeroRouteStep {
  type: "walk" | "train" | "hike" | "return";
  desc: string;
  duration: string;
  detail?: string;
}

interface HeroRoute {
  regionName: string;
  tag: string;
  stationStart: string;
  stationEnd: string;
  lineName: string;
  lineColor: string;
  glowColor: string;
  trainCoordinates: [number, number][];
  mapCenter: [number, number];
  mapZoom: number;
  hikes: {
    name: string;
    rating: string;
    distance: string;
    trainTime: string;
    img: string;
    hikeCoordinates: [number, number][];
    steps: HeroRouteStep[];
    difficulty?: "Facile" | "Modéré" | "Difficile";
    elevation?: string;
    temp?: string;
    location?: string;
    duration?: string;
    co2?: string;
    tag?: string;
  }[];
}const HERO_ROUTES: Record<"fontainebleau" | "chevreuse", HeroRoute> = {
  fontainebleau: {
    regionName: "Forêt de Fontainebleau",
    tag: "Massifs & Forêts",
    stationStart: "Paris Gare de Lyon",
    stationEnd: "Fontainebleau-Avon",
    lineName: "Transilien Ligne R",
    lineColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
    glowColor: "#10b981",
    trainCoordinates: [
      [2.3731, 48.8443], // Paris Gare de Lyon
      [2.4410, 48.7250],
      [2.5200, 48.6350],
      [2.6350, 48.5400],
      [2.6601, 48.5332], // Melun
      [2.7246, 48.4215]  // Fontainebleau-Avon
    ],
    mapCenter: [2.54, 48.64],
    mapZoom: 9.8,
    hikes: [
      {
        name: "Les Gorges de l'Apremont",
        rating: "4.9",
        distance: "14.2 km",
        trainTime: "38 min",
        img: "/journey_mountain.png",
        difficulty: "Modéré",
        elevation: "+180m",
        temp: "19°C",
        location: "Avon, Seine-et-Marne",
        hikeCoordinates: [
          [2.7246, 48.4215], // Avon Station
          [2.7050, 48.4180],
          [2.6850, 48.4250],
          [2.6650, 48.4280],
          [2.6510, 48.4190],
          [2.6700, 48.4080],
          [2.6950, 48.4110],
          [2.7246, 48.4215]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Gare de Lyon",
            duration: "5 min",
            detail: "Accès facile en Métro (Lignes 1, 14) et RER (A, D)."
          },
          {
            type: "train",
            desc: "Prendre le Transilien Ligne R direct",
            duration: "38 min (Gare de Lyon ➡️ Fontainebleau-Avon)",
            detail: "Prochain départ dans 12 min (Voie N). Entièrement inclus dans le pass Navigo. Trains toutes les 30 min."
          },
          {
            type: "hike",
            desc: "Randonnée : Les Gorges de l'Apremont",
            duration: "14.2 km loop (~3h45) - Balisage Bleu",
            detail: "Départ immédiat depuis le quai. Traversée de platières rocheuses, de chaos de grès et de pinèdes sablonneuses."
          },
          {
            type: "return",
            desc: "Retour garanti pour le dîner",
            duration: "Ligne R vers Paris toutes les 30 min",
            detail: "Dernier train à 22:45. Pas de retard ni de stress logistique."
          }
        ]
      },
      {
        name: "Les Gorges de Franchard",
        rating: "4.8",
        distance: "8.5 km",
        trainTime: "38 min",
        img: "/tent_forest.png",
        difficulty: "Facile",
        elevation: "+95m",
        temp: "19°C",
        location: "Avon, Seine-et-Marne",
        hikeCoordinates: [
          [2.7246, 48.4215], // Avon Station
          [2.7100, 48.4100],
          [2.6900, 48.4000],
          [2.6500, 48.3950],
          [2.6450, 48.4050],
          [2.6700, 48.4150],
          [2.7246, 48.4215]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Gare de Lyon",
            duration: "5 min",
            detail: "Accès facile en Métro (Lignes 1, 14) et RER (A, D)."
          },
          {
            type: "train",
            desc: "Prendre le Transilien Ligne R direct",
            duration: "38 min (Gare de Lyon ➡️ Fontainebleau-Avon)",
            detail: "Prochain départ dans 12 min (Voie N). Entièrement inclus dans le pass Navigo."
          },
          {
            type: "hike",
            desc: "Randonnée : Les Gorges de Franchard",
            duration: "8.5 km loop (~2h30) - Balisage Jaune",
            detail: "Une boucle plus courte mais intense à travers les chaos rocheux célèbres de Franchard."
          },
          {
            type: "return",
            desc: "Retour garanti pour le dîner",
            duration: "Ligne R vers Paris toutes les 30 min",
            detail: "Dernier train à 22:45. Pas de retard ni de stress logistique."
          }
        ]
      },
      {
        name: "Le Sentier des Belvédères",
        rating: "4.7",
        distance: "11.0 km",
        trainTime: "38 min",
        img: "/forest_green.png",
        difficulty: "Modéré",
        elevation: "+140m",
        temp: "19°C",
        location: "Avon, Seine-et-Marne",
        hikeCoordinates: [
          [2.7246, 48.4215], // Avon Station
          [2.7300, 48.4350],
          [2.7150, 48.4450],
          [2.6900, 48.4500],
          [2.6800, 48.4350],
          [2.7246, 48.4215]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Gare de Lyon",
            duration: "5 min",
            detail: "Accès facile en Métro (Lignes 1, 14) et RER (A, D)."
          },
          {
            type: "train",
            desc: "Prendre le Transilien Ligne R direct",
            duration: "38 min (Gare de Lyon ➡️ Fontainebleau-Avon)",
            detail: "Prochain départ dans 12 min (Voie N). Entièrement inclus dans le pass Navigo."
          },
          {
            type: "hike",
            desc: "Randonnée : Le Sentier des Belvédères",
            duration: "11.0 km loop (~3h00) - Balisage Bleu",
            detail: "Itinéraire panoramique offrant des points de vue spectaculaires sur la cime des arbres."
          },
          {
            type: "return",
            desc: "Retour garanti pour le dîner",
            duration: "Ligne R vers Paris toutes les 30 min",
            detail: "Dernier train à 22:45. Pas de retard ni de stress logistique."
          }
        ]
      }
    ]
  },
  chevreuse: {
    regionName: "Vallée de la Chevreuse",
    tag: "Falaises & Vallées",
    stationStart: "Paris Châtelet les Halles",
    stationEnd: "Saint-Rémy-lès-Chevreuse",
    lineName: "RER B",
    lineColor: "text-sky-400 bg-sky-950/40 border-sky-500/30",
    glowColor: "#0ea5e9",
    trainCoordinates: [
      [2.3470, 48.8619], // Châtelet les Halles
      [2.3275, 48.8150],
      [2.3023, 48.7554], // Antony
      [2.1648, 48.7180],
      [2.0624, 48.7061]  // Saint-Rémy-lès-Chevreuse
    ],
    mapCenter: [2.20, 48.78],
    mapZoom: 10.3,
    hikes: [
      {
        name: "Sentier des Maréchaux & Châteaux",
        rating: "4.8",
        distance: "15.8 km",
        trainTime: "45 min",
        img: "/journey_river.png",
        difficulty: "Modéré",
        elevation: "+210m",
        temp: "18°C",
        location: "Saint-Rémy, Yvelines",
        hikeCoordinates: [
          [2.0624, 48.7061], // Saint-Rémy
          [2.0463, 48.7095], // Château de la Madeleine
          [2.0310, 48.7010],
          [2.0390, 48.6880],
          [2.0550, 48.6820],
          [2.0650, 48.6960],
          [2.0624, 48.7061]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Châtelet les Halles",
            duration: "Direct",
            detail: "Accès direct via lignes de métro 1, 4, 7, 11, 14 et RER A, D."
          },
          {
            type: "train",
            desc: "Prendre le RER B Sud",
            duration: "45 min (Châtelet ➡️ Saint-Rémy-lès-Chevreuse)",
            detail: "Prendre les trains terminus Saint-Rémy (B4). Fréquence : toutes les 15 min. Compris dans le pass Navigo."
          },
          {
            type: "hike",
            desc: "Randonnée : Sentier des Maréchaux & Châteaux",
            duration: "15.8 km loop (~4h15) - Balisage Rouge/Jaune",
            detail: "Connexion directe gare. Longe le canal de l'Yvette, traverse la forêt et grimpe jusqu'au Château de la Madeleine."
          },
          {
            type: "return",
            desc: "Retour simple & régulier",
            duration: "RER B vers Paris toutes les 15 min",
            detail: "Terminus direct à sens inverse. Trains réguliers jusqu'à 0h30 pour un retour en toute sérénité."
          }
        ]
      },
      {
        name: "Les Cascades de Cernay",
        rating: "4.9",
        distance: "12.3 km",
        trainTime: "45 min",
        img: "/forest_lake.png",
        difficulty: "Facile",
        elevation: "+80m",
        temp: "18°C",
        location: "Saint-Rémy, Yvelines",
        hikeCoordinates: [
          [2.0624, 48.7061], // Saint-Rémy
          [2.0500, 48.6900],
          [2.0100, 48.6800],
          [1.9800, 48.6750],
          [2.0000, 48.6950],
          [2.0624, 48.7061]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Châtelet les Halles",
            duration: "Direct",
            detail: "Accès direct via lignes de métro 1, 4, 7, 11, 14 et RER A, D."
          },
          {
            type: "train",
            desc: "Prendre le RER B Sud",
            duration: "45 min (Châtelet ➡️ Saint-Rémy-lès-Chevreuse)",
            detail: "Prendre les trains terminus Saint-Rémy (B4). Fréquence : toutes les 15 min. Compris dans le pass Navigo."
          },
          {
            type: "hike",
            desc: "Randonnée : Les Cascades de Cernay",
            duration: "12.3 km loop (~3h30) - Balisage Rouge",
            detail: "Explorez les gorges et les chutes d'eau pittoresques des Vaux de Cernay."
          },
          {
            type: "return",
            desc: "Retour simple & régulier",
            duration: "RER B vers Paris toutes les 15 min",
            detail: "Terminus direct à sens inverse. Trains réguliers jusqu'à 0h30."
          }
        ]
      },
      {
        name: "Le Viaduc des Fauvettes",
        rating: "4.6",
        distance: "9.5 km",
        trainTime: "40 min",
        img: "/neve_hero_bg.png",
        difficulty: "Modéré",
        elevation: "+110m",
        temp: "18°C",
        location: "Bures-sur-Yvette, Essonne",
        hikeCoordinates: [
          [2.0624, 48.7061], // Saint-Rémy
          [2.0800, 48.7100],
          [2.1100, 48.7050],
          [2.1300, 48.6970],
          [2.1000, 48.6900],
          [2.0624, 48.7061]
        ],
        steps: [
          {
            type: "walk",
            desc: "Rendez-vous à Paris Châtelet les Halles",
            duration: "Direct",
            detail: "Accès direct via lignes de métro 1, 4, 7, 11, 14 et RER A, D."
          },
          {
            type: "train",
            desc: "Prendre le RER B Sud",
            duration: "40 min (Châtelet ➡️ Bures-sur-Yvette)",
            detail: "Descendre un peu avant Saint-Rémy pour un accès direct au viaduc."
          },
          {
            type: "hike",
            desc: "Randonnée : Le Viaduc des Fauvettes",
            duration: "9.5 km loop (~2h15) - Balisage Jaune",
            detail: "Traversez le viaduc ferroviaire désaffecté offrant une vue impressionnante à 30m de haut."
          },
          {
            type: "return",
            desc: "Retour simple & régulier",
            duration: "RER B vers Paris toutes les 15 min",
            detail: "Terminus direct à sens inverse. Trains réguliers jusqu'à 0h30."
          }
        ]
      }
    ]
  }
};


// --- CAROUSEL TOURS DATA ---
interface Tour {
  id: string;
  name: string;
  img: string;
  startPrice: string;
  station: string;
  duration: string;
  distance: string;
}

const TOURS: Tour[] = [
  {
    id: "t1",
    name: "Rochers de Fontainebleau",
    img: "/journey_mountain.png",
    startPrice: "Gratuit",
    station: "Gare de Lyon",
    duration: "38 min",
    distance: "14.2 km",
  },
  {
    id: "t2",
    name: "Vallée de la Chevreuse",
    img: "/journey_river.png",
    startPrice: "Gratuit",
    station: "RER B - Saint-Rémy",
    duration: "45 min",
    distance: "15.8 km",
  },
  {
    id: "t3",
    name: "Gorges du Jura Sauvage",
    img: "/forest_lake.png",
    startPrice: "15€",
    station: "Gare de Lyon (TER)",
    duration: "1h15",
    distance: "18.7 km",
  },
];

// --- FAQ DATA ---
interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment fonctionnent les billets de train avec Névé ?",
    a: "Tous nos itinéraires au départ de Paris (Transilien Ligne R, Ligne N, RER B) sont entièrement inclus dans le pass Navigo classique (zones 1 à 5). Si vous n'avez pas de pass Navigo, vous pouvez acheter un simple billet Origine-Destination en gare ou directement sur l'application Île-de-France Mobilités."
  },
  {
    q: "Ai-je besoin d'une voiture pour accéder aux randonnées ?",
    a: "Non, aucunement. Toutes nos micro-aventures sont conçues pour être 100% sans voiture. Les départs et arrivées se font directement depuis les gares connectées au réseau de transports en commun francilien. Il vous suffit de descendre du train et de suivre le sentier."
  },
  {
    q: "Quel équipement dois-je prévoir pour la journée ?",
    a: "Une bonne paire de baskets ou de chaussures de randonnée, un sac à dos léger avec au moins 1,5 litre d'eau, des encas (fruits secs, barres de céréales), et des vêtements adaptés à la météo (coupe-vent, imperméable en cas de pluie). L'itinéraire GPX s'importe en un clic sur votre smartphone pour vous guider."
  },
  {
    q: "Les parcours sont-ils adaptés aux débutants ou aux enfants ?",
    a: "Oui, nos tracés sont pensés pour être accessibles. Nous indiquons clairement la distance, le dénivelé positif et le temps moyen de marche. La forêt de Meudon est particulièrement recommandée pour une première sortie douce, tandis que Fontainebleau comporte des chaos rocheux amusants pour les plus aventureux."
  },
  {
    q: "Que se passe-t-il en cas de retard ou de grève des trains ?",
    a: "Névé surveille en continu l'état du trafic SNCF et RATP. En cas de perturbations majeures signalées avant votre départ ou pendant votre randonnée, l'application vous propose des itinéraires alternatifs ou ajuste l'heure recommandée de retour pour que vous soyez rentré sereinement pour le dîner."
  }
];

export default function Home() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Concept modal state
  const [conceptModalOpen, setConceptModalOpen] = useState(false);

  // Book on Trainline Modal state
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookRegistered, setBookRegistered] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", email: "", password: "", terms: false });
  const [bookErrors, setBookErrors] = useState<{ name?: string; email?: string; password?: string; terms?: string }>({});
  const [bookDownloadMsg, setBookDownloadMsg] = useState<string | null>(null);

  const handleBookInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (bookErrors[name as keyof typeof bookErrors]) {
      setBookErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof bookErrors = {};

    if (!bookForm.name.trim()) {
      newErrors.name = "Le nom complet est requis.";
    }
    if (!bookForm.email.trim()) {
      newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/\S+@\S+\.\S+/.test(bookForm.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!bookForm.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (bookForm.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!bookForm.terms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation.";
    }

    if (Object.keys(newErrors).length > 0) {
      setBookErrors(newErrors);
      return;
    }

    setBookRegistered(true);
  };


  // Interactive Hero States
  const [heroState, setHeroState] = useState<'search' | 'loading' | 'map'>('search');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDest, setSelectedDest] = useState<'fontainebleau' | 'chevreuse'>('fontainebleau');
  const [selectedHikeIdx, setSelectedHikeIdx] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (name: string) => {
    setFavorites(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleHikeScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const cardHeight = 438; // card height 420px + gap 18px
    if (cardHeight > 0) {
      const newIdx = Math.round(scrollTop / cardHeight);
      if (newIdx >= 0 && newIdx < HERO_ROUTES[selectedDest].hikes.length && newIdx !== selectedHikeIdx) {
        setSelectedHikeIdx(newIdx);
      }
    }
  };

  const selectHikeFromDot = (idx: number) => {
    setSelectedHikeIdx(idx);
    if (scrollContainerRef.current) {
      const cardHeight = 438;
      scrollContainerRef.current.scrollTop = idx * cardHeight;
    }
  };

  // --- TIMELINE STATES & REFS ---
  const [activeStep, setActiveStep] = useState(1);
  const journeySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = journeySectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableRange = totalHeight - viewportHeight;

      if (scrollableRange <= 0) return;

      const topOffset = -rect.top;
      // Normalize progress between 0 and 1
      const progress = Math.max(0, Math.min(1, topOffset / scrollableRange));

      // Divide 0 to 1 into 4 step segments
      if (progress < 0.25) {
        setActiveStep(1);
      } else if (progress < 0.5) {
        setActiveStep(2);
      } else if (progress < 0.75) {
        setActiveStep(3);
      } else {
        setActiveStep(4);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    // Initialize
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // --- DOWNLOAD SECTION INTERACTIVE SCROLL ---
  const [downloadProgress, setDownloadProgress] = useState(0.5); // Default to center if not scrolled yet
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDownloadScroll = () => {
      const section = downloadSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      const totalRange = elementHeight + viewportHeight;
      const topOffset = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(1, topOffset / totalRange));
      setDownloadProgress(progress);
    };

    window.addEventListener("scroll", handleDownloadScroll, { passive: true });
    window.addEventListener("resize", handleDownloadScroll);
    handleDownloadScroll();

    return () => {
      window.removeEventListener("scroll", handleDownloadScroll);
      window.removeEventListener("resize", handleDownloadScroll);
    };
  }, []);

  // --- DOWNLOAD SECTION: scroll-driven traveling assets (Framer Motion) ---
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef0 = useRef<HTMLDivElement>(null);
  const phoneRef1 = useRef<HTMLDivElement>(null);
  const phoneRef2 = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Gating anti-hydratation : 1er rendu client identique au serveur (reduceActive=false),
  // la préférence reduced-motion ne s'applique qu'après le mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceActive = mounted ? !!reduce : false;
  const { scrollYProgress } = useScroll({ target: scrollParentRef, offset: ["start start", "end end"] });

  const [pts, setPts] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [measured, setMeasured] = useState(false);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const r0 = phoneRef0.current;
      const r1 = phoneRef1.current;
      const r2 = phoneRef2.current;
      if (!stage || !r0 || !r1 || !r2) return;
      const s = stage.getBoundingClientRect();
      const center = (el: HTMLElement) => {
        const b = el.getBoundingClientRect();
        return { x: b.left - s.left + b.width / 2, y: b.top - s.top + b.height / 2 };
      };
      const p = [center(r0), center(r1), center(r2)];
      setPts(p);
      setIsVertical(Math.abs(p[2].x - p[0].x) < Math.abs(p[2].y - p[0].y));
      setMeasured(true);
    };
    measure();
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const stageW = stageRef.current?.clientWidth ?? 1024;
  const [P0, P1, P2] = pts;
  const arc = isVertical ? 60 : 80;
  const trainEndX = Math.min(P2.x + stageW * 0.16, stageW - 60);

  // Act 1 — city_pass : P0 -> P1
  const cpO = useTransform(scrollYProgress, [0, 0.01, 0.3, 0.33], [0, 1, 1, 0]);
  const cpS = useTransform(scrollYProgress, [0, 0.165, 0.3, 0.33], [1, 1.15, 1, 0.5]);
  const cpR = useTransform(scrollYProgress, [0, 0.33], [-15, 15]);
  const cpX = useTransform(scrollYProgress, [0, 0.165, 0.33], isVertical ? [P0.x, (P0.x + P1.x) / 2 - arc, P1.x] : [P0.x, (P0.x + P1.x) / 2, P1.x]);
  const cpY = useTransform(scrollYProgress, [0, 0.165, 0.33], isVertical ? [P0.y, (P0.y + P1.y) / 2, P1.y] : [P0.y, (P0.y + P1.y) / 2 - arc, P1.y]);

  // Act 2 — hiker : P1 -> P2
  const hkO = useTransform(scrollYProgress, [0.33, 0.34, 0.63, 0.66], [0, 1, 1, 0]);
  const hkS = useTransform(scrollYProgress, [0.33, 0.495, 0.63, 0.66], [1, 1.15, 1, 0.5]);
  const hkR = useTransform(scrollYProgress, [0.33, 0.66], [-15, 15]);
  const hkX = useTransform(scrollYProgress, [0.33, 0.495, 0.66], isVertical ? [P1.x, (P1.x + P2.x) / 2 - arc, P2.x] : [P1.x, (P1.x + P2.x) / 2, P2.x]);
  const hkY = useTransform(scrollYProgress, [0.33, 0.495, 0.66], isVertical ? [P1.y, (P1.y + P2.y) / 2, P2.y] : [P1.y, (P1.y + P2.y) / 2 - arc, P2.y]);

  // Act 3 — train : P2 -> droite de P2 (reste visible à la fin)
  const trO = useTransform(scrollYProgress, [0.66, 0.67, 1], [0, 1, 1]);
  const trS = useTransform(scrollYProgress, [0.66, 0.83, 1], [0.6, 1.1, 1]);
  const trR = useTransform(scrollYProgress, [0.66, 1], [15, 0]);
  const trX = useTransform(scrollYProgress, [0.66, 1], [P2.x, trainEndX]);
  const trY = useTransform(scrollYProgress, [0.66, 0.83, 1], [P2.y, P2.y - 40, P2.y]);

  // --- HIDE NAVBAR SCROLL EFFECT FOR TIMELINE AND DOWNLOAD SECTIONS ---
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    const checkNavbarVisibility = () => {
      const journey = journeySectionRef.current;
      const download = downloadSectionRef.current;
      let shouldHide = false;

      if (journey) {
        const rect = journey.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 0) {
          shouldHide = true;
        }
      }

      if (download) {
        const rect = download.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 0) {
          shouldHide = true;
        }
      }

      setHideNavbar(shouldHide);
    };

    window.addEventListener("scroll", checkNavbarVisibility, { passive: true });
    window.addEventListener("resize", checkNavbarVisibility);
    checkNavbarVisibility();

    return () => {
      window.removeEventListener("scroll", checkNavbarVisibility);
      window.removeEventListener("resize", checkNavbarVisibility);
    };
  }, []);

  // Sync scroll top on index update (e.g. from reset)
  useEffect(() => {
    if (scrollContainerRef.current && heroState === 'map') {
      const container = scrollContainerRef.current;
      const cardHeight = 438;
      const expectedScrollTop = selectedHikeIdx * cardHeight;
      if (Math.abs(container.scrollTop - expectedScrollTop) > 20) {
        container.scrollTop = expectedScrollTop;
      }
    }
  }, [selectedHikeIdx, heroState]);

  const handleSearchSubmit = (destKey?: 'fontainebleau' | 'chevreuse') => {
    let targetDest: 'fontainebleau' | 'chevreuse' = 'fontainebleau';

    if (destKey) {
      targetDest = destKey;
    } else {
      const query = searchQuery.toLowerCase().trim();
      if (query.includes('chev') || query.includes('saint') || query.includes('remy')) {
        targetDest = 'chevreuse';
      } else {
        targetDest = 'fontainebleau'; // Default
      }
    }

    setSelectedDest(targetDest);
    setSelectedHikeIdx(0);
    setHeroState('loading');
    setLoadingStep(0);
  };

  useEffect(() => {
    if (heroState !== 'loading') return;

    const timer = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < 2) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setHeroState('map');
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, [heroState]);

  useEffect(() => {
    if (heroState !== 'map') {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;

    const route = HERO_ROUTES[selectedDest];
    const hike = route.hikes[selectedHikeIdx];

    // Dynamic import to avoid SSR errors
    import("maplibre-gl").then((maplibregl) => {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = new maplibregl.Map({
        container: mapContainerRef.current!,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: route.mapCenter,
        zoom: route.mapZoom,
        attributionControl: false
      });

      mapRef.current = map;

      map.on("load", () => {
        // Add train route GeoJSON source and layer
        map.addSource("train-route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route.trainCoordinates
            }
          }
        });

        map.addLayer({
          id: "train-route-layer",
          type: "line",
          source: "train-route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": route.glowColor,
            "line-width": 4,
            "line-opacity": 0.8
          }
        });

        // Add hike route GeoJSON source and layer
        map.addSource("hike-route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: hike.hikeCoordinates
            }
          }
        });

        map.addLayer({
          id: "hike-route-layer",
          type: "line",
          source: "hike-route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#719A48", // Primary green for hiking
            "line-width": 3.5,
            "line-dasharray": [2, 2],
            "line-opacity": 0.9
          }
        });

        // Add Start (Paris) Marker (White circle with dark border)
        const elStart = document.createElement("div");
        elStart.className = "w-4 h-4 rounded-full bg-white border-2 border-neutral-900 shadow-md flex items-center justify-center cursor-pointer";
        elStart.innerHTML = `<div class="w-1.5 h-1.5 rounded-full bg-neutral-950"></div>`;

        new maplibregl.Marker({ element: elStart })
          .setLngLat(route.trainCoordinates[0])
          .addTo(map);

        // Add Terminus Station Marker (Primary green marker with pulsing indicator)
        const elEnd = document.createElement("div");
        elEnd.className = "relative flex items-center justify-center cursor-pointer";
        elEnd.innerHTML = `
          <div class="absolute w-8 h-8 rounded-full bg-primary-500/30 animate-ping"></div>
          <div class="relative w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-md"></div>
        `;

        new maplibregl.Marker({ element: elEnd })
          .setLngLat(route.trainCoordinates[route.trainCoordinates.length - 1])
          .addTo(map);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [heroState, selectedDest, selectedHikeIdx]);



  // Carousel Active index state for "Fresh Journeys"
  const [carouselIndex, setCarouselIndex] = useState(0);



  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev === 0 ? TOURS.length - 1 : prev - 1));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev === TOURS.length - 1 ? 0 : prev + 1));
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };



  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-primary-900 selection:text-white">
      {/* 1. HEADER / NAVIGATION */}
      <div className="sticky top-0 z-50 w-full pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <header className={`pointer-events-auto w-full bg-white/60 backdrop-blur-md border border-white/40 rounded-full shadow-lg transition-all duration-300 ${hideNavbar ? 'opacity-0 -translate-y-24 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <div className="px-6 md:px-8 h-16 flex items-center justify-between">
              {/* Logo Brand */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded-lg cursor-pointer"
              >
                <CustomMountainLogo className="w-7 h-7 text-neutral-900 group-hover:scale-105 transition-transform duration-200" />
                <span className="font-black text-xl tracking-widest text-neutral-900 uppercase">Névé</span>
              </button>

              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => scrollToId("tours")}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Itinéraires
                </button>
                <button
                  onClick={() => scrollToId("hero")}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Explorer
                </button>
                <button
                  onClick={() => scrollToId("safety")}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Garanties
                </button>
                <button
                  onClick={() => scrollToId("instagram")}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Communauté
                </button>
              </nav>

              {/* Right CTA */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scrollToId("download")}
                  className="px-5 py-2 border border-primary-700/50 hover:border-primary-700 hover:bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                >
                  Télécharger l'app
                </button>
                <button
                  onClick={() => window.location.href = "/signup"}
                  className="px-5 py-2 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                >
                  Inscrivez-vous gratuitement
                </button>
              </div>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded-lg cursor-pointer"
                aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Panel */}
            {mobileMenuOpen && (
              <div className="pointer-events-auto md:hidden absolute top-20 left-6 right-6 bg-white/95 backdrop-blur-xl border border-neutral-200/60 px-6 py-8 flex flex-col gap-6 animate-fade-in shadow-2xl rounded-[24px] text-neutral-900">
                <button
                  onClick={() => scrollToId("tours")}
                  className="text-left text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Itinéraires
                </button>
                <button
                  onClick={() => scrollToId("hero")}
                  className="text-left text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Explorer
                </button>
                <button
                  onClick={() => scrollToId("safety")}
                  className="text-left text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Garanties
                </button>
                <button
                  onClick={() => scrollToId("instagram")}
                  className="text-left text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-2 py-1"
                >
                  Communauté
                </button>
                <hr className="border-neutral-200/60" />
                <button
                  onClick={() => window.location.href = "/signup"}
                  className="w-full text-center py-4 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                >
                  Inscrivez-vous gratuitement
                </button>
              </div>
            )}
          </header>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section id="hero" className={`transition-all duration-1000 ${heroState === 'map' ? 'fixed inset-0 z-30 bg-primary-50 overflow-hidden' : 'relative overflow-hidden bg-neutral-50 min-h-screen flex items-center -mt-20 pt-48 pb-24 md:pt-56 md:pb-32'}`}>
        {/* Background image covering full height (Only visible in search & loading states, hidden in map state) */}
        <div className={`absolute inset-0 z-0 transition-all duration-1000 ${heroState === 'map' ? 'opacity-0 pointer-events-none scale-105 blur-sm' : 'opacity-100 scale-100'}`}>
          <Image
            src="/neve_footer_bg.jpeg"
            alt="Randonneur au sommet d'une falaise admirant la vallée de montagne"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Light gradient overlay to make text highly legible on the sunset sky while maintaining a light aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-neutral-950/20 to-neutral-50 z-1"></div>
        </div>

        {/* Full-bleed Map View in background during map state */}
        {heroState === 'map' && (
          <div className="absolute inset-0 z-0 bg-primary-50 w-full h-full animate-fade-in">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
        )}

        {/* Floating Details panel directly in hero (relative to full-screen) */}
        {heroState === 'map' && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full pointer-events-none flex items-center justify-start">
              <div className="pointer-events-auto w-full max-w-[390px] bg-white/70 backdrop-blur-md border border-white/40 rounded-[32px] p-4 shadow-2xl flex flex-col gap-4 text-neutral-900 animate-scale-up">

                {/* Close / Back button */}
                <button
                  onClick={() => setHeroState('search')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded px-1.5 py-0.5"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  <span>Nouvelle recherche</span>
                </button>

                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-primary-700/10 text-primary-700 border border-primary-700/20 mb-1">
                      <span className="w-1 h-1 rounded-full bg-primary-700 animate-pulse"></span>
                      <span>{HERO_ROUTES[selectedDest].tag}</span>
                    </span>
                    <h2 className="text-base font-black uppercase tracking-tight text-neutral-900 leading-tight">
                      {HERO_ROUTES[selectedDest].regionName}
                    </h2>
                  </div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest pt-1 shrink-0">
                    SIMULATEUR
                  </span>
                </div>

                {/* Vertical Scrollable Hikes Track */}
                <div className="relative w-full mt-1.5 flex flex-col gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 block px-0.5 text-left">
                    Itinéraires disponibles ({HERO_ROUTES[selectedDest].hikes.length})
                  </span>

                  {/* Vertical Scroll Track */}
                  <div 
                    ref={scrollContainerRef}
                    onScroll={handleHikeScroll}
                    className="flex flex-col overflow-y-auto scroll-smooth w-full h-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4.5"
                  >
                    {HERO_ROUTES[selectedDest].hikes.map((hike, idx) => {
                      const isFav = !!favorites[hike.name];
                      const isSelected = selectedHikeIdx === idx;
                      return (
                        <div 
                          key={hike.name}
                          onClick={() => setSelectedHikeIdx(idx)}
                          className={`w-full shrink-0 bg-white rounded-3xl p-3.5 shadow-md border transition-all duration-300 flex flex-col gap-4 cursor-pointer ${
                            isSelected 
                              ? "border-primary-500 ring-2 ring-primary-500/30 shadow-lg shadow-primary-500/10" 
                              : "border-neutral-200/40 hover:border-neutral-300 hover:shadow-lg"
                          }`}
                        >
                          {/* Image Container with overlays */}
                          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/20">
                            <Image
                              src={hike.img}
                              alt={hike.name}
                              fill
                              className="object-cover"
                              sizes="320px"
                            />

                            {/* Weather Overlay Tag (Top-left) */}
                            {hike.temp && (
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-black text-neutral-800 flex items-center gap-1 shadow-sm">
                                <span>☀️</span>
                                <span>{hike.temp}</span>
                              </div>
                            )}
                            
                            {/* Heart Icon Button (Top-right) */}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(hike.name); }}
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200/30 flex items-center justify-center text-neutral-800 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
                              aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={isFav ? "var(--color-primary-500)" : "none"}
                                stroke={isFav ? "var(--color-primary-500)" : "currentColor"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 transition-colors"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>

                            {/* Badges Bottom Row overlay */}
                            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white ${
                                hike.difficulty === 'Facile' ? 'bg-primary-500' :
                                hike.difficulty === 'Modéré' ? 'bg-primary-700' :
                                'bg-primary-950'
                              }`}>
                                {hike.difficulty}
                              </span>
                              {hike.elevation && (
                                <span className="bg-neutral-950/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold">
                                  ↗ {hike.elevation}
                                </span>
                              )}
                              <span className="bg-primary-700/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                                <span>🚆</span>
                                <span>{hike.trainTime} (TER)</span>
                              </span>
                            </div>
                          </div>

                          {/* Hike Text Details */}
                          <div className="flex flex-col text-left">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-black text-neutral-950 uppercase tracking-tight leading-tight hover:underline cursor-pointer">
                                {hike.name}
                              </h3>
                              <div className="flex items-center gap-0.5 text-neutral-900 text-xs font-black shrink-0">
                                <span>★</span>
                                <span>{hike.rating}</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-neutral-500 font-bold mt-0.5">
                              Départ : Paris {HERO_ROUTES[selectedDest].stationStart.replace("Paris ", "")} • {hike.location ? hike.location.split(",")[0] : HERO_ROUTES[selectedDest].stationEnd}
                            </p>
                            
                            {/* Rating and metrics row */}
                            <div className="flex items-center flex-wrap gap-1.5 text-[10px] text-neutral-400 font-bold mt-2">
                              <span className={hike.difficulty === "Facile" ? "text-primary-500" : hike.difficulty === "Modéré" ? "text-primary-700" : "text-red-600"}>
                                {hike.difficulty}
                              </span>
                              <span>•</span>
                              <span>{hike.distance}</span>
                              <span>•</span>
                              <span>{hike.duration || "3h00"}</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-extrabold">🌿 {hike.co2 || "-10kg"}</span>
                            </div>
                          </div>

                          {/* Accès Train Container (Light beige/cream box) */}
                          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-2.5 flex flex-col gap-0.5 text-left">
                            <span className="text-[9px] font-black tracking-wider text-primary-600 flex items-center gap-1 leading-none">
                              ACCÈS TRAIN/TER
                            </span>
                            <p className="text-[10px] text-neutral-800 font-bold leading-snug">
                              Paris {HERO_ROUTES[selectedDest].stationStart.replace("Paris ", "")} ➡️ {hike.location ? hike.location.split(",")[0] : HERO_ROUTES[selectedDest].stationEnd} ({HERO_ROUTES[selectedDest].lineName}, {hike.trainTime})
                            </p>
                          </div>

                          {/* Individual Signup CTA Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = "/signup";
                            }}
                            className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md text-center cursor-pointer focus:outline-none"
                          >
                            Réserver mon train
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Centered Search / Loading State Main Content */}
        {(heroState === 'search' || heroState === 'loading') && (
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
            {/* Heading */}
            <h1
              className="text-[32px] sm:text-[48px] md:text-[52px] font-black text-white uppercase tracking-tight leading-[36px] sm:leading-[52px] md:leading-[52px] text-center"
              style={{ textShadow: '0 2px 14px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
            >
              <span className="block text-base sm:text-lg md:text-xl font-bold normal-case tracking-normal opacity-90 mb-3" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>Marre de passer plus de temps à planifier qu'à marcher ?</span>
              Planifie ta rando et achète ton billet<br />
              <span className="text-white block my-2 bg-primary-700 max-w-fit mx-auto py-2 px-4 rounded-lg shadow-md" style={{ textShadow: 'none' }}>en moins de 2 minutes chrono.</span>
            </h1>

            {heroState === 'search' ? (
              // Centered White Frosted Glass Search Card
              <div className="relative w-full max-w-[680px] mx-auto bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-[32px] p-6 text-neutral-900 text-left mt-10 animate-scale-up">
                {/* Search Bar Input (White pill with green button) */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}
                  className="relative flex items-center bg-white border border-neutral-200/60 rounded-full px-5 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-primary-700 focus-within:border-transparent transition-all"
                >
                  <svg className="w-4.5 h-4.5 text-neutral-400 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Fontainebleau, Chevreuse, Rambouillet…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm text-neutral-800 placeholder-neutral-600 font-medium flex-1 bg-transparent border-none outline-none focus:ring-0 p-0"
                    aria-label="Rechercher une destination de randonnée"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-colors shadow-sm ml-2"
                    aria-label="Lancer la recherche"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </form>

                {/* Suggestions Header */}
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-600 mt-6 mb-3 px-1">
                  <span>Recherches fréquentes</span>
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit()}
                    className="text-primary-700 hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 rounded px-1.5 py-0.5 text-xs font-bold"
                  >
                    Voir tout
                  </button>
                </div>

                {/* Suggestions List */}
                <div className="space-y-3">
                  {/* Fontainebleau */}
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit('fontainebleau')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-neutral-100/80 hover:border-primary-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 transition-all duration-300 cursor-pointer shadow-sm active:scale-[0.995]"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-200/50">
                        <Image src="/journey_mountain.png" alt="Forêt de Fontainebleau" fill className="object-cover" />
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="text-sm font-bold text-neutral-900">Forêt de Fontainebleau</h4>
                        <p className="text-xs text-neutral-600 mt-0.5">38 min de train • 14.2 km</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-primary-700 flex items-center gap-0.5 justify-end">
                        <span className="text-primary-600">★</span>
                        <span>4.9</span>
                      </div>
                    </div>
                  </button>

                  {/* Chevreuse */}
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit('chevreuse')}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-neutral-100/80 hover:border-primary-500/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 transition-all duration-300 cursor-pointer shadow-sm active:scale-[0.995]"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-200/50">
                        <Image src="/journey_river.png" alt="Vallée de la Chevreuse" fill className="object-cover" />
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="text-sm font-bold text-neutral-900">Vallée de la Chevreuse</h4>
                        <p className="text-xs text-neutral-600 mt-0.5">45 min de RER • 15.8 km</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-primary-700 flex items-center gap-0.5 justify-end">
                        <span className="text-primary-600">★</span>
                        <span>4.8</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              // Centered Light Frosted Glass Loading Card
              <div className="relative w-full max-w-[680px] mx-auto bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-[32px] p-6 text-neutral-900 text-center mt-10 items-center justify-center py-16 animate-scale-up">
                <div className="w-12 h-12 rounded-full border-4 border-neutral-200 border-t-primary-700 animate-spin mx-auto"></div>
                <div className="text-center space-y-3 mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-700">Recherche d'itinéraire...</p>
                  <p className="text-sm font-semibold text-neutral-800 transition-all duration-300">
                    {loadingStep === 0 && "Calcul de l'itinéraire optimal sans voiture..."}
                    {loadingStep === 1 && "Vérification des prochains départs SNCF..."}
                    {loadingStep === 2 && "Génération de la trace de randonnée..."}
                  </p>
                </div>
              </div>
            )}

            {/* Subheadline (Centered, white for visibility) */}
            <p
              className="text-white text-sm sm:text-base text-center font-normal tracking-wide max-w-2xl mx-auto mt-10 leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)' }}
            >
              Névé croise les horaires SNCF, la météo et les sentiers balisés pour te proposer la rando parfaite. <br />
              Zéro voiture, zéro prise de tête.
            </p>

            {/* Social Proof (Centered, white for visibility) */}
            <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md mx-auto">
              <div className="flex -space-x-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/journey_mountain.png" alt="Utilisateur Névé" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/journey_river.png" alt="Utilisateur Névé" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/tent_forest.png" alt="Utilisateur Névé" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/forest_green.png" alt="Utilisateur Névé" fill className="object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                  +
                </div>
              </div>
              <div
                className="text-center sm:text-left text-white"
                style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}
              >
                <p className="text-xs font-semibold tracking-wide">
                  +500 randonneurs ont déjà lâché la voiture.
                </p>
                <p className="text-xs text-neutral-100 mt-0.5 font-normal">
                  98% des trains de retour attrapés à l'heure.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* [NEW SECTION] 2.1 FRESH JOURNEYS CENTERED GRID SECTION (Inspired by Hidden Gems) */}
      <section id="tours" className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary-900">
              Inspirez-vous
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              Des sentiers incroyables à moins d'1h de Paris
            </h2>
            <button
              onClick={() => window.location.href = "/signup"}
              className="inline-flex items-center justify-center bg-primary-900 hover:bg-primary-950 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-300 mt-4 shadow-sm cursor-pointer"
            >
              Inscrivez-vous gratuitement
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1: Mountain Escapes */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/journey_mountain.png"
                alt="Forêts et rochers de Fontainebleau"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-7xl) 280px"
              />
              {/* Bottom dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

              {/* Card content at the bottom */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wide">Massifs & Forêts</h3>
                <p className="text-neutral-200 text-xs leading-relaxed font-normal">
                  Respirez le grand air des pinèdes. Parcourez des sentiers de grès sauvages au cœur de Fontainebleau.
                </p>
              </div>
            </div>

            {/* Card 2: Valleys & Rivers */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/journey_river.png"
                alt="Vallée de la Chevreuse"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-7xl) 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V3m0 18a9 9 0 0 0 0-18m0 0V3m0 0a9 9 0 0 1 0 18M3 12h18" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wide">Vallées Sauvages</h3>
                <p className="text-neutral-200 text-xs leading-relaxed font-normal">
                  Longez des ruisseaux sinueux et traversez des prairies fleuries au creux du Vexin Français.
                </p>
              </div>
            </div>

            {/* Card 3: Cliffs & Peaks */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/forest_lake.png"
                alt="Crêtes et panoramas sauvages"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-7xl) 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wide">Falaises & Crêtes</h3>
                <p className="text-neutral-200 text-xs leading-relaxed font-normal">
                  Prenez de la hauteur. Admirez des panoramas exceptionnels depuis les rochers de grès.
                </p>
              </div>
            </div>

            {/* Card 4: Seasonal / Bivouac */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/tent_forest.png"
                alt="Saisons et bivouacs"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-7xl) 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314-.707.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wide">Refuges & Saisons</h3>
                <p className="text-neutral-200 text-xs leading-relaxed font-normal">
                  Profitez des couleurs changeantes de l'automne ou de la brume matinale sur les étangs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.2 THE NÉVÉ REVOLUTION (Old vs New Way) */}
      <section id="revolution" className="py-24 bg-white border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary-700">
              Pourquoi Névé
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              Ce qui change avec Névé
            </h2>
            <p className="text-neutral-600 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Plus besoin de jongler entre 5 onglets pour croiser horaires, météo et sentiers. Névé fait tout ça en 2 minutes.
            </p>
          </div>

          {/* Advantages Grid - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Accès sentier de la gare */}
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-primary-200 hover:shadow-md transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-200/50 flex items-center justify-center text-primary-700 text-2xl shadow-sm">
                  🚉
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 leading-tight">
                    Du quai au sentier
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Chaque rando commence et finit au pied d'une gare. Tu descends du train, tu marches. Pas de navette, pas de covoiturage à organiser.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-neutral-200/50 text-[10px] font-black uppercase tracking-wider text-primary-700">
                0 km en voiture
              </div>
            </div>

            {/* Card 2: La sécurité du retour */}
            <div className="bg-primary-950 text-white border border-primary-900 rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300">
              {/* Premium Glow Accent */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl shadow-sm">
                  ⏱️
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white leading-tight">
                    Retour garanti
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    L'appli calcule ton allure et t'alerte quand il faut faire demi-tour. Tu ne rates jamais le train du retour.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-primary-900 text-[10px] font-black uppercase tracking-wider text-emerald-400 relative z-10">
                Alertes en temps réel
              </div>
            </div>

            {/* Card 3: Tracés GPX validés */}
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-primary-200 hover:shadow-md transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-200/50 flex items-center justify-center text-primary-700 text-2xl shadow-sm">
                  🗺️
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 leading-tight">
                    Tracés vérifiés sur le terrain
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Chaque sentier est arpenté et validé par nos éclaireurs. Pas de GPX périmé ou de chemin barré : tu suis, tu marches, c'est fiable.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-neutral-200/50 text-[10px] font-black uppercase tracking-wider text-primary-700">
                GPX testés sur le terrain
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.3 THE USER JOURNEY (Step by Step) - Desktop Dynamic Scroll Pinning Timeline */}
      <section ref={journeySectionRef} id="journey" className="hidden lg:block relative h-[320vh] bg-neutral-50 border-b border-neutral-200">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center py-16">
            
            {/* Header (collapses and fades out once step 1 is passed to center step content) */}
            <div 
              className={`text-center max-w-3xl mx-auto space-y-4 shrink-0 transition-all duration-700 ease-in-out ${
                activeStep === 1 
                  ? 'opacity-100 scale-100 max-h-[300px] mb-20' 
                  : 'opacity-0 scale-95 max-h-0 mb-0 pointer-events-none overflow-hidden'
              }`}
            >
              <span className="text-xs font-black uppercase tracking-widest text-primary-700">
                Comment ça marche
              </span>
              <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
                Du canapé au sommet en 4 étapes
              </h2>
              <p className="text-neutral-600 text-sm font-normal max-w-2xl mx-auto leading-relaxed">
                Tout se fait depuis ton téléphone. Tu choisis, tu réserves, tu marches, tu rentres.
              </p>
            </div>

            {/* Desktop Three-Column Grid */}
            <div className="grid grid-cols-12 gap-8 items-center relative">
              
              {/* Left Column: Phone Mockup */}
              <div className="col-span-5 flex justify-end pr-10">
                <PhoneMockup activeStep={activeStep} />
              </div>

              {/* Center Column: Timeline Line & Circle */}
              <div className="col-span-2 relative flex flex-col items-center justify-start pt-8 h-[300px]">
                
                {/* Spacer to keep the circle in position */}
                <div className="h-14 shrink-0" />

                {/* Line above Circle (Faded and short on Step 1, normal and full height to the top on Steps 2-4) */}
                <div 
                  className={`absolute w-[1.5px] transition-all duration-700 ${
                    activeStep === 1 
                      ? 'top-[32px] h-14 opacity-20' 
                      : 'top-[-50vh] bottom-[212px] opacity-100'
                  }`} 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(to bottom, #a3a3a3 0px, #a3a3a3 16px, transparent 16px, transparent 32px)'
                  }}
                />

                {/* Single active number circle */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  {[1, 2, 3, 4].map((stepNum) => {
                    const isActive = activeStep === stepNum;
                    return (
                      <div 
                        key={stepNum}
                        className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-black text-base transition-all duration-500 ${
                          isActive 
                            ? 'bg-primary-700 text-white scale-115 shadow-md ring-4 ring-primary-700/20 opacity-100 z-10' 
                            : 'opacity-0 scale-90 z-0 pointer-events-none'
                        }`}
                      >
                        {stepNum}
                      </div>
                    );
                  })}
                </div>

                {/* Line below Circle (Normal on Steps 1-3, hidden/opacity-0 on Step 4) */}
                <div 
                  className={`absolute top-[140px] bottom-[-50vh] w-[1.5px] transition-all duration-500 ${
                    activeStep === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`} 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(to bottom, #a3a3a3 0px, #a3a3a3 16px, transparent 16px, transparent 32px)'
                  }}
                />
              </div>

              {/* Right Column: Stacked Text Steps */}
              <div className="col-span-5 relative h-[250px] flex items-center pl-10">
                
                {/* Step 1 Content */}
                <div className={`absolute inset-x-0 transition-all duration-700 flex flex-col justify-center text-left ${
                  activeStep === 1 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}>
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700 mb-2">Étape 1</span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mb-4 font-extrabold">Choisis</h3>
                  <p className="text-neutral-600 text-base leading-relaxed font-normal">
                    Tape ta destination ou laisse Névé te suggérer la meilleure rando du jour selon la météo et les trains.
                  </p>
                </div>

                {/* Step 2 Content */}
                <div className={`absolute inset-x-0 transition-all duration-700 flex flex-col justify-center text-left ${
                  activeStep === 2 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}>
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700 mb-2">Étape 2</span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mb-4 font-extrabold">Réserve</h3>
                  <p className="text-neutral-600 text-base leading-relaxed font-normal">
                    Ton billet de train s'achète en 2 clics, directement dans l'appli. Navigo ou billet classique.
                  </p>
                </div>

                {/* Step 3 Content */}
                <div className={`absolute inset-x-0 transition-all duration-700 flex flex-col justify-center text-left ${
                  activeStep === 3 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}>
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700 mb-2">Étape 3</span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mb-4 font-extrabold">Marche</h3>
                  <p className="text-neutral-600 text-base leading-relaxed font-normal">
                    Suis le tracé GPX sur ton écran, même sans réseau. L'appli te guide du quai au sentier.
                  </p>
                </div>

                {/* Step 4 Content */}
                <div className={`absolute inset-x-0 transition-all duration-700 flex flex-col justify-center text-left ${
                  activeStep === 4 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}>
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700 mb-2">Étape 4</span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mb-4 font-extrabold">Rentre</h3>
                  <p className="text-neutral-600 text-base leading-relaxed font-normal">
                    L'alerte retour se déclenche au bon moment. Tu reprends ton train, tu es chez toi pour le dîner.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.3.1 THE USER JOURNEY (Step by Step) - Mobile/Tablet Responsive Flow */}
      <section className="block lg:hidden py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary-700">
              Comment ça marche
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              Du canapé au sommet en 4 étapes
            </h2>
            <p className="text-neutral-600 text-sm font-normal max-w-2xl mx-auto">
              Tout se fait depuis ton téléphone. Tu choisis, tu réserves, tu marches, tu rentres.
            </p>
          </div>

          {/* Mobile Linear Steps */}
          <div className="space-y-16">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="w-10 h-10 rounded-full bg-primary-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                1
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Choisis</h3>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md">
                Tape ta destination ou laisse Névé te suggérer la meilleure rando du jour selon la météo et les trains.
              </p>
              <div className="pt-2">
                <PhoneMockup activeStep={1} isMobile />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="w-10 h-10 rounded-full bg-primary-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                2
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Réserve</h3>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md">
                Ton billet de train s'achète en 2 clics, directement dans l'appli. Navigo ou billet classique.
              </p>
              <div className="pt-2">
                <PhoneMockup activeStep={2} isMobile />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="w-10 h-10 rounded-full bg-primary-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                3
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Marche</h3>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md">
                Suis le tracé GPX sur ton écran, même sans réseau. L'appli te guide du quai au sentier.
              </p>
              <div className="pt-2">
                <PhoneMockup activeStep={3} isMobile />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="w-10 h-10 rounded-full bg-primary-700 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                4
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Rentre</h3>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md">
                L'alerte retour se déclenche au bon moment. Tu reprends ton train, tu es chez toi pour le dîner.
              </p>
              <div className="pt-2">
                <PhoneMockup activeStep={4} isMobile />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [NEW SECTION] 3.1 SAFETY & COMFORT FLOATING CARDS (Inspired by Image 3) */}
      <section id="safety" className="py-24 md:py-36 bg-neutral-50 border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
              SÉCURITÉ & FIABILITÉ
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 mt-3">
              Randonner sans stress, c'est possible.
            </h2>
            <p className="text-neutral-600 mt-4 text-sm md:text-base">
              Sentiers vérifiés, alertes en temps réel, retour garanti. On s'occupe de la logistique, tu profites du paysage.
            </p>
          </div>

          {/* Staggered Floating Layout (Desktop absolute overlap & Mobile grid) */}

          {/* 1. Desktop version */}
          <div className="relative max-w-6xl mx-auto min-h-[760px] hidden lg:block">
            {/* Central Main Rounded Image (Tent looking out to forest) - Enlarged */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[580px] rounded-[48px] overflow-hidden shadow-2xl border border-neutral-200 z-10">
              <Image
                src="/tent_forest.png"
                alt="Vue de montagne depuis la tente"
                fill
                className="object-cover"
                sizes="440px"
              />
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 to-transparent"></div>
            </div>

            {/* Card 1: Safety (Far Left, Medium-High) */}
            <div className="absolute left-[calc(50%-490px)] top-[38%] -translate-y-1/2 z-20 w-[290px] bg-primary-900 text-white py-9.5 px-7.5 rounded-[32px] shadow-2xl border border-primary-950/30 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-900 mb-6 shadow-md border border-neutral-100/30">
                <ShieldIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wider">Sécurité</h3>
              <p className="text-xs text-neutral-100 mt-3.5 leading-relaxed">
                Nous appliquons des normes de sécurité rigoureuses pour chaque tracé. L'itinéraire est doublement vérifié et mis à jour.
              </p>
            </div>

            {/* Card 2: Memorable (Center-Left, Top Overlap) */}
            <div className="absolute left-[calc(50%-230px)] top-[2%] z-20 w-[290px] bg-primary-900 text-white py-9.5 px-7.5 rounded-[32px] shadow-2xl border border-primary-950/30 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-900 mb-6 shadow-md border border-neutral-100/30">
                <HeartIcon className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wider">Mémorable</h3>
              <p className="text-xs text-neutral-100 mt-3.5 leading-relaxed">
                Grâce à nos itinéraires exclusifs, nous garantisons à chaque randonneur un parcours riche en émotions et en dépaysement.
              </p>
            </div>

            {/* Card 3: Experience (Center-Right, Bottom Overlap) */}
            <div className="absolute right-[calc(50%-230px)] bottom-[2%] z-20 w-[290px] bg-primary-900 text-white py-9.5 px-7.5 rounded-[32px] shadow-2xl border border-primary-950/30 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-900 font-bold text-base mb-6 shadow-md border border-neutral-100/30">
                8+
              </div>
              <h3 className="font-bold text-base uppercase tracking-wider">Expérience</h3>
              <p className="text-xs text-neutral-100 mt-3.5 leading-relaxed">
                Plus de 8 ans d'organisation de sorties outdoor et d'analyse de données de transports en commun franciliens.
              </p>
            </div>

            {/* Card 4: Best Service (Far Right, Medium-Low) */}
            <div className="absolute right-[calc(50%-490px)] top-[62%] -translate-y-1/2 z-20 w-[290px] bg-primary-900 text-white py-9.5 px-7.5 rounded-[32px] shadow-2xl border border-primary-950/30 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary-900 mb-6 shadow-md border border-neutral-100/30">
                <CompassIcon className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wider">Meilleur Service</h3>
              <p className="text-xs text-neutral-100 mt-3.5 leading-relaxed">
                Une assistance réactive en direct, des conseils d'allure et des tracés adaptés au niveau de chaque participant.
              </p>
            </div>
          </div>

          {/* 2. Responsive version for Mobile & Tablet */}
          <div className="lg:hidden flex flex-col md:grid md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
            {/* Mobile Central Image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-[380px] rounded-[36px] overflow-hidden shadow-xl border border-neutral-200 md:col-span-2 mx-auto mb-4">
              <Image
                src="/tent_forest.png"
                alt="Vue de montagne depuis la tente"
                fill
                className="object-cover"
                sizes="(max-w-7xl) 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
            </div>

            {/* Mobile Card 1 */}
            <div className="bg-primary-900 text-white p-6.5 rounded-[24px] border border-primary-950/30 flex flex-col items-center text-center shadow-lg w-full">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-900 mb-4 shadow-sm">
                <ShieldIcon className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wide">Sécurité</h3>
              <p className="text-xs text-neutral-100 mt-2 leading-relaxed">
                Nous appliquons des normes de sécurité rigoureuses pour chaque tracé. L'itinéraire est doublement vérifié et mis à jour.
              </p>
            </div>

            {/* Mobile Card 2 */}
            <div className="bg-primary-900 text-white p-6.5 rounded-[24px] border border-primary-950/30 flex flex-col items-center text-center shadow-lg w-full">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-900 mb-4 shadow-sm">
                <HeartIcon className="w-5.5 h-5.5 text-rose-500" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wide">Mémorable</h3>
              <p className="text-xs text-neutral-100 mt-2 leading-relaxed">
                Grâce à nos itinéraires exclusifs, nous garantisons à chaque randonneur un parcours riche en émotions et en dépaysement.
              </p>
            </div>

            {/* Mobile Card 3 */}
            <div className="bg-primary-900 text-white p-6.5 rounded-[24px] border border-primary-950/30 flex flex-col items-center text-center shadow-lg w-full">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-900 font-bold text-xs mb-4 shadow-sm">
                8+
              </div>
              <h3 className="font-bold text-base uppercase tracking-wide">Expérience</h3>
              <p className="text-xs text-neutral-100 mt-2 leading-relaxed">
                Plus de 8 ans d'organisation de sorties outdoor et d'analyse de données de transports en commun franciliens.
              </p>
            </div>

            {/* Mobile Card 4 */}
            <div className="bg-primary-900 text-white p-6.5 rounded-[24px] border border-primary-950/30 flex flex-col items-center text-center shadow-lg w-full">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-900 mb-4 shadow-sm">
                <CompassIcon className="w-5.5 h-5.5 text-primary-700" />
              </div>
              <h3 className="font-bold text-base uppercase tracking-wide">Meilleur Service</h3>
              <p className="text-xs text-neutral-100 mt-2 leading-relaxed">
                Une assistance réactive en direct, des conseils d'allure et des tracés adaptés au niveau de chaque participant.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 5. TESTIMONIALS SECTION */}
      <section id="temoignages" className="bg-neutral-50 py-24 md:py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700 block text-center">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mt-3 mb-16 text-neutral-900">
              Ils randonnent sans voiture grâce à Névé
            </h2>

            {/* Testimonial block */}
            <div className="relative bg-white border border-neutral-200 p-8 md:p-16 rounded-3xl shadow-lg">
              <div className="absolute top-4 left-6 text-8xl font-serif text-neutral-150 select-none pointer-events-none">
                “
              </div>

              <blockquote className="relative z-10">
                <p className="text-lg md:text-2xl font-normal leading-relaxed text-neutral-700 italic">
                  "Je prenais des captures d'écran de mes horaires à chaque fois pour ne pas me perdre. Avec Névé, j'ai juste profité de ma rando à Fontainebleau sans regarder ma montre une seule fois."
                </p>

                <footer className="mt-8 pt-6 border-t border-neutral-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary-900 flex items-center justify-center font-bold text-white text-sm">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-sm text-neutral-900">Rémi</div>
                      <div className="text-xs text-neutral-600">23 ans — Randonneur urbain (Paris 11e)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5 text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                      🌲 Itinéraire fait : Fontainebleau
                    </span>
                    <span className="text-neutral-600 font-bold">Samedis sauvés : 6</span>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Differentiated metric social proof */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">
              <div className="bg-white border border-neutral-200/60 p-6 rounded-2xl">
                <div className="text-3xl md:text-4xl font-black text-neutral-900 uppercase">98%</div>
                <p className="text-xs text-neutral-600 uppercase tracking-wider font-bold mt-1">Des trains attrapés à l'heure</p>
              </div>
              <div className="bg-white border border-neutral-200/60 p-6 rounded-2xl">
                <div className="text-3xl md:text-4xl font-black text-neutral-900 uppercase">0</div>
                <p className="text-xs text-neutral-600 uppercase tracking-wider font-bold mt-1">Besoin de voiture de location</p>
              </div>
              <div className="bg-white border border-neutral-200/60 p-6 rounded-2xl">
                <div className="text-3xl md:text-4xl font-black text-neutral-900 uppercase">1 clic</div>
                <p className="text-xs text-neutral-600 uppercase tracking-wider font-bold mt-1">Pour lancer la micro-aventure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [NEW SECTION] 5.0.1 INTERACTIVE APP DOWNLOAD SECTION (Duolingo style) */}
      <section ref={downloadSectionRef} id="download" className="bg-primary-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center flex flex-col items-center">
          
          {/* Header (Centered) */}
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary-950 leading-[1.1]">
              Randonnez où vous voulez, <br />
              <span className="text-primary-700">quand vous voulez.</span>
            </h2>

            {/* Badges & CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => alert("L'application iOS sera disponible très bientôt sur l'App Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                className="inline-flex items-center gap-4 bg-neutral-900 hover:bg-black text-white px-8 py-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <FaApple className="w-9 h-9" />
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold leading-none">Télécharger dans l'</p>
                  <p className="text-lg font-bold text-white leading-tight mt-0.5">App Store</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => alert("L'application Android sera disponible très bientôt sur le Google Play Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                className="inline-flex items-center gap-4 bg-neutral-900 hover:bg-black text-white px-8 py-4 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <IoLogoGooglePlaystore className="w-9 h-9" />
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold leading-none">Disponible sur</p>
                  <p className="text-lg font-bold text-white leading-tight mt-0.5">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll-driven sticky showcase */}
        <div ref={scrollParentRef} className="relative h-[200vh] md:h-[300vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div ref={stageRef} className="relative w-full max-w-5xl h-[480px] md:h-[540px] mx-auto px-6 select-none">
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-100/20 rounded-full blur-3xl" />
            </div>

            {/* 3D Floating decorations with Parallax Scroll (Primary / Neutral palette only) */}
            <FloatingBadge3D 
              emoji="🧭" 
              bgColor="bg-primary-600" 
              borderColor="border-primary-800 text-white" 
              className="left-[2%] md:left-[8%] top-[25%]" 
              floatSpeed="slow"
              style={{ transform: `translateY(${downloadProgress * -60}px) rotate(15deg)` }}
            />
            <FloatingBadge3D 
              emoji="🎫" 
              bgColor="bg-primary-400" 
              borderColor="border-primary-600 text-white" 
              className="left-[18%] md:left-[28%] top-[70%]" 
              floatSpeed="medium"
              style={{ transform: `translateY(${downloadProgress * 40}px) rotate(-10deg)` }}
            />
            <FloatingBadge3D 
              emoji="🔥" 
              bgColor="bg-primary-700" 
              borderColor="border-primary-900 text-white" 
              className="left-[28%] md:left-[38%] top-[18%]" 
              floatSpeed="fast"
              style={{ transform: `translateY(${downloadProgress * -30}px) rotate(-15deg)` }}
            />
            <FloatingBadge3D 
              emoji="🌲" 
              bgColor="bg-primary-50" 
              borderColor="border-primary-200 text-primary-700" 
              className="right-[28%] md:right-[38%] top-[75%]" 
              floatSpeed="slow"
              style={{ transform: `translateY(${downloadProgress * 50}px) rotate(8deg)` }}
            />
            <FloatingBadge3D 
              emoji="👑" 
              bgColor="bg-primary-800" 
              borderColor="border-primary-950 text-white" 
              className="right-[18%] md:right-[28%] top-[20%]" 
              floatSpeed="medium"
              style={{ transform: `translateY(${downloadProgress * -40}px) rotate(12deg)` }}
            />
            <FloatingBadge3D 
              emoji="🥾" 
              bgColor="bg-primary-300" 
              borderColor="border-primary-500 text-white" 
              className="right-[2%] md:right-[8%] top-[65%]" 
              floatSpeed="fast"
              style={{ transform: `translateY(${downloadProgress * 30}px) rotate(-12deg)` }}
            />

            {/* 3 phones (refs pour mesurer les trajectoires) */}
            <div ref={phoneRef0} className="absolute left-[5%] md:left-[15%] top-[45%] -translate-y-1/2 scale-[0.9] md:scale-100 z-10">
              <div className={`${reduceActive ? "" : "animate-float-slow"} w-[150px] h-[300px] md:w-[170px] md:h-[330px] relative`}>
                <img src="/phone.webp" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl pointer-events-none" alt="Application Névé" />
              </div>
            </div>
            <div ref={phoneRef1} className="absolute left-[50%] -translate-x-1/2 top-[55%] -translate-y-1/2 scale-[0.95] md:scale-105 z-10">
              <div className={`${reduceActive ? "" : "animate-float-medium"} w-[150px] h-[300px] md:w-[170px] md:h-[330px] relative`}>
                <img src="/phone.webp" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl pointer-events-none" alt="Application Névé" />
              </div>
            </div>
            <div ref={phoneRef2} className="absolute right-[5%] md:right-[15%] top-[45%] -translate-y-1/2 scale-[0.9] md:scale-100 z-10">
              <div className={`${reduceActive ? "" : "animate-float-fast"} w-[150px] h-[300px] md:w-[170px] md:h-[330px] relative`}>
                <img src="/phone.webp" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl pointer-events-none" alt="Application Névé" />
              </div>
            </div>

            {/* Assets voyageurs (scroll-driven) */}
            {!reduceActive && (
              <>
                <motion.div className="absolute top-0 left-0 z-20 pointer-events-none" style={{ x: cpX, y: cpY, opacity: cpO, scale: cpS, rotate: cpR }}>
                  <img src="/city_pass.webp" alt="" className="w-24 md:w-32 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl" />
                </motion.div>
                <motion.div className="absolute top-0 left-0 z-20 pointer-events-none" style={{ x: hkX, y: hkY, opacity: hkO, scale: hkS, rotate: hkR }}>
                  <img src="/hiker.webp" alt="" className="w-24 md:w-32 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl" />
                </motion.div>
                <motion.div className="absolute top-0 left-0 z-20 pointer-events-none" style={{ x: trX, y: trY, opacity: trO, scale: trS, rotate: trR }}>
                  <img src="/train.webp" alt="" className="w-28 md:w-36 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl" />
                </motion.div>
              </>
            )}

            {/* Reduced-motion : tableau statique final */}
            {reduceActive && measured && (
              <>
                <img src="/city_pass.webp" alt="" style={{ left: P1.x, top: P1.y }} className="absolute w-24 md:w-32 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl" />
                <img src="/hiker.webp" alt="" style={{ left: P2.x, top: P2.y }} className="absolute w-24 md:w-32 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl" />
                <img src="/train.webp" alt="" style={{ left: trainEndX, top: P2.y }} className="absolute w-28 md:w-36 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl" />
              </>
            )}

            </div>
          </div>
        </div>
      </section>

      {/* 5.1 FAQ SECTION (Inspired by screenshot) */}
      <section id="faq" className="bg-neutral-50 py-24 md:py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
                FAQ
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 mt-3 leading-[1.15]">
                Des réponses à vos <br />
                <span className="text-neutral-500 font-semibold">questions sur Névé</span>
              </h2>
            </div>
            <div className="md:col-span-5 pb-1">
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                Trouvez des réponses claires et complètes à toutes vos questions sur les escapades Névé. Que vous ayez besoin de détails sur les billets de train, l'équipement de randonnée ou les alertes de trafic, nous sommes là pour vous aider.
              </p>
            </div>
          </div>

          {/* Accordion List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200/80 rounded-[20px] overflow-hidden transition-all duration-350 hover:border-neutral-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-neutral-900 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-inset rounded-[20px] cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold text-neutral-800 tracking-tight">{item.q}</span>
                    <span className="text-lg font-bold text-neutral-700 leading-none select-none pl-4">
                      {isOpen ? "—" : "+"}
                    </span>
                  </button>

                  {/* Smooth height transition for answer */}
                  <div className={`transition-all duration-350 ease-in-out overflow-hidden ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-neutral-700 font-normal leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* [NEW SECTION] 5.1 INSTAGRAM COMMUNITY FEED (Inspired by Image 1) */}
      <section id="instagram" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-16">
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-[1.1]">
                Suivez nos aventures <br />
                sur Instagram
              </h2>
            </div>
            <div className="md:col-span-4 flex flex-col items-start gap-4">
              <p className="text-neutral-700 text-xs md:text-sm leading-relaxed max-w-sm">
                Chaque week-end, nos randonneurs partagent leurs découvertes. Rejoins la communauté pour ne rien manquer.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-950 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
              >
                <span>Instagram</span>
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Instagram Images 4-column feed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src="/journey_mountain.png"
                alt="Randonneurs sur la crête"
                fill
                className="object-cover"
                sizes="(max-w-7xl) 280px"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src="/journey_river.png"
                alt="Val sauvage aux fleurs"
                fill
                className="object-cover"
                sizes="(max-w-7xl) 280px"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src="/tent_forest.png"
                alt="Cozy camping sous la tente"
                fill
                className="object-cover"
                sizes="(max-w-7xl) 280px"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src="/forest_lake.png"
                alt="Lac et forêt brumeuse"
                fill
                className="object-cover"
                sizes="(max-w-7xl) 280px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER & CLOSING CTA BANNER (Redesigned with full-bleed mountain landscape) */}
      <section id="footer-cta" className="relative w-full bg-neutral-50 pt-20 pb-12 overflow-hidden flex flex-col justify-end min-h-[540px] md:min-h-[600px]">
        {/* Background image covering full bleed */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/neve_hero_bg_misty.jpg"
            alt="Route de montagne sinueuse et sapins dans la brume"
            fill
            quality={95}
            className="object-cover object-bottom"
            sizes="100vw"
            priority
          />
          {/* Double gradient overlay: fades sky/mist to neutral-50 at top, adds dark tint behind text, and fades landscape to dark zinc at bottom */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, 
                var(--color-neutral-50) 0%, 
                var(--color-neutral-50) 15%, 
                rgba(250, 250, 250, 0.8) 25%, 
                rgba(250, 250, 250, 0) 45%
              ), linear-gradient(to top, 
                rgba(9, 9, 11, 0.95) 0%, 
                rgba(9, 9, 11, 0.6) 35%, 
                rgba(9, 9, 11, 0.35) 65%, 
                rgba(9, 9, 11, 0.15) 100%
              )`
            }}
          />
        </div>

        {/* Content overlay - shifted down to the bottom-middle for maximum readability */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center justify-end flex-1 pb-6 mt-12">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 leading-[1.08] max-w-5xl"
            style={{ textShadow: '0 2px 14px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
          >
            Ta prochaine rando sans voiture <br />
            <span>commence ici.</span>
          </h2>

          <p
            className="text-white/95 text-xs sm:text-sm md:text-base mb-8 max-w-xl mx-auto font-normal leading-relaxed"
            style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.9)' }}
          >
            Crée ton compte en 30 secondes et découvre les meilleurs sentiers accessibles en train depuis Paris.
          </p>

          {/* Download Buttons -> Signup CTA */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                window.location.href = "/signup";
              }}
              className="bg-primary-50 hover:bg-primary-100 text-primary-900 font-bold text-xs tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
            >
              Inscrivez-vous gratuitement
            </button>

            <span
              className="text-xs font-bold text-white/75 uppercase tracking-wider mt-2"
              style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)' }}
            >
              Inscription 100% gratuite
            </span>
          </div>

          {/* Vertical thin white line inspired by screenshot */}
          <div className="w-[1px] h-16 bg-white/20 mt-10 animate-pulse"></div>
        </div>

        {/* Footer copyright and legal links area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full border-t border-white/10 pt-8 mt-auto">
          <footer className="flex flex-col md:flex-row items-center justify-between gap-6 text-white/70">
            <div className="flex items-center gap-3">
              <CustomMountainLogo className="w-6 h-6 text-white" />
              <span className="text-sm font-bold uppercase tracking-wider text-white">NÉVÉ</span>
            </div>

            <p className="text-xs order-last md:order-none">
              &copy; {new Date().getFullYear()} Névé Randonnées. Tous droits réservés.
            </p>

            <div className="flex gap-6 text-xs font-semibold">
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded px-1">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded px-1">Mentions légales</a>
            </div>
          </footer>
        </div>
      </section>

      {/* --- CONCEPT EXPLAINER MODAL (40s Video simulated placeholder) --- */}
      {conceptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 text-white w-full max-w-xl p-6 md:p-8 rounded-3xl relative shadow-2xl">
            <button
              onClick={() => setConceptModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded-full p-1"
              aria-label="Fermer"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">Le concept Névé</span>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mt-1">
                Comment ça marche ?
              </h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white shrink-0">1</div>
                <div>
                  <strong className="text-white font-semibold block">Vous choisissez votre rayon de temps</strong>
                  Vous ajustez le curseur selon votre temps de trajet maximum toléré en train.
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white shrink-0">2</div>
                <div>
                  <strong className="text-white font-semibold block">Névé croise la météo et la SNCF</strong>
                  Notre algorithme élimine les zones pluvieuses et sélectionne les randonnées dont la gare d'arrivée a un train retour optimal dans l'après-midi.
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white shrink-0">3</div>
                <div>
                  <strong className="text-white font-semibold block">Vous marchez avec l'esprit serein</strong>
                  Sur le terrain, l'application vous géolocalise et vous alerte si vous perdez le rythme pour attraper le train choisi. Pas d'horaires à mémoriser.
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setConceptModalOpen(false)}
                className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
              >
                Compris, fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- BOOK ON TRAINLINE SIGNUP MODAL --- */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4">
          <div className="bg-white border border-neutral-200/50 text-neutral-900 w-full max-w-md p-8 md:p-10 rounded-[32px] relative shadow-2xl overflow-hidden animate-scale-up">
            <button
              onClick={() => setBookModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded-full p-1 cursor-pointer"
              aria-label="Fermer"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {!bookRegistered ? (
              <>
                <div className="mb-6 text-center sm:text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700">
                    INSCRIPTION GRATUITE
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                    Inscrivez-vous gratuitement
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 font-normal leading-relaxed">
                    30 secondes pour accéder à tous les sentiers, réserver tes billets et randonner l'esprit léger.
                  </p>
                </div>

                <form onSubmit={handleBookSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="book-name" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      id="book-name"
                      name="name"
                      placeholder="Ex: Rémi Dupont"
                      value={bookForm.name}
                      onChange={handleBookInputChange}
                      className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                      aria-invalid={bookErrors.name ? "true" : "false"}
                      aria-describedby={bookErrors.name ? "book-name-error" : undefined}
                    />
                    {bookErrors.name && (
                      <p id="book-name-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                        {bookErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email address */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="book-email" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                      Adresse E-mail
                    </label>
                    <input
                      type="email"
                      id="book-email"
                      name="email"
                      placeholder="remi.dupont@gmail.com"
                      value={bookForm.email}
                      onChange={handleBookInputChange}
                      className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                      aria-invalid={bookErrors.email ? "true" : "false"}
                      aria-describedby={bookErrors.email ? "book-email-error" : undefined}
                    />
                    {bookErrors.email && (
                      <p id="book-email-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                        {bookErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="book-password" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="book-password"
                      name="password"
                      placeholder="Au moins 8 caractères"
                      value={bookForm.password}
                      onChange={handleBookInputChange}
                      className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                      aria-invalid={bookErrors.password ? "true" : "false"}
                      aria-describedby={bookErrors.password ? "book-password-error" : undefined}
                    />
                    {bookErrors.password && (
                      <p id="book-password-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                        {bookErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-start gap-3 mt-2">
                      <input
                        type="checkbox"
                        id="book-terms"
                        name="terms"
                        checked={bookForm.terms}
                        onChange={handleBookInputChange}
                        className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-700 cursor-pointer"
                        aria-invalid={bookErrors.terms ? "true" : "false"}
                        aria-describedby={bookErrors.terms ? "book-terms-error" : undefined}
                      />
                      <label htmlFor="book-terms" className="text-xs text-neutral-600 leading-normal cursor-pointer select-none font-normal">
                        J'accepte les conditions générales d'utilisation de Névé et la politique de confidentialité.
                      </label>
                    </div>
                    {bookErrors.terms && (
                      <p id="book-terms-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                        {bookErrors.terms}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md shadow-primary-950/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 mt-4 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Inscrivez-vous gratuitement
                  </button>
                </form>
              </>
            ) : (
              /* Success View inside Booking Modal */
              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 mx-auto text-2xl shadow-sm">
                  ✓
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-primary-700">
                    INSCRIPTION RÉUSSIE
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
                    Bienvenue sur Névé !
                  </h3>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    Votre compte a été créé. Pour finaliser votre voyage sur Trainline, accéder à vos billets et suivre votre itinéraire de rando en direct, téléchargez l'application mobile.
                  </p>
                </div>

                {/* Download CTA buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookDownloadMsg("L'application iOS sera disponible très bientôt sur l'App Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                    className="w-full py-3.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <FaApple className="w-4 h-4" />
                    <span>Télécharger sur l'App Store</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookDownloadMsg("L'application Android sera disponible très bientôt sur le Google Play Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                    className="w-full py-3.5 bg-white border border-primary-200 hover:bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <IoLogoGooglePlaystore className="w-4 h-4" />
                    <span>Télécharger sur Google Play</span>
                  </button>

                  {bookDownloadMsg && (
                    <p className="text-xs font-semibold text-primary-700 mt-3 p-3 bg-primary-50 border border-primary-200/50 rounded-2xl leading-relaxed animate-fade-in text-left">
                      {bookDownloadMsg}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-200/50">
                  <button
                    type="button"
                    onClick={() => setBookModalOpen(false)}
                    className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    Retourner au trajet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

