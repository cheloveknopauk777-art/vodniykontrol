import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface UsageChartProps {
  data: { day: string; usage: number }[];
}

const UsageChart = ({ data }: UsageChartProps) => {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(210 15% 50%)' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(210 15% 50%)' }}
            tickFormatter={(value) => `${value}L`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(0 0% 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 24px -4px rgba(14, 165, 233, 0.12)'
            }}
            labelStyle={{ fontWeight: 600, color: 'hsl(210 40% 15%)' }}
            formatter={(value: number) => [`${value}L`, 'Usage']}
          />
          <Area
            type="monotone"
            dataKey="usage"
            stroke="hsl(199 89% 48%)"
            strokeWidth={3}
            fill="url(#waterGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
