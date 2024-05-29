"use client";
import React, { useRef, useEffect } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import dynamic from "next/dynamic";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.title.display = false;

Chart.defaults.interaction.intersect = false;
Chart.defaults.interaction.mode = "index";

if (Chart.defaults.plugins.datalabels)
  Chart.defaults.plugins.datalabels.display = false;

type TChartCompProps = {
  option: ChartConfiguration;
};

/** @see https://www.chartjs.org/docs/latest/samples/line/line.html */
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

ChartComp.RealTime = dynamic(() => import("./RealTimeChart"), { ssr: false });

export default ChartComp;
