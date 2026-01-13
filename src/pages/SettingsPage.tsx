import { 
  User, 
  CreditCard, 
  MapPin, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Smartphone
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface SettingItemProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}

const SettingItem = ({ icon: Icon, title, description, onClick, trailing }: SettingItemProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 rounded-xl transition-colors text-left"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-foreground">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      )}
    </div>
    {trailing || <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
  </button>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const isDarkMode = theme === "dark";

  const handleToggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    toast.info("Выход из аккаунта...");
  };

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
        <p className="text-muted-foreground">Управление аккаунтом</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Profile Card */}
        <div className="glass-card p-5 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full water-gradient flex items-center justify-center text-2xl shadow-button">
              👤
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">Александр Иванов</h2>
              <p className="text-sm text-muted-foreground">alex@example.com</p>
              <p className="text-xs text-primary font-medium mt-1">Премиум подписка</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Аккаунт
            </h3>
          </div>
          <div className="p-1">
            <SettingItem
              icon={User}
              title="Профиль"
              description="Редактировать личные данные"
              onClick={() => navigate("/settings/profile")}
            />
            <SettingItem
              icon={CreditCard}
              title="Способы оплаты"
              description="Visa •••• 4242"
              onClick={() => navigate("/settings/profile")}
            />
            <SettingItem
              icon={MapPin}
              title="Адрес доставки"
              description="ул. Пушкина, д. 10, Москва"
              onClick={() => navigate("/settings/profile")}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Настройки
            </h3>
          </div>
          <div className="p-1">
            <SettingItem
              icon={Bell}
              title="Уведомления"
              description="Push-уведомления включены"
              trailing={
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                  onClick={(e) => e.stopPropagation()}
                />
              }
            />
            <SettingItem
              icon={Moon}
              title="Тёмная тема"
              description={isDarkMode ? "Включена" : "Выключена"}
              trailing={
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={handleToggleDarkMode}
                  onClick={(e) => e.stopPropagation()}
                />
              }
            />
            <SettingItem
              icon={Smartphone}
              title="Подключённые устройства"
              description="2 кулера"
              onClick={() => toast.info("Открываем устройства...")}
            />
          </div>
        </div>

        {/* Support */}
        <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Поддержка
            </h3>
          </div>
          <div className="p-1">
            <SettingItem
              icon={HelpCircle}
              title="Центр помощи"
              description="Часто задаваемые вопросы"
              onClick={() => toast.info("Открываем помощь...")}
            />
            <SettingItem
              icon={Shield}
              title="Конфиденциальность"
              onClick={() => toast.info("Открываем настройки...")}
            />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 glass-card text-destructive hover:bg-destructive/10 transition-colors rounded-2xl animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Выйти</span>
        </button>

        {/* Version */}
        <p className="text-center text-sm text-muted-foreground pb-4">
          AquaSync v1.0.0
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
