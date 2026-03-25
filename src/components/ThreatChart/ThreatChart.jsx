import { useRef, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const COLOR_MAP = {
  CVE:        "rgba(69,123,157,0.8)",
  IOC:        "rgba(106,76,147,0.8)",
  Malware:    "rgba(244,162,97,0.8)",
  Phishing:   "rgba(233,196,106,0.8)",
  Ransomware: "rgba(230,57,70,0.8)",
  APT:        "rgba(199,125,255,0.8)",
};

const ThreatChart = ({ threats, loading }) => {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (loading || !threats.length || !canvasRef.current) return;

    const typeCount = threats.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(typeCount);
    const data   = Object.values(typeCount);
    const colors = labels.map((l) => COLOR_MAP[l] || "rgba(90,96,112,0.6)");

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Threats",
          data,
          backgroundColor: colors,
          borderColor: colors.map((c) => c.replace("0.8", "1")),
          borderWidth: 1,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1e2a",
            borderColor: "#252a38",
            borderWidth: 1,
            titleColor: "#e8eaf0",
            bodyColor: "#9ca3b0",
            titleFont: { family: "'IBM Plex Mono', monospace", size: 12 },
            bodyFont:  { family: "'IBM Plex Mono', monospace", size: 11 },
          },
        },
        scales: {
          x: {
            ticks: { color: "#5a6070", font: { family: "'IBM Plex Mono', monospace", size: 11 } },
            grid:  { color: "rgba(37,42,56,0.8)" },
            border:{ color: "#252a38" },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, color: "#5a6070", font: { family: "'IBM Plex Mono', monospace", size: 11 } },
            grid:  { color: "rgba(37,42,56,0.8)" },
            border:{ color: "#252a38" },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }
    };
  }, [threats, loading]);

  return (
    <div className="chart-wrap">
      <div className="chart-header">
        <span className="chart-title">Threats by Category</span>
        <span className="chart-sub">{threats.length} total indicators</span>
      </div>
      <div className="chart-area">
        {loading
          ? <div className="chart-skeleton" />
          : <canvas ref={canvasRef} />
        }
      </div>
    </div>
  );
};

export default ThreatChart;