import { useEffect, useState } from "react";

interface WaterTankProps {
  level: number; // 0-100
  className?: string;
}

const WaterTank = ({ level, className = "" }: WaterTankProps) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 100);
    return () => clearTimeout(timer);
  }, [level]);

  const getWaterColor = () => {
    if (level <= 20) return "from-warning/90 to-warning";
    if (level <= 40) return "from-accent to-primary";
    return "from-primary to-accent";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Tank Container */}
      <div className="relative w-48 h-64 mx-auto">
        {/* Glass Tank */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm border-2 border-white/40 overflow-hidden shadow-card">
          {/* Water Fill */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${animatedLevel}%` }}
          >
            {/* Wave Effect Top */}
            <div className="absolute -top-3 left-1/2 w-[200%] h-6 animate-wave">
              <svg viewBox="0 0 1200 120" className="w-full h-full fill-current text-primary/30">
                <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" />
              </svg>
            </div>
            <div className="absolute -top-2 left-1/2 w-[200%] h-5 animate-wave-slow delay-200">
              <svg viewBox="0 0 1200 120" className="w-full h-full fill-current text-primary/50">
                <path d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 L1200,120 L0,120 Z" />
              </svg>
            </div>

            {/* Bubbles */}
            <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-white/40 animate-bubble" />
            <div className="absolute bottom-8 left-12 w-3 h-3 rounded-full bg-white/30 animate-bubble delay-500" />
            <div className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-white/40 animate-bubble delay-1000" />
          </div>

          {/* Water Level Marks */}
          <div className="absolute right-2 top-4 bottom-4 w-1 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((mark) => (
              <div key={mark} className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">{mark}</span>
                <div className="w-2 h-0.5 bg-muted-foreground/30 rounded" />
              </div>
            ))}
          </div>

          {/* Shine Effect */}
          <div className="absolute top-4 left-4 w-8 h-24 bg-gradient-to-b from-white/60 to-transparent rounded-full transform -rotate-12" />
        </div>

        {/* Tank Base */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-b from-muted to-muted/50 rounded-b-xl" />
      </div>

      {/* Percentage Display */}
      <div className="mt-6 text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-6xl font-bold text-foreground tracking-tight">
            {animatedLevel}
          </span>
          <span className="text-2xl font-semibold text-muted-foreground">%</span>
        </div>
        <p className="text-muted-foreground mt-1 font-medium">
          ~{Math.round((animatedLevel / 100) * 19)}L remaining
        </p>
      </div>
    </div>
  );
};

export default WaterTank;
