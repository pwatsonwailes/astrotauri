import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { 
  Map, 
  Users, 
  Radio, 
  Clipboard, 
  ShoppingBag, 
  Clock, 
  ArrowRight, 
  Shield, 
  Cpu, 
  Zap, 
  Package, 
  ChevronRight
} from 'lucide-react';

const tutorialSteps = [
  {
    title: "Welcome to The Prospector",
    content: "You're now in command of your own ship. This tutorial will guide you through the basics of gameplay.",
    icon: <Map className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Ship Hub Interface",
    content: "The Ship Hub is your command center. From here, you can navigate to different areas of your ship, manage resources, and make strategic decisions.",
    icon: <Map className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Ship Locations",
    content: "Use the tabs at the top to navigate between different ship locations. Each location offers unique functions:",
    details: [
      { icon: <Map className="w-5 h-5 text-blue-600" />, name: "Mission Control", desc: "Browse and accept available missions" },
      { icon: <Users className="w-5 h-5 text-green-600" />, name: "Crew Quarters", desc: "Interact with your crew members" },
      { icon: <Radio className="w-5 h-5 text-purple-600" />, name: "Communications", desc: "Trade resources and gather intelligence" },
      { icon: <Clipboard className="w-5 h-5 text-amber-600" />, name: "Engineering", desc: "Craft upgrades and tools" },
      { icon: <ShoppingBag className="w-5 h-5 text-slate-600" />, name: "Market", desc: "Buy and sell items" }
    ],
    icon: <Map className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Resources & Turns",
    content: "Keep track of your resources at the top of the screen. Each turn represents time passing in the game world.",
    details: [
      { icon: <div className="w-3 h-3 rounded-full bg-amber-500"></div>, name: "Credits", desc: "Currency for purchases" },
      { icon: <div className="w-3 h-3 rounded-full bg-slate-500"></div>, name: "Materials", desc: "Used for crafting and repairs" },
      { icon: <div className="w-3 h-3 rounded-full bg-blue-500"></div>, name: "Tech", desc: "Advanced components for upgrades" },
      { icon: <div className="w-3 h-3 rounded-full bg-purple-500"></div>, name: "Influence", desc: "Your reputation and connections" },
      { icon: <Clock className="w-3 h-3 text-amber-800" />, name: "Turn Counter", desc: "Progress missions and manufacturing" }
    ],
    icon: <Clock className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Mission Types",
    content: "Missions are the primary way to earn resources. Each type requires different skills:",
    details: [
      { icon: <Cpu className="w-5 h-5 text-blue-600" />, name: "Technical", desc: "Requires technical expertise" },
      { icon: <Users className="w-5 h-5 text-green-600" />, name: "Diplomatic", desc: "Tests your negotiation skills" },
      { icon: <Shield className="w-5 h-5 text-red-600" />, name: "Combat", desc: "Challenges your risk tolerance" },
      { icon: <Zap className="w-5 h-5 text-purple-600" />, name: "Strategic", desc: "Tests your strategic intelligence" }
    ],
    icon: <Shield className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Inventory & Crafting",
    content: "Collect items from missions and craft new tools to improve your chances of success. Engineering allows you to manufacture upgrades over several turns.",
    icon: <Package className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Game Loop",
    content: "The basic gameplay loop consists of:",
    details: [
      { name: "1. Accept Missions", desc: "Choose missions that match your character's strengths" },
      { name: "2. Make Decisions", desc: "During missions, make choices that affect your success" },
      { name: "3. Manage Resources", desc: "Spend resources wisely on upgrades and trades" },
      { name: "4. Advance Turns", desc: "Progress time to complete missions and manufacturing" },
      { name: "5. Talk to Crew", desc: "Learn more about the story and get valuable advice" }
    ],
    icon: <ArrowRight className="w-12 h-12 text-orange-600" />
  },
  {
    title: "Ready to Begin",
    content: "You're now ready to command The Prospector! Remember, your character's background and alignment will influence your effectiveness in different situations.",
    icon: <Map className="w-12 h-12 text-orange-600" />
  }
];

export const TutorialScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setScreen } = useGameStore();
  const { playSound } = useSoundSystem();
  
  const handleNext = () => {
    playSound('navigation');
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial complete, go to ship hub
      setScreen('ship-hub');
    }
  };
  
  const handleSkip = () => {
    playSound('navigation');
    setScreen('ship-hub');
  };
  
  const step = tutorialSteps[currentStep];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-amber-50 text-slate-800 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1">
          <div 
            className="bg-orange-500 h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-orange-100 p-3 rounded-full">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{step.title}</h2>
          </div>
          
          <p className="text-slate-600 mb-6 text-lg">{step.content}</p>
          
          {step.details && (
            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
              <ul className="space-y-3">
                {step.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    {detail.icon && (
                      <div className="mt-1 mr-3 flex-shrink-0">
                        {detail.icon}
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-slate-800">{detail.name}</span>
                      <span className="mx-2 text-slate-400">•</span>
                      <span className="text-slate-600">{detail.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-slate-600 hover:text-orange-600 transition-colors text-sm font-medium"
            >
              Skip Tutorial
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
            >
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              ) : (
                'Start Game'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};