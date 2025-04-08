
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeightData {
  date: string;
  weight: number;
}

interface ProgressChartProps {
  data: WeightData[];
  weightGoal: number;
}

const ProgressChart = ({ data, weightGoal }: ProgressChartProps) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="text-sm">{`${label}: ${payload[0].value}kg`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="leanfuel-card p-4">
      <h3 className="text-lg font-bold mb-3">Weight Progress</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => value.slice(5)} // Show only MM-DD
            />
            <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            {/* Optional: Add goal weight line */}
            {weightGoal > 0 && (
              <Line
                type="monotone"
                dataKey={() => weightGoal}
                stroke="#26A69A"
                strokeDasharray="5 5"
                strokeWidth={1}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
