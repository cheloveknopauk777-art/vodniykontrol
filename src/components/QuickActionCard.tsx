import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  variant?: "default" | "primary";
}

const QuickActionCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  variant = "default" 
}: QuickActionCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-5 rounded-2xl text-left transition-all duration-300 
        hover:scale-[1.02] active:scale-[0.98]
        ${isPrimary 
          ? "water-gradient text-primary-foreground shadow-button hover:shadow-glow" 
          : "glass-card hover:shadow-lg"
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center mb-3
        ${isPrimary 
          ? "bg-white/20" 
          : "bg-primary/10"
        }
      `}>
        <Icon className={`w-6 h-6 ${isPrimary ? "text-white" : "text-primary"}`} />
      </div>
      <h3 className={`font-semibold text-lg ${isPrimary ? "" : "text-foreground"}`}>
        {title}
      </h3>
      <p className={`text-sm mt-1 ${isPrimary ? "text-white/80" : "text-muted-foreground"}`}>
        {description}
      </p>
    </button>
  );
};

export default QuickActionCard;
