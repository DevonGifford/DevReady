import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import fakeRatingHistoryData from "@/constants/fakeRatingHistoryData.json";

// 🎯🔮 Need to replace the fake data and create a state waiting for data...

const RatingHistory: React.FC = () => {
  return (
    <div className="border-2 rounded-2xl">
      <h3 className="text-xl lg:text-2xl text-devready-green font-bold tracking-widest p-4">
        Rating History:
      </h3>

      <ResponsiveContainer width="100%" height={333} className=" py-4 ">
        <BarChart data={fakeRatingHistoryData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} SR`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingHistory;
