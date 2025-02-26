
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TutorialStep {
  title: string;
  description: string;
  targetElement?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to User Management System",
    description: "Let's take a quick tour of the system's key features. We'll show you how to get started.",
  },
  {
    title: "Select Your Business Type",
    description: "First, choose your business type from the available options. This will determine the roles and features available to you.",
    targetElement: "business-type-selector"
  },
  {
    title: "View Available Roles",
    description: "After selecting a business type, you'll see the available roles and their permissions.",
    targetElement: "role-display"
  },
  {
    title: "Login or Sign Up",
    description: "Use the login button to access your account. You can use the demo credentials to try out different roles.",
    targetElement: "login-button"
  },
];

export default function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen the tutorial
    const tutorialSeen = localStorage.getItem('tutorialSeen');
    if (!tutorialSeen) {
      setIsOpen(true);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (tutorialSteps[currentStep + 1].targetElement) {
        highlightElement(tutorialSteps[currentStep + 1].targetElement!);
      }
    } else {
      completeTutorial();
    }
  };

  const handleSkip = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    localStorage.setItem('tutorialSeen', 'true');
    setHasSeenTutorial(true);
    setIsOpen(false);
    removeHighlight();
  };

  const highlightElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const removeHighlight = () => {
    document.querySelectorAll('.ring-2').forEach(element => {
      element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
    });
  };

  const currentTutorialStep = tutorialSteps[currentStep];

  if (hasSeenTutorial) {
    return (
      <Button 
        variant="outline" 
        className="fixed bottom-4 right-4"
        onClick={() => {
          setCurrentStep(0);
          setIsOpen(true);
          setHasSeenTutorial(false);
        }}
      >
        Show Tutorial
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{currentTutorialStep.title}</DialogTitle>
          <DialogDescription>
            {currentTutorialStep.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="secondary" onClick={handleSkip}>
            Skip Tutorial
          </Button>
          <Button onClick={handleNext}>
            {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
