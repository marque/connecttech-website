"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface Fireball {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

interface Warning {
  id: number;
  x: number;
  y: number;
  timeLeft: number;
  direction: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

export default function Home() {
  const [autoScroll, setAutoScroll] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoScroll) {
      const scroll = () => {
        window.scrollBy(0, 2);
        if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.scrollHeight - 2) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        autoScrollRef.current = requestAnimationFrame(scroll);
      };
      autoScrollRef.current = requestAnimationFrame(scroll);
    } else {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    }
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [autoScroll]);

  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 85 });
  const [fireballs, setFireballs] = useState<Fireball[]>([]);
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Runner game state (T-rex game)
  const [showRunnerGame, setShowRunnerGame] = useState(false);
  const [runnerScore, setRunnerScore] = useState(0);
  const [runnerHighScore, setRunnerHighScore] = useState(0);
  const [runnerActive, setRunnerActive] = useState(false);
  const [runnerGameOver, setRunnerGameOver] = useState(false);
  const [robotY, setRobotY] = useState(0);
  const [robotRotation, setRobotRotation] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [spikes, setSpikes] = useState<{ id: number; x: number; type: "single" | "double" }[]>([]);
  const runnerRef = useRef<HTMLDivElement>(null);
  const robotYRef = useRef(0);
  const spikeIdRef = useRef(0);
  const runnerScoreRef = useRef(0);
  const fireballIdRef = useRef(0);
  const warningIdRef = useRef(0);
  const robotPositionRef = useRef({ x: 50, y: 85 });
  const gameScoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const pendingFireballsRef = useRef<Fireball[]>([]);

  const startGame = () => {
    setGameScore(0);
    gameScoreRef.current = 0;
    setGameActive(true);
    setGameOver(false);
    setRobotPosition({ x: 50, y: 85 });
    robotPositionRef.current = { x: 50, y: 85 };
    setFireballs([]);
    setWarnings([]);
    fireballIdRef.current = 0;
    warningIdRef.current = 0;
    gameRef.current?.focus();
  };

  const closeGame = () => {
    setShowGame(false);
    setGameActive(false);
    setGameScore(0);
    setFireballs([]);
    setWarnings([]);
    setGameOver(false);
  };

  // Runner game functions
  const startRunnerGame = () => {
    setRunnerScore(0);
    runnerScoreRef.current = 0;
    setRunnerActive(true);
    setRunnerGameOver(false);
    setRobotY(0);
    setRobotRotation(0);
    robotYRef.current = 0;
    setIsJumping(false);
    setSpikes([]);
    spikeIdRef.current = 0;
    runnerRef.current?.focus();
  };

  const closeRunnerGame = () => {
    setShowRunnerGame(false);
    setRunnerActive(false);
    setRunnerScore(0);
    setSpikes([]);
    setRunnerGameOver(false);
  };

  const jump = useCallback(() => {
    if (!runnerActive || isJumping) return;
    setIsJumping(true);
    let velocity = 14;
    let jumpHeight = 0;
    let rotation = 0;
    const gravity = 0.8;

    const jumpLoop = setInterval(() => {
      velocity -= gravity;
      jumpHeight += velocity;
      rotation += 8;

      if (jumpHeight <= 0) {
        jumpHeight = 0;
        rotation = 0;
        robotYRef.current = 0;
        setRobotY(0);
        setRobotRotation(0);
        setIsJumping(false);
        clearInterval(jumpLoop);
      } else {
        robotYRef.current = jumpHeight;
        setRobotY(jumpHeight);
        setRobotRotation(rotation);
      }
    }, 16);
  }, [runnerActive, isJumping]);

  // Runner game keyboard controls
  useEffect(() => {
    if (!showRunnerGame) return;
    const handleRunnerKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleRunnerKey);
    return () => window.removeEventListener("keydown", handleRunnerKey);
  }, [showRunnerGame, jump]);

  // Spawn spikes
  useEffect(() => {
    if (!runnerActive) return;
    const spawnInterval = setInterval(() => {
      const shouldSpawn = Math.random() < 0.35;
      if (shouldSpawn) {
        setSpikes((prev) => {
          if (prev.length > 0 && prev[prev.length - 1].x > 75) return prev;
          const type = Math.random() < 0.5 ? "single" : "double";
          return [...prev, { id: spikeIdRef.current++, x: 105, type }];
        });
      }
    }, 1000);
    return () => clearInterval(spawnInterval);
  }, [runnerActive]);

  // Move spikes and check collision
  useEffect(() => {
    if (!runnerActive) return;
    const gameLoop = setInterval(() => {
      const speed = 1.5 + runnerScoreRef.current * 0.003;

      setSpikes((prev) => {
        const updated = prev
          .map((s) => ({ ...s, x: s.x - speed }))
          .filter((s) => s.x > -20);

        // Check collision (robot is at x=10%, ground level)
        for (const spike of updated) {
          const robotLeft = 7;
          const robotRight = 15;
          const spikeWidth = spike.type === "double" ? 12 : 6;
          const spikeLeft = spike.x - 2;
          const spikeRight = spike.x + spikeWidth;

          if (robotRight > spikeLeft && robotLeft < spikeRight) {
            if (robotYRef.current < 50) {
              setRunnerActive(false);
              setRunnerGameOver(true);
              if (runnerScoreRef.current > runnerHighScore) {
                setRunnerHighScore(runnerScoreRef.current);
              }
              return [];
            }
          }
        }
        return updated;
      });
      runnerScoreRef.current += 1;
      setRunnerScore(runnerScoreRef.current);
    }, 30);
    return () => clearInterval(gameLoop);
  }, [runnerActive, runnerHighScore]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameActive) return;
    const step = 5;
    setRobotPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      if (e.key === "ArrowLeft" || e.key === "a") newX = Math.max(5, prev.x - step);
      if (e.key === "ArrowRight" || e.key === "d") newX = Math.min(95, prev.x + step);
      if (e.key === "ArrowUp" || e.key === "w") newY = Math.max(5, prev.y - step);
      if (e.key === "ArrowDown" || e.key === "s") newY = Math.min(95, prev.y + step);
      robotPositionRef.current = { x: newX, y: newY };
      return { x: newX, y: newY };
    });
  }, [gameActive]);

  // Keyboard controls
  useEffect(() => {
    if (showGame) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showGame, handleKeyDown]);

  // Spawn warnings (which become fireballs) - keep 4-10 on screen
  useEffect(() => {
    if (!gameActive) return;
    const spawnInterval = setInterval(() => {
      setFireballs((currentFireballs) => {
        setWarnings((currentWarnings) => {
          const totalOnScreen = currentFireballs.length + currentWarnings.length;
          const maxFireballs = Math.min(4 + Math.floor(gameScoreRef.current / 150), 15);

          if (totalOnScreen < maxFireballs) {
            const directions: Array<"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"> = [
              "top", "top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight"
            ];
            const direction = directions[Math.floor(Math.random() * directions.length)];

            let x: number, y: number;
            if (direction === "top") {
              x = Math.random() * 85 + 7.5;
              y = 0;
            } else if (direction === "left") {
              x = 0;
              y = Math.random() * 70 + 15;
            } else if (direction === "right") {
              x = 100;
              y = Math.random() * 70 + 15;
            } else if (direction === "bottom") {
              x = Math.random() * 85 + 7.5;
              y = 100;
            } else if (direction === "topLeft") {
              x = 0;
              y = 0;
            } else if (direction === "topRight") {
              x = 100;
              y = 0;
            } else if (direction === "bottomLeft") {
              x = 0;
              y = 100;
            } else {
              // bottomRight
              x = 100;
              y = 100;
            }

            // Check if too close to existing warnings
            const tooClose = currentWarnings.some((w) => {
              if (w.direction !== direction) return false;
              if (direction === "top" || direction === "bottom") {
                return Math.abs(w.x - x) < 15;
              } else if (direction === "left" || direction === "right") {
                return Math.abs(w.y - y) < 15;
              } else {
                // Diagonal directions - check both x and y
                return Math.abs(w.x - x) < 15 && Math.abs(w.y - y) < 15;
              }
            });

            if (!tooClose) {
              return [...currentWarnings, {
                id: warningIdRef.current++,
                x,
                y,
                timeLeft: 25,
                direction,
              }];
            }
          }
          return currentWarnings;
        });
        return currentFireballs;
      });
    }, 150);
    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  // Process warnings and spawn fireballs
  useEffect(() => {
    if (!gameActive) return;
    const warningLoop = setInterval(() => {
      setWarnings((prev) => {
        const stillWarning: Warning[] = [];
        const toAdd: Fireball[] = [];

        prev.forEach((w) => {
          if (w.timeLeft <= 1) {
            // Convert warning to fireball
            let startX = w.x;
            let startY = w.y;
            if (w.direction === "top") {
              startY = -5;
            } else if (w.direction === "left") {
              startX = -5;
            } else if (w.direction === "right") {
              startX = 105;
            } else if (w.direction === "bottom") {
              startY = 105;
            } else if (w.direction === "topLeft") {
              startX = -5;
              startY = -5;
            } else if (w.direction === "topRight") {
              startX = 105;
              startY = -5;
            } else if (w.direction === "bottomLeft") {
              startX = -5;
              startY = 105;
            } else {
              // bottomRight
              startX = 105;
              startY = 105;
            }

            toAdd.push({
              id: fireballIdRef.current++,
              x: startX,
              y: startY,
              speed: 2.5 + Math.random() * 2 + gameScoreRef.current * 0.005,
              direction: w.direction,
            });
          } else {
            stillWarning.push({ ...w, timeLeft: w.timeLeft - 1 });
          }
        });

        // Queue fireballs to be added
        if (toAdd.length > 0) {
          pendingFireballsRef.current = [...pendingFireballsRef.current, ...toAdd];
        }

        return stillWarning;
      });

      // Add pending fireballs
      if (pendingFireballsRef.current.length > 0) {
        const toAdd = pendingFireballsRef.current;
        pendingFireballsRef.current = [];
        setFireballs((f) => [...f, ...toAdd]);
      }
    }, 50);
    return () => clearInterval(warningLoop);
  }, [gameActive]);

  // Move fireballs and check collisions
  useEffect(() => {
    if (!gameActive) return;
    const gameLoop = setInterval(() => {
      setFireballs((prev) => {
        const updated = prev
          .map((fb) => {
            const diagSpeed = fb.speed * 0.5; // Slower diagonal speed to prevent skipping
            if (fb.direction === "top") {
              return { ...fb, y: fb.y + fb.speed };
            } else if (fb.direction === "left") {
              return { ...fb, x: fb.x + fb.speed };
            } else if (fb.direction === "right") {
              return { ...fb, x: fb.x - fb.speed };
            } else if (fb.direction === "bottom") {
              return { ...fb, y: fb.y - fb.speed };
            } else if (fb.direction === "topLeft") {
              return { ...fb, x: fb.x + diagSpeed, y: fb.y + diagSpeed };
            } else if (fb.direction === "topRight") {
              return { ...fb, x: fb.x - diagSpeed, y: fb.y + diagSpeed };
            } else if (fb.direction === "bottomLeft") {
              return { ...fb, x: fb.x + diagSpeed, y: fb.y - diagSpeed };
            } else {
              // bottomRight
              return { ...fb, x: fb.x - diagSpeed, y: fb.y - diagSpeed };
            }
          })
          .filter((fb) => fb.y < 110 && fb.y > -10 && fb.x > -10 && fb.x < 110);

        // Check collision using ref
        for (const fb of updated) {
          const dx = Math.abs(fb.x - robotPositionRef.current.x);
          const dy = Math.abs(fb.y - robotPositionRef.current.y);
          // Larger hitbox for diagonal boulders since they move in both directions
          const isDiagonal = ["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(fb.direction);
          const hitboxSize = isDiagonal ? 10 : 8;
          if (dx < hitboxSize && dy < hitboxSize) {
            setGameActive(false);
            setGameOver(true);
            if (gameScoreRef.current > highScoreRef.current) {
              highScoreRef.current = gameScoreRef.current;
              setHighScore(gameScoreRef.current);
            }
            return [];
          }
        }
        return updated;
      });
      gameScoreRef.current += 1;
      setGameScore(gameScoreRef.current);
    }, 50);
    return () => clearInterval(gameLoop);
  }, [gameActive]);

  const teamMembers = [
    { name: "Luke LIDAR", coreValue: "Discovery", image: "/images/img_58_1.jpeg", description: "I think that discovery is the most important core value because it's at the root of FLL. It's really the true purpose of FLL and why it was created. Discovery talks about figuring out something new and learning and in my opinion that is really what FLL is all about. Learning is something we do every practice and it allows us to adapt to change to innovate. Without discovery we would keep doing the same thing over and over again without thinking about or changing. To discover is the most important of all of them — it's what allows us to do anything." },
    { name: "Grace Grid", coreValue: "Innovation", image: "/images/img_56_1.jpeg", description: "I think that innovation is the most important core value because innovation helps you, not just now but in the future. It helps you become a more creative by making you think more creatively, which will lead to you being a better version of yourself, not just during practice but also in your everyday life. Innovation also helps you become more persistent by allowing you to keep thinking of better ideas. That's why I think innovation is the most meaningful core value." },
    { name: "Salima Sand", coreValue: "Impact", image: "/images/img_55_1.jpeg", description: "I think my favorite core value is impact because it goes beyond just building robots or creating ideas. The goal of FLL is to make a lasting difference, not only in the challenge but in the real world. The skills we learn and the changes we create can help people and inspire others. That's why I think impact is the most meaningful core value." },
    { name: "Sarina Stone", coreValue: "Inclusion", image: "/images/img_57_1.jpeg", description: "Because inclusion gives everyone a chance to take part in things they might not usually do. For example, someone who isn't confident in coding might get to try it, or someone who doesn't think they're innovative can use their creativity and presentation skills. It also helps people who are usually quieter feel comfortable speaking up and sharing their ideas. Inclusion means making sure everyone feels valued and has a voice." },
    { name: "Naya Natural", coreValue: "Teamwork", image: "/images/img_62_1.jpeg", description: "I think that teamwork is the most important. I think this because you can achieve so much more when you are in a team. Teamwork helps everyone share their ideas, feel included and make tasks easier and more enjoyable. It also teaches people communication, trust and respect which are very important life skills." },
    { name: "Ivan Identify", coreValue: "Fun", image: "/images/img_59_1.jpeg", description: "Fun is the best core value because having fun is very important for a good mental health. You can achieve much more if you are having fun while working. And having fun is a core part of what makes first. Without fun, no one would do first because they don't have fun." },
    { name: "Andrew Artifact", coreValue: "Impact", image: "/images/img_60_1.jpeg", description: "I think that impact is the most important core value in FLL because at the root of FLL, the main purpose is to find a solution that will solve a problem in the world that is related to the theme. People on FLL teams can connect with each other and learn key skills for their future, like public speaking and presentation skills." },
    { name: "Eric Excavate", coreValue: "Innovation", image: "/images/img_61_1.jpeg", description: "I think that innovation is the most important core value because it's about creativity and finding new ways to solve problems, something all FLL teams need. Innovation helps us think outside the box, and coming up with new ideas that can make a difference." },
  ];

  const robotAttachments = [
    { name: "The Snake", image: "/images/the-snake.png" },
    { name: "The Scorpion", image: "/images/the-scorpion.png" },
    { name: "Lionel Meshi", image: "/images/lionel-meshi.png" },
    { name: "The Thwacker", image: "/images/the-thwacker.png" },
    { name: "The T-rex", image: "" },
  ];

  const coreValues = [
    { name: "Discovery", image: "/images/img_51_1.jpeg", description: "We explore new skills and ideas" },
    { name: "Innovation", image: "/images/img_51_6.jpeg", description: "We use creativity and persistence to solve problems" },
    { name: "Impact", image: "/images/img_51_2.jpeg", description: "We apply what we learn to improve our world" },
    { name: "Inclusion", image: "/images/img_51_5.jpeg", description: "We respect each other and embrace our differences" },
    { name: "Teamwork", image: "/images/img_51_3.jpeg", description: "We are stronger when we work together" },
    { name: "Fun", image: "/images/img_51_4.jpeg", description: "We enjoy and celebrate what we do!" },
  ];

  const howItWorksSteps = [
    { step: 1, title: "Position", desc: "Place GridLock over your excavation site", image: "/images/img_26_1.jpeg" },
    { step: 2, title: "Level", desc: "Adjust telescoping legs to desired height with the bubble levels", image: "/images/img_27_1.jpeg" },
    { step: 3, title: "Activate", desc: "Turn on lasers to project grid lines", image: "/images/img_41_1.jpeg" },
    { step: 4, title: "Lock", desc: "Lock the stakes in the precise location", image: "/images/img_28_2.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl font-bold text-yellow-500">ConnecTech</span>
              <span className="text-sm text-gray-500">#27757</span>
            </a>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#innovation" className="text-gray-600 hover:text-yellow-500 transition">Innovation</a>
              <a href="#robot" className="text-gray-600 hover:text-yellow-500 transition">Robot</a>
              <a href="#core-values" className="text-gray-600 hover:text-yellow-500 transition">Core Values</a>
              <a href="#team" className="text-gray-600 hover:text-yellow-500 transition">Our Team</a>
              <a href="#fll-kickoff" className="text-gray-600 hover:text-yellow-500 transition">FLL Kickoff</a>
              <a href="#media" className="text-gray-600 hover:text-yellow-500 transition">Media</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-medium transition">Survey</a>
            </div>
            {/* Mobile Survey Button */}
            <div className="md:hidden">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-medium text-sm transition">Survey</a>
            </div>
          </div>
        </div>
        {/* Mobile Navigation Links */}
        <div className="md:hidden border-t border-gray-100 bg-white/95">
          <div className="flex overflow-x-auto gap-4 px-4 py-2 text-sm">
            <a href="#innovation" className="text-gray-600 whitespace-nowrap">Innovation</a>
            <a href="#robot" className="text-gray-600 whitespace-nowrap">Robot</a>
            <a href="#core-values" className="text-gray-600 whitespace-nowrap">Core Values</a>
            <a href="#team" className="text-gray-600 whitespace-nowrap">Our Team</a>
            <a href="#fll-kickoff" className="text-gray-600 whitespace-nowrap">FLL Kickoff</a>
            <a href="#media" className="text-gray-600 whitespace-nowrap">Media</a>
          </div>
        </div>
      </nav>

      {/* Entry Slide / Hero Section */}
      <section className="min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-50">
        <div className="max-w-5xl mx-auto text-center">
          {/* Team Logo/Badge */}
          <div className="mb-8">
            <div className="inline-block bg-yellow-400 text-black text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg">
              FIRST LEGO League Challenge 2025
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Image
                src="/images/logo.png"
                alt="ConnecTech Logo"
                width={160}
                height={160}
                className="rounded-xl shadow-lg"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-5xl sm:text-6xl font-bold text-yellow-500">ConnecTech</h1>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-700">#27757</p>
              </div>
            </div>
          </div>

          {/* Team Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 max-w-3xl mx-auto">
            <Image
              src="/images/img_11_1.jpeg"
              alt="ConnecTech Team"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Three Main Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a href="#innovation" className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                <path d="M12 2a7.5 7.5 0 00-3.5 14.1c.5.3.8.8.8 1.4v.5h5.4v-.5c0-.6.3-1.1.8-1.4A7.5 7.5 0 0012 2z" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5"/>
                <path d="M9 20h6M9.5 22h5" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 6v4M10 8h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Innovation</span>
            </a>
            <a href="#robot" className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                <rect x="5" y="9" width="14" height="10" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1.5"/>
                <rect x="8" y="4" width="8" height="6" rx="2" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5"/>
                <circle cx="10" cy="7" r="1" fill="#78350f"/>
                <circle cx="14" cy="7" r="1" fill="#78350f"/>
                <path d="M2 13h3M19 13h3" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 15h6" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 1v3" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="1" r="1" fill="#78350f"/>
              </svg>
              <span>Robot</span>
            </a>
            <a href="#core-values" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M12 7l1.5 3.05 3.37.49-2.44 2.37.58 3.35L12 14.4l-3.01 1.86.58-3.35-2.44-2.37 3.37-.49L12 7z" fill="#fff" opacity="0.6"/>
              </svg>
              <span>Core Values</span>
            </a>
          </div>
        </div>
      </section>

      {/* Innovation Section - GridLock Project */}
      <section id="innovation" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Season Challenge Statement */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-2 text-yellow-400">UNEARTHED™ Innovation Project</h2>
            <p className="text-2xl text-gray-300 mb-8">Dig, Explore and Discover</p>
            <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto border-2 border-yellow-400/30">
              <p className="text-xl text-gray-200">
                This UNEARTHED™ season, FIRST LEGO League Challenge teams are asked to identify a problem faced by archaeologists and propose an innovative solution that can help.
              </p>
            </div>
          </div>

          {/* GridLock Problem */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">The Problem</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Traditional archaeological gridding methods are slow, inaccurate, and require multiple workers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3">Time Consuming</h3>
              <p className="text-gray-400">
                Setting up excavation grids manually takes 20+ minutes with traditional methods using string and stakes.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Labor Intensive</h3>
              <p className="text-gray-400">
                Requires at least 2 people to set up, taking valuable team members away from actual excavation work.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-xl font-semibold mb-3">Accuracy Issues</h3>
              <p className="text-gray-400">
                Manual string measurements lead to inconsistent grid squares, affecting the precision of artifact documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/img_12_1.jpeg"
                alt="GridLock Product"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                $199.99
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Meet <span className="text-yellow-500">GridLock</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                GridLock is a portable, precision gridding tool that uses laser technology and
                adjustable legs to create perfect excavation grids in minutes, not hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5-Minute Setup</h4>
                    <p className="text-gray-600">1 person can set up a perfect grid in under 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Laser Precision</h4>
                    <p className="text-gray-600">4 integrated lasers project perfectly aligned grid lines</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fully Portable</h4>
                    <p className="text-gray-600">Lightweight aluminum frame with telescoping legs for any terrain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineered with precision and built for the field
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-yellow-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">4 Laser Emitters</h3>
              <p className="text-gray-600 text-sm">
                Project precise grid lines onto any surface for accurate excavation zones
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Bubble Levels</h3>
              <p className="text-gray-600 text-sm">
                Integrated levels ensure the frame is perfectly horizontal on uneven terrain
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Telescoping Legs</h3>
              <p className="text-gray-600 text-sm">
                Adjustable height legs adapt to any ground conditions and excavation depth
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Aluminum Frame</h3>
              <p className="text-gray-600 text-sm">
                Lightweight yet durable construction with 3D-printed precision brackets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Iteration Section */}
      <section id="iterations" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Design Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              7 iterations of continuous improvement led to the final GridLock design
            </p>
          </div>

          {/* Iteration Diagram */}
          <div className="mb-16">
            <Image
              src="/images/iteration-diagram.png"
              alt="GridLock Iteration Process - 7 versions from concept to final product"
              width={1400}
              height={600}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

          {/* Iteration Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_4_1.jpeg" alt="Cos(connect) brainstorming" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Cos(connect)</h4>
              <p className="text-gray-600 text-sm">Initial innovation concept before GridLock</p>
            </div>
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_3_1.jpeg" alt="GridLock idea development" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 2</div>
              <h4 className="font-semibold text-gray-900 mb-2">GridLock Idea</h4>
              <p className="text-gray-600 text-sm">The GridLock concept was born</p>
            </div>
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_25_1.jpeg" alt="PVC pipe prototype" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 3</div>
              <h4 className="font-semibold text-gray-900 mb-2">PVC Pipes</h4>
              <p className="text-gray-600 text-sm">Lightweight PVC frame for portability testing</p>
            </div>
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_12_1.jpeg" alt="Aluminum extrusion frame" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 4</div>
              <h4 className="font-semibold text-gray-900 mb-2">Aluminum Extrusion</h4>
              <p className="text-gray-600 text-sm">Professional aluminum frame construction</p>
            </div>
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_29_1.jpeg" alt="Second battery pack addition" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 5</div>
              <h4 className="font-semibold text-gray-900 mb-2">Second Battery Pack</h4>
              <p className="text-gray-600 text-sm">Added second battery pack for extended use</p>
            </div>
            <div className="bg-yellow-200 rounded-xl p-6 border-2 border-yellow-400">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image src="/images/img_27_1.jpeg" alt="Improved threading brackets" fill className="object-cover" />
              </div>
              <div className="text-yellow-800 font-bold text-sm mb-2">ITERATION 6</div>
              <h4 className="font-semibold text-gray-900 mb-2">Improved Threading</h4>
              <p className="text-gray-600 text-sm">Final refinements with improved threading</p>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to perfect excavation grids</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo QR Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">See GridLock in Action</h2>
              <p className="text-gray-300 text-lg max-w-md mb-6">
                Scan the QR code or click the button below to watch our product demonstration and see how GridLock transforms archaeological excavation.
              </p>
              <a
                href="https://www.canva.com/design/DAG5Q4r6r9Q/8X5hsn71hvVkfaZwmLVo_Q/watch?utm_content=DAG5Q4r6r9Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h9343d0f44d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold transition"
              >
                Watch Demo Video
              </a>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <Image
                src="/images/QR.png"
                alt="Product Demo QR Code"
                width={180}
                height={180}
                className="w-40 h-40 md:w-44 md:h-44"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Real Impact</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-yellow-600 mb-2">75%</div>
              <p className="text-gray-600">Time Savings on Grid Setup</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">1</div>
              <p className="text-gray-600">Person Instead of 2 Required</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">$40</div>
              <p className="text-gray-600">Materials Cost to Build</p>
            </div>
          </div>

          {/* Expert Testimonials */}
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Expert Endorsements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg">
                  <Image
                    src="/images/img_44_2.jpeg"
                    alt="Dr. Barbara Mills"
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 italic mb-4 text-sm">
                  &ldquo;Convenient, light weight, easy setup.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Dr. Barbara Mills</p>
                <p className="text-sm text-gray-500">Professor of Anthropology</p>
                <p className="text-sm text-gray-500">Arizona State University</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg">
                  <Image
                    src="/images/img_46_2.jpeg"
                    alt="Ramsay Macfie"
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 italic mb-4 text-sm">
                  &ldquo;Gridlock is easy to use in difficult (uneven) terrain.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Ramsay Macfie</p>
                <p className="text-sm text-gray-500">Archaeological Field Supervisor</p>
                <p className="text-sm text-gray-500">AECOM Ontario</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <blockquote className="text-gray-600 italic mb-4 text-sm">
                  &ldquo;A simple and elegant solution to a perennial challenge.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Robin Latour</p>
                <p className="text-sm text-gray-500">Assistant Manager of GIS Data & Survey</p>
                <p className="text-sm text-gray-500">ASI Heritage</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <blockquote className="text-gray-600 italic mb-4 text-sm">
                  &ldquo;We work in many different environments, so this is key.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Lauren Donker</p>
                <p className="text-sm text-gray-500">Archaeological Field Supervisor</p>
                <p className="text-sm text-gray-500">AECOM Ontario</p>
              </div>
            </div>

            {/* Outreach Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600 mb-1">30+</div>
                <p className="text-gray-600 text-sm">Experts Reached Out</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                <div className="text-3xl font-bold text-amber-500 mb-1">5</div>
                <p className="text-gray-600 text-sm">Online Interviews</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-500 mb-1">1</div>
                <p className="text-gray-600 text-sm">FLL Kickoff Attended</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                <div className="text-3xl font-bold text-amber-600 mb-1">2</div>
                <p className="text-gray-600 text-sm">Public Webinars</p>
              </div>
            </div>
          </div>

          {/* GridLock Goes Global */}
          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">GridLock Goes Global!</h3>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              We posted on Reddit at <span className="font-semibold text-orange-500">r/AskArchaeology</span> to obtain feedback from Archaeologists from around the world.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500">21k+</div>
                <p className="text-gray-600 text-base">Views</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-500">95%</div>
                <p className="text-gray-600 text-base">Upvote Ratio</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600">15+</div>
                <p className="text-gray-600 text-base">Responses</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-base mb-3">Viewers from</p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-medium text-lg">🇺🇸 United States</span>
                <span className="bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-medium text-lg">🇨🇦 Canada</span>
                <span className="bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-medium text-lg">🇬🇧 United Kingdom</span>
                <span className="bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-medium text-lg">🌍 And more</span>
              </div>
            </div>
          </div>

          {/* Innovation Gallery */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Innovation Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_27_1.jpeg", alt: "Team brainstorming" },
                { src: "/images/img_2_1.jpeg", alt: "Building process" },
                { src: "/images/img_3_1.jpeg", alt: "GridLock assembly" },
                { src: "/images/img_26_1.jpeg", alt: "Field testing" },
                { src: "/images/img_28_2.jpeg", alt: "Outdoor testing" },
                { src: "/images/img_12_1.jpeg", alt: "Final product" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Projections Section */}
      <section id="financials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              BUSINESS PLAN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Financial Projections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              GridLock is designed to be affordable, sustainable, and profitable — paying for itself in just over one day.
            </p>
          </div>

          {/* Payback Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Payback Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h4 className="font-semibold text-red-600 mb-3">Current Method (String &amp; Plumb Bob)</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>2 people required per task</li>
                  <li>10 minutes per grid square</li>
                  <li>400 minutes total per day (20 tasks)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-yellow-400">
                <h4 className="font-semibold text-green-600 mb-3">With GridLock</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>Only 1 person needed</li>
                  <li>5 minutes per grid square</li>
                  <li>100 minutes total per day (20 tasks)</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              <span className="font-semibold text-gray-900">Daily savings: 5 hours</span> — At $35/hr, GridLock pays for itself in about 1 day of use.
            </p>
          </div>

          {/* 7-Year Revenue & Profit Table */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 mb-12">
            <h3 className="text-xl font-bold text-white mb-2">7-Year Financial Projection</h3>
            <p className="text-gray-400 text-sm mb-6">Based on 8% market penetration of ~10,000 North American archaeologists, with 5% annual growth and inflation.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-yellow-400 border-b border-gray-700">
                    <th className="py-3 px-3 text-left">Year</th>
                    <th className="py-3 px-3 text-right">Revenue</th>
                    <th className="py-3 px-3 text-right">Expenses</th>
                    <th className="py-3 px-3 text-right">Profit</th>
                    <th className="py-3 px-3 text-right">Margin</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { year: 1, revenue: 159992, expenses: 127480, profit: 32512, margin: "20.3%" },
                    { year: 2, revenue: 167992, expenses: 133854, profit: 34138, margin: "20.3%" },
                    { year: 3, revenue: 176391, expenses: 140547, profit: 35845, margin: "20.3%" },
                    { year: 4, revenue: 185211, expenses: 147574, profit: 37637, margin: "20.3%" },
                    { year: 5, revenue: 194472, expenses: 154953, profit: 39519, margin: "20.3%" },
                    { year: 6, revenue: 204195, expenses: 162700, profit: 41495, margin: "20.3%" },
                    { year: 7, revenue: 214405, expenses: 170835, profit: 43569, margin: "20.3%" },
                  ].map((row) => (
                    <tr key={row.year} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="py-3 px-3 font-medium text-white">Year {row.year}</td>
                      <td className="py-3 px-3 text-right">${row.revenue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right">${row.expenses.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-green-400 font-medium">${row.profit.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-yellow-400">{row.margin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bill of Materials */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Bill of Materials — Cost Per Unit</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { name: "Aluminum Extrusion", cost: "$10.00" },
                { name: "Selfie Sticks", cost: "$12.00" },
                { name: "Bubble Levels", cost: "$3.00" },
                { name: "Laser Modules", cost: "$6.00" },
                { name: "Battery Box", cost: "$1.00" },
                { name: "Nuts & Bolts", cost: "$1.00" },
                { name: "Filament", cost: "$5.00" },
              ].map((item) => (
                <div key={item.name} className="bg-white rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-lg font-bold text-gray-900">{item.cost}</p>
                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
              ))}
              <div className="bg-yellow-400 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-gray-900">$38.00</p>
                <p className="text-sm text-gray-800 font-medium">Total Per Unit</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Robot Section */}
      <section id="robot" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-400 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              ROBOT DESIGN
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Robot</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precision engineering meets creative problem-solving
            </p>
          </div>

          {/* Mission Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-500 mb-2">450</div>
              <p className="text-gray-600 font-medium">Our Max Points</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-amber-200">
              <div className="text-4xl font-bold text-amber-500 mb-2">13/15</div>
              <p className="text-gray-600 font-medium">Missions</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-600 mb-2">2</div>
              <p className="text-gray-600 font-medium">Home Areas</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-amber-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">5</div>
              <p className="text-gray-600 font-medium">Attachments</p>
            </div>
          </div>

          {/* Robot Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16 max-w-4xl mx-auto">
            <Image
              src="/images/img_10_1.jpeg"
              alt="ConnecTech Robot"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Mission Runs Heatmap */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Mission Run Strategy</h3>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
              <Image
                src="/images/robot-heatmap.png"
                alt="Robot Mission Runs - Strategic route planning for maximum points"
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Attachments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {robotAttachments.map((attachment, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-4 text-center shadow-md hover:shadow-xl transition border-2 border-gray-200 ${attachment.name === "The T-rex" ? "cursor-pointer hover:border-amber-400" : ""}`}
                  onClick={attachment.name === "The T-rex" ? () => setShowRunnerGame(true) : undefined}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 relative bg-gray-100 flex items-center justify-center">
                    {attachment.image ? (
                      <Image
                        src={attachment.image}
                        alt={attachment.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-3xl">🦖</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{attachment.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Approach */}
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Coding Approach</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧭</span>
                </div>
                <h4 className="font-semibold mb-2">Gyro Sensor Navigation</h4>
                <p className="text-gray-400 text-sm">We use gyro sensors instead of color sensors since there are only 3 black and white lines on the mat</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📐</span>
                </div>
                <h4 className="font-semibold mb-2">Precision Movements</h4>
                <p className="text-gray-400 text-sm">Every motor rotation is calculated for exact positioning</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold mb-2">Iterative Testing</h4>
                <p className="text-gray-400 text-sm">We test, measure, adjust, and repeat until perfect</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">Mission Optimization</h4>
                <p className="text-gray-400 text-sm">Strategic run planning to maximize points per trip</p>
              </div>
            </div>
          </div>

          {/* Robot Gallery */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Robot Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_10_1.jpeg", alt: "Robot with attachments" },
                { src: "/images/Robotpic2.png", alt: "Robot mechanism with gears" },
                { src: "/images/Robotpic3.png", alt: "Robot arm attachment" },
                { src: "/images/Robotpic4.png", alt: "Robot attachment" },
                { src: "/images/Robotpic5.png", alt: "Robot multi-tool attachment" },
                { src: "/images/Robot picture 1.png", alt: "Robot in action" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="core-values" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-100 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              CORE VALUES
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The FLL Core Values guide everything we do
            </p>
          </div>

          {/* Core Values Gear/Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition border-2 border-yellow-200 hover:border-yellow-400 ${value.name === "Fun" ? "cursor-pointer" : ""}`}
                onClick={value.name === "Fun" ? () => setShowGame(true) : undefined}
              >
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <Image src={value.image} alt={value.name} fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.name}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Team Members with Core Values */}
          <div id="team" className="mb-16 scroll-mt-28">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Meet the ConnecTech Family</h3>
            <p className="text-lg text-gray-600 mb-8 text-center">8 innovative students from Bayview Glen School, grades 6-8</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative shadow-lg">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-yellow-600 font-bold mb-2">{member.coreValue}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Values Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_11_1.jpeg", alt: "Team together" },
                { src: "/images/img_1_1.jpeg", alt: "Teamwork in action" },
                { src: "/images/cv.jpg", alt: "Team presenting" },
                { src: "/images/cv2.jpg", alt: "Team in classroom" },
                { src: "/images/cv3.jpg", alt: "Team outdoors" },
                { src: "/images/cv4.jpg", alt: "Team fun" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Team Cheer */}
          <div className="bg-yellow-400 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Team Cheer</h3>
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                &ldquo;ConnecTech family,<br />
                I got all my teammates with me!<br />
                ConnecTech family,<br />
                We&apos;re building robots in unity!<br />
                <br />
                We are Team ConnecTech, we dig and explore,<br />
                <span className="text-yellow-600 font-bold">Discover new ideas, like never before!&rdquo;</span>
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Listen to our team song!</p>
                <audio
                  controls
                  className="w-full max-w-md mx-auto"
                  preload="metadata"
                >
                  <source src="/audio/Connect Tech.m4a" type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>

          {/* FLL Kickoff */}
          <div id="fll-kickoff" className="bg-yellow-400 rounded-2xl p-8 md:p-12 text-center mt-10">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">FLL Kickoff</h3>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <p className="text-lg text-gray-800 leading-relaxed">
                  This season our school, Bayview Glen hosted the annual First Lego League Kickoff!
                  Many members of our team got a chance to attend as well as lead sessions, which was a very
                  exciting opportunity that allowed us to share our expertise with others and learn more in
                  the process. Overall we as a team really enjoyed this opportunity to share, learn and
                  collaborate with other FLL members.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  '/images/Kickoff1.png',
                  '/images/kickoff2.png',
                  '/images/kickoff3.png',
                  '/images/kickoff4.png',
                  '/images/kickoff5.png',
                ].map((src, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={src}
                      alt={`FLL Kickoff photo ${idx + 1}`}
                      fill
                      className={idx === 3 ? "object-contain bg-white" : "object-cover"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banquet */}
          <div className="bg-yellow-400 rounded-2xl p-8 md:p-12 text-center mt-10">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Banquet</h3>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  ConnecTech team gather during Bayview Glen Robotic gala
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                '/images/Gala1.png',
                '/images/Gala2.png',
              ].map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`Banquet photo ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Media</h2>
            <p className="text-xl text-gray-600">Follow us on social media to stay updated!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Instagram */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Instagram</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200" style={{ minHeight: 480 }}>
                <iframe
                  src="https://www.instagram.com/connectech27757/embed"
                  title="ConnecTech Instagram"
                  className="w-full border-0"
                  style={{ height: 480 }}
                  allowTransparency
                  scrolling="no"
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://www.instagram.com/connectech27757/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition"
                >
                  Follow @connectech27757
                </a>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">YouTube</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video">
                <iframe
                  src="https://www.youtube.com/embed?listType=user_uploads&list=ConnecTech27757"
                  title="ConnecTech YouTube Channel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://www.youtube.com/@ConnecTech27757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                >
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
          <p className="text-xl text-gray-700 mb-8">
            Interested in GridLock or want to learn more about our team?
          </p>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">School</h3>
                <p className="text-gray-600">Bayview Glen School</p>
                <p className="text-gray-600">Toronto, Ontario, Canada</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Team</h3>
                <p className="text-gray-600">ConnecTech #27757</p>
                <p className="text-gray-600">FIRST LEGO League Challenge</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                <span className="font-semibold">Product:</span> GridLock - Precision Gridding Tool
              </p>
              <p className="text-2xl font-bold text-yellow-500 mt-2">$199.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">We Value Your Feedback</h2>
          <p className="text-lg text-gray-600 mb-8">
            Help us improve GridLock by sharing your thoughts!
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg"
          >
            Take Our Survey
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-yellow-400">ConnecTech</span>
              <span className="text-gray-500 ml-2">#27757</span>
            </div>
            <div className="text-gray-400 text-sm">
              FIRST LEGO League Challenge 2025 - UNEARTHED™
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>Built with innovation by ConnecTech Team at Bayview Glen School</p>
          </div>
        </div>
      </footer>

      {/* Robot Dodge Minigame Modal */}
      {showGame && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
          <div
            ref={gameRef}
            tabIndex={0}
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl outline-none"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Dodge the Boulders!</h2>
              <button
                onClick={closeGame}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between mb-4 text-lg">
              <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-yellow-600">Score: {gameScore}</span>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-green-600">Best: {highScore}</span>
              </div>
            </div>

            {!gameActive && !gameOver && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-2">Use arrow keys or WASD to move the robot!</p>
                <p className="text-gray-600 mb-4">Dodge the boulders as long as you can!</p>
                <button
                  onClick={startGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg transition"
                >
                  Start Game
                </button>
              </div>
            )}

            {gameActive && (
              <div
                className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl h-72 overflow-hidden"
                style={{ touchAction: "none" }}
              >
                {/* Warning indicators */}
                {warnings.map((w) => {
                  if (w.direction === "top") {
                    return (
                      <div
                        key={w.id}
                        className="absolute top-1 flex flex-col items-center animate-pulse"
                        style={{
                          left: `${w.x}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <span className="text-lg select-none">⚠️</span>
                        <div
                          className="w-0.5 bg-red-500/60"
                          style={{ height: `${Math.max(0, (25 - w.timeLeft) * 6)}px` }}
                        />
                      </div>
                    );
                  } else if (w.direction === "left") {
                    return (
                      <div
                        key={w.id}
                        className="absolute left-1 flex flex-row items-center animate-pulse"
                        style={{
                          top: `${w.y}%`,
                          transform: "translateY(-50%)",
                        }}
                      >
                        <span className="text-lg select-none">⚠️</span>
                        <div
                          className="h-0.5 bg-red-500/60"
                          style={{ width: `${Math.max(0, (25 - w.timeLeft) * 4)}px` }}
                        />
                      </div>
                    );
                  } else if (w.direction === "right") {
                    return (
                      <div
                        key={w.id}
                        className="absolute right-1 flex flex-row-reverse items-center animate-pulse"
                        style={{
                          top: `${w.y}%`,
                          transform: "translateY(-50%)",
                        }}
                      >
                        <span className="text-lg select-none">⚠️</span>
                        <div
                          className="h-0.5 bg-red-500/60"
                          style={{ width: `${Math.max(0, (25 - w.timeLeft) * 4)}px` }}
                        />
                      </div>
                    );
                  } else if (w.direction === "bottom") {
                    return (
                      <div
                        key={w.id}
                        className="absolute bottom-1 flex flex-col-reverse items-center animate-pulse"
                        style={{
                          left: `${w.x}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <span className="text-lg select-none">⚠️</span>
                        <div
                          className="w-0.5 bg-red-500/60"
                          style={{ height: `${Math.max(0, (25 - w.timeLeft) * 6)}px` }}
                        />
                      </div>
                    );
                  } else if (w.direction === "topLeft") {
                    return (
                      <div
                        key={w.id}
                        className="absolute top-1 left-1 animate-pulse"
                      >
                        <span className="text-lg select-none">⚠️</span>
                      </div>
                    );
                  } else if (w.direction === "topRight") {
                    return (
                      <div
                        key={w.id}
                        className="absolute top-1 right-1 animate-pulse"
                      >
                        <span className="text-lg select-none">⚠️</span>
                      </div>
                    );
                  } else if (w.direction === "bottomLeft") {
                    return (
                      <div
                        key={w.id}
                        className="absolute bottom-1 left-1 animate-pulse"
                      >
                        <span className="text-lg select-none">⚠️</span>
                      </div>
                    );
                  } else {
                    // bottomRight
                    return (
                      <div
                        key={w.id}
                        className="absolute bottom-1 right-1 animate-pulse"
                      >
                        <span className="text-lg select-none">⚠️</span>
                      </div>
                    );
                  }
                })}

                {/* Robot */}
                <div
                  className="absolute w-10 h-10 transition-all duration-75"
                  style={{
                    left: `${robotPosition.x}%`,
                    top: `${robotPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="text-3xl select-none">🤖</span>
                </div>

                {/* Boulders */}
                {fireballs.map((fb) => {
                  return (
                    <div
                      key={fb.id}
                      className="absolute w-10 h-10"
                      style={{
                        left: `${fb.x}%`,
                        top: `${fb.y}%`,
                        transform: "translate(-50%, -50%)",
                        animation: "spin 1s linear infinite",
                      }}
                    >
                      <Image
                        src="/images/Boulderasset.png"
                        alt="Boulder"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {gameOver && (
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-gray-900 mb-2">Game Over!</p>
                <p className="text-xl text-yellow-600 mb-4">Score: {gameScore}</p>
                {gameScore >= highScore && gameScore > 0 && (
                  <p className="text-green-600 font-bold mb-4">New High Score!</p>
                )}
                <button
                  onClick={startGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg transition"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Robot Runner Game Modal (T-rex style) */}
      {showRunnerGame && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
          <div
            ref={runnerRef}
            tabIndex={0}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl outline-none"
            onClick={runnerActive && !runnerGameOver ? jump : undefined}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">🦖 Robot Runner!</h2>
              <button
                onClick={closeRunnerGame}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between mb-4 text-lg">
              <div className="bg-amber-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-amber-600">Score: {runnerScore}</span>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-green-600">Best: {runnerHighScore}</span>
              </div>
            </div>

            {!runnerActive && !runnerGameOver && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-2">Press SPACE, W, or click/tap to jump!</p>
                <p className="text-gray-600 mb-4">Jump over the spikes to survive!</p>
                <button
                  onClick={startRunnerGame}
                  className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-full font-bold text-lg transition"
                >
                  Start Game
                </button>
              </div>
            )}

            {runnerActive && (
              <div
                className="relative bg-gradient-to-b from-sky-300 to-sky-400 rounded-xl h-72 overflow-hidden cursor-pointer"
                style={{ touchAction: "none" }}
              >
                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-700 to-amber-600" />
                <div className="absolute bottom-4 left-0 right-0 h-1 bg-amber-800" />

                {/* Robot */}
                <div
                  className="absolute w-12 h-12 transition-none"
                  style={{
                    left: "10%",
                    bottom: `${5 + robotY}px`,
                    transform: `translateX(-50%) rotate(${robotRotation}deg)`,
                  }}
                >
                  <span className="text-4xl select-none">🤖</span>
                </div>

                {/* Spikes */}
                {spikes.map((spike) => (
                  <div
                    key={spike.id}
                    className="absolute"
                    style={{
                      left: `${spike.x}%`,
                      bottom: "5px",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {spike.type === "double" ? (
                      <div className="flex">
                        <span className="text-5xl select-none text-red-500" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))" }}>▲</span>
                        <span className="text-5xl select-none text-red-500 -ml-4" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))" }}>▲</span>
                      </div>
                    ) : (
                      <span className="text-5xl select-none text-red-500" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))" }}>▲</span>
                    )}
                  </div>
                ))}

                {/* Instructions overlay */}
                <div className="absolute top-2 left-2 text-xs text-white/80 bg-black/20 px-2 py-1 rounded">
                  Tap or Space to jump!
                </div>
              </div>
            )}

            {runnerGameOver && (
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-gray-900 mb-2">Game Over!</p>
                <p className="text-xl text-amber-600 mb-4">Score: {runnerScore}</p>
                {runnerScore >= runnerHighScore && runnerScore > 0 && (
                  <p className="text-green-600 font-bold mb-4">New High Score!</p>
                )}
                <button
                  onClick={startRunnerGame}
                  className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-full font-bold text-lg transition"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auto-Scroll Floating Button - hidden on mobile */}
      <button
        onClick={() => setAutoScroll(!autoScroll)}
        className={`hidden md:block fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full font-bold text-sm shadow-lg transition-all duration-300 hover:scale-105 ${
          autoScroll
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-900 hover:bg-gray-800 text-white"
        }`}
      >
        {autoScroll ? "Stop Scroll" : "Auto-Scroll"}
      </button>
    </div>
  );
}
