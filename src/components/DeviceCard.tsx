import { Droplets, Signal, ChevronRight } from "lucide-react";

interface DeviceCardProps {
  name: string;
  model: string;
  waterLevel: number;
  isConnected: boolean;
  signalStrength?: number;
  onClick?: () => void;
}

const DeviceCard = ({ 
  name, 
  model, 
  waterLevel, 
  isConnected, 
  signalStrength = 85,
  onClick 
}: DeviceCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full glass-card p-5 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl water-gradient flex items-center justify-center shadow-button">
            <Droplets className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{model}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-success" : "bg-destructive"}`} />
                <span className="text-xs text-muted-foreground">
                  {isConnected ? "Онлайн" : "Офлайн"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{signalStrength}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">{waterLevel}%</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
};

export default DeviceCard;
