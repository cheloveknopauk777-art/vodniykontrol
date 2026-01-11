import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
  deviceName?: string;
}

const ConnectionStatus = ({ isConnected, deviceName = "AquaSync Pro" }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {isConnected ? (
          <>
            <div className="absolute inset-0 bg-success/30 rounded-full animate-pulse-ring" />
            <div className="relative w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-success" />
            </div>
          </>
        ) : (
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <WifiOff className="w-5 h-5 text-destructive" />
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-foreground">{deviceName}</p>
        <p className={`text-sm font-medium ${isConnected ? "text-success" : "text-destructive"}`}>
          {isConnected ? "Подключено" : "Отключено"}
        </p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
