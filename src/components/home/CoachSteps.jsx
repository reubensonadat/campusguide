import React from 'react';
import { CustomHome, CustomCoach, CustomSafetyCheck, CustomCustomize, CustomProfile } from '../common/CustomIcons';

export const HOME_COACH_STEPS = [
  {
    icon: <CustomHome size={24} />,
    title: 'Welcome to your Hub!',
    description: 'Your home screen is your main campus cockpit. View class alerts, quick actions, and widget grids.'
  },
  {
    icon: <CustomCoach size={24} />,
    title: 'Timetable Classes',
    description: "Instantly view today's lecture schedule and locations, with real-time countdown alerts for your classes."
  },
  {
    icon: <CustomSafetyCheck size={24} />,
    title: "Today's Tasks & Sync",
    description: "Manage your daily todo checklist directly on your homepage to stay on top of study sessions and projects."
  },
  {
    icon: <CustomCustomize size={24} />,
    title: "Customize Your Home",
    description: "Personalize your home screen with customizable widgets! Add dad jokes, fun facts, forex rates, and more from your Profile settings."
  },
  {
    icon: <CustomProfile size={24} />,
    title: "Profile Digital ID",
    description: "Tap your digital student card to update your credentials, set up cloud backups, and configure widget visibility."
  }
];
