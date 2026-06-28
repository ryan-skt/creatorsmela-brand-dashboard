import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface DonutChartProps {
  used: number;
  total: number;
}

export function DonutChart({ used, total }: DonutChartProps) {
  const remaining = total - used;
  const usedPct = Math.round((used / total) * 100);

  const data = [
    { name: 'Used', value: used },
    { name: 'Remaining', value: remaining },
  ];

  const COLORS = ['#4F46E5', '#E5E7EB'];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatCurrency(value)]}
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-foreground">{usedPct}%</p>
          <p className="text-xs text-muted-foreground">Used</p>
        </div>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Budget Used</p>
            <p className="text-sm font-semibold text-foreground">{formatCurrency(used)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-border" />
          <div>
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-sm font-semibold text-foreground">{formatCurrency(remaining)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
