import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type PieData = {
  name: string;
  value: number;
};

type CustomPieChartProps = {
  pieData: PieData[];
};

const COLORS = ["#00fe37", "#ff4242", "#FFBB28"];

export const CustomPieChart: React.FC<CustomPieChartProps> = ({ pieData }) => {
  const renderLegend = () => (
    <div className="legend-container ">
      {pieData.map((entry, index) => (
        <div
          key={`legend-${entry.name}`}
          className="legend-item flex flex-col justify-center items-center"
        >
          <div
            className="legend-color"
            style={{ color: COLORS[index % COLORS.length] }}
          >
            <span className="legend-label font-semibold">
              {entry.name}: {"  "}{" "}
            </span>
            <span className="legend-result">{Math.round(entry.value)}%</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <PieChart width={350} height={300}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#c2c2c20"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend content={renderLegend} />
      <Tooltip />
    </PieChart>
  );
};
