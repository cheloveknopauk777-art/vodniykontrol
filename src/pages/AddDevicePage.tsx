import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bluetooth, Wifi, Check, Loader2, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Step = "scanning" | "found" | "wifi" | "connecting" | "success";

interface FoundDevice {
  id: string;
  name: string;
  signal: number;
}

const AddDevicePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("scanning");
  const [foundDevices, setFoundDevices] = useState<FoundDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<FoundDevice | null>(null);
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  // Simulate device scanning
  useEffect(() => {
    if (step === "scanning") {
      const timer = setTimeout(() => {
        setFoundDevices([
          { id: "new-1", name: "AquaSync Cooler #A3F2", signal: 85 },
          { id: "new-2", name: "AquaSync Cooler #B7C9", signal: 62 },
        ]);
        setStep("found");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSelectDevice = (device: FoundDevice) => {
    setSelectedDevice(device);
    setStep("wifi");
  };

  const handleConnectWifi = () => {
    if (!wifiName || !wifiPassword) {
      toast.error("Введите имя сети и пароль");
      return;
    }
    setStep("connecting");
    
    setTimeout(() => {
      setStep("success");
      toast.success("Устройство успешно подключено!");
    }, 3000);
  };

  const handleFinish = () => {
    navigate("/device");
  };

  const handleRescan = () => {
    setFoundDevices([]);
    setStep("scanning");
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
        <h1 className="text-2xl font-bold text-foreground">Добавить устройство</h1>
        <p className="text-muted-foreground">Подключите новый кулер</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Scanning Step */}
        {step === "scanning" && (
          <div className="glass-card p-8 text-center animate-fade-in">
            <div className="relative w-32 h-32 mx-auto mb-6">
              {/* Radar animation */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-4 rounded-full border-2 border-primary/70 animate-ping" style={{ animationDelay: "1s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full water-gradient flex items-center justify-center">
                  <Bluetooth className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Поиск устройств...</h2>
            <p className="text-muted-foreground">
              Убедитесь, что кулер включён и находится рядом
            </p>
          </div>
        )}

        {/* Found Devices Step */}
        {step === "found" && (
          <div className="space-y-4 animate-fade-in">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Найдено устройств: {foundDevices.length}</h2>
                  <p className="text-sm text-muted-foreground">Выберите устройство для подключения</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {foundDevices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleSelectDevice(device)}
                    className="w-full p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg water-gradient flex items-center justify-center">
                          <Bluetooth className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{device.name}</p>
                          <p className="text-sm text-muted-foreground">Сигнал: {device.signal}%</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1 rounded-full ${
                              i < Math.ceil(device.signal / 25) 
                                ? "bg-success" 
                                : "bg-muted"
                            }`}
                            style={{ height: `${(i + 1) * 4 + 4}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={handleRescan}>
              Искать снова
            </Button>
          </div>
        )}

        {/* WiFi Setup Step */}
        {step === "wifi" && selectedDevice && (
          <div className="glass-card p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Настройка Wi-Fi</h2>
                <p className="text-sm text-muted-foreground">{selectedDevice.name}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wifiName">Имя сети (SSID)</Label>
                <Input 
                  id="wifiName"
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                  placeholder="Введите имя Wi-Fi сети"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wifiPassword">Пароль</Label>
                <Input 
                  id="wifiPassword"
                  type="password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Введите пароль"
                />
              </div>
              
              <Button className="w-full" onClick={handleConnectWifi}>
                Подключить
              </Button>
            </div>
          </div>
        )}

        {/* Connecting Step */}
        {step === "connecting" && (
          <div className="glass-card p-8 text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full water-gradient flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Подключение...</h2>
            <p className="text-muted-foreground">
              Настраиваем устройство, подождите
            </p>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="glass-card p-8 text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Устройство добавлено!</h2>
            <p className="text-muted-foreground mb-6">
              {selectedDevice?.name} успешно подключено к вашему аккаунту
            </p>
            <Button className="w-full" onClick={handleFinish}>
              Готово
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDevicePage;
