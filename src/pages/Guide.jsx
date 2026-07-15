import React from 'react';
import CampusMap from '../components/guide/CampusMap';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import { CustomGuide, CustomEyes, CustomRoute, CustomNavigation } from '../components/common/CustomIcons';

const Guide = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🗺️ CAMPUS MAP COMPONENT */}
      <CampusMap />

      {/* 🧭 Coach Marks Walkthrough */}
      <CoachMarksOverlay
        storageKey="ucc_coach_map"
        steps={MAP_COACH_STEPS}
      />
    </div>
  );
};

const MAP_COACH_STEPS = [
  {
    icon: <CustomGuide size={24} />,
    title: 'Interactive Campus Map',
    description: 'Explore campus with our custom interactive campus map. Search for lecture halls, offices, and study squares.'
  },
  {
    icon: <CustomEyes size={24} />,
    title: 'Quick Search & Filters',
    description: 'Filter by lecture theatres, banks, ATMs, or hostels to find exactly what you need in seconds.'
  },
  {
    icon: <CustomRoute size={24} />,
    title: 'Transit & Shuttle Paths',
    description: 'Overlay colored line paths representing transit routes to plan your campus commute.'
  },
  {
    icon: <CustomNavigation size={24} />,
    title: 'Landmark Details',
    description: 'Tap on map landmarks or buildings to view schedules, departments, and accessibility info.'
  }
];

export default Guide;
