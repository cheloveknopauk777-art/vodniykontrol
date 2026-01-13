import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Wifi, WifiOff, Droplets, Settings, Power, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import WaterTank from "@/components/WaterTank";

interface DeviceData {
  id: string;
  name: string;
  location: string;
  isConnected: boolean;
  waterLevel: number;
  lastSync: string;
  temperature: number;
  autoOrder: boolean;
  orderThreshold: number;
}

const DeviceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock device data
  const [device, setDevice] = useState<DeviceData>({
    id: id || "1",
    name: id === "2" ? "Офисный кулер" : "Домашний кулер",
    location: id === "2" ? "Офис, 3 этаж" : "Кухня",
    isConnected: true,
    waterLevel: id === "2" ? 45 : 75,
    lastSync: "2 мин. назад",
    temperature: 5,
    autoOrder: true,
    orderThreshold: 20,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Данные обновлены");
    }, 1500);
  };

  const handleDisconnect = () => {
    setDevice(prev => ({ ...prev, isConnected: false }));
    toast.info("Устройство отключено от сети");
  };

  const handleReconnect = () => {
    setDevice(prev => ({ ...prev, isConnected: true }));
    toast.success("Устройство подключено");
  };

  const handleToggleAutoOrder = (checked: boolean) => {
    setDevice(prev => ({ ...prev, autoOrder: checked }));
    toast.success(checked ? "Автозаказ включён" : "Автозаказ выключен");
  };

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate("/device")}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{device.name}</h1>
            <p className="text-muted-foreground">{device.location}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Connection Status */}
        <div className={`glass-card p-5 animate-fade-in ${
          !device.isConnected ? "border-destructive/50" : ""
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                device.isConnected ? "bg-success/20" : "bg-destructive/20"
              }`}>
                {device.isConnected ? (
                  <Wifi className="w-6 h-6 text-success" />
                ) : (
                  <WifiOff className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {device.isConnected ? "Подключено" : "Отключено"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Обновлено: {device.lastSync}
                </p>
              </div>
            </div>
            {device.isConnected ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDisconnect}
                className="text-destructive border-destructive/50 hover:bg-destructive/10"
              >
                <Power className="w-4 h-4 mr-2" />
                Отключить
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={handleReconnect}
              >
                <Wifi className="w-4 h-4 mr-2" />
                Подключить
              </Button>
            )}
          </div>
        </div>

        {/* Water Level */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">Уровень воды</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <WaterTank level={device.waterLevel} size="md" />
            <div className="flex-1">
              <div className="text-4xl font-bold text-foreground mb-1">
                {device.waterLevel}%
              </div>
              <p className="text-muted-foreground">
                ~{Math.round(device.waterLevel * 0.19)} л осталось
              </p>
              {device.waterLevel < 25 && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-warning/20 text-warning text-sm font-medium">
                  ⚠️ Низкий уровень воды
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Device Settings */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">Настройки устройства</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div>
                <p className="font-medium text-foreground">Автозаказ воды</p>
                <p className="text-sm text-muted-foreground">
                  Заказ при уровне ниже {device.orderThreshold}%
                </p>
              </div>
              <Switch 
                checked={device.autoOrder}
                onCheckedChange={handleToggleAutoOrder}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div>
                <p className="font-medium text-foreground">Температура воды</p>
                <p className="text-sm text-muted-foreground">
                  Охлаждённая вода
                </p>
              </div>
              <span className="text-xl font-bold text-primary">{device.temperature}°C</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate("/order")}
          >
            <Droplets className="w-6 h-6 text-primary" />
            <span>Заказать воду</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate("/history")}
          >
            <RefreshCw className="w-6 h-6 text-primary" />
            <span>История</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
