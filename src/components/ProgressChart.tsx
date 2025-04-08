
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
        <div className="bg-white p-3 border border-leanfuel-light rounded-lg shadow-md">
          <p className="text-sm font-medium">{`${label}: ${payload[0].value}kg`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="leanfuel-card bg-leanfuel-light/30 p-4">
      <h3 className="text-lg font-bold mb-3 text-leanfuel-dark">Weight Progress</h3>
      <div className="h-40 bg-white p-2 rounded-lg">
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
              stroke="#33C3F0"
              strokeWidth={2}
              dot={{ r: 3, fill: "#33C3F0" }}
              activeDot={{ r: 5, fill: "#33C3F0" }}
            />
            {/* Optional: Add goal weight line */}
            {weightGoal > 0 && (
              <Line
                type="monotone"
                dataKey={() => weightGoal}
                stroke="#4CAF50"
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
