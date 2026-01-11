import { Droplet, TrendingUp, TrendingDown } from "lucide-react";

interface UsageLogItemProps {
  time: string;
  amount: string;
  type: "dispense" | "daily-total";
  trend?: "up" | "down" | "neutral";
}

const UsageLogItem = ({ time, amount, type, trend = "neutral" }: UsageLogItemProps) => {
  const isDaily = type === "daily-total";
  
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center
        ${isDaily ? "bg-primary/10" : "bg-secondary"}
      `}>
        <Droplet className={`w-5 h-5 ${isDaily ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      
      <div className="flex-1">
        <p className={`font-medium ${isDaily ? "text-foreground" : "text-muted-foreground"}`}>
          {isDaily ? "Итого за день" : "Налито воды"}
        </p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${isDaily ? "text-primary text-lg" : "text-foreground"}`}>
          {amount}
        </span>
        {isDaily && trend !== "neutral" && (
          trend === "up" 
            ? <TrendingUp className="w-4 h-4 text-success" />
            : <TrendingDown className="w-4 h-4 text-warning" />
        )}
      </div>
    </div>
  );
};

export default UsageLogItem;
