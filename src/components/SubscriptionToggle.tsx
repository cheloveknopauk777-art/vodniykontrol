import { Switch } from "@/components/ui/switch";
import { RefreshCw, Calendar } from "lucide-react";

interface SubscriptionToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  threshold?: number;
  nextDelivery?: string;
}

const SubscriptionToggle = ({ 
  enabled, 
  onToggle, 
  threshold = 20,
  nextDelivery = "Jan 20, 2026"
}: SubscriptionToggleProps) => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Auto-Replenish</h3>
            <p className="text-sm text-muted-foreground">Order when below {threshold}%</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
      
      {enabled && (
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Next delivery: <span className="font-medium text-foreground">{nextDelivery}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionToggle;
