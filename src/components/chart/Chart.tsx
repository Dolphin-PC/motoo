"use client";
import React, { useRef, useEffect } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

Chart.register(...registerables);

type TChartCompProps = {
  option: ChartConfiguration;
};

const ChartComp = (props: TChartCompProps) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, props.option);

      return () => {
        newChartInstance.destroy();
      };
    }
  }, []);

  return <canvas ref={chartContainer} />;
};

export default ChartComp;
