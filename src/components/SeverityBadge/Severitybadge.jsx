const SEVERITY_MAP = {
  CRITICAL: { label: "Critical", className: "badge-critical" },
  HIGH:     { label: "High",     className: "badge-high"     },
  MEDIUM:   { label: "Medium",   className: "badge-medium"   },
  LOW:      { label: "Low",      className: "badge-low"      },
};

const SeverityBadge = ({ severity, score }) => {
  const config = SEVERITY_MAP[severity] || SEVERITY_MAP.LOW;

  return (
    <span className={`badge ${config.className}`}>
      {config.label}
      {score != null && <span className="badge-score">{score.toFixed(1)}</span>}
    </span>
  );
};

export default SeverityBadge;