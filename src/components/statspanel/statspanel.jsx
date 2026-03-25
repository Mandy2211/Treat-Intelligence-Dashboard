const StatCard = ({ label, value, color, loading }) => (
  <div className="stat-card">
    <span className="stat-label">{label}</span>
    <span className="stat-value" style={{ color: color || "inherit" }}>
      {loading ? "—" : value}
    </span>
  </div>
);

const StatsPanel = ({ stats, loading }) => {
  return (
    <div className="stats-panel">
      <StatCard label="Total Threats"  value={stats.total}    loading={loading} />
      <StatCard label="Critical"       value={stats.critical} loading={loading} color="#e63946" />
      <StatCard label="High"           value={stats.high}     loading={loading} color="#f4a261" />
      <StatCard label="New Today"      value={stats.newToday} loading={loading} color="#2a9d8f" />
      <StatCard label="Avg CVSS"       value={stats.avgCvss}  loading={loading} color="#e9c46a" />
    </div>
  );
};

export default StatsPanel;