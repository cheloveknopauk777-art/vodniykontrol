import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Bluetooth, Wifi, HelpCircle } from "lucide-react";
import DeviceCard from "@/components/DeviceCard";
import { Button } from "@/components/ui/button";

const DevicePage = () => {
  const navigate = useNavigate();
  const [devices] = useState([
    {
      id: "1",
      name: "Гостиная",
      model: "AquaSync Pro X1",
      waterLevel: 72,
      isConnected: true,
      signalStrength: 92,
    },
    {
      id: "2",
      name: "Офис",
      model: "AquaSync Mini",
      waterLevel: 45,
      isConnected: true,
      signalStrength: 78,
    },
  ]);

  const handleAddDevice = () => {
    navigate("/device/add");
  };

  const handleDeviceClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Мои устройства</h1>
            <p className="text-muted-foreground">{devices.length} кулера подключено</p>
          </div>
          <Button 
            onClick={handleAddDevice}
            className="water-gradient text-primary-foreground shadow-button hover:shadow-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Devices List */}
      <div className="px-6 space-y-4">
        {devices.map((device, index) => (
          <div 
            key={device.id} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DeviceCard
              name={device.name}
              model={device.model}
              waterLevel={device.waterLevel}
              isConnected={device.isConnected}
              signalStrength={device.signalStrength}
              onClick={() => handleDeviceClick(device.id)}
            />
          </div>
        ))}
      </div>

      {/* Setup Guide */}
      <div className="px-6 mt-8">
        <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Как подключить новый кулер
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Включите кулер</p>
                <p className="text-sm text-muted-foreground">
                  LED будет мигать синим, когда устройство готово к сопряжению
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bluetooth className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Включите Bluetooth</p>
                <p className="text-sm text-muted-foreground">
                  Мы используем BLE для обнаружения устройства
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Подключите к Wi-Fi</p>
                <p className="text-sm text-muted-foreground">
                  Введите данные сети для удалённого доступа
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
