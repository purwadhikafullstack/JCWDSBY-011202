import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        // If a chart instance exists, destroy it before creating a new one
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: type,
        data: data,
        options: {
          // Specify your chart options here
        },
      });
    }

    return () => {
      // Cleanup function to destroy the chart when the component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
