import { useState } from "react";
import { ShoppingCart, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WaterTank from "@/components/WaterTank";
import ConnectionStatus from "@/components/ConnectionStatus";
import QuickActionCard from "@/components/QuickActionCard";
import SubscriptionToggle from "@/components/SubscriptionToggle";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [waterLevel] = useState(72);
  const [isConnected] = useState(true);
  const [autoReplenish, setAutoReplenish] = useState(true);

  const handleOrderNow = () => {
    toast.success("Переходим к заказу...");
    navigate("/order");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-muted-foreground font-medium">Доброе утро! 👋</p>
            <h1 className="text-2xl font-bold text-foreground">AquaSync</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6">
        {/* Connection Status */}
        <div className="glass-card p-4">
          <ConnectionStatus isConnected={isConnected} deviceName="AquaSync Pro" />
        </div>

        {/* Water Tank Visualization */}
        <div className="glass-card p-8 animate-fade-in">
          <WaterTank level={waterLevel} />
          
          {waterLevel <= 25 && (
            <div className="mt-4 p-3 rounded-xl bg-warning/10 border border-warning/20">
              <p className="text-sm text-warning font-medium text-center">
                ⚠️ Низкий уровень воды! Рекомендуем сделать заказ.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <QuickActionCard
            icon={ShoppingCart}
            title="Заказать воду"
            description="Доставка до двери"
            onClick={handleOrderNow}
            variant="primary"
          />
          <QuickActionCard
            icon={History}
            title="История"
            description="Статистика потребления"
            onClick={handleViewHistory}
          />
        </div>

        {/* Auto-Replenish */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <SubscriptionToggle 
            enabled={autoReplenish} 
            onToggle={setAutoReplenish}
            threshold={20}
            nextDelivery="20 января 2026"
          />
        </div>

        {/* Weekly Stats Preview */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Эта неделя</h3>
            <button 
              onClick={handleViewHistory}
              className="text-sm text-primary font-medium hover:underline"
            >
              Подробнее
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-primary">14.2л</p>
              <p className="text-xs text-muted-foreground">Всего</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">2.0л</p>
              <p className="text-xs text-muted-foreground">В среднем/день</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-success">+12%</p>
              <p className="text-xs text-muted-foreground">vs прошлая</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
