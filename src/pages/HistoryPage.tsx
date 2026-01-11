import { useState } from "react";
import UsageChart from "@/components/UsageChart";
import UsageLogItem from "@/components/UsageLogItem";

const weeklyData = [
  { day: "Mon", usage: 2.1 },
  { day: "Tue", usage: 1.8 },
  { day: "Wed", usage: 2.4 },
  { day: "Thu", usage: 2.0 },
  { day: "Fri", usage: 2.6 },
  { day: "Sat", usage: 1.5 },
  { day: "Sun", usage: 1.9 },
];

const usageLogs = [
  { time: "Today, 10:30 AM", amount: "300ml", type: "dispense" as const },
  { time: "Today, 9:15 AM", amount: "250ml", type: "dispense" as const },
  { time: "Today, 8:00 AM", amount: "400ml", type: "dispense" as const },
  { time: "Yesterday", amount: "2.1L", type: "daily-total" as const, trend: "up" as const },
  { time: "Jan 14, 3:45 PM", amount: "350ml", type: "dispense" as const },
  { time: "Jan 14, 1:20 PM", amount: "200ml", type: "dispense" as const },
  { time: "Jan 14, 10:00 AM", amount: "450ml", type: "dispense" as const },
  { time: "Jan 13", amount: "1.8L", type: "daily-total" as const, trend: "down" as const },
];

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Usage History</h1>
        <p className="text-muted-foreground">Track your water consumption</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-primary">14.3L</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold text-foreground">2.0L</p>
            <p className="text-sm text-muted-foreground">Daily Average</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Consumption</h3>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setActiveTab("week")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "week"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveTab("month")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "month"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <UsageChart data={weeklyData} />
        </div>

        {/* Usage Log */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-semibold text-foreground mb-4">Activity Log</h3>
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
          <h3 className="font-semibold text-foreground mb-3">💡 Insights</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <p className="text-sm text-success font-medium">
                Great job! You're drinking 12% more water compared to last week.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary font-medium">
                Peak usage time: 8:00 AM - 10:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
