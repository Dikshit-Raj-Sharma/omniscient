import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ history }) => {
  const formattedData = history.map((item) => ({
    price: Number(item.price),
    date: new Date(item.scraped_at).toLocaleDateString(),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke="#6272A4"
          strokeDasharray="3 3"
          opacity={0.3}
        />

        <XAxis
          dataKey="date"
          tick={{ fill: "#F8F8F2", fontSize: 12 }}
          axisLine={{ stroke: "#6272A4" }}
          tickLine={{ stroke: "#6272A4" }}
        />

        <YAxis
          tick={{ fill: "#F8F8F2", fontSize: 12 }}
          axisLine={{ stroke: "#6272A4" }}
          tickLine={{ stroke: "#6272A4" }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#44475A",
            border: "1px solid #6272A4",
            borderRadius: "8px",
            color: "#F8F8F2",
          }}
          labelStyle={{
            color: "#8BE9FD",
          }}
        />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#BD93F9"
          strokeWidth={3}
          dot={{
            fill: "#BD93F9",
            strokeWidth: 2,
            r: 4,
          }}
          activeDot={{
            r: 7,
            fill: "#FF79C6",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { PriceChart };