"use client";

import { Chart, ChartConfiguration } from "chart.js";
import React, { use, useEffect, useRef } from "react";

type TProps = {
  option: Omit<ChartConfiguration, "data">;
  chartData: ChartConfiguration["data"];
};

export default function RealTimeChart({ chartData, option }: TProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        ...option,
        data: chartData,
      });

      return () => {
        if (chartInstance.current) chartInstance.current.destroy();
      };
    }
  }, [option]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data = chartData;
      chartInstance.current.update();
    }
  }, [chartData]);

  return <canvas ref={chartRef} />;
}
