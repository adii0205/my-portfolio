/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { LiquidBackground } from './components/LiquidBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackMarquee } from './components/TechStackMarquee';
import { ProjectsSection } from './components/ProjectsSection';
import { ThreeQuantGame } from './components/ThreeQuantGame';
import { GitHubReposSection } from './components/GitHubReposSection';
import { InteractiveQuantLab } from './components/InteractiveQuantLab';
import { InteractiveForensicLab } from './components/InteractiveForensicLab';
import { InteractiveDistributedLab } from './components/InteractiveDistributedLab';
import { SkillMatrix } from './components/SkillMatrix';
import { AchievementsSection } from './components/AchievementsSection';
import { BioSection } from './components/BioSection';
import { Footer } from './components/Footer';
import { IOSDock } from './components/IOSDock';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const handleJumpToLab = (labId: string) => {
    const el = document.getElementById(labId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Background Liquid Glass Canvas */}
      <LiquidBackground />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        <main className="flex-1 pb-28 sm:pb-32">
          {/* Hero Section with 3D Tilt Liquid Glass Portrait */}
          <Hero
            onOpenContact={() => setIsContactOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Continuous Slowly Moving Tech Stack Stream */}
          <TechStackMarquee />

          {/* Curated Projects Bento Section */}
          <ProjectsSection onSelectProject={setSelectedProject} />

          {/* Interactive Three.js 3D WebGL Arcade & Hedging Game */}
          <ThreeQuantGame />

          {/* Scanned GitHub Repositories for @adii0205 */}
          <GitHubReposSection />

          {/* Flagship Interactive Prototype 1: QuantRisk WebGL Monte Carlo Engine */}
          <InteractiveQuantLab />

          {/* Flagship Interactive Prototype 2: Distributed High-Concurrency Systems Lab */}
          <InteractiveDistributedLab />

          {/* Flagship Interactive Prototype 3: Forensic Deepfake Inspector */}
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <InteractiveForensicLab />
          </div>

          {/* Technical Skills & Mathematical Foundations */}
          <SkillMatrix />

          {/* Competitive Achievements */}
          <AchievementsSection />

          {/* Bio & Academic Background */}
          <BioSection
            onOpenContact={() => setIsContactOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </main>

        {/* Quiet Footer */}
        <Footer
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* iOS Floating Liquid Glass Dock */}
        <IOSDock
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
        />
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onJumpToLab={handleJumpToLab}
      />

      {/* Spotlight Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={setSelectedProject}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Contact & Inquiries Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
