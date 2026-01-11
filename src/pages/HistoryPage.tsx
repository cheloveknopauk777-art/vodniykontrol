import { useState } from "react";
import UsageChart from "@/components/UsageChart";
import UsageLogItem from "@/components/UsageLogItem";

const weeklyData = [
  { day: "Пн", usage: 2.1 },
  { day: "Вт", usage: 1.8 },
  { day: "Ср", usage: 2.4 },
  { day: "Чт", usage: 2.0 },
  { day: "Пт", usage: 2.6 },
  { day: "Сб", usage: 1.5 },
  { day: "Вс", usage: 1.9 },
];

const usageLogs = [
  { time: "Сегодня, 10:30", amount: "300мл", type: "dispense" as const },
  { time: "Сегодня, 9:15", amount: "250мл", type: "dispense" as const },
  { time: "Сегодня, 8:00", amount: "400мл", type: "dispense" as const },
  { time: "Вчера", amount: "2.1л", type: "daily-total" as const, trend: "up" as const },
  { time: "14 янв, 15:45", amount: "350мл", type: "dispense" as const },
  { time: "14 янв, 13:20", amount: "200мл", type: "dispense" as const },
  { time: "14 янв, 10:00", amount: "450мл", type: "dispense" as const },
  { time: "13 января", amount: "1.8л", type: "daily-total" as const, trend: "down" as const },
];

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">История потребления</h1>
        <p className="text-muted-foreground">Отслеживайте расход воды</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-primary">14.3л</p>
            <p className="text-sm text-muted-foreground">За неделю</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-foreground">2.0л</p>
            <p className="text-sm text-muted-foreground">Среднее в день</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Потребление</h3>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setActiveTab("week")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "week"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Неделя
              </button>
              <button
                onClick={() => setActiveTab("month")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "month"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Месяц
              </button>
            </div>
          </div>
          <UsageChart data={weeklyData} />
        </div>

        {/* Usage Log */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-semibold text-foreground mb-4">Журнал активности</h3>
          <div className="space-y-1">
            {usageLogs.map((log, index) => (
              <UsageLogItem
                key={index}
                time={log.time}
                amount={log.amount}
                type={log.type}
                trend={log.trend}
              />
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h3 className="font-semibold text-foreground mb-3">💡 Аналитика</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <p className="text-sm text-success font-medium">
                Отлично! Вы пьёте на 12% больше воды по сравнению с прошлой неделей.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary font-medium">
                Пик потребления: 8:00 - 10:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
